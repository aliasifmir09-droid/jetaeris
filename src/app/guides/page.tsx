import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { guideCategoryCounts, guides } from "@/lib/guides-catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private jet guides — cost, charter, airports, empty legs",
  description: `JetAeris private jet guides: ${guides.length}+ USA pages on charter cost, how to book, airports, empty legs, and traveler FAQs. Quotes open now; bookings from ${site.bookingOpensLabel}.`,
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  const categories = guideCategoryCounts();
  const featured = guides.filter((g) => !g.category).slice(0, 12);

  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Private jet answers people actually search."
        body={`${guides.length} crawlable guides grounded in real airports, routes, and aircraft classes—not doorway clones. Built for travelers first; structured so Google can understand the hierarchy.`}
        primaryHref="/quote"
        primaryLabel="Request a quote"
      />
      <section className="border-b border-[var(--line)] pb-16 md:pb-20">
        <div className="container">
          <h2 className="serif text-3xl text-ink">Browse by topic</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Category hubs keep pages in a clear internal-link tree (Google’s
            preferred site structure)—not a flat dump of near-identical URLs.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/guides/topics/${cat.id}`}
                className="panel p-6 transition-transform hover:-translate-y-0.5"
              >
                <p className="text-[0.68rem] tracking-[0.16em] text-accent uppercase">
                  {cat.count} guides
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-ink">
                  {cat.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{cat.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="pb-20 md:pb-28">
        <div className="container">
          <h2 className="serif text-3xl text-ink">Core evergreen guides</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {featured.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="panel p-8 transition-transform hover:-translate-y-0.5"
              >
                <h3 className="serif text-2xl text-ink md:text-3xl">
                  {guide.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
