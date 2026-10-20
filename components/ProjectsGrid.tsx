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
};

const INITIAL_COUNT = 2;

export function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const visibleProjects = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hiddenCount = projects.length - INITIAL_COUNT;

  if (projects.length === 0) return null;

  return (
    <div>
      {visibleProjects.map((project) => (
        <ProjectFeature key={project.id} project={project} />
      ))}

      {hiddenCount > 0 ? (
        <div className="relative z-10 flex justify-center bg-[#fbfbfb] py-14">
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

/* Tall sticky banner matching Graphites HeroBanner structure */
function ProjectFeature({ project }: { project: ProjectItem }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(project.date));

  return (
    <section className="relative h-[160vh] w-full border-b border-black/10 sm:h-[175vh]">
      {/* Tall background image */}
      <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#10100F]/[0.05]">
        {project.coverImage ? (
          <img
            className="h-full w-full object-cover object-top grayscale contrast-[1.05]"
            src={project.coverImage}
            alt={project.title}
          />
        ) : null}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" aria-hidden="true" />
      </div>

      {/* Sticky text overlay that follows the screen until the tall image ends */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-end p-6 pb-14 sm:p-12 md:p-16 lg:p-20 z-10 pointer-events-none">
        <div className="max-w-4xl space-y-4 pointer-events-auto">
          {/* Category & Status Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90">
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90">
              {project.liveUrl ? "PRODUCTION DEPLOYMENT" : "SOURCE AVAILABLE"}
            </span>
          </div>

          {/* Title */}
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-white/95 font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.92] drop-shadow-md hover:text-white/80 transition-colors">
              {project.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="max-w-2xl text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-white/80 drop-shadow-sm">
            {project.description}
          </p>

          {/* Action Pills */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              className="inline-flex items-center gap-1.5 rounded-full bg-white/85 hover:bg-white backdrop-blur-md px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#10100F] shadow-sm hover:shadow-md transition-all active:scale-95"
              href={`/projects/${project.slug}`}
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
      </div>
    </section>
  );
}
