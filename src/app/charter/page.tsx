import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { cities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Private jet charter cities USA",
  description:
    "USA private jet charter by city—New York, Miami, Los Angeles, Las Vegas, Chicago, Dallas, Aspen, and more with JetAeris.",
  alternates: { canonical: "/charter" },
};

export default function CharterIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Cities"
        title="Private jet charter across the United States"
        body="Dedicated city pages for the corridors that actually move—airports, nearby routes, and a direct path to a quote."
        secondaryHref="/routes"
        secondaryLabel="Browse routes"
      />
      <section className="pb-20 md:pb-28">
        <div className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/charter/${city.slug}`}
              className="panel p-7 transition-transform hover:-translate-y-0.5"
            >
              <p className="text-xs tracking-[0.16em] text-accent uppercase">
                {city.state}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-ink">
                {city.name}
              </h2>
              <p className="mt-3 text-sm text-muted">
                {city.airports.join(" · ")}
              </p>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-ink-soft">
                {city.blurb}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
