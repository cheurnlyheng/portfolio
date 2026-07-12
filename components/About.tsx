"use client";

import { motion } from "framer-motion";

const aboutBlocks = [
  "I am currently a student at RUPP with a strong interest in technology, particularly web application development. Although I specialize in UI/UX design, I have also developed a broader understanding of both frontend and backend development. What I am good at is the ability to learn.",
  "I believe that an effective UI/UX designer should understand how a design will be implemented by frontend developers and how the overall user experience connects with backend systems. This allows me to create designs that are not only visually clean and user-friendly, but also practical, functional, and realistic to build.",
  "My goal is to design complete website experiences with smooth user flows, clear structure, and strong usability. I do not only focus on creating attractive interfaces. I also aim to help businesses improve their digital presence, provide better experiences for their users, and achieve their goals through thoughtful design.",
];

export function About() {
  const paragraphPositions = [
    "lg:absolute lg:left-0 lg:top-0 lg:max-w-[600px]",
    "lg:absolute lg:right-0 lg:top-[176px] lg:max-w-[650px] lg:text-center",
    "lg:absolute lg:left-0 lg:top-[350px] lg:max-w-[600px]",
  ];

  return (
    <section className="min-h-[735px] scroll-mt-20 overflow-hidden bg-[#f7e5fb]" id="about">
      <div className="mx-auto w-full max-w-[1220px] px-[22px] py-[58px] lg:px-[54px] lg:pb-[86px] lg:pt-[74px]">
        <motion.h2
          className="mb-[34px] flex items-center gap-3 text-[clamp(1.45rem,2.1vw,2rem)] font-extrabold leading-[1.1] text-[#1f2a44] before:inline-block before:h-8 before:w-[5px] before:rounded-full before:bg-gradient-to-b before:from-[#ff36f2] before:to-[#b05cff] before:content-[''] lg:mb-[32px]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          About me
        </motion.h2>

        <div className="grid gap-7 lg:relative lg:min-h-[505px] lg:gap-0">
          {aboutBlocks.map((block, index) => (
            <motion.p
              className={`m-0 max-w-none text-[clamp(0.98rem,1.14vw,1.13rem)] font-bold leading-[1.34] text-[#303852] ${paragraphPositions[index]}`}
              key={block}
              initial={{ opacity: 0, x: index === 1 ? 44 : -44 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px 0px -120px 0px" }}
              transition={{
                duration: 0.58,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {block}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
