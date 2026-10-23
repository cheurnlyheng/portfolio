import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = "https://cheurnlyheng.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projects: { slug: string; updatedAt: Date }[] = [];

  try {
    projects = await prisma.project.findMany({
      select: { slug: true, updatedAt: true },
    });
  } catch {
    // Database not reachable at build time — fall back to just the homepage.
  }

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
