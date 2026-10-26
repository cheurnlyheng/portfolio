"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/components/ProjectsGrid";

export function ProjectsSplit({ projects }: { projects: ProjectItem[] }) {
  if (projects.length === 0) return null;

  const isSingle = projects.length === 1;

  return (
    <div
      className={`mb-14 grid w-full grid-cols-1 gap-10 sm:mb-20 sm:gap-10 ${
        isSingle ? "" : "sm:grid-cols-2"
      }`}
    >
      {projects.map((project, index) => (
        <SplitCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}

function SplitCard({ project, index }: { project: ProjectItem; index: number }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(project.date));
  const href = `/projects/${project.slug}`;

  return (
    <motion.div
      className="group relative w-full min-w-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={href}
        className="absolute inset-0 z-0 rounded-2xl"
        aria-label={`View ${project.title} project details`}
      />

      <div className="relative z-10 pointer-events-none">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 border border-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#10100F]/70">
            {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 border border-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#10100F]/70">
            {project.liveUrl ? "LIVE APPLICATION" : "OPEN SOURCE"}
          </span>
        </div>

        <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-[0.95] text-[#10100F] transition-colors group-hover:text-[#10100F]/70">
          {project.title}
        </h3>

        {project.description ? (
          <p className="mt-2 max-w-md text-sm sm:text-base font-medium leading-relaxed text-[#10100F]/60">
            {project.description}
          </p>
        ) : null}

        <div className="pointer-events-auto mt-4 flex flex-wrap items-center gap-3">
          <Link
            className="inline-flex items-center gap-1.5 rounded-full bg-[#10100F] hover:bg-neutral-800 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:shadow-md transition-all active:scale-95"
            href={href}
          >
            <span>View More Detail</span>
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
          </Link>

          {project.liveUrl && (
            <a
              className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white hover:bg-black/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#10100F] transition-all active:scale-95"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>Live Site</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
            </a>
          )}

          <a
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white hover:bg-black/5 text-[#10100F] transition-all active:scale-95"
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} on GitHub`}
          >
            <img className="h-4 w-4" src="/icons/tech/github.svg" alt="" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Browser-framed screenshot, object-contain so nothing is ever cropped */}
      {project.coverImage ? (
        <div className="relative z-10 pointer-events-none mt-6 overflow-hidden rounded-2xl border border-black/10 bg-[#f4f1ea] shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-black/5 bg-white/70 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          </div>
          <div className="flex items-center justify-center bg-[#eceae3] p-4 sm:p-6">
            <picture>
              {project.mobileCoverImage ? (
                <source media="(max-width: 639px)" srcSet={project.mobileCoverImage} />
              ) : null}
              <img
                className="max-h-[45vh] w-auto max-w-full rounded-lg object-contain shadow-md transition duration-500 ease-out group-hover:scale-[1.01]"
                style={{ objectPosition: project.coverPosition }}
                src={project.coverImage}
                alt={project.title}
              />
            </picture>
          </div>
        </div>
      ) : (
        <div className="relative z-10 pointer-events-none mt-6 flex aspect-video items-center justify-center rounded-2xl border border-dashed border-black/15 bg-black/[0.02] text-xs font-bold uppercase tracking-wider text-[#10100F]/30">
          No Cover Image
        </div>
      )}
    </motion.div>
  );
}
