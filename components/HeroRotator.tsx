"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;
const MotionImage = motion(Image);

export type HeroSlideData = {
  image: string;
  tagline: string;
  description: string;
};

export function HeroRotator({ slides }: { slides: HeroSlideData[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[index] ?? slides[0];

  return (
    <section
      className="relative h-[160vh] w-full scroll-mt-28 sm:h-[175vh] sm:scroll-mt-20"
      id="home"
    >
      {/* Tall background image spanning full height */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <AnimatePresence>
          <MotionImage
            key={slide.image}
            className="object-cover object-top grayscale contrast-[1.08]"
            style={{ willChange: "opacity" }}
            src={slide.image}
            alt="Cheurn Lyheng"
            fill
            priority
            sizes="100vw"
            quality={85}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: smoothEase }}
          />
        </AnimatePresence>

        {/* Cinematic gradient overlays matching Graphites */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/10 pointer-events-none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/5 pointer-events-none" aria-hidden="true" />
      </div>

      {/* Sticky text overlay that follows the screen until the tall image ends */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-end p-5 pb-10 sm:p-12 md:p-16 lg:p-20 z-10 pointer-events-none">
        <div className="max-w-4xl space-y-3.5 sm:space-y-4 pointer-events-auto">
          <motion.h1
            className="text-white/95 font-black text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight leading-[0.92] select-none drop-shadow-md"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: smoothEase }}
          >
            Cheurn Lyheng
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.tagline}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: smoothEase }}
              className="space-y-2"
            >
              <p className="text-white/85 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight drop-shadow-sm">
                {slide.tagline}
              </p>
              <p className="text-white/75 text-sm sm:text-base md:text-lg max-w-2xl font-medium leading-relaxed drop-shadow-xs">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="pt-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-md px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#10100F] shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <span>Explore Work</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
