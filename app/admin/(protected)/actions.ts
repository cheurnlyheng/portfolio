"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";

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

export async function createProjectAction(
  _prevState: ProjectFormState | undefined,
  formData: FormData,
): Promise<ProjectFormState> {
  const input = parseProjectForm(formData);

  if (!input.title || !input.description || !input.date || !input.githubUrl) {
    return { error: "Title, description, date, and GitHub link are required." };
  }

  await prisma.project.create({
    data: {
      title: input.title,
      description: input.description,
      date: new Date(input.date),
      githubUrl: input.githubUrl,
      liveUrl: input.liveUrl || null,
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

  await prisma.project.update({
    where: { id },
    data: {
      title: input.title,
      description: input.description,
      date: new Date(input.date),
      githubUrl: input.githubUrl,
      liveUrl: input.liveUrl || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProjectAction(id: string, _formData: FormData) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}
