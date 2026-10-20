"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bug, Database, LayoutTemplate, Palette, Server, Wrench } from "lucide-react";
import { coreSkills } from "@/data/skills";
import type { CoreSkill } from "@/data/skills";
import { techStackLogos } from "@/data/skills";

const skillIcons: Record<CoreSkill["icon"], typeof Palette> = {
  design: Palette,
  frontend: LayoutTemplate,
  backend: Server,
  database: Database,
  tools: Wrench,
  "Software Testing": Bug,
};

export function CoreSkills() {
  return (
    <section
      className="relative scroll-mt-28 border-t border-black/5 py-20 sm:scroll-mt-20 lg:py-28"
      id="skills"
    >
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
            MAIN SKILLS
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#10100F] leading-tight">
            Core Stack &amp; Expertise
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#10100F]/60 max-w-xl font-medium">
            The technologies, frameworks, and architecture patterns I rely on daily.
          </p>
        </motion.div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreSkills.map((skill, index) => {
            const SkillIcon = skillIcons[skill.icon];

            return (
              <motion.article
                key={skill.title}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-xs hover:shadow-md hover:border-black/10 transition-[box-shadow,border-color] flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div>
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#10100F] text-white shadow-xs">
                    <SkillIcon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <h3 className="m-0 mb-3 text-xs font-black uppercase tracking-wider text-[#10100F]">
                    {skill.title}
                  </h3>
                  <ul className="m-0 list-none p-0 divide-y divide-black/5">
                    {skill.items.map((item) => (
                      <li
                        className="py-1.5 text-xs font-semibold leading-relaxed text-[#10100F]/70 first:pt-0 last:pb-0"
                        key={item}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Seamless Infinite Tech Stack Marquee */}
        <div
          className="group relative mt-16 sm:mt-20 overflow-hidden py-6 rounded-2xl border border-black/5 bg-white/50 backdrop-blur-xs before:absolute before:inset-y-0 before:left-0 before:z-[1] before:w-[60px] before:bg-gradient-to-r before:from-[#fbfbfb] before:to-transparent before:content-[''] after:absolute after:inset-y-0 after:right-0 after:z-[1] after:w-[60px] after:bg-gradient-to-l after:from-[#fbfbfb] after:to-transparent after:content-[''] sm:before:w-[120px] sm:after:w-[120px]"
          aria-label="Technology stack logos"
        >
          <div className="flex w-max animate-[logo-marquee_32s_linear_infinite] items-center gap-8 sm:gap-10 group-hover:[animation-play-state:paused]">
            {[...techStackLogos, ...techStackLogos, ...techStackLogos].map((logo, index) => (
              <div
                className="flex shrink-0 items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-black/5 shadow-xs text-xs font-bold uppercase tracking-wider text-[#10100F]/75 transition-all hover:border-black/20"
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
      className="inline-flex h-5 w-5 min-w-5 items-center justify-center rounded-full bg-[#10100F]/5 text-[0.6rem] font-black text-[#10100F]/80"
      aria-hidden="true"
    >
      {failed ? (
        initials
      ) : (
        <img
          className="h-3.5 w-3.5 object-contain grayscale"
          src={src}
          alt=""
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
