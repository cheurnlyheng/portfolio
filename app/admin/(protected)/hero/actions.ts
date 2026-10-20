"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { MAX_HERO_SLIDES } from "@/lib/constants";

export type HeroSlideFormState = { error?: string };

function parseHeroSlideForm(formData: FormData) {
  return {
    tagline: String(formData.get("tagline") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
  };
}

export async function createHeroSlideAction(
  _prevState: HeroSlideFormState | undefined,
  formData: FormData,
): Promise<HeroSlideFormState> {
  const input = parseHeroSlideForm(formData);

  if (!input.image || !input.tagline || !input.description) {
    return { error: "Image, tagline, and description are required." };
  }

  const count = await prisma.heroSlide.count();
  if (count >= MAX_HERO_SLIDES) {
    return { error: `You can have up to ${MAX_HERO_SLIDES} hero slides.` };
  }

  const last = await prisma.heroSlide.findFirst({ orderBy: { order: "desc" } });

  await prisma.heroSlide.create({
    data: {
      image: input.image,
      tagline: input.tagline,
      description: input.description,
      order: (last?.order ?? -1) + 1,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/hero");
  redirect("/admin/hero");
}

export async function updateHeroSlideAction(
  id: string,
  _prevState: HeroSlideFormState | undefined,
  formData: FormData,
): Promise<HeroSlideFormState> {
  const input = parseHeroSlideForm(formData);

  if (!input.image || !input.tagline || !input.description) {
    return { error: "Image, tagline, and description are required." };
  }

  const existing = await prisma.heroSlide.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Slide not found." };
  }

  if (input.image !== existing.image) {
    try {
      await del(existing.image);
    } catch {
      // Non-fatal: the blob may already be gone. Continue saving.
    }
  }

  await prisma.heroSlide.update({
    where: { id },
    data: {
      image: input.image,
      tagline: input.tagline,
      description: input.description,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/hero");
  redirect("/admin/hero");
}

export async function deleteHeroSlideAction(id: string, _formData: FormData) {
  const existing = await prisma.heroSlide.findUnique({ where: { id } });
  if (!existing) return;

  try {
    await del(existing.image);
  } catch {
    // Non-fatal: proceed with deleting the record regardless.
  }

  await prisma.heroSlide.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/hero");
}

export async function moveHeroSlideAction(id: string, direction: "up" | "down") {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
  const index = slides.findIndex((slide) => slide.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= slides.length) return;

  const current = slides[index];
  const swap = slides[swapIndex];

  await prisma.$transaction([
    prisma.heroSlide.update({ where: { id: current.id }, data: { order: swap.order } }),
    prisma.heroSlide.update({ where: { id: swap.id }, data: { order: current.order } }),
  ]);

  revalidatePath("/");
  revalidatePath("/admin/hero");
}
