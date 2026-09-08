"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { softSkills } from "@/data/softSkills";
import { Icon } from "@/components/icons/Icon";

export function SoftSkills() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative border-t border-[#221d17]/10 py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-[54px]">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 text-[0.8rem] font-extrabold uppercase tracking-[0.18em] text-[#b3502b]">
            04 — Beyond code
          </p>
          <h2 className="font-serif text-[clamp(1.9rem,3.4vw,2.7rem)] font-semibold leading-[1.1] text-[#221d17]">
            Soft skills
          </h2>
        </motion.div>

        <motion.div
          className="border-y border-[#221d17]/12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {softSkills.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div className="border-t border-[#221d17]/12 first:border-t-0" key={item.title}>
                <button
                  className="flex w-full items-center gap-5 border-0 bg-transparent py-6 text-left transition duration-200 hover:pl-1"
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-[1.1rem] font-semibold text-[#221d17]/25">
                    0{index + 1}
                  </span>
                  <Icon
                    name={item.icon}
                    className={`h-5 w-5 shrink-0 transition-colors duration-300 ${
                      isOpen ? "text-[#b3502b]" : "text-[#221d17]/50"
                    }`}
                  />
                  <span
                    className={`flex-1 font-serif text-[clamp(1.05rem,1.8vw,1.3rem)] font-semibold transition-colors duration-200 ${
                      isOpen ? "text-[#221d17]" : "text-[#221d17]/70"
                    }`}
                  >
                    {item.title}
                  </span>
                  <motion.span
                    className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-[#221d17]/40"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
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
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    >
                      <p className="m-0 max-w-[680px] py-1 pb-6 pl-[68px] pr-4 text-[clamp(0.9rem,1vw,0.98rem)] font-semibold leading-[1.6] text-[#221d17]/55">
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
