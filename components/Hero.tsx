"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const roles = ["Full-Stack Developer", "UI/UX Designer", "Problem Solver", "Digital Marketing", "QA & WebApp Tester"];

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          className="inline-block whitespace-nowrap italic text-[#2f5d4b]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.45, ease: smoothEase }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative scroll-mt-28 overflow-hidden pb-16 pt-[128px] sm:scroll-mt-20 sm:pt-[150px]" id="home">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-[54px]">
        <motion.div
          className="mb-5 flex items-center justify-between gap-3"
          initial="hidden"
          animate="visible"
          variants={lineVariants}
        >
          <p className="flex items-center gap-3 text-[0.8rem] font-extrabold uppercase tracking-[0.18em] text-[#17161a]/40">
            <span className="h-px w-9 bg-[#2f5d4b]" aria-hidden="true" />
            Portfolio — Phnom Penh, Cambodia
          </p>
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-[#faf9f6] shadow-[0_6px_16px_rgba(23,22,26,0.16)] sm:hidden">
            <Image
              className="h-full w-full object-cover"
              src="/images/profile-portrait.png"
              alt="Cheurn Lyheng"
              width={88}
              height={88}
            />
          </div>
        </motion.div>

        <div className="relative">
          <motion.h1
            className="text-[clamp(3.4rem,13vw,9.5rem)] font-extrabold leading-[0.86] tracking-[-0.02em] text-[#17161a]"
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            transition={{ delay: 0.05 }}
          >
            Cheurn
          </motion.h1>
          <motion.h1
            className="text-[clamp(3.4rem,13vw,9.5rem)] font-extrabold leading-[0.86] tracking-[-0.02em] text-[#17161a]"
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            transition={{ delay: 0.14 }}
          >
            Lyheng<span className="text-[#2f5d4b]">.</span>
          </motion.h1>

          <motion.div
            className="pointer-events-none absolute bottom-[6%] right-0 hidden h-[6.5rem] w-[6.5rem] overflow-hidden rounded-full border-2 border-[#faf9f6] shadow-[0_8px_24px_rgba(23,22,26,0.18)] sm:block sm:h-[8rem] sm:w-[8rem] lg:h-[9.5rem] lg:w-[9.5rem]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: smoothEase, delay: 0.3 }}
          >
            <Image
              className="h-full w-full object-cover"
              src="/images/profile-portrait.png"
              alt="Cheurn Lyheng"
              width={320}
              height={320}
              priority
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-8 flex flex-col gap-8 border-t border-[#17161a]/10 pt-8 sm:mt-10 sm:flex-row sm:items-end sm:justify-between sm:pt-9"
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          transition={{ delay: 0.24 }}
        >
          <div className="max-w-[480px]">
            <p className="text-[clamp(1.1rem,2.6vw,1.35rem)] font-semibold leading-[1.4] text-[#17161a]/70">
              <RoleRotator />
            </p>
            <p className="mt-4 text-[clamp(0.95rem,1.6vw,1.05rem)] font-semibold leading-[1.65] text-[#17161a]/55">
              I design and build clean, functional digital experiences — starting from
              Figma wireframes and ending in production-ready code and testing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#17161a] px-7 py-3 text-[0.9rem] font-extrabold text-[#faf9f6] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2f5d4b] active:translate-y-0"
              type="button"
              onClick={() => scrollTo("#contact")}
            >
              Contact me
            </button>
            <button
              className="inline-flex items-center gap-2 text-[0.9rem] font-extrabold text-[#17161a] underline decoration-[#2f5d4b]/40 decoration-2 underline-offset-4 transition hover:decoration-[#2f5d4b]"
              type="button"
              onClick={() => scrollTo("#about")}
            >
              About me <span aria-hidden="true">↓</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
