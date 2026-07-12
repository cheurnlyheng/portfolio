"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/data/navigation";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: 0.01,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(href.replace("#", ""));
    }
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-20 flex justify-center px-2.5 py-2.5 sm:px-[18px] sm:py-3.5">
      <nav
        className="pointer-events-auto flex min-h-11 w-[calc(100vw-20px)] max-w-[min(720px,calc(100vw-28px))] items-center justify-between gap-1 overflow-x-auto rounded-full border border-white/70 bg-white/45 px-3 shadow-[0_12px_34px_rgba(31,42,68,0.12)] backdrop-blur-2xl backdrop-saturate-150 sm:min-h-[46px] sm:w-auto sm:justify-center sm:gap-[clamp(8px,3vw,42px)] sm:px-7"
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = activeSection === id;

          return (
            <button
              className={`relative whitespace-nowrap border-0 bg-transparent px-1.5 pb-3.5 pt-4 text-[clamp(0.7rem,1.35vw,0.82rem)] font-extrabold leading-none text-[#1f2a44] transition duration-200 after:absolute after:bottom-[7px] after:left-1/2 after:h-[3px] after:w-[22px] after:-translate-x-1/2 after:scale-x-[0.55] after:rounded-full after:bg-gradient-to-r after:from-[#ff36f2] after:to-[#a85cff] after:opacity-0 after:transition hover:-translate-y-px hover:text-[#7031aa] ${
                isActive
                  ? "text-[#7031aa] after:scale-x-100 after:opacity-100"
                  : ""
              }`}
              type="button"
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
