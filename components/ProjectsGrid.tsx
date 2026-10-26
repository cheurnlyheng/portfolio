"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type ProjectItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  githubUrl: string;
  liveUrl: string | null;
  coverImage: string | null;
  coverPosition: string;
  mobileCoverImage: string | null;
};

const INITIAL_COUNT = 2;

export function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const visibleProjects = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hiddenCount = projects.length - INITIAL_COUNT;

  if (projects.length === 0) return null;

  return (
    <div className="space-y-14 sm:space-y-20">
      {visibleProjects.map((project) => (
        <ProjectFeature key={project.id} project={project} />
      ))}

      {hiddenCount > 0 ? (
        <div className="flex justify-center pt-2">
          <button
            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#10100F] shadow-sm hover:border-black/30 hover:shadow-md transition-all active:scale-95"
            type="button"
            onClick={() => {
              if (expanded) {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
              setExpanded((current) => !current);
            }}
          >
            <span>{expanded ? "Show Less Works" : `View ${hiddenCount} More Projects`}</span>
            <span aria-hidden="true" className="font-mono text-sm">{expanded ? "↑" : "↓"}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* Framed screenshot card — the full image is always visible, never cropped */
function ProjectFeature({ project }: { project: ProjectItem }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(project.date));
  const href = `/projects/${project.slug}`;

  return (
    <div className="group relative">
      <Link
        href={href}
        className="absolute inset-0 z-0 rounded-2xl"
        aria-label={`View ${project.title} project details`}
      />

      {/* Text block — click-through to the stretched link above, except the action buttons */}
      <div className="relative z-10 max-w-3xl space-y-4 pointer-events-none">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 border border-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#10100F]/70">
            {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 border border-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#10100F]/70">
            {project.liveUrl ? "PRODUCTION DEPLOYMENT" : "SOURCE AVAILABLE"}
          </span>
        </div>

        <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] text-[#10100F] transition-colors group-hover:text-[#10100F]/70">
          {project.title}
        </h3>

        {project.description ? (
          <p className="max-w-2xl text-sm sm:text-base font-medium leading-relaxed text-[#10100F]/60">
            {project.description}
          </p>
        ) : null}

        <div className="pointer-events-auto flex flex-wrap items-center gap-3 pt-1">
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
        <div className="relative z-10 pointer-events-none mt-8 overflow-hidden rounded-2xl border border-black/10 bg-[#f4f1ea] shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-black/5 bg-white/70 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          </div>
          <div className="flex items-center justify-center bg-[#eceae3] p-4 sm:p-10">
            <picture>
              {project.mobileCoverImage ? (
                <source media="(max-width: 639px)" srcSet={project.mobileCoverImage} />
              ) : null}
              <img
                className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-md transition duration-500 ease-out group-hover:scale-[1.01]"
                style={{ objectPosition: project.coverPosition }}
                src={project.coverImage}
                alt={project.title}
              />
            </picture>
          </div>
        </div>
      ) : null}
    </div>
  );
}
