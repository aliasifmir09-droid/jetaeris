import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "USA private jet routes",
  description:
    "Featured USA private jet routes with JetAeris—New York–Miami, LA–Vegas, coast-to-coast, Aspen, and more.",
  alternates: { canonical: "/routes" },
};

export default function RoutesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Routes"
        title="City pairs built to rank—and to book."
        body="Each route page covers airports, block time, aircraft fit, and FAQs. Request a live quote in one step."
        secondaryHref="/charter"
        secondaryLabel="Browse cities"
      />
      <section className="pb-20 md:pb-28">
        <div className="container grid gap-5 md:grid-cols-2">
          {routes.map((route) => (
            <Link
              key={route.slug}
              href={`/routes/${route.slug}`}
              className="panel p-8 transition-transform hover:-translate-y-0.5"
            >
              <p className="text-xs tracking-[0.16em] text-accent uppercase">
                {route.airports}
              </p>
              <h2 className="serif mt-4 text-3xl text-ink">
                {route.from} → {route.to}
              </h2>
              <p className="mt-3 text-sm text-muted">
                {route.blockTime} · {route.bestFit}
              </p>
              <p className="mt-4 text-sm leading-7 text-ink-soft">
                {route.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
