"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav() {
  const pathname = usePathname();
  const isHero = pathname.startsWith("/admin/hero");
  const isProjects = !isHero;

  return (
    <nav className="flex items-center gap-1 rounded-full border border-black/5 bg-white p-1 shadow-2xs">
      <Link
        href="/admin"
        className={`rounded-full px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
          isProjects
            ? "bg-[#10100F] text-white shadow-xs"
            : "text-[#10100F]/70 hover:text-[#10100F] hover:bg-black/5"
        }`}
      >
        Projects
      </Link>
      <Link
        href="/admin/hero"
        className={`rounded-full px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
          isHero
            ? "bg-[#10100F] text-white shadow-xs"
            : "text-[#10100F]/70 hover:text-[#10100F] hover:bg-black/5"
        }`}
      >
        Hero Slides
      </Link>
    </nav>
  );
}
