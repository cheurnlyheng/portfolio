import Link from "next/link";
import { ArrowUp, ArrowDown, Plus, Edit2, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { MAX_HERO_SLIDES } from "@/lib/constants";
import { deleteHeroSlideAction, moveHeroSlideAction } from "./actions";

export default async function AdminHeroPage() {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });

  return (
    <main className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-[54px]">
      {/* Header Bar */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/5 pb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 border border-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#10100F]/70">
            HERO SLIDES • {slides.length}/{MAX_HERO_SLIDES} SLIDES
          </span>
          <h1 className="mt-2 text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#10100F]">
            Hero Slides
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#10100F]/60 font-medium">
            The home hero rotates through these images, taglines, and blurbs in sequence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {slides.length < MAX_HERO_SLIDES && (
            <Link
              href="/admin/hero/new"
              className="inline-flex items-center gap-2 rounded-full bg-[#10100F] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-xs hover:bg-neutral-800 transition-all active:scale-95"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Slide</span>
            </Link>
          )}
        </div>
      </div>

      {/* Slide Cards List */}
      {slides.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-black/15 bg-white p-12 text-center">
          <p className="text-sm font-semibold text-[#10100F]/50">
            No custom slides yet — the hero is showing its default fallback profile view.
          </p>
          <div className="mt-4">
            <Link
              href="/admin/hero/new"
              className="inline-flex items-center gap-2 rounded-full bg-[#10100F] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create First Slide</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-5 rounded-2xl border border-black/5 bg-white p-5 sm:p-6 shadow-xs hover:shadow-sm hover:border-black/15 transition-all"
            >
              {/* Left: Thumbnail & Details */}
              <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                <div className="flex items-center gap-3 shrink-0">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5 text-[11px] font-black text-[#10100F]/60">
                    {index + 1}
                  </span>
                  <div className="relative h-16 w-24 sm:h-20 sm:w-32 overflow-hidden rounded-xl border border-black/5 bg-[#f4f1ea]">
                    <img
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      src={slide.image}
                      alt=""
                    />
                  </div>
                </div>

                <div className="min-w-0 space-y-1">
                  <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#10100F] truncate">
                    {slide.tagline}
                  </h2>
                  <p className="line-clamp-2 text-xs text-[#10100F]/60 font-medium max-w-xl">
                    {slide.description}
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-0 border-black/5 w-full md:w-auto justify-end">
                {/* Reorder Buttons */}
                <div className="flex items-center gap-1 mr-2 border-r border-black/10 pr-3">
                  <form action={moveHeroSlideAction.bind(null, slide.id, "up")}>
                    <button
                      className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-black/10 bg-[#fbfbfb] text-[#10100F]/60 hover:text-[#10100F] hover:bg-white disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                      type="submit"
                      disabled={index === 0}
                      aria-label="Move up"
                      title="Move up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                  </form>
                  <form action={moveHeroSlideAction.bind(null, slide.id, "down")}>
                    <button
                      className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-black/10 bg-[#fbfbfb] text-[#10100F]/60 hover:text-[#10100F] hover:bg-white disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                      type="submit"
                      disabled={index === slides.length - 1}
                      aria-label="Move down"
                      title="Move down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>

                <Link
                  href={`/admin/hero/${slide.id}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#10100F] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800 transition-all shadow-2xs"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </Link>

                <form action={deleteHeroSlideAction.bind(null, slide.id)}>
                  <button
                    className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-black/10 bg-white text-[#10100F]/50 hover:text-red-600 hover:border-red-300 transition-all"
                    type="submit"
                    title="Delete slide"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
