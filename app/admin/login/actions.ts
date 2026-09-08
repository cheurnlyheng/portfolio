"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, createSessionToken, verifyPassword } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(_prevState: LoginState | undefined, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const expectedPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!expectedPassword || !sessionSecret) {
    return { error: "Admin login is not configured yet." };
  }

  if (!password || !verifyPassword(password, expectedPassword)) {
    return { error: "Incorrect password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, createSessionToken(sessionSecret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect("/admin");
}
