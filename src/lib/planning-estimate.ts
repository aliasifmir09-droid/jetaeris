import { airports, cities, routes, type Route } from "@/lib/content";
import { site } from "@/lib/site";

export type CabinOption = {
  id: "light" | "midsize" | "super-midsize" | "heavy";
  name: string;
  seats: string;
  bestFor: string;
  /** Planning band or honest fallback copy */
  priceLabel: string;
  href: string;
  /** Whether this cabin likely fits the passenger count */
  fitsPassengers: boolean;
  status: "estimate" | "quote-only";
};

export type PlanningEstimate = {
  matched: boolean;
  fromLabel: string;
  toLabel: string;
  fromSlug: string | null;
  toSlug: string | null;
  route: Pick<
    Route,
    "slug" | "from" | "to" | "airports" | "blockTime" | "bestFit" | "priceEstimate"
  > | null;
  passengers: number;
  options: CabinOption[];
  disclaimer: string;
  updated: string;
};

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** Resolve free-text / SearchableList values to a city slug. */
export function resolveCitySlug(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  const n = normalize(raw);

  const byName = cities.find((c) => normalize(c.name) === n);
  if (byName) return byName.slug;

  const cityPrefix = cities.find(
    (c) =>
      n.startsWith(normalize(c.name)) ||
      normalize(c.name).split(" ").every((part) => n.includes(part)),
  );
  if (cityPrefix && n.includes(normalize(cityPrefix.name))) {
    return cityPrefix.slug;
  }

  const codeMatch = raw.match(/\b([A-Z]{3})\b/i);
  if (codeMatch) {
    const code = codeMatch[1].toUpperCase();
    const airport = airports.find((a) => a.code === code);
    if (airport) return airport.citySlug;
  }

  const fuzzy = cities.find(
    (c) =>
      n.includes(normalize(c.name)) ||
      c.airports.some((code) => n.includes(code.toLowerCase())),
  );
  return fuzzy?.slug ?? null;
}

function findRoute(fromSlug: string, toSlug: string): Route | null {
  return (
    routes.find((r) => r.fromSlug === fromSlug && r.toSlug === toSlug) ??
    routes.find((r) => r.fromSlug === toSlug && r.toSlug === fromSlug) ??
    null
  );
}

function superMidsizeBand(midsize: string): string {
  // Planning uplift only — not a live quote. Roughly above midsize corridor band.
  const nums = midsize.replace(/\$/g, "").match(/[\d,]+/g);
  if (!nums || nums.length < 2) return "Request live options";
  const low = Math.round(Number(nums[0].replace(/,/g, "")) * 1.35);
  const high = Math.round(Number(nums[1].replace(/,/g, "")) * 1.45);
  if (!Number.isFinite(low) || !Number.isFinite(high)) return "Request live options";
  return `$${low.toLocaleString("en-US")}–$${high.toLocaleString("en-US")}`;
}

function heavyBand(midsize: string): string {
  const nums = midsize.replace(/\$/g, "").match(/[\d,]+/g);
  if (!nums || nums.length < 2) return "Request live options";
  const low = Math.round(Number(nums[0].replace(/,/g, "")) * 1.7);
  const high = Math.round(Number(nums[1].replace(/,/g, "")) * 2.1);
  if (!Number.isFinite(low) || !Number.isFinite(high)) return "Request live options";
  return `$${low.toLocaleString("en-US")}–$${high.toLocaleString("en-US")}`;
}

const DEFAULT_DISCLAIMER =
  "Planning ranges only—not live inventory or a confirmed fare. Peak dates, positioning, weather, and operator minimums move the number. Named Part 135 carrier and final price come with your written options.";

/**
 * Anonymous trip planning: match a corridor and return cabin option cards.
 * Free text still works; unmatched corridors get honest quote-only cards.
 */
export function planTrip(
  fromInput: string,
  toInput: string,
  passengers = 2,
): PlanningEstimate {
  const pax = Math.min(16, Math.max(1, Math.round(passengers) || 2));
  const fromSlug = resolveCitySlug(fromInput);
  const toSlug = resolveCitySlug(toInput);
  const route =
    fromSlug && toSlug && fromSlug !== toSlug
      ? findRoute(fromSlug, toSlug)
      : null;

  const fromCity = fromSlug
    ? cities.find((c) => c.slug === fromSlug)
    : undefined;
  const toCity = toSlug ? cities.find((c) => c.slug === toSlug) : undefined;

  const updated = route?.priceEstimate.updated ?? site.priceGuidanceUpdated;

  if (!route) {
    return {
      matched: false,
      fromLabel: fromInput.trim() || "Origin",
      toLabel: toInput.trim() || "Destination",
      fromSlug,
      toSlug,
      route: null,
      passengers: pax,
      options: [
        {
          id: "light",
          name: "Light jet",
          seats: "6–8",
          bestFor: "Short corridors, small parties",
          priceLabel: "Live quote",
          href: "/aircraft/light-jet",
          fitsPassengers: pax <= 8,
          status: "quote-only",
        },
        {
          id: "midsize",
          name: "Midsize jet",
          seats: "8–9",
          bestFor: "More cabin and bags",
          priceLabel: "Live quote",
          href: "/aircraft/midsize-jet",
          fitsPassengers: pax <= 9,
          status: "quote-only",
        },
        {
          id: "super-midsize",
          name: "Super-midsize",
          seats: "9–10",
          bestFor: "Coast-to-coast comfort",
          priceLabel: "Live quote",
          href: "/aircraft/super-midsize-jet",
          fitsPassengers: pax <= 10,
          status: "quote-only",
        },
        {
          id: "heavy",
          name: "Heavy jet",
          seats: "10–16",
          bestFor: "Large parties / long range",
          priceLabel: "Live quote",
          href: "/aircraft/heavy-jet",
          fitsPassengers: pax <= 16,
          status: "quote-only",
        },
      ],
      disclaimer: DEFAULT_DISCLAIMER,
      updated,
    };
  }

  const light = route.priceEstimate.light;
  const midsize = route.priceEstimate.midsize;

  return {
    matched: true,
    fromLabel: fromCity?.name ?? route.from,
    toLabel: toCity?.name ?? route.to,
    fromSlug: route.fromSlug,
    toSlug: route.toSlug,
    route: {
      slug: route.slug,
      from: route.from,
      to: route.to,
      airports: route.airports,
      blockTime: route.blockTime,
      bestFit: route.bestFit,
      priceEstimate: route.priceEstimate,
    },
    passengers: pax,
    options: [
      {
        id: "light",
        name: "Light jet",
        seats: "6–8",
        bestFor: "Efficient short / medium hops",
        priceLabel: light,
        href: "/aircraft/light-jet",
        fitsPassengers: pax <= 8,
        status: "estimate",
      },
      {
        id: "midsize",
        name: "Midsize jet",
        seats: "8–9",
        bestFor: "Extra cabin comfort",
        priceLabel: midsize,
        href: "/aircraft/midsize-jet",
        fitsPassengers: pax <= 9,
        status: "estimate",
      },
      {
        id: "super-midsize",
        name: "Super-midsize",
        seats: "9–10",
        bestFor: route.bestFit.includes("Super")
          ? route.bestFit
          : "Longer nonstops",
        priceLabel: superMidsizeBand(midsize),
        href: "/aircraft/super-midsize-jet",
        fitsPassengers: pax <= 10,
        status: "estimate",
      },
      {
        id: "heavy",
        name: "Heavy jet",
        seats: "10–16",
        bestFor: "Group travel / ultra-long legs",
        priceLabel: heavyBand(midsize),
        href: "/aircraft/heavy-jet",
        fitsPassengers: pax <= 16,
        status: "estimate",
      },
    ],
    disclaimer: `${route.priceEstimate.assumptions} ${DEFAULT_DISCLAIMER}`,
    updated,
  };
}

export function quoteHrefFromPlan(
  from: string,
  to: string,
  passengers: number,
  aircraftPref?: string,
): string {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  if (passengers) params.set("passengers", String(passengers));
  if (aircraftPref) params.set("aircraftPref", aircraftPref);
  return `/quote?${params.toString()}`;
}
