import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { emptyLegs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Empty legs",
  description:
    "USA private jet empty legs arranged by JetAeris—one-way positioning flights at reduced rates, subject to confirmation.",
  alternates: { canonical: "/empty-legs" },
};

export default function EmptyLegsPage() {
  return (
    <div className="bg-paper pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container">
        <SectionHeading
          eyebrow="Empty legs"
          title="One-way positioning. Serious savings when timing aligns."
          body="Empty legs are aircraft already moving. They move fast and change often. These sample routes illustrate the experience—request a hold and we confirm live availability with the operator."
        />

        <div className="mt-14 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {emptyLegs.map((leg) => (
            <article
              key={leg.id}
              className="grid gap-4 py-8 md:grid-cols-[1.2fr_0.8fr_auto] md:items-end"
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

        <div className="mt-14 max-w-2xl">
          <p className="text-[1.05rem] leading-8 text-muted">
            Want alerts when a corridor opens? Send a quote with your preferred
            city pairs and note “empty leg watch.” That list—not a flashy app—is
            how agile desks beat slow brands on retention.
          </p>
          <Link href="/quote" className="btn btn-primary mt-8">
            Set a watch
          </Link>
        </div>
      </div>
    </div>
  );
}
