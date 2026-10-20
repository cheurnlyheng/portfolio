import { prisma } from "@/lib/prisma";
import { HeroRotator, type HeroSlideData } from "@/components/HeroRotator";

const fallbackSlides: HeroSlideData[] = [
  {
    image: "/images/profile-portrait.png",
    tagline: "Full-Stack Developer",
    description:
      "I design and build clean, functional digital experiences — starting from Figma wireframes and ending in production-ready code and testing.",
  },
  {
    image: "/images/profile-portrait.png",
    tagline: "UI/UX Designer",
    description:
      "Interfaces that stay out of the way — clear hierarchy, honest spacing, and flows that make sense the first time.",
  },
  {
    image: "/images/profile-portrait.png",
    tagline: "Problem Solver",
    description: "Most of the job is figuring out what's actually broken before touching a single line of code.",
  },
  {
    image: "/images/profile-portrait.png",
    tagline: "QA & WebApp Tester",
    description:
      "I don't ship a feature until I've tried to break it — across devices, edge cases, and bad input.",
  },
];

export async function Hero() {
  let slides: Awaited<ReturnType<typeof prisma.heroSlide.findMany>> = [];

  try {
    slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
  } catch {
    // Database not configured/reachable yet — fall back to defaults below.
  }

  const items: HeroSlideData[] =
    slides.length > 0
      ? slides.map((slide) => ({ image: slide.image, tagline: slide.tagline, description: slide.description }))
      : fallbackSlides;

  return <HeroRotator slides={items} />;
}
