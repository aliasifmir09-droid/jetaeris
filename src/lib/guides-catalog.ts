import { guides as coreGuides, type Guide } from "@/lib/content";
import {
  GUIDE_CATEGORIES,
  generateKeywordGuides,
  type GuideCategoryId,
} from "@/lib/keyword-guides";

/**
 * Full guide library: hand-written + route cost guides + keyword-scale pages.
 * Kept separate from content.ts to avoid circular imports with the generator.
 */
export const guides: Guide[] = [
  ...coreGuides,
  ...generateKeywordGuides(new Set(coreGuides.map((g) => g.slug))),
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function guidesByCategory(category: GuideCategoryId) {
  return guides.filter((g) => g.category === category);
}

export function guideCategoryCounts() {
  return GUIDE_CATEGORIES.map((cat) => ({
    ...cat,
    count: guides.filter((g) => g.category === cat.id).length,
  }));
}

export { GUIDE_CATEGORIES };
export type { GuideCategoryId };
