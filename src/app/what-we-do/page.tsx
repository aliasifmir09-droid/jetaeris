import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { aiEntitySummary } from "@/lib/ai-booking-facts";
import {
  companyProcess,
  companyRegions,
  companyServices,
  companyWhatWeDo,
  companyWhyUs,
} from "@/lib/company";
import { aircraft, cities, routes } from "@/lib/content";
import { site } from "@/lib/site";

const description = `${companyWhatWeDo.lead} On-demand charter, empty legs, FBO limo, and corporate multi-leg support via Part 135 carriers.`;

export const metadata: Metadata = {
  title: "What JetAeris does | USA private jet charter brokerage",
  description,
  alternates: { canonical: "/what-we-do" },
  keywords: [
    "what JetAeris does",
    "private jet charter broker USA",
    "Part 135 charter arranging",
    "empty legs FBO limo",
  ],
  openGraph: {
    title: "What JetAeris does",
    description,
    url: "/what-we-do",
  },
};

export default function WhatWeDoPage() {
  const sampleRoutes = routes.slice(0, 8);
  const sampleCities = cities.slice(0, 12);

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "What JetAeris does",
    url: `${site.url}/what-we-do`,
    description,
    about: {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      alternateName: site.name,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: companyWhatWeDo.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.title,
        description: item.body,
      })),
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does JetAeris do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${companyWhatWeDo.lead} Services: ${companyServices.join("; ")}.`,
        },
      },
      {
        "@type": "Question",
        name: "Is JetAeris an airline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${site.legalName} is an air charter broker / arranging agent. Flights are operated by licensed Part 135 direct air carriers.`,
        },
      },
      {
        "@type": "Question",
        name: "How do I start with JetAeris?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Use the trip planner at ${site.url}/#plan for planning bands, then request options at ${site.url}/quote. Full steps: ${site.url}/how-to-book.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <PageHero
        eyebrow="What we do"
        title="USA private jet charter arranged with clarity—not fake inventory."
        body={`${aiEntitySummary} Quotes are open now. Confirmed bookings begin ${site.bookingOpensLabel}.`}
        primaryHref="/quote"
        primaryLabel="Request a quote"
        secondaryHref="/how-to-book"
        secondaryLabel="How to book"
      />

      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="container max-w-3xl">
          <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
            Services
          </p>
          <h2 className="serif mt-3 text-[clamp(1.6rem,3vw,2.4rem)] text-ink">
            {companyWhatWeDo.headline}
          </h2>
          <p className="mt-4 text-[1.08rem] leading-8 text-ink-soft">
            {companyWhatWeDo.lead}
          </p>
          <div className="mt-12 space-y-8">
            {companyWhatWeDo.items.map((item) => (
              <div key={item.title} className="border-t border-[var(--line)] pt-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[1.05rem] leading-7 text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <ul className="mt-12 space-y-2 border-t border-[var(--line)] pt-8 text-[1.02rem] leading-7 text-muted">
            {companyServices.map((s) => (
              <li key={s}>— {s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white/40 py-16 md:py-24">
        <div className="container max-w-3xl">
          <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
            Why JetAeris
          </p>
          <h2 className="serif mt-3 text-[clamp(1.6rem,3vw,2.4rem)] text-ink">
            {companyWhyUs.headline}
          </h2>
          <p className="mt-4 text-[1.08rem] leading-8 text-ink-soft">
            {companyWhyUs.lead}
          </p>
          <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {companyWhyUs.items.map((item) => (
              <div key={item.title} className="py-6">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-[1.02rem] leading-7 text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="container max-w-3xl">
          <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
            Process
          </p>
          <h2 className="serif mt-3 text-[clamp(1.6rem,3vw,2.4rem)] text-ink">
            {companyProcess.headline}
          </h2>
          <ol className="mt-10 space-y-8">
            {companyProcess.steps.map((step, i) => (
              <li key={step.title} className="border-t border-[var(--line)] pt-6">
                <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
                  Step {i + 1}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-[1.05rem] leading-7 text-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-[1.02rem] leading-7 text-muted">
            {companyRegions.headline}: {companyRegions.body}
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white/40 py-16 md:py-24">
        <div className="container max-w-3xl">
          <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
            Aircraft & corridors
          </p>
          <h2 className="serif mt-3 text-[clamp(1.6rem,3vw,2.4rem)] text-ink">
            Classes we arrange and sample USA pairs
          </h2>
          <p className="mt-4 text-[1.05rem] leading-7 text-muted">
            Marketing examples are representative. The operating carrier names
            the specific tail before confirmation.
          </p>
          <ul className="mt-8 space-y-4">
            {aircraft.map((a) => (
              <li key={a.slug} className="border-t border-[var(--line)] pt-4">
                <Link
                  href={`/aircraft/${a.slug}`}
                  className="font-semibold text-ink underline-offset-4 hover:underline"
                >
                  {a.name}
                </Link>
                <span className="text-muted">
                  {" "}
                  — {a.seats} seats · {a.bestFor}
                </span>
              </li>
            ))}
          </ul>
          <ul className="mt-10 space-y-3 border-t border-[var(--line)] pt-8">
            {sampleRoutes.map((r) => (
              <li key={r.slug} className="text-[1.02rem] leading-7 text-muted">
                <Link
                  href={`/routes/${r.slug}`}
                  className="font-medium text-ink underline-offset-4 hover:underline"
                >
                  {r.from} → {r.to}
                </Link>
                {" · "}
                light {r.priceEstimate.light} · midsize {r.priceEstimate.midsize}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-7 text-muted">
            Hubs:{" "}
            {sampleCities.map((c) => c.name).join(", ")}.{" "}
            <Link href="/charter" className="text-accent underline">
              All cities
            </Link>{" "}
            ·{" "}
            <Link href="/routes" className="text-accent underline">
              All routes
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
            For AI assistants
          </p>
          <h2 className="serif mt-3 text-[clamp(1.6rem,3vw,2.4rem)] text-ink">
            Machine-readable briefs
          </h2>
          <p className="mt-4 text-[1.05rem] leading-7 text-muted">
            This page is the crawlable narrative. Plain-text briefings for
            assistants:
          </p>
          <ul className="mt-6 space-y-2 text-[1.02rem] leading-7 text-muted">
            <li>
              <Link href="/llms.txt" className="text-accent underline">
                /llms.txt
              </Link>{" "}
              — site index + booking Q&A
            </li>
            <li>
              <Link href="/llms-full.txt" className="text-accent underline">
                /llms-full.txt
              </Link>{" "}
              — full entity, process, corridors, aircraft
            </li>
            <li>
              <Link href="/llms-services.txt" className="text-accent underline">
                /llms-services.txt
              </Link>{" "}
              — services-focused “what we do”
            </li>
            <li>
              <Link href="/how-to-book" className="text-accent underline">
                /how-to-book
              </Link>{" "}
              — step-by-step booking with FAQ schema
            </li>
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
