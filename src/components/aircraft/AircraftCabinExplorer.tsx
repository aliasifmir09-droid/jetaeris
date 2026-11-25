"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { CabinSeatMap } from "@/components/aircraft/CabinSeatMap";
import {
  aircraftCabinExperiences,
  type AircraftCabinExperience,
} from "@/lib/aircraft-cabin";

type Props = {
  initialSlug?: string;
};

/**
 * Interactive cabin explorer for first-time flyers:
 * pick a class → see seats light up + HD interior.
 */
export function AircraftCabinExplorer({ initialSlug }: Props) {
  const initial =
    aircraftCabinExperiences.find((a) => a.slug === initialSlug) ??
    aircraftCabinExperiences[0];
  const [active, setActive] = useState<AircraftCabinExperience>(initial);
  const [fadeKey, setFadeKey] = useState(0);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setFadeKey((k) => k + 1);
  }, [active.slug]);

  function select(item: AircraftCabinExperience) {
    startTransition(() => setActive(item));
  }

  return (
    <div className="aircraft-cabin-explorer">
      {/* Class switcher — interaction, not marketing cards */}
      <div
        className="flex flex-wrap gap-2 border-b border-white/10 pb-6"
        role="tablist"
        aria-label="Aircraft class"
      >
        {aircraftCabinExperiences.map((item) => {
          const on = item.slug === active.slug;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => select(item)}
              className={`rounded-sm px-4 py-2.5 text-[0.72rem] tracking-[0.16em] uppercase transition-colors ${
                on
                  ? "bg-white !text-[var(--ink)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <div
        key={fadeKey}
        className="cabin-explorer-stage mt-10 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="space-y-8">
          <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
            <Image
              key={active.cabinSrc}
              src={active.cabinSrc}
              alt={`Representative ${active.name} cabin interior`}
              fill
              className="object-cover cabin-explorer-photo"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--section-dark)] via-transparent to-transparent opacity-70"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-6 md:p-8">
              <p className="text-[0.68rem] tracking-[0.18em] text-white/90 uppercase">
                Inside the cabin
              </p>
              <p className="mt-2 max-w-xl font-[family-name:var(--font-display)] text-2xl text-white md:text-3xl">
                {active.interiorLead}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              ["Passengers", active.seats],
              ["Best range", active.range],
              ["Best for", active.bestFor],
            ].map(([label, value]) => (
              <div key={label} className="border-t border-white/15 pt-4">
                <p className="text-[0.65rem] tracking-[0.16em] text-white/45 uppercase">
                  {label}
                </p>
                <p className="mt-2 text-[1.05rem] leading-7 text-white/90">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <ul className="space-y-3 text-[1.02rem] leading-7 text-white/75">
            {active.interiorPoints.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-soft)]" />
                {point}
              </li>
            ))}
          </ul>

          <p className="border-l-2 border-[var(--accent-soft)] pl-4 text-sm leading-7 text-white/65">
            <span className="text-white/90">First time flying private? </span>
            {active.firstTimerTip}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href={`/aircraft/${active.slug}`} className="btn btn-light">
              Explore {active.name.toLowerCase()}
            </Link>
            <Link
              href={`/quote?cabin=${encodeURIComponent(active.slug)}`}
              className="btn btn-ghost"
            >
              Request this class
            </Link>
          </div>
        </div>

        <div className="rounded-sm border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <CabinSeatMap
            seats={active.seatMap}
            typicalSeats={active.typicalSeats}
            seatMax={active.seatMax}
            dark
          />
          <div className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm leading-6 text-white/65">
            <p>
              <span className="text-white/90">Cabin feel — </span>
              {active.cabinFeel}
            </p>
            <p>
              <span className="text-white/90">Height — </span>
              {active.heightNote}
            </p>
            <p>
              <span className="text-white/90">Bags — </span>
              {active.bagsNote}
            </p>
            <p className="text-xs text-white/45">
              Photos and seat maps are representative of the class. Your
              confirmed itinerary names the operating Part 135 carrier and
              specific aircraft.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
