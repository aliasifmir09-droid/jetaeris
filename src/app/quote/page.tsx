import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a flight",
  description:
    "Request a USA private jet charter quote from JetAeris. Share your trip details and receive vetted options from our concierge desk.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <div className="bg-paper pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow">Flight request</p>
          <h1 className="serif mt-4 text-[clamp(2.6rem,5vw,4.2rem)] text-ink">
            Describe the trip. We return aircraft options.
          </h1>
          <p className="lede mt-5 max-w-md">
            Modeled on how serious desks work: route, date, passengers, then a
            human response—not a membership hard sell.
          </p>
          <ul className="mt-10 space-y-4 text-sm leading-6 text-ink-soft">
            <li>One-way, round-trip, or multi-city</li>
            <li>Empty-leg interest welcome—note flexibility on time</li>
            <li>We arrange flights with preferred Part 135 partners</li>
          </ul>
        </div>
        <div className="border border-[var(--line)] bg-[color-mix(in_srgb,white_70%,var(--paper))] p-6 md:p-10">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
