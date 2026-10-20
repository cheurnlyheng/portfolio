import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
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

  const coverImage = project.images[0] ?? null;
  const galleryImages = project.images.slice(1);

  return (
    <>
      <Navbar />

      <main className="pb-32 pt-24 sm:pt-28">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-[54px]">
          {/* Top Bar: Back Link */}
          <div className="mb-8">
            <a
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#10100F] shadow-xs hover:border-black/30 hover:bg-black/5 transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Projects</span>
            </a>
          </div>

          {/* Project Header Info */}
          <div className="mb-10 max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 border border-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#10100F]/70">
                {formattedDate}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 border border-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#10100F]/70">
                {project.liveUrl ? "LIVE DEPLOYMENT" : "CODE REPOSITORY"}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#10100F] leading-[0.94]">
              {project.title}
            </h1>

            <p className="max-w-3xl text-base sm:text-xl font-medium leading-relaxed text-[#10100F]/75">
              {project.description}
            </p>

            {/* Quick Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-[#10100F] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-sm active:scale-95"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Visit Live Site</span>
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                </a>
              )}

              <a
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#10100F] shadow-xs hover:border-black/30 hover:shadow-sm transition-all active:scale-95"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <img className="h-3.5 w-3.5" src="/icons/tech/github.svg" alt="" aria-hidden="true" />
                <span>Source Code</span>
              </a>
            </div>
          </div>

          {/* Full Cover Image with Framed Background so it is NEVER cropped */}
          {coverImage && (
            <div className="mb-14 overflow-hidden rounded-3xl border border-black/5 bg-[#f4f1ea] p-4 sm:p-8 md:p-12 shadow-xs">
              <div className="relative mx-auto flex items-center justify-center">
                <img
                  className="h-auto max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-md border border-black/5 bg-white"
                  src={coverImage}
                  alt={`${project.title} main screenshot`}
                />
              </div>
            </div>
          )}

          {/* Project Details Box */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-10 shadow-xs mb-14">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#10100F]/50 mb-4">
              Project Architecture &amp; Overview
            </h2>
            <div className="space-y-4 text-base sm:text-lg font-medium leading-relaxed text-[#10100F]/85 max-w-4xl">
              <p>{project.description}</p>
              <p className="text-sm sm:text-base text-[#10100F]/65">
                Engineered with performance, clean component boundaries, and high visual polish. Tested across edge cases and multiple device viewports.
              </p>
            </div>
          </div>

          {/* Gallery Images with Framed Background so they are NEVER cropped */}
          {galleryImages.length > 0 && (
            <div className="space-y-10">
              <div className="flex items-center justify-between border-b border-black/5 pb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#10100F]/60">
                  Screenshots &amp; Visuals ({galleryImages.length})
                </h3>
              </div>

              <div className="grid gap-8">
                {galleryImages.map((url, index) => (
                  <div
                    key={url}
                    className="overflow-hidden rounded-3xl border border-black/5 bg-[#f4f1ea] p-4 sm:p-8 shadow-xs"
                  >
                    <div className="relative mx-auto flex items-center justify-center">
                      <img
                        className="h-auto max-h-[85vh] w-auto max-w-full rounded-2xl object-contain shadow-sm border border-black/5 bg-white"
                        src={url}
                        alt={`${project.title} detail screenshot ${index + 2}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky "Visit live site" Button at the Middle Bottom of the screen */}
      {project.liveUrl && (
        <div className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[calc(100vw-32px)]">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-[#10100F] text-white px-5 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-[0_12px_36px_rgba(16,16,15,0.35)] hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all backdrop-blur-md border border-white/15 whitespace-nowrap"
          >
            <span>Visit live site</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
          </a>
        </div>
      )}

      <Footer />
    </>
  );
}
