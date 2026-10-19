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
      className="relative scroll-mt-28 border-t border-[#17161a]/10 py-20 sm:scroll-mt-20 lg:py-24"
      id="projects"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-[54px]">
        <div className="mb-14 flex items-end gap-4 sm:gap-6">
          <span className="text-[clamp(2.6rem,6vw,4.2rem)] font-black leading-none text-[#17161a]/10">01</span>
          <div>
            <p className="mb-2 text-[0.8rem] font-extrabold uppercase tracking-[0.18em] text-[#2f5d4b]">Projects</p>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold leading-[1.05] text-[#17161a]">
              Selected work
            </h2>
          </div>
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
