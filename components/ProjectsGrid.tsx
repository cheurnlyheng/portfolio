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

const INITIAL_COUNT = 5;

export function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const visibleProjects = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hiddenCount = projects.length - INITIAL_COUNT;

  return (
    <div>
      <div className="border-t border-[#17161a]/12">
        {visibleProjects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
      </div>

      {hiddenCount > 0 ? (
        <div className="mt-10 flex justify-center">
          <button
            className="inline-flex items-center gap-2 rounded-full border border-[#17161a]/20 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.06em] text-[#17161a] transition hover:border-[#17161a]/40 hover:bg-[#17161a]/[0.03]"
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

function ProjectRow({ project, index }: { project: ProjectItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        className="group relative flex flex-col gap-4 border-b border-[#17161a]/12 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-8"
        href={`/projects/${project.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {project.coverImage ? (
          <img
            className="h-14 w-14 shrink-0 rounded-sm object-cover sm:hidden"
            src={project.coverImage}
            alt=""
          />
        ) : null}

        <div className="flex min-w-0 flex-1 items-baseline gap-4 sm:gap-6">
          <span className="hidden shrink-0 text-[0.82rem] font-bold text-[#17161a]/30 sm:inline">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="min-w-0 truncate text-[clamp(1.4rem,3.4vw,2.1rem)] font-extrabold leading-[1.1] text-[#17161a] transition-colors duration-200 group-hover:text-[#2f5d4b]">
            {project.title}
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-5 pl-[1px] text-[0.8rem] font-bold uppercase tracking-[0.06em] text-[#17161a]/45 sm:gap-6">
          <span className="hidden sm:inline">
            {new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date(project.date))}
          </span>
          <span className={project.liveUrl ? "text-[#2f5d4b]" : "text-[#17161a]/30"}>
            {project.liveUrl ? "Live" : "Code only"}
          </span>
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#17161a]/20 text-[#17161a] transition group-hover:border-[#2f5d4b] group-hover:bg-[#2f5d4b] group-hover:text-[#faf9f6]"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>

        {project.coverImage ? (
          <motion.div
            className="pointer-events-none absolute right-[8%] top-1/2 z-10 hidden w-[260px] -translate-y-1/2 overflow-hidden rounded-sm border border-[#17161a]/12 bg-[#ffffff] shadow-[0_18px_40px_rgba(23,22,26,0.16)] lg:block"
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1 : 0.94,
              y: hovered ? "-50%" : "-46%",
            }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <img className="aspect-[4/3] w-full object-cover" src={project.coverImage} alt="" />
          </motion.div>
        ) : null}
      </Link>
    </motion.div>
  );
}
