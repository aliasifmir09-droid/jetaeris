export type BlogSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  published: string;
  updated: string;
  /** Minutes — for reader expectation, not schema requirement */
  readMinutes: number;
  relatedHref?: string;
  relatedLabel?: string;
  sections: BlogSection[];
  faqs: { q: string; a: string }[];
  /** Campaign wave marker for indexing / filters */
  wave?: "pillar" | "route" | "city" | "aircraft";
};
