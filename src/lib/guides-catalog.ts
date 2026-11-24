import { guides as coreGuides, type Guide } from "@/lib/content";
import {
  GUIDE_CATEGORIES,
  generateKeywordGuides,
  type GuideCategoryId,
} from "@/lib/keyword-guides";
import { isIndexableGuide } from "@/lib/seo-index";

/**
 * Full guide library: hand-written + route cost guides + keyword-scale pages.
 * Kept separate from content.ts to avoid circular imports with the generator.
 * Scaled pages remain live for UX; quality-first SEO indexes only non-scaled.
 */
export const guides: Guide[] = [
  ...coreGuides,
  ...generateKeywordGuides(new Set(coreGuides.map((g) => g.slug))),
];

export const indexableGuides = guides.filter(isIndexableGuide);

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function guidesByCategory(category: GuideCategoryId) {
  return guides.filter((g) => g.category === category);
}

/** Category hubs list indexable guides only (avoid promoting thin clones). */
export function guidesByCategoryIndexable(category: GuideCategoryId) {
  return indexableGuides.filter((g) => g.category === category);
}

export function guideCategoryCounts() {
  return GUIDE_CATEGORIES.map((cat) => ({
    ...cat,
    count: indexableGuides.filter((g) => g.category === cat.id).length,
  }));
}

export { GUIDE_CATEGORIES };
export type { GuideCategoryId };
