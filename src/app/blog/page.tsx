import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import {
  blogPillars,
  indexableBlogPosts,
} from "@/lib/blog";
import { site } from "@/lib/site";
import { topCitiesSeo } from "@/lib/top-cities-seo";

export const metadata: Metadata = {
  title: "Private aviation blog & information hub",
  description: `JetAeris private jet guides for USA travelers—cost, routes, empty legs, aircraft, and city hubs. Quotes open now; bookings from ${site.bookingOpensLabel}.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const pillars = blogPillars;
  const hubs = indexableBlogPosts.filter((p) => p.wave === "city");
  const routes = indexableBlogPosts.filter((p) => p.wave === "route");
  const aircraft = indexableBlogPosts.filter((p) => p.wave === "aircraft");

  return (
    <>
      <PageHero
        eyebrow="Research desk"
        title="Answers built to rank on intent—not page count."
        body={`Indexable pillars, route economics, city hubs, and aircraft guides for serious USA charter searches. Quotes open now; confirmed bookings begin ${site.bookingOpensLabel}.`}
        primaryHref="/quote"
        primaryLabel="Request a quote"
        secondaryHref="/guides"
        secondaryLabel="Core guides"
      />
      <section className="pb-16 md:pb-24">
        <div className="container">
          <Breadcrumbs items={[{ name: "Blog" }]} />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="border border-[var(--line)] p-5">
              <p className="text-xs tracking-[0.16em] text-accent uppercase">
                Indexable articles
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-ink">
                {indexableBlogPosts.length}
              </p>
            </div>
            <div className="border border-[var(--line)] p-5">
              <p className="text-xs tracking-[0.16em] text-accent uppercase">
                Pillars
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-ink">
                {pillars.length}
              </p>
            </div>
            <div className="border border-[var(--line)] p-5">
              <p className="text-xs tracking-[0.16em] text-accent uppercase">
                Route economics
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-ink">
                {routes.length}
              </p>
            </div>
          </div>

          <h2 className="serif mt-16 text-3xl text-ink md:text-4xl">
            Pillar guides
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            High-intent national queries—cost, how charter works, empty legs,
            safety, and planning.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {pillars.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border border-[var(--line)] bg-white/50 p-6 transition-colors hover:border-[var(--line-strong)]"
              >
                <p className="text-xs tracking-[0.14em] text-accent uppercase">
                  {post.category}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-ink">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>

          <h2 className="serif mt-16 text-3xl text-ink md:text-4xl">
            City hubs
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            One strong charter page per market—linked to airports, corridors,
            and the quote form. Deep keyword clones stay off the public index
            until each page is uniquely researched.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hubs.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border border-[var(--line)] bg-white/50 p-5 transition-colors hover:border-[var(--line-strong)]"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg text-ink">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{post.description}</p>
              </Link>
            ))}
          </div>

          <h2 className="serif mt-16 text-3xl text-ink md:text-4xl">
            Top markets → charter hubs
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {topCitiesSeo.map((city) => (
              <Link
                key={city.slug}
                href={`/charter/${city.slug}`}
                className="border border-[var(--line)] bg-white/50 p-5 transition-colors hover:border-[var(--line-strong)]"
              >
                <p className="text-xs tracking-[0.14em] text-accent uppercase">
                  Charter hub
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-ink">
                  {city.name}
                </h3>
              </Link>
            ))}
          </div>

          <h2 className="serif mt-16 text-3xl text-ink md:text-4xl">
            Aircraft class guides
          </h2>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted">
            {aircraft.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border border-[var(--line)] px-3 py-2 hover:border-[var(--line-strong)]"
              >
                {post.title.replace(/ charter guide.*/, "")}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Ready for options on your dates?"
        body={site.responsePromise}
      />
    </>
  );
}
