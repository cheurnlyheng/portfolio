import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Cheurn Lyheng`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(project.date);

  return (
    <>
      <Navbar />
      <main className="pb-24 pt-[130px] sm:pt-[110px]">
        <div className="mx-auto w-full max-w-[840px] px-5 sm:px-8">
          <a
            href="/#projects"
            className="mb-9 inline-flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-[0.08em] text-[#221d17]/45 transition hover:text-[#b3502b]"
          >
            <span aria-hidden="true">←</span> Back to projects
          </a>

          <p className="mb-3 text-[0.8rem] font-extrabold uppercase tracking-[0.18em] text-[#b3502b]">
            {formattedDate}
          </p>
          <h1 className="mb-6 max-w-[680px] font-serif text-[clamp(2rem,5.5vw,2.9rem)] font-semibold leading-[1.1] text-[#221d17]">
            {project.title}
          </h1>

          <p className="mb-9 max-w-[620px] text-[clamp(1rem,1.6vw,1.15rem)] font-semibold leading-[1.65] text-[#221d17]/65">
            {project.description}
          </p>

          <div className="mb-12 flex flex-wrap items-center gap-4">
            <a
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#221d17]/20 px-6 text-sm font-extrabold text-[#221d17] transition hover:border-[#221d17]/40 hover:bg-[#221d17]/[0.03]"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <img className="h-4 w-4" src="/icons/tech/github.svg" alt="" aria-hidden="true" />
              View code
            </a>
            {project.liveUrl ? (
              <a
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#221d17] px-6 text-sm font-extrabold text-[#f6f1e6] transition hover:bg-[#b3502b]"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Visit site <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="inline-flex min-h-[46px] items-center rounded-full bg-[#221d17]/[0.06] px-6 text-sm font-extrabold text-[#221d17]/40">
                Not deployed yet
              </span>
            )}
          </div>

          {project.images.length > 0 ? (
            <div className="grid gap-6">
              {project.images.map((url, index) => (
                <img
                  className="w-full border border-[#221d17]/12 object-cover"
                  src={url}
                  alt={`${project.title} screenshot ${index + 1}`}
                  key={url}
                />
              ))}
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
