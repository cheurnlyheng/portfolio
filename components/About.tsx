"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    label: "Education",
    body: "I am currently a student at RUPP with a strong interest in technology, particularly web application development. Although I specialize in UI/UX design, I have also developed a broader understanding of both frontend and backend development. What I am good at is the ability to learn.",
  },
  {
    label: "Philosophy",
    body: "I believe an effective UI/UX designer should understand how a design is implemented by frontend developers and how the overall experience connects with backend systems. This lets me create designs that are visually clean and user-friendly, but also practical, functional, and realistic to build.",
  },
  {
    label: "Goal",
    body: "My goal is to design complete website experiences with smooth user flows, clear structure, and strong usability. I don't only focus on attractive interfaces — I aim to help businesses improve their digital presence and achieve their goals through thoughtful design.",
  },
];

const stats = [
  { value: "RUPP", label: "Currently studying at" },
  { value: "5+", label: "Tech stacks in daily use" },
  { value: "UI/UX", label: "First, code second" },
];

export function About() {
  return (
    <section className="relative scroll-mt-28 border-t border-[#221d17]/10 py-20 sm:scroll-mt-20 lg:py-28" id="about">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-[54px]">
        <motion.div
          className="mb-16 flex items-end justify-between gap-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="mb-3 text-[0.8rem] font-extrabold uppercase tracking-[0.18em] text-[#b3502b]">
              01 — About
            </p>
            <h2 className="font-serif text-[clamp(1.9rem,3.4vw,2.7rem)] font-semibold leading-[1.1] text-[#221d17]">
              A quick look at how I think
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-16">
          <div className="grid content-start gap-px self-start overflow-hidden rounded-[2px] border border-[#221d17]/12 bg-[#221d17]/12 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-[#fffdf8] px-6 py-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="m-0 font-serif text-[1.7rem] font-semibold leading-none text-[#221d17]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[0.8rem] font-bold leading-snug text-[#221d17]/50">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="relative grid gap-0 divide-y divide-[#221d17]/12 border-y border-[#221d17]/12">
            {timeline.map((item, index) => (
              <motion.div
                className="group grid grid-cols-[54px_1fr] gap-4 py-8 sm:grid-cols-[84px_1fr] sm:gap-8"
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-serif text-[2.2rem] font-semibold leading-none text-[#221d17]/15 transition-colors duration-300 group-hover:text-[#b3502b]/30 sm:text-[2.8rem]">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="m-0 mb-2.5 text-[0.78rem] font-extrabold uppercase tracking-[0.14em] text-[#b3502b]">
                    {item.label}
                  </h3>
                  <p className="m-0 max-w-[620px] text-[clamp(0.96rem,1.1vw,1.05rem)] font-semibold leading-[1.6] text-[#221d17]/65">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
