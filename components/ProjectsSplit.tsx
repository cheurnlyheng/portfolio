"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/components/ProjectsGrid";

export function ProjectsSplit({ projects }: { projects: ProjectItem[] }) {
  if (projects.length === 0) return null;

  const isSingle = projects.length === 1;

  return (
    <div className={`grid w-full grid-cols-1 ${isSingle ? "" : "sm:grid-cols-2"}`}>
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
      className="group relative h-[85vh] sm:h-screen w-full min-w-0 overflow-hidden bg-[#ebe8e1]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background Image with Graphites hover scale */}
      {project.coverImage ? (
        <img
          className="h-full w-full object-cover object-top grayscale contrast-[1.05] transition duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
          src={project.coverImage}
          alt={project.title}
        />
      ) : (
        <div className="h-full w-full bg-[#10100F]/10" />
      )}

      {/* Cinematic Gradient Overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/15 pointer-events-none"
        aria-hidden="true"
      />

      {/* Bottom Content Overlay matching Graphites SplitBanner */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14 z-10 space-y-3">
        {/* Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90">
            {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90">
            {project.liveUrl ? "LIVE APPLICATION" : "OPEN SOURCE"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-white drop-shadow-md">
          {project.title}
        </h3>

        {/* Description */}
        <p className="max-w-md text-sm sm:text-base font-medium leading-relaxed text-white/80 drop-shadow-sm">
          {project.description}
        </p>

        {/* Action Buttons matching Graphites pill style */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            className="inline-flex items-center gap-1.5 rounded-full bg-white/85 hover:bg-white backdrop-blur-md px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#10100F] shadow-sm hover:shadow-md transition-all active:scale-95"
            href={href}
          >
            <span>View More Detail</span>
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
          </Link>

          {project.liveUrl && (
            <a
              className="inline-flex items-center gap-1.5 rounded-full bg-white/20 hover:bg-white backdrop-blur-md px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#10100F] transition-all active:scale-95"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>Live Site</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
            </a>
          )}

          <a
            className="group/gh inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white backdrop-blur-md text-white hover:text-[#10100F] transition-all active:scale-95"
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} on GitHub`}
          >
            <img
              className="h-4 w-4 invert transition group-hover/gh:invert-0"
              src="/icons/tech/github.svg"
              alt=""
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
