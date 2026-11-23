import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import {
  aircraft,
  airports,
  cities,
  guides,
  limoCities,
  routes,
} from "@/lib/content";
import { site } from "@/lib/site";

/** Real content refresh stamp for lastmod — update when major content ships. */
const CONTENT_UPDATED = new Date("2026-11-23T19:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/quote",
    "/contact",
    "/how-it-works",
    "/ways-to-fly",
    "/blog",
    "/empty-legs",
    "/safety",
    "/about",
    "/faq",
    "/routes",
    "/charter",
    "/aircraft",
    "/guides",
    "/limo",
    "/airports",
    "/legal",
    "/privacy",
    "/terms",
    "/cookies",
    "/cancellation-policy",
    "/broker-disclosure",
    "/accessibility",
    "/do-not-sell",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${site.url}${path === "/" ? "" : path}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly" as const,
      priority:
        path === "/"
          ? 1
          : path === "/faq" || path === "/contact" || path === "/safety"
            ? 0.95
            : 0.8,
    })),
    ...cities.map((c) => ({
      url: `${site.url}/charter/${c.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...routes.map((r) => ({
      url: `${site.url}/routes/${r.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    })),
    ...aircraft.map((a) => ({
      url: `${site.url}/aircraft/${a.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...guides.map((g) => ({
      url: `${site.url}/guides/${g.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...blogPosts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.updated),
      changeFrequency: "weekly" as const,
      priority: p.wave === "pillar" ? 0.95 : 0.85,
    })),
    ...limoCities.map((c) => ({
      url: `${site.url}/limo/${c.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...airports.map((a) => ({
      url: `${site.url}/airports/${a.code.toLowerCase()}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
