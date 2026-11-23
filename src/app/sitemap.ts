import type { MetadataRoute } from "next";
import { aircraft, cities, guides, routes } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/quote",
    "/how-it-works",
    "/empty-legs",
    "/safety",
    "/about",
    "/faq",
    "/routes",
    "/charter",
    "/aircraft",
    "/guides",
    "/privacy",
    "/terms",
  ];

  const entries: MetadataRoute.Sitemap = [
    ...staticPaths.map((path) => ({
      url: `${site.url}${path === "/" ? "" : path}`,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...cities.map((c) => ({
      url: `${site.url}/charter/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...routes.map((r) => ({
      url: `${site.url}/routes/${r.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    })),
    ...aircraft.map((a) => ({
      url: `${site.url}/aircraft/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...guides.map((g) => ({
      url: `${site.url}/guides/${g.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];

  return entries;
}
