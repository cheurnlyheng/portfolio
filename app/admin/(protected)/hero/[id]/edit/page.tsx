import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updateHeroSlideAction } from "../../actions";
import { HeroSlideForm } from "../../HeroSlideForm";

export default async function EditHeroSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = await prisma.heroSlide.findUnique({ where: { id } });

  if (!slide) {
    notFound();
  }

  const updateWithId = updateHeroSlideAction.bind(null, slide.id);

  return (
    <main className="mx-auto w-full max-w-[860px] px-5 sm:px-8">
      <div className="mb-6">
        <Link
          href="/admin/hero"
          className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#10100F] shadow-xs hover:border-black/30 transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Hero Slides</span>
        </Link>
      </div>

      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 border border-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#10100F]/70">
          EDITING HERO SLIDE
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#10100F]">
          {slide.tagline}
        </h1>
      </div>

      <HeroSlideForm
        action={updateWithId}
        submitLabel="Save Changes"
        existingImage={slide.image}
        defaultValues={{
          tagline: slide.tagline,
          description: slide.description,
        }}
      />
    </main>
  );
}
