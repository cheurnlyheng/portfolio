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
    <section className="relative scroll-mt-28 border-t border-[#17161a]/10 py-20 sm:scroll-mt-20 lg:py-28" id="about">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-[54px]">
        <motion.div
          className="mb-14 flex items-end gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[clamp(2.6rem,6vw,4.2rem)] font-black leading-none text-[#17161a]/10">02</span>
          <div>
            <p className="mb-2 text-[0.8rem] font-extrabold uppercase tracking-[0.18em] text-[#2f5d4b]">About</p>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold leading-[1.05] text-[#17161a]">
              A quick look at how I think
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-20">
          <motion.div
            className="flex flex-row flex-wrap gap-10 self-start sm:gap-12 lg:flex-col lg:gap-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="m-0 text-[2rem] font-extrabold leading-none text-[#17161a]">{stat.value}</p>
                <p className="mt-2.5 text-[0.82rem] font-bold leading-snug text-[#17161a]/45">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <div className="grid gap-12">
            {timeline.map((item, index) => (
              <motion.div
                className="flex gap-5 sm:gap-8"
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="shrink-0 text-[1.1rem] font-bold leading-[1.7] text-[#17161a]/25">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="m-0 mb-2.5 text-[0.78rem] font-extrabold uppercase tracking-[0.14em] text-[#2f5d4b]">
                    {item.label}
                  </h3>
                  <p className="m-0 max-w-[620px] text-[clamp(0.96rem,1.1vw,1.05rem)] font-semibold leading-[1.6] text-[#17161a]/65">
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
