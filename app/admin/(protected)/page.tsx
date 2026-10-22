import Link from "next/link";
import { ArrowUpRight, Plus, ExternalLink, Trash2, Edit2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteProjectAction } from "./actions";

export default async function AdminDashboardPage() {
  const projects = await prisma.project.findMany({ orderBy: { date: "desc" } });
  const splitCount = projects.filter((p) => p.displayMode === "SPLIT").length;

  return (
    <main className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-[54px]">
      {/* Header Bar */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/5 pb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 border border-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#10100F]/70">
            DASHBOARD • {projects.length} PROJECTS
          </span>
          <h1 className="mt-2 text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#10100F]">
            Projects
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#10100F]/60 font-medium">
            Manage your works, split featured banners ({splitCount}/2 active), and case studies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/new"
            className="inline-flex items-center gap-2 rounded-full bg-[#10100F] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-xs hover:bg-neutral-800 transition-all active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Project</span>
          </Link>
        </div>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-black/15 bg-white p-12 text-center">
          <p className="text-sm font-semibold text-[#10100F]/50">
            No projects added yet. Click &ldquo;Add Project&rdquo; above to publish your first work.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => {
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              month: "short",
              year: "numeric",
            }).format(project.date);
            const cover = project.images[0];

            return (
              <div
                key={project.id}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-5 rounded-2xl border border-black/5 bg-white p-5 sm:p-6 shadow-xs hover:shadow-sm hover:border-black/15 transition-all"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                  {cover ? (
                    <div className="relative h-16 w-24 sm:h-20 sm:w-32 shrink-0 overflow-hidden rounded-xl border border-black/5 bg-[#f4f1ea]">
                      <img
                        className="h-full w-full object-cover object-top"
                        src={cover}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-24 sm:h-20 sm:w-32 shrink-0 items-center justify-center rounded-xl border border-dashed border-black/15 bg-black/5 text-[10px] font-bold uppercase tracking-wider text-[#10100F]/40">
                      No Image
                    </div>
                  )}

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-black/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#10100F]/70">
                        {formattedDate}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          project.displayMode === "SPLIT"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        {project.displayMode}
                      </span>
                      {project.liveUrl ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                          Code Only
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#10100F] truncate">
                      {project.title}
                    </h2>
                    <p className="line-clamp-1 text-xs text-[#10100F]/60 font-medium">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-0 border-black/5 w-full md:w-auto justify-end">
                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-[#fbfbfb] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#10100F]/70 hover:text-[#10100F] hover:bg-white transition-all"
                    title="Preview on site"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Preview</span>
                  </Link>

                  <Link
                    href={`/admin/${project.id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#10100F] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800 transition-all shadow-2xs"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </Link>

                  <form action={deleteProjectAction.bind(null, project.id)}>
                    <button
                      className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-black/10 bg-white text-[#10100F]/50 hover:text-red-600 hover:border-red-300 transition-all"
                      type="submit"
                      title="Delete project"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
