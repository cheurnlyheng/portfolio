"use client";

import { motion } from "framer-motion";

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  githubUrl: string;
  liveUrl: string | null;
};

export function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {projects.map((project, index) => (
        <motion.article
          className="flex flex-col border border-[#221d17]/12 bg-[#fffdf8] p-7"
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{
            duration: 0.5,
            delay: (index % 2) * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="mb-2 text-[0.75rem] font-extrabold uppercase tracking-[0.1em] text-[#221d17]/40">
            {new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(
              new Date(project.date),
            )}
          </p>
          <h3 className="mb-3 font-serif text-[1.3rem] font-semibold leading-[1.15] text-[#221d17]">
            {project.title}
          </h3>
          <p className="mb-6 flex-1 text-[0.92rem] font-semibold leading-[1.6] text-[#221d17]/60">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-5 text-[0.82rem] font-extrabold uppercase tracking-[0.06em]">
            <a
              className="inline-flex items-center gap-1.5 text-[#221d17] transition hover:text-[#b3502b]"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <img className="h-4 w-4" src="/icons/tech/github.svg" alt="" aria-hidden="true" />
              GitHub
            </a>
            {project.liveUrl ? (
              <a
                className="inline-flex items-center gap-1.5 text-[#b3502b] transition hover:text-[#8f3f22]"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Live site <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="text-[#221d17]/35">Not deployed yet</span>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
