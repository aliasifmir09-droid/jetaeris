import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ways to fly",
  description: `On-demand charter, empty legs, and FBO ground transfer with ${site.name}—clear product paths without membership theater or instant-booking claims.`,
  alternates: { canonical: "/ways-to-fly" },
};

const paths = [
  {
    title: "On-demand charter",
    who: "Travelers who need a specific date, city pair, and cabin—without owning hours or a jet card.",
    gets: "A curated quote with aircraft class options, timing, price range, and the operating carrier before confirmation.",
    href: "/quote",
    cta: "Request a charter quote",
  },
  {
    title: "Empty legs",
    who: "Flexible travelers who can match an operator’s repositioning window for a one-way savings opportunity.",
    gets: "A live board with status, windows, and last-updated time. Every empty leg still requires operator confirmation—availability can change.",
    href: "/empty-legs",
    cta: "View empty legs",
  },
  {
    title: "FBO limo & ground",
    who: "Passengers who want door-to-FBO continuity—sedan, SUV, sprinter, or stretch timed to wheels-up / wheels-down.",
    gets: "Ground arranged with the flight plan, or as a standalone transfer in supported U.S. cities.",
    href: "/limo",
    cta: "Explore limo service",
  },
  {
    title: "Corporate & multi-leg support",
    who: "Executive assistants and travel managers coordinating repeat corridors, multi-city days, or group movements.",
    gets: "A single desk for itinerary design, airport choice, and ground—still quote-led, not a fake booking marketplace.",
    href: "/contact",
    cta: "Talk to the desk",
  },
];

export default function WaysToFlyPage() {
  return (
    <>
      <PageHero
        eyebrow="Ways to fly"
        title="Clear products. Honest next steps."
        body="JetAeris is a USA air charter brokerage and arranging agent. Choose the path that matches how you travel—each one ends in a human-reviewed quote, not a pretend instant booking."
        primaryHref="/quote"
        primaryLabel="Request a quote"
        secondaryHref="/how-it-works"
        secondaryLabel="How we arrange flights"
      />
      <section className="pb-16 md:pb-24">
        <div className="container">
          <Breadcrumbs items={[{ name: "Ways to fly" }]} />
          <div className="mt-4 grid gap-0 border-t border-[var(--line)]">
            {paths.map((path, i) => (
              <article
                key={path.title}
                className="grid gap-6 border-b border-[var(--line)] py-10 md:grid-cols-[0.35fr_1fr_auto] md:items-end"
              >
                <div>
                  <p className="text-xs tracking-[0.18em] text-accent uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="serif mt-3 text-3xl text-ink">{path.title}</h2>
                </div>
                <div className="max-w-2xl space-y-4">
                  <p className="text-[1.02rem] leading-8 text-ink-soft">
                    <span className="font-semibold text-ink">Who it serves. </span>
                    {path.who}
                  </p>
                  <p className="text-[1.02rem] leading-8 text-muted">
                    <span className="font-semibold text-ink">What you get. </span>
                    {path.gets}
                  </p>
                </div>
                <Link href={path.href} className="btn btn-line self-start md:self-end">
                  {path.cta}
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm leading-7 text-muted">
            {site.role} We do not claim thousands of owned aircraft, guaranteed
            inventory, or instant booking. Membership products are not offered
            yet—when they are, they will be labeled separately.
          </p>
        </div>
      </section>
      <CtaBand title="Start with the trip—not the membership pitch." />
    </>
  );
}
