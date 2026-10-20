"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { softSkills } from "@/data/softSkills";
import { Icon } from "@/components/icons/Icon";

export function SoftSkills() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative border-t border-black/5 py-20 lg:py-28" id="approach">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-[54px]">
        {/* Section Header */}
        <motion.div
          className="mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-black/5 border border-black/5 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#10100F]/70">
            SOFT SKILLS
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#10100F] leading-tight">
            EXTRA CAPABILLITIES
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#10100F]/60 max-w-xl font-medium">
            Digital Marketing, Communication etc...
          </p>
        </motion.div>

        {/* Accordion Container */}
        <motion.div
          className="border-t border-black/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {softSkills.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div className="border-b border-black/10" key={item.title}>
                <button
                  className="flex w-full items-center gap-4 py-4 sm:py-5 text-left transition-all duration-200"
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? "bg-[#10100F] text-white shadow-xs"
                        : "bg-black/5 text-[#10100F]/60 hover:bg-black/10"
                    }`}
                  >
                    <Icon name={item.icon} className="h-3.5 w-3.5" />
                  </span>

                  <span
                    className={`flex-1 text-sm sm:text-base font-bold tracking-tight transition-colors duration-200 ${
                      isOpen ? "text-[#10100F]" : "text-[#10100F]/70"
                    }`}
                  >
                    {item.title}
                  </span>

                  <motion.span
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/5 text-[#10100F]/60"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="m-0 max-w-2xl pb-4 sm:pb-5 pl-11 sm:pl-13 pr-2 sm:pr-4 text-xs sm:text-sm font-medium leading-relaxed text-[#10100F]/70">
                        {item.body}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
