import { prisma } from "@/lib/prisma";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ProjectsSplit } from "@/components/ProjectsSplit";

export async function Projects() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>>;

  try {
    projects = await prisma.project.findMany({ orderBy: { date: "desc" } });
  } catch {
    // Database not configured/reachable yet — hide the section instead of breaking the page.
    return null;
  }

  if (projects.length === 0) {
    return null;
  }

  const toItem = (project: (typeof projects)[number]) => ({
    id: project.id,
    slug: project.slug,
    title: project.title,
    description: project.description,
    date: project.date.toISOString(),
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    coverImage: project.images[0] ?? null,
  });

  const splitProjects = projects
    .filter((project) => project.displayMode === "SPLIT")
    .slice(0, 2)
    .map(toItem);
  const bannerProjects = projects
    .filter((project) => project.displayMode === "BANNER")
    .map(toItem);

  return (
    <section
      className="relative scroll-mt-28 border-t border-black/5 pt-20 sm:scroll-mt-20 lg:pt-28"
      id="projects"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-[54px] mb-12 sm:mb-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-black/5 border border-black/5 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#10100F]/70">
          PROJECTS
        </span>
        <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#10100F] leading-tight">
          CLIENT & ACADEMIC PROJECTS
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#10100F]/60 max-w-xl font-medium">
          Production web applications, client solutions, and digital design systems.
        </p>
      </div>

      {/* Full-bleed, edge to edge — intentionally outside the padded container */}
      <ProjectsSplit projects={splitProjects} />
      <ProjectsGrid projects={bannerProjects} />
    </section>
  );
}
