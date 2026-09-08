"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const roles = ["Full-Stack Developer", "UI/UX Designer", "Problem Solver", "Lifelong Learner"];

const textVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: smoothEase },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase, delay: 0.12 },
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
          className="inline-block whitespace-nowrap font-serif italic text-[#b3502b]"
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
    <section
      className="relative scroll-mt-28 overflow-hidden pb-20 pt-[142px] sm:scroll-mt-20 lg:min-h-[780px] lg:pt-[168px]"
      id="home"
    >
      <div className="mx-auto grid w-full max-w-[1240px] items-start gap-[clamp(48px,6vw,70px)] px-5 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:px-[54px]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p
            className="mb-6 flex items-center gap-3 text-[0.8rem] font-extrabold uppercase tracking-[0.18em] text-[#221d17]/45"
            variants={textVariants}
          >
            <span className="h-px w-9 bg-[#b3502b]" aria-hidden="true" />
            Portfolio — Phnom Penh, Cambodia
          </motion.p>

          <motion.h1
            className="max-w-[820px] font-serif text-[clamp(2.6rem,9vw,3.4rem)] font-semibold leading-[1.05] text-[#221d17] lg:text-[clamp(3.1rem,4.6vw,4.6rem)]"
            variants={textVariants}
          >
            Cheurn Lyheng
          </motion.h1>

          <motion.p
            className="mt-5 text-[clamp(1.15rem,3vw,1.4rem)] font-semibold leading-[1.4] text-[#221d17]/70"
            variants={textVariants}
          >
            <RoleRotator />
          </motion.p>

          <motion.p
            className="mt-6 max-w-[480px] text-[clamp(0.95rem,1.6vw,1.05rem)] font-semibold leading-[1.65] text-[#221d17]/55"
            variants={textVariants}
          >
            I design and build clean, functional digital experiences — starting from
            Figma wireframes and ending in production-ready code.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap items-center gap-6" variants={textVariants}>
            <motion.button
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#221d17] px-7 py-3 text-[0.9rem] font-extrabold text-[#f6f1e6] transition duration-300 hover:-translate-y-0.5 hover:bg-[#b3502b] active:translate-y-0"
              type="button"
              onClick={() => scrollTo("#contact")}
            >
              Contact me
            </motion.button>
            <button
              className="inline-flex items-center gap-2 text-[0.9rem] font-extrabold text-[#221d17] underline decoration-[#b3502b]/40 decoration-2 underline-offset-4 transition hover:decoration-[#b3502b]"
              type="button"
              onClick={() => scrollTo("#about")}
            >
              About me <span aria-hidden="true">↓</span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[320px] justify-self-center lg:max-w-[360px] lg:justify-self-end"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <div className="absolute -inset-3 -z-[1] rounded-[2px] border border-[#221d17]/15 sm:-inset-4" />
          <div className="relative overflow-hidden rounded-[2px] bg-[#ece5d4]">
            <Image
              className="h-auto w-full grayscale-[8%]"
              src="/images/me.png"
              alt="Cheurn Lyheng"
              width={760}
              height={760}
              priority
            />
          </div>
          <p className="mt-3 flex items-center justify-between text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-[#221d17]/40">
            <span>Fig. 01</span>
            <span>RUPP · UI/UX + Code</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
