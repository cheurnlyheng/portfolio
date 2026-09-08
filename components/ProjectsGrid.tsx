"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export type ProjectItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  githubUrl: string;
  liveUrl: string | null;
  coverImage: string | null;
};

const INITIAL_COUNT = 4;

export function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const visibleProjects = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hiddenCount = projects.length - INITIAL_COUNT;

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <motion.article
            className="group flex flex-col overflow-hidden border border-[#221d17]/12 bg-[#fffdf8]"
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
            {project.coverImage ? (
              <Link
                className="block aspect-[16/10] w-full overflow-hidden border-b border-[#221d17]/12 bg-[#221d17]/[0.04]"
                href={`/projects/${project.slug}`}
              >
                <img
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                  src={project.coverImage}
                  alt=""
                />
              </Link>
            ) : null}

            <div className="flex flex-1 flex-col p-7">
              <p className="mb-2 text-[0.75rem] font-extrabold uppercase tracking-[0.1em] text-[#221d17]/40">
                {new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(
                  new Date(project.date),
                )}
              </p>
              <h3 className="mb-3 font-serif text-[1.3rem] font-semibold leading-[1.15]">
                <Link
                  className="text-[#221d17] transition hover:text-[#b3502b]"
                  href={`/projects/${project.slug}`}
                >
                  {project.title}
                </Link>
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
            </div>
          </motion.article>
        ))}
      </div>

      {hiddenCount > 0 ? (
        <div className="mt-10 flex justify-center">
          <button
            className="inline-flex items-center gap-2 rounded-full border border-[#221d17]/20 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.06em] text-[#221d17] transition hover:border-[#221d17]/40 hover:bg-[#221d17]/[0.03]"
            type="button"
            onClick={() => {
              if (expanded) {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
              setExpanded((current) => !current);
            }}
          >
            {expanded ? "Show less" : `Show ${hiddenCount} more`}
            <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
