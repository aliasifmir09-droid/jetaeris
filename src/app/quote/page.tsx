import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a flight",
  description:
    "Request a USA private jet charter quote from JetAeris—optional FBO limo transfer included.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <div className="page-hero-wash pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow">Flight request</p>
          <h1 className="serif mt-4 text-[clamp(2.6rem,5vw,4.2rem)] text-ink">
            Describe the trip. Add limo if you want door-to-door.
          </h1>
          <p className="lede mt-5 max-w-md">
            Route, date, passengers—then a human response. Check the limo box
            for FBO black-car or stretch service in top USA cities.
          </p>
          <ul className="mt-10 space-y-4 text-sm leading-6 text-ink-soft">
            <li>One-way, round-trip, or multi-city</li>
            <li>Optional limo / SUV / sprinter at either FBO</li>
            <li>Empty-leg interest welcome—note time flexibility</li>
          </ul>
        </div>
        <div className="panel p-6 md:p-10">
          <Suspense fallback={<p className="text-sm text-muted">Loading form…</p>}>
            <QuoteForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
