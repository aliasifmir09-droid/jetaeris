import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How JetAeris arranges USA private jet charter: request, options, confirmation, and flight day—with a concierge desk throughout.",
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
    body: "Once you choose, we coordinate the operator confirmation, passenger details, and FBO logistics. You get a clean itinerary—not a paperwork maze.",
  },
  {
    n: "04",
    title: "Fly",
    body: "Arrive at the FBO. We remain available for day-of changes, connections, and ground arrangements when you need them.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-paper pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container">
        <SectionHeading
          eyebrow="Process"
          title="Four steps. No theater."
          body="Ordinary charter sites invent complexity. Flagship brands make the path feel inevitable. JetAeris is a trip desk: inquire, compare, confirm, fly."
        />

        <ol className="mt-16 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {steps.map((step) => (
            <li
              key={step.n}
              className="grid gap-4 py-10 md:grid-cols-[120px_1fr] md:gap-10"
            >
              <p className="font-[family-name:var(--font-display)] text-2xl text-accent">
                {step.n}
              </p>
              <div>
                <h2 className="serif text-3xl text-ink md:text-4xl">{step.title}</h2>
                <p className="mt-4 max-w-2xl text-[1.05rem] leading-8 text-muted">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <Link href="/quote" className="btn btn-primary">
            Start a request
          </Link>
        </div>
      </div>
    </div>
  );
}
