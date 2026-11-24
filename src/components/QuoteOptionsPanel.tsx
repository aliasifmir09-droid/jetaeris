"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CabinOptionCards } from "@/components/CabinOptionCards";
import {
  planTrip,
  quoteHrefFromPlan,
} from "@/lib/planning-estimate";

/**
 * Post-quote option cards — shows planning bands for the trip just submitted
 * so customers see what “options” look like while the desk works.
 */
export function QuoteOptionsPanel() {
  const params = useSearchParams();
  const from = params.get("from") ?? "";
  const to = params.get("to") ?? "";
  const passengers = Number(params.get("passengers") ?? "2") || 2;

  const estimate = useMemo(
    () => (from && to ? planTrip(from, to, passengers) : null),
    [from, to, passengers],
  );

  if (!estimate) return null;

  return (
    <section className="mt-12 border-t border-[var(--line)] pt-10">
      <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
        While you wait
      </p>
      <h2 className="serif mt-3 text-[clamp(1.5rem,3vw,2.1rem)] text-ink">
        Planning options for your trip
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        {estimate.fromLabel}
        <span className="mx-2 text-ink/30">→</span>
        {estimate.toLabel}
        {estimate.matched && estimate.route
          ? ` · ${estimate.route.blockTime}`
          : ""}
        . The desk will return curated, operator-confirmed choices — these bands
        are for orientation only.
      </p>
      <div className="mt-8">
        <CabinOptionCards
          options={estimate.options}
          quoteHref={(opt) =>
            quoteHrefFromPlan(from, to, passengers, opt.id)
          }
          compact
        />
      </div>
      <p className="mt-5 text-xs leading-5 text-muted">{estimate.disclaimer}</p>
    </section>
  );
}
