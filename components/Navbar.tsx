"use client";

import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const handleNavClick = (href: string) => {
    if (!isHome) {
      router.push(`/${href}`);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const buttonClass =
    "inline-flex items-center justify-center rounded-full bg-white/80 hover:bg-white backdrop-blur-md px-3.5 sm:px-5 py-1.5 sm:py-2.5 border border-black/5 shadow-sm text-[11px] sm:text-xs font-bold tracking-tight text-[#10100F] uppercase transition-all active:scale-95";

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 flex items-center justify-between pointer-events-none">
      {/* Left: Brand Logo Pill */}
      <div className="pointer-events-auto">
        <a
          href={isHome ? "#home" : "/#home"}
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("#home");
          }}
          className="inline-flex items-center justify-center rounded-full bg-white/80 hover:bg-white backdrop-blur-md px-3.5 sm:px-5 py-1.5 sm:py-2.5 border border-black/5 shadow-sm transition-all active:scale-95"
          aria-label="Back to top"
        >
          <span className="text-[11px] sm:text-sm font-black tracking-tight text-[#10100F] uppercase">
            LYHENG
          </span>
        </a>
      </div>

      {/* Right: Projects & Contact Action Buttons (no icons) */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={() => handleNavClick("#projects")}
          className={buttonClass}
        >
          <span>Projects</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick("#contact")}
          className={buttonClass}
        >
          <span>Contact</span>
        </button>
      </div>
    </header>
  );
}
