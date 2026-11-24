import type { BlogPost } from "@/lib/blog-types";
import type { Guide } from "@/lib/content";

/**
 * Early-domain SEO policy (new site / quality-first phase).
 *
 * Google will not treat ~1,300 thin URLs as authority. For a brand-new domain,
 * index the money pages and hand-written pillars; keep scaled keyword clones
 * crawlable for internal UX but noindex + out of the sitemap until each page
 * earns unique research, demand, and links.
 *
 * Phone/email identity can ship later — ranking depends on index quality first.
 */
export const SEO_INDEX_PHASE = "quality-first" as const;

/** City hub articles: private-jet-charter-{city} — one strong page per market. */
const CITY_HUB_SLUG = /^private-jet-charter-[a-z0-9-]+$/;

/**
 * Blog posts that should be in the sitemap and allow indexing.
 * Pillars, route economics, aircraft class guides, and one hub per city.
 * Excludes mass-generated top-city deep-topic clones (50+/city).
 */
export function isIndexableBlogPost(post: BlogPost): boolean {
  if (post.wave === "pillar" || post.wave === "route" || post.wave === "aircraft") {
    return true;
  }
  if (post.wave === "city") {
    return CITY_HUB_SLUG.test(post.slug);
  }
  // Untagged hand posts default to indexable
  return !post.wave;
}

/**
 * Guides that should be indexed.
 * Hand-written educational pillars only — not route duplicates
 * (`private-jet-cost-*`) or scaled keyword-generator pages (`scaled: true`).
 */
export function isIndexableGuide(guide: Guide): boolean {
  if (guide.scaled) return false;
  if (guide.slug.startsWith("private-jet-cost-")) return false;
  return true;
}

export function robotsForIndexable(indexable: boolean): {
  index: boolean;
  follow: boolean;
} {
  return indexable
    ? { index: true, follow: true }
    : { index: false, follow: true };
}
