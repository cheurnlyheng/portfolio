"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { MAX_IMAGES_PER_PROJECT } from "@/lib/constants";

export type ProjectFormState = { error?: string };

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

function parseProjectForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    date: String(formData.get("date") ?? ""),
    githubUrl: String(formData.get("githubUrl") ?? "").trim(),
    liveUrl: String(formData.get("liveUrl") ?? "").trim(),
  };
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

  if (removedImages.length > 0) {
    try {
      await del(removedImages);
    } catch {
      // Non-fatal: the blob may already be gone. Continue saving the project.
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

  if (existing.images.length > 0) {
    try {
      await del(existing.images);
    } catch {
      // Non-fatal: proceed with deleting the project record regardless.
    }
  }

  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}
