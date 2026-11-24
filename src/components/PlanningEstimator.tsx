"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CabinOptionCards } from "@/components/CabinOptionCards";
import { SearchableList } from "@/components/SearchableList";
import {
  planTrip,
  quoteHrefFromPlan,
} from "@/lib/planning-estimate";
import { site } from "@/lib/site";

/**
 * Anonymous planning calculator — type a corridor, see cabin bands,
 * then request a quote. No email required to estimate.
 */
export function PlanningEstimator() {
  const [from, setFrom] = useState("New York (TEB)");
  const [to, setTo] = useState("Miami (OPF / MIA)");
  const [passengers, setPassengers] = useState("2");

  const pax = Number(passengers) || 2;
  const estimate = useMemo(
    () => planTrip(from, to, pax),
    [from, to, pax],
  );

  const ready = Boolean(from.trim() && to.trim());

  return (
    <section
      id="plan"
      className="border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper-deep)_35%,white)] py-16 md:py-24"
    >
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
            Plan a trip
          </p>
          <h2 className="serif mt-3 text-[clamp(1.8rem,3.5vw,2.6rem)] text-ink">
            See planning ranges before you talk to the desk.
          </h2>
          <p className="mt-3 text-[1.02rem] leading-7 text-muted">
            Type origin and destination — no account, no email. Ranges are
            planning bands for this corridor, not a live booking price.
          </p>
        </div>

        <div className="mt-10 grid gap-3 border border-[var(--line)] bg-white/80 p-4 md:grid-cols-[1fr_1fr_0.55fr_auto] md:items-end md:p-5">
          <SearchableList
            id="plan-from"
            label="Origin"
            placeholder="Type city or airport"
            value={from}
            onChange={setFrom}
          />
          <SearchableList
            id="plan-to"
            label="Destination"
            placeholder="Type city or airport"
            value={to}
            onChange={setTo}
          />
          <div className="field">
            <label htmlFor="plan-pax">Passengers</label>
            <input
              id="plan-pax"
              type="number"
              min={1}
              max={16}
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            />
          </div>
          <Link
            href={
              ready
                ? quoteHrefFromPlan(from, to, pax)
                : "/quote"
            }
            className="btn btn-primary h-[46px] w-full md:w-auto"
          >
            Request a quote
          </Link>
        </div>

        {ready ? (
          <div className="mt-10">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm text-muted">
                  {estimate.fromLabel}
                  <span className="mx-2 text-ink/30">→</span>
                  {estimate.toLabel}
                  <span className="mx-2 text-muted">·</span>
                  {estimate.passengers} passengers
                </p>
                {estimate.matched && estimate.route ? (
                  <p className="mt-1 text-xs tracking-[0.12em] text-accent uppercase">
                    {estimate.route.airports} · {estimate.route.blockTime} ·
                    updated {estimate.updated}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-muted">
                    No published corridor band for this pair yet — request a
                    live desk quote. Guidance updated {estimate.updated}.
                  </p>
                )}
              </div>
              {estimate.matched && estimate.route ? (
                <Link
                  href={`/routes/${estimate.route.slug}`}
                  className="text-xs tracking-[0.14em] text-accent uppercase"
                >
                  Full route page →
                </Link>
              ) : null}
            </div>

            <CabinOptionCards
              options={estimate.options}
              quoteHref={(opt) =>
                quoteHrefFromPlan(from, to, pax, opt.id)
              }
            />

            <p className="mt-6 max-w-3xl text-xs leading-5 text-muted">
              {estimate.disclaimer} Bookings open {site.bookingOpensLabel}.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
