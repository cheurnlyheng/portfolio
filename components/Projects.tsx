import { prisma } from "@/lib/prisma";
import { ProjectsGrid } from "@/components/ProjectsGrid";

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

  return (
    <section
      className="relative scroll-mt-28 border-t border-[#221d17]/10 py-20 sm:scroll-mt-20 lg:py-24"
      id="projects"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-[54px]">
        <div className="mb-16">
          <p className="mb-3 text-[0.8rem] font-extrabold uppercase tracking-[0.18em] text-[#b3502b]">
            03 — Projects
          </p>
          <h2 className="font-serif text-[clamp(1.9rem,3.4vw,2.7rem)] font-semibold leading-[1.1] text-[#221d17]">
            Selected work
          </h2>
        </div>

        <ProjectsGrid
          projects={projects.map((project) => ({
            id: project.id,
            slug: project.slug,
            title: project.title,
            description: project.description,
            date: project.date.toISOString(),
            githubUrl: project.githubUrl,
            liveUrl: project.liveUrl,
            coverImage: project.images[0] ?? null,
          }))}
        />
      </div>
    </section>
  );
}
