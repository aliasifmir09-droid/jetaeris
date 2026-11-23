import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { blogByCategory, blogPillars, blogPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private aviation blog & information hub",
  description: `JetAeris information campaign—${blogPosts.length}+ USA private jet articles on cost, routes, empty legs, airports, aircraft, and how charter works. Quotes open now; bookings from ${site.bookingOpensLabel}.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const categories = blogByCategory();

  return (
    <>
      <PageHero
        eyebrow="Information campaign"
        title="Useful answers that attract serious travelers."
        body={`Like a high-volume content desk—but written for private aviation search intent: cost, corridors, empty legs, safety, and cities. ${blogPosts.length} articles live. Quotes open now; confirmed bookings begin ${site.bookingOpensLabel}.`}
        primaryHref="/quote"
        primaryLabel="Request a quote"
        secondaryHref="/guides"
        secondaryLabel="Legacy guides"
      />
      <section className="pb-16 md:pb-24">
        <div className="container">
          <Breadcrumbs items={[{ name: "Blog" }]} />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="border border-[var(--line)] p-5">
              <p className="text-xs tracking-[0.16em] text-accent uppercase">
                Articles
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-ink">
                {blogPosts.length}
              </p>
            </div>
            <div className="border border-[var(--line)] p-5">
              <p className="text-xs tracking-[0.16em] text-accent uppercase">
                Pillars
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-ink">
                {blogPillars.length}
              </p>
            </div>
            <div className="border border-[var(--line)] p-5">
              <p className="text-xs tracking-[0.16em] text-accent uppercase">
                Topics
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-ink">
                {categories.length}
              </p>
            </div>
          </div>

          <h2 className="serif mt-16 text-3xl text-ink md:text-4xl">
            Pillar guides
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Start here for ranking and conversion—deep posts that link into
            routes, empty legs, and quotes.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {blogPillars.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border border-[var(--line)] bg-white/50 p-7 transition-colors hover:border-[var(--line-strong)]"
              >
                <p className="text-xs tracking-[0.16em] text-accent uppercase">
                  {post.category} · {post.readMinutes} min
                </p>
                <h3 className="serif mt-3 text-2xl text-ink">{post.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>

          <h2 className="serif mt-20 text-3xl text-ink md:text-4xl">
            Full library by topic
          </h2>
          <div className="mt-10 space-y-14">
            {categories.map(([category, posts]) => (
              <div key={category}>
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--line)] pb-3">
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-ink">
                    {category}
                  </h3>
                  <p className="text-xs tracking-[0.14em] text-muted uppercase">
                    {posts.length} articles
                  </p>
                </div>
                <ul className="mt-4 grid gap-2 md:grid-cols-2">
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block border-b border-[var(--line)] py-3 text-sm text-ink-soft transition-colors hover:text-ink"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Read the answer. Then request the trip." />
    </>
  );
}
