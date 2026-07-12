"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { softSkills } from "@/data/softSkills";
import { Icon } from "@/components/icons/Icon";

export function SoftSkills() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#eef3f8]">
      <div className="mx-auto w-full max-w-[1120px] px-[22px] pb-[58px] pt-[22px] lg:px-[54px]">
        <motion.div
          className="mx-auto mb-7 text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-2.5 text-[clamp(1.45rem,2.2vw,2rem)] font-extrabold leading-none text-[#1f2a44]">
            Soft Skills
          </h2>
          <p className="m-0 text-[clamp(0.9rem,1.05vw,1rem)] font-semibold text-[#5b6376]">
            Strong communication, teamwork, creativity, and problem-solving skills.
          </p>
        </motion.div>

        <motion.div
          className="overflow-hidden rounded-lg bg-[#f1baf7] shadow-[8px_10px_0_rgba(31,42,68,0.18)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {softSkills.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                className="border-t border-[#7031aa]/15 first:border-t-0"
                key={item.title}
              >
                <button
                  className="flex min-h-14 w-full items-center justify-between border-0 bg-[#f1baf7]/70 px-4 text-left text-[#1f2a44] transition duration-150 hover:bg-[#fbd2ff]/90 hover:text-[#7031aa] active:scale-[0.995]"
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2.5 text-[clamp(0.92rem,1.12vw,1rem)] font-semibold">
                    <Icon name={item.icon} className="h-[21px] w-[21px] shrink-0" />
                    {item.title}
                  </span>
                  <motion.span
                    className="inline-flex h-6 w-6 items-center justify-center"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                      <path
                        d="m6 9 6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                      transition={{ duration: 0.26, ease: "easeOut" }}
                    >
                      <p className="mx-4 mb-4 rounded-md bg-[#f9fbff] px-4 py-3 text-[clamp(0.8rem,0.95vw,0.9rem)] font-semibold leading-[1.4] text-[#596174]">
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
