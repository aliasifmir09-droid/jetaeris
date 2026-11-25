import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import {
  aircraft,
  airports,
  cities,
  limoCities,
  routes,
} from "@/lib/content";
import { GUIDE_CATEGORIES, guides } from "@/lib/guides-catalog";
import { isIndexableBlogPost, isIndexableGuide } from "@/lib/seo-index";
import { site } from "@/lib/site";

/** Real content refresh stamp for lastmod — update when major content ships. */
const CONTENT_UPDATED = new Date("2026-11-24T16:00:00.000Z");

/**
 * Quality-first sitemap for a new domain.
 * Money pages + hand-written pillars only. Scaled keyword clones stay
 * noindex and out of the sitemap until they earn unique value.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/quote",
    "/how-to-book",
    "/track",
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

  const indexableGuides = guides.filter(isIndexableGuide);
  const indexablePosts = blogPosts.filter(isIndexableBlogPost);

  return [
    ...staticPaths.map((path) => ({
      url: `${site.url}${path === "/" ? "" : path}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly" as const,
      priority:
        path === "/"
          ? 1
          : path === "/quote" ||
              path === "/how-to-book" ||
              path === "/routes" ||
              path === "/faq"
            ? 0.95
            : path === "/contact" || path === "/safety"
              ? 0.9
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
    ...GUIDE_CATEGORIES.map((c) => ({
      url: `${site.url}/guides/topics/${c.id}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...indexableGuides.map((g) => ({
      url: `${site.url}/guides/${g.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.88,
    })),
    ...indexablePosts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.updated),
      changeFrequency: "weekly" as const,
      priority: p.wave === "pillar" ? 0.95 : p.wave === "route" ? 0.9 : 0.85,
    })),
    ...limoCities.map((c) => ({
      url: `${site.url}/limo/${c.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...airports.map((a) => ({
      url: `${site.url}/airports/${a.code.toLowerCase()}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
