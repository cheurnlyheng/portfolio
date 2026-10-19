"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { coreSkills, techStackLogos } from "@/data/skills";
import { Icon } from "@/components/icons/Icon";

export function CoreSkills() {
  return (
    <section className="relative scroll-mt-28 border-t border-[#17161a]/10 py-20 sm:scroll-mt-20 lg:py-24" id="skills">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-[54px]">
        <motion.div
          className="mb-14 flex items-end gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[clamp(2.6rem,6vw,4.2rem)] font-black leading-none text-[#17161a]/10">03</span>
          <div>
            <p className="mb-2 text-[0.8rem] font-extrabold uppercase tracking-[0.18em] text-[#2f5d4b]">Skills</p>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold leading-[1.05] text-[#17161a]">
              What I bring to a project
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {coreSkills.map((skill, index) => (
            <motion.article
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
              <div className="mb-4 flex items-center gap-2.5 text-[#2f5d4b]">
                <Icon name={skill.icon} className="h-[18px] w-[18px]" />
                <h3 className="m-0 text-[1.02rem] font-extrabold leading-[1.15] text-[#17161a]">{skill.title}</h3>
              </div>
              <ul className="m-0 list-none p-0">
                {skill.items.map((item) => (
                  <li
                    className="py-1 text-[0.86rem] font-semibold leading-[1.5] text-[#17161a]/55"
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
          className="group relative mt-16 overflow-hidden py-5 before:absolute before:inset-y-0 before:left-0 before:z-[1] before:w-[52px] before:bg-[linear-gradient(90deg,#faf9f6,transparent)] before:content-[''] after:absolute after:inset-y-0 after:right-0 after:z-[1] after:w-[52px] after:bg-[linear-gradient(270deg,#faf9f6,transparent)] after:content-[''] sm:before:w-[110px] sm:after:w-[110px]"
          aria-label="Technology stack logos"
        >
          <div className="flex w-max animate-[logo-marquee_38s_linear_infinite] items-center gap-8 group-hover:[animation-play-state:paused]">
            {[...techStackLogos, ...techStackLogos].map((logo, index) => (
              <div
                className="flex shrink-0 items-center gap-2 text-sm font-bold text-[#17161a]/55"
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
      className="inline-flex h-6 w-6 min-w-6 items-center justify-center rounded-full border border-[#17161a]/15 bg-[#ffffff] text-[0.62rem] font-extrabold text-[#17161a]/70"
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
