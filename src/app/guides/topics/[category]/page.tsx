import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import {
  GUIDE_CATEGORIES,
  guidesByCategory,
  type GuideCategoryId,
} from "@/lib/guides-catalog";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return GUIDE_CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = GUIDE_CATEGORIES.find((c) => c.id === category);
  if (!meta) return {};
  const list = guidesByCategory(category as GuideCategoryId);
  return {
    title: `${meta.label} — private jet guides`,
    description: `${meta.blurb} ${list.length} JetAeris guides in this topic.`,
    alternates: { canonical: `/guides/topics/${meta.id}` },
  };
}

export default async function GuideTopicPage({ params }: Props) {
  const { category } = await params;
  const meta = GUIDE_CATEGORIES.find((c) => c.id === category);
  if (!meta) notFound();
  const list = guidesByCategory(meta.id);

  return (
    <>
      <PageHero
        eyebrow="Guide topic"
        title={meta.label}
        body={`${meta.blurb} ${list.length} pages with unique airports, routes, or aircraft facts—linked for crawlability.`}
        secondaryHref="/guides"
        secondaryLabel="All guide topics"
      />
      <section className="pb-20 md:pb-28">
        <div className="container pt-4">
          <Breadcrumbs
            items={[
              { name: "Guides", href: "/guides" },
              { name: meta.label },
            ]}
          />
        </div>
        <div className="container mt-10 grid gap-4 md:grid-cols-2">
          {list.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="border-b border-[var(--line)] py-5 transition-colors hover:border-accent"
            >
              <h2 className="text-lg font-medium text-ink">{guide.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
