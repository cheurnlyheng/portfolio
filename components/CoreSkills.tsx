"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { coreSkills, techStackLogos } from "@/data/skills";
import { Icon } from "@/components/icons/Icon";

export function CoreSkills() {
  return (
    <section className="relative scroll-mt-28 border-t border-[#221d17]/10 py-20 sm:scroll-mt-20 lg:py-24" id="skills">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-[54px]">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 text-[0.8rem] font-extrabold uppercase tracking-[0.18em] text-[#b3502b]">
            02 — Skills
          </p>
          <h2 className="font-serif text-[clamp(1.9rem,3.4vw,2.7rem)] font-semibold leading-[1.1] text-[#221d17]">
            What I bring to a project
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 divide-y divide-[#221d17]/12 border-y border-[#221d17]/12 sm:grid-cols-2 sm:divide-x lg:grid-cols-5 lg:divide-y-0">
          {coreSkills.map((skill, index) => (
            <motion.article
              className="px-1 py-8 sm:px-7 sm:first:pl-0 sm:last:border-r-0"
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#221d17]/20 text-[#221d17]">
                <Icon name={skill.icon} className="h-[18px] w-[18px]" />
              </span>
              <h3 className="m-0 mb-3 font-serif text-[1.15rem] font-semibold leading-[1.15] text-[#221d17]">
                {skill.title}
              </h3>
              <ul className="m-0 list-none p-0">
                {skill.items.map((item) => (
                  <li
                    className="border-t border-[#221d17]/8 py-1.5 text-[0.86rem] font-semibold leading-[1.4] text-[#221d17]/55 first:border-t-0"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div
          className="group relative mt-3 overflow-hidden border-b border-[#221d17]/12 py-5 before:absolute before:inset-y-0 before:left-0 before:z-[1] before:w-[52px] before:bg-[linear-gradient(90deg,#f6f1e6,transparent)] before:content-[''] after:absolute after:inset-y-0 after:right-0 after:z-[1] after:w-[52px] after:bg-[linear-gradient(270deg,#f6f1e6,transparent)] after:content-[''] sm:before:w-[110px] sm:after:w-[110px]"
          aria-label="Technology stack logos"
        >
          <div className="flex w-max animate-[logo-marquee_38s_linear_infinite] items-center gap-8 group-hover:[animation-play-state:paused]">
            {[...techStackLogos, ...techStackLogos].map((logo, index) => (
              <div
                className="flex shrink-0 items-center gap-2 text-sm font-bold text-[#221d17]/55"
                key={`${logo.label}-${index}`}
              >
                <TechLogo label={logo.label} src={logo.icon} />
                <span>{logo.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechLogo({ label, src }: { label: string; src: string }) {
  const [failed, setFailed] = useState(false);
  const initials = label
    .split(/[\s.-]+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <span
      className="inline-flex h-6 w-6 min-w-6 items-center justify-center rounded-full border border-[#221d17]/15 bg-[#fffdf8] text-[0.62rem] font-extrabold text-[#221d17]/70"
      aria-hidden="true"
    >
      {failed ? (
        initials
      ) : (
        <img
          className="h-[14px] w-[14px] object-contain grayscale"
          src={src}
          alt=""
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
