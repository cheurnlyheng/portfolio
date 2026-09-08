"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { navItems } from "@/data/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState(isHome ? "home" : "");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

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
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (!isHome) {
      router.push(`/${href}`);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(href.replace("#", ""));
    }
  };

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-[#221d17]/12 bg-[#f6f1e6]/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-[54px]">
        <a
          href={isHome ? "#home" : "/#home"}
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("#home");
          }}
          className="font-serif text-[1.15rem] font-semibold italic text-[#221d17]"
        >
          Lyheng<span className="text-[#b3502b]">.</span>
        </a>

        <nav
          className="hidden items-center gap-8 sm:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;

            return (
              <button
                className={`relative border-0 bg-transparent py-2 text-[0.82rem] font-extrabold uppercase tracking-[0.08em] transition-colors duration-200 ${
                  isActive ? "text-[#221d17]" : "text-[#221d17]/45 hover:text-[#221d17]/80"
                }`}
                type="button"
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#b3502b]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => handleNavClick("#contact")}
          className="inline-flex items-center gap-1.5 text-[0.82rem] font-extrabold uppercase tracking-[0.08em] text-[#221d17] transition hover:text-[#b3502b]"
        >
          Say hello
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <nav
        className="flex items-center gap-5 overflow-x-auto border-t border-[#221d17]/10 px-5 py-2.5 sm:hidden"
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = activeSection === id;

          return (
            <button
              className={`whitespace-nowrap border-0 bg-transparent py-1 text-[0.76rem] font-extrabold uppercase tracking-[0.06em] transition-colors duration-200 ${
                isActive ? "text-[#b3502b]" : "text-[#221d17]/45"
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
    </motion.header>
  );
}
