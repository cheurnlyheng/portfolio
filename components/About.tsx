"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    step: "01",
    label: "Education & Foundation",
    body: "Currently a student at RUPP with a focus on web application development. While specializing in UI/UX design, I have built a deep foundational understanding of modern frontend frameworks, backend architecture, and relational databases. Learning velocity is my greatest strength.",
  },
  {
    step: "02",
    label: "Design Engineering Philosophy",
    body: "An effective UI/UX designer must understand how interfaces are actually built in code and connected to backend systems. This cross-disciplinary empathy enables me to craft interfaces that are visually immaculate and delightfully intuitive, while remaining practical, performant, and realistic to build.",
  },
  {
    step: "03",
    label: "Vision & Objectives",
    body: "My mission is to architect complete digital experiences with frictionless user flows, purposeful hierarchy, and unwavering usability. Beyond aesthetic interfaces, I focus on helping ventures expand their digital footprint and achieve tangible business outcomes through thoughtful design systems.",
  },
  {
    step: "04",
    label: "AI-Augmented Engineering",
    body: "I work comfortably with AI tools and vibe coding to move fast, but speed never substitutes for judgment. Every AI-generated suggestion is reviewed against security best practices, existing code conventions, and design consistency before it ships — AI accelerates my workflow without compromising the quality or integrity of what I build.",
  },
];

const stats = [
  { value: "RUPP", label: "University Studies", sub: "IT Engineering" },
  { value: "5+", label: "Tech Stacks in Daily Use", sub: "React, Next.js, Spring Boot" },
  { value: "UI/UX", label: "Design-Driven Engineering", sub: "Figma to Production Code" },
];

export function About() {
  return (
    <section
      className="relative scroll-mt-28 border-t border-black/5 py-20 sm:scroll-mt-20 lg:py-28"
      id="about"
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
            ABOUT ME
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#10100F] leading-tight">
            How I Think &amp; Build
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#10100F]/60 max-w-xl font-medium">
            Bridging clean UI/UX design with full-stack engineering and software testing.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16 items-start">
          {/* Left Stats Cards */}
          <motion.div
            className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-xs hover:shadow-sm hover:border-black/10 transition-[box-shadow,border-color]"
              >
                <p className="m-0 text-3xl sm:text-4xl font-black tracking-tight text-[#10100F]">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#10100F]/80">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-[#10100F]/50 font-medium">
                  {stat.sub}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Right Timeline Cards */}
          <div className="grid gap-5">
            {timeline.map((item, index) => (
              <motion.div
                key={item.label}
                className="rounded-2xl border border-black/5 bg-white/70 hover:bg-white p-6 sm:p-8 shadow-xs hover:shadow-sm hover:border-black/10 transition-[background-color,box-shadow,border-color]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#10100F] text-white text-[11px] font-black">
                    {item.step}
                  </span>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#10100F]">
                    {item.label}
                  </h3>
                </div>
                <p className="m-0 text-sm sm:text-base font-medium leading-relaxed text-[#10100F]/75">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
