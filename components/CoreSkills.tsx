"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { coreSkills, techStackLogos } from "@/data/skills";
import { Icon } from "@/components/icons/Icon";

export function CoreSkills() {
  return (
    <section className="scroll-mt-20 bg-[#eef3f8]" id="skills">
      <div className="mx-auto w-full max-w-[1280px] px-[22px] pb-11 pt-[58px] lg:px-[54px]">
        <motion.h2
          className="mb-[30px] flex items-center gap-3 text-[clamp(1.45rem,2.1vw,2rem)] font-extrabold leading-[1.1] text-[#1f2a44] before:inline-block before:h-8 before:w-[5px] before:rounded-full before:bg-gradient-to-b before:from-[#ff36f2] before:to-[#b05cff] before:content-['']"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          Skills - Cores
        </motion.h2>

        <div
          className="mx-[-4px] grid auto-cols-[minmax(232px,78vw)] grid-flow-col gap-5 overflow-x-auto overscroll-x-contain px-1 pb-[22px] pt-2 [scrollbar-color:rgba(112,49,170,0.4)_transparent] [scrollbar-width:thin] sm:auto-cols-[minmax(250px,286px)]"
          aria-label="Core skill cards"
        >
          {coreSkills.map((skill, index) => (
            <motion.article
              className="min-h-[250px] overflow-hidden rounded-lg bg-[#f1baf7] shadow-[8px_10px_0_rgba(31,42,68,0.18)] transition duration-200 hover:-translate-y-1 hover:shadow-[10px_12px_0_rgba(31,42,68,0.16)]"
              key={skill.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex min-h-[62px] items-center gap-2.5 px-4">
                <Icon name={skill.icon} className="h-6 w-6 shrink-0 text-[#1f2a44]" />
                <h3 className="m-0 text-[clamp(1.08rem,1.5vw,1.32rem)] font-extrabold leading-[1.1] text-[#1f2a44]">
                  {skill.title}
                </h3>
              </div>
              <ul className="mx-3.5 mb-3.5 min-h-[160px] list-none rounded-lg bg-[#f9fbff] px-4 py-4">
                {skill.items.map((item) => (
                  <li
                    className="text-[clamp(0.88rem,1.1vw,0.98rem)] font-semibold leading-[1.42] text-[#2c364d]"
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
          className="group relative mt-5 overflow-hidden py-[18px] before:absolute before:inset-y-0 before:left-0 before:z-[1] before:w-[52px] before:bg-gradient-to-r before:from-[#eef3f8] before:to-transparent before:content-[''] after:absolute after:inset-y-0 after:right-0 after:z-[1] after:w-[52px] after:bg-gradient-to-l after:from-[#eef3f8] after:to-transparent after:content-[''] sm:before:w-[110px] sm:after:w-[110px]"
          aria-label="Technology stack logos"
        >
          <div className="flex w-max animate-[logo-marquee_36s_linear_infinite] gap-3.5 group-hover:[animation-play-state:paused]">
            {[...techStackLogos, ...techStackLogos].map((logo, index) => (
              <div
                className="flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-[#1f2a44]/10 bg-white/75 py-1.5 pl-1.5 pr-3 text-sm font-bold text-[#1f2a44] shadow-[0_6px_18px_rgba(31,42,68,0.08)]"
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
      className="inline-flex h-[30px] w-[30px] min-w-[30px] items-center justify-center rounded-full bg-gradient-to-br from-[#f3b4ff] to-[#8ebeff] text-[0.72rem] font-extrabold"
      aria-hidden="true"
    >
      {failed ? (
        initials
      ) : (
        <img
          className="h-[18px] w-[18px] object-contain"
          src={src}
          alt=""
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
