import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!sessionSecret || !verifySessionToken(token, sessionSecret)) {
    redirect("/admin/login");
  }

  return <div className="min-h-screen bg-[#f6f1e6]">{children}</div>;
}
