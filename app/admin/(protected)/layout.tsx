import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { AdminNav } from "@/components/AdminNav";
import { logoutAction } from "./actions";

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

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-[#10100F] font-sans antialiased selection:bg-[#10100F] selection:text-white">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#fbfbfb]/90 backdrop-blur-md px-4 sm:px-8 py-3">
        <div className="mx-auto max-w-[1240px] space-y-2.5 sm:space-y-0">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Brand Pill & Desktop Section Tabs */}
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="inline-flex items-center rounded-full bg-[#10100F] px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-white shadow-xs shrink-0"
              >
                LYHENG • ADMIN
              </Link>

              <div className="hidden sm:block">
                <AdminNav />
              </div>
            </div>

            {/* Right: View Site & Log Out */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#10100F] shadow-xs hover:border-black/30 transition-all"
              >
                <span>View Site</span>
                <span aria-hidden="true">↗</span>
              </Link>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#10100F]/60 hover:text-red-600 hover:border-red-300 transition-all cursor-pointer"
                >
                  Log Out
                </button>
              </form>
            </div>
          </div>

          {/* Mobile-only Tab Switcher Row */}
          <div className="sm:hidden flex items-center justify-center pt-0.5">
            <AdminNav />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-6 sm:py-12">{children}</div>
    </div>
  );
}
