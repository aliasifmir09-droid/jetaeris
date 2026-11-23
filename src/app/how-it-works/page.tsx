import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How JetAeris arranges USA private jet charter: request, options, confirmation, and flight day.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    n: "01",
    title: "Share the trip",
    body: "Departure, arrival, date, and passenger count. Optional notes on aircraft preference or schedule flexibility.",
  },
  {
    n: "02",
    title: "Receive curated options",
    body: "We source among vetted operators and return aircraft, timing, and transparent pricing ranges—usually within minutes during desk hours.",
  },
  {
    n: "03",
    title: "Confirm with clarity",
    body: "Once you choose, we coordinate operator confirmation, passenger details, and FBO logistics. You get a clean itinerary.",
  },
  {
    n: "04",
    title: "Fly",
    body: "Arrive at the FBO. We remain available for day-of changes, connections, and ground arrangements.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="Four steps. No theater."
        body="Inquire, compare, confirm, fly. Flagship brands make the path feel inevitable—so do we."
      />
      <section className="pb-16 md:pb-24">
        <div className="container">
          <ol className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {steps.map((step) => (
              <li
                key={step.n}
                className="grid gap-4 py-10 md:grid-cols-[120px_1fr] md:gap-10"
              >
                <p className="font-[family-name:var(--font-display)] text-2xl text-accent">
                  {step.n}
                </p>
                <div>
                  <h2 className="serif text-3xl text-ink md:text-4xl">
                    {step.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[1.05rem] leading-8 text-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/quote" className="btn btn-primary mt-12">
            Start a request
          </Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
