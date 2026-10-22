"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { COVER_POSITIONS, DEFAULT_COVER_POSITION, MAX_IMAGES_PER_PROJECT } from "@/lib/constants";

export type ProjectFormState = { error?: string };

const VALID_COVER_POSITIONS = new Set<string>(COVER_POSITIONS.map((item) => item.value));

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

function parseProjectForm(formData: FormData) {
  const rawDisplayMode = String(formData.get("displayMode") ?? "BANNER");
  const rawCoverPosition = String(formData.get("coverPosition") ?? "");
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    date: String(formData.get("date") ?? ""),
    githubUrl: String(formData.get("githubUrl") ?? "").trim(),
    liveUrl: String(formData.get("liveUrl") ?? "").trim(),
    displayMode: rawDisplayMode === "SPLIT" ? "SPLIT" : "BANNER",
    coverPosition: VALID_COVER_POSITIONS.has(rawCoverPosition)
      ? rawCoverPosition
      : DEFAULT_COVER_POSITION,
  } as const;
}

async function assertSplitLimit(displayMode: "BANNER" | "SPLIT", excludeId?: string) {
  if (displayMode !== "SPLIT") return null;

  const splitCount = await prisma.project.count({
    where: {
      displayMode: "SPLIT",
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
  });

  if (splitCount >= 2) {
    return "Only 2 projects can use Split mode at a time. Switch another project to Banner first.";
  }

  return null;
}

async function generateUniqueSlug(title: string) {
  const base = slugify(title) || "project";
  let candidate = base;
  let suffix = 2;

  while (await prisma.project.findUnique({ where: { slug: candidate } })) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

function getNewImageUrls(formData: FormData) {
  return formData
    .getAll("newImageUrls")
    .map(String)
    .filter((url) => url.length > 0);
}

function getMobileCoverUrl(formData: FormData) {
  const url = String(formData.get("mobileCoverUrl") ?? "").trim();
  return url.length > 0 ? url : null;
}

export async function createProjectAction(
  _prevState: ProjectFormState | undefined,
  formData: FormData,
): Promise<ProjectFormState> {
  const input = parseProjectForm(formData);

  if (!input.title || !input.description || !input.date || !input.githubUrl) {
    return { error: "Title, description, date, and GitHub link are required." };
  }

  const images = getNewImageUrls(formData);
  if (images.length > MAX_IMAGES_PER_PROJECT) {
    return { error: `You can have up to ${MAX_IMAGES_PER_PROJECT} images per project.` };
  }

  const splitLimitError = await assertSplitLimit(input.displayMode);
  if (splitLimitError) {
    return { error: splitLimitError };
  }

  const slug = await generateUniqueSlug(input.title);

  await prisma.project.create({
    data: {
      slug,
      title: input.title,
      description: input.description,
      date: new Date(input.date),
      githubUrl: input.githubUrl,
      liveUrl: input.liveUrl || null,
      images,
      displayMode: input.displayMode,
      coverPosition: input.coverPosition,
      mobileCoverImage: getMobileCoverUrl(formData),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProjectAction(
  id: string,
  _prevState: ProjectFormState | undefined,
  formData: FormData,
): Promise<ProjectFormState> {
  const input = parseProjectForm(formData);

  if (!input.title || !input.description || !input.date || !input.githubUrl) {
    return { error: "Title, description, date, and GitHub link are required." };
  }

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Project not found." };
  }

  const removedImages = formData.getAll("removeImages").map(String);
  const keptImages = existing.images.filter((url) => !removedImages.includes(url));
  const newImages = getNewImageUrls(formData);

  if (keptImages.length + newImages.length > MAX_IMAGES_PER_PROJECT) {
    return { error: `You can have up to ${MAX_IMAGES_PER_PROJECT} images per project.` };
  }

  const splitLimitError = await assertSplitLimit(input.displayMode, id);
  if (splitLimitError) {
    return { error: splitLimitError };
  }

  if (removedImages.length > 0) {
    try {
      await del(removedImages);
    } catch {
      // Non-fatal: the blob may already be gone. Continue saving the project.
    }
  }

  const removeMobileCover = formData.get("removeMobileCover") === "true";
  const newMobileCoverUrl = getMobileCoverUrl(formData);
  const mobileCoverImage = newMobileCoverUrl ?? (removeMobileCover ? null : existing.mobileCoverImage);

  if (
    existing.mobileCoverImage &&
    existing.mobileCoverImage !== mobileCoverImage
  ) {
    try {
      await del(existing.mobileCoverImage);
    } catch {
      // Non-fatal: the blob may already be gone.
    }
  }

  await prisma.project.update({
    where: { id },
    data: {
      title: input.title,
      description: input.description,
      date: new Date(input.date),
      githubUrl: input.githubUrl,
      liveUrl: input.liveUrl || null,
      images: [...keptImages, ...newImages],
      displayMode: input.displayMode,
      coverPosition: input.coverPosition,
      mobileCoverImage,
    },
  });

  revalidatePath("/");
  revalidatePath(`/projects/${existing.slug}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProjectAction(id: string, _formData: FormData) {
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return;

  const toDelete = existing.mobileCoverImage
    ? [...existing.images, existing.mobileCoverImage]
    : existing.images;

  if (toDelete.length > 0) {
    try {
      await del(toDelete);
    } catch {
      // Non-fatal: proceed with deleting the project record regardless.
    }
  }

  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}
