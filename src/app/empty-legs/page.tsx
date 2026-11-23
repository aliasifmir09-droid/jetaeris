import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { emptyLegs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Empty legs USA",
  description:
    "USA private jet empty legs with JetAeris—one-way positioning flights at reduced rates, subject to confirmation.",
  alternates: { canonical: "/empty-legs" },
};

export default function EmptyLegsPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Empty legs"
        title="One-way positioning. Serious savings when timing aligns."
        body="Empty legs are aircraft already moving. They change quickly. Request a hold and we confirm live availability with the operator."
        secondaryHref="/guides/empty-leg-flights-explained"
        secondaryLabel="How empty legs work"
      />

      <section className="py-16 md:py-24">
        <div className="container divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {emptyLegs.map((leg) => (
            <article
              key={leg.id}
              className="grid gap-4 py-8 md:grid-cols-[1.3fr_0.8fr_auto] md:items-end"
            >
              <div>
                <h2 className="serif text-3xl text-ink md:text-4xl">
                  {leg.from}
                  <span className="mx-3 text-ink/25">→</span>
                  {leg.to}
                </h2>
                <p className="mt-3 text-sm text-muted">{leg.note}</p>
              </div>
              <div className="text-sm leading-7 text-ink-soft">
                <p>{leg.date}</p>
                <p>{leg.aircraft}</p>
              </div>
              <Link
                href={`/quote?interest=empty-leg&from=${encodeURIComponent(leg.from)}&to=${encodeURIComponent(leg.to)}`}
                className="btn btn-line w-fit"
              >
                Request this leg
              </Link>
            </article>
          ))}
        </div>
        <div className="container mt-12 max-w-2xl">
          <p className="text-[1.05rem] leading-8 text-muted">
            Want corridor alerts? Submit a quote with your city pairs and note
            “empty leg watch.” That list is how agile desks beat slow brands on
            retention.
          </p>
        </div>
      </section>
      <CtaBand title="Set an empty-leg watch" />
    </>
  );
}
