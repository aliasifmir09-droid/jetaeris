import { airports, cities, routes } from "@/lib/content";

export type LocationOption = {
  id: string;
  label: string;
  /** Value stored in the form / query string */
  value: string;
  kind: "city" | "airport";
  city: string;
  state: string;
  code?: string;
  searchText: string;
};

/** Popular picks shown when the list opens before typing. */
export const POPULAR_LOCATION_IDS = [
  "city:new-york",
  "airport:TEB",
  "city:miami",
  "airport:OPF",
  "city:los-angeles",
  "airport:VNY",
  "city:las-vegas",
  "city:chicago",
  "city:dallas",
  "city:aspen",
] as const;

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export const locationOptions: LocationOption[] = [
  ...cities.map((city) => {
    const label = `${city.name}, ${city.state}`;
    const value = `${city.name} (${city.airports.slice(0, 2).join(" / ")})`;
    return {
      id: `city:${city.slug}`,
      label,
      value,
      kind: "city" as const,
      city: city.name,
      state: city.state,
      searchText: normalize(
        `${city.name} ${city.state} ${city.slug} ${city.airports.join(" ")} ${city.neighborhoods.join(" ")}`,
      ),
    };
  }),
  ...airports.map((airport) => {
    const label = `${airport.code} · ${airport.name}`;
    const value = `${airport.cityName} (${airport.code})`;
    return {
      id: `airport:${airport.code}`,
      label,
      value,
      kind: "airport" as const,
      city: airport.cityName,
      state: "",
      code: airport.code,
      searchText: normalize(
        `${airport.code} ${airport.name} ${airport.cityName} ${airport.citySlug}`,
      ),
    };
  }),
];

export function filterLocations(query: string, limit = 12): LocationOption[] {
  const q = normalize(query);
  if (!q) {
    const popular = POPULAR_LOCATION_IDS.map((id) =>
      locationOptions.find((o) => o.id === id),
    ).filter((o): o is LocationOption => Boolean(o));
    return popular.slice(0, limit);
  }
  const scored = locationOptions
    .map((opt) => {
      let score = 0;
      if (opt.code && normalize(opt.code) === q) score += 100;
      if (opt.searchText.startsWith(q)) score += 40;
      if (opt.searchText.includes(` ${q}`)) score += 25;
      if (opt.searchText.includes(q)) score += 10;
      // Rank cities slightly above airports only after a real text match
      if (score > 0 && opt.kind === "city") score += 2;
      return { opt, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.opt.label.localeCompare(b.opt.label));
  return scored.slice(0, limit).map((row) => row.opt);
}

export type RouteSearchItem = {
  slug: string;
  title: string;
  airports: string;
  blockTime: string;
  bestFit: string;
  summary: string;
  searchText: string;
};

export const routeSearchItems: RouteSearchItem[] = routes.map((route) => ({
  slug: route.slug,
  title: `${route.from} → ${route.to}`,
  airports: route.airports,
  blockTime: route.blockTime,
  bestFit: route.bestFit,
  summary: route.summary,
  searchText: normalize(
    `${route.from} ${route.to} ${route.airports} ${route.slug} ${route.bestFit} ${route.summary}`,
  ),
}));

export function filterRoutes(query: string): RouteSearchItem[] {
  const q = normalize(query);
  if (!q) return routeSearchItems;
  return routeSearchItems.filter((r) => r.searchText.includes(q));
}

export type CitySearchItem = {
  slug: string;
  name: string;
  state: string;
  airports: string;
  blurb: string;
  searchText: string;
};

export const citySearchItems: CitySearchItem[] = cities.map((city) => ({
  slug: city.slug,
  name: city.name,
  state: city.state,
  airports: city.airports.join(" · "),
  blurb: city.blurb,
  searchText: normalize(
    `${city.name} ${city.state} ${city.slug} ${city.airports.join(" ")} ${city.neighborhoods.join(" ")} ${city.blurb}`,
  ),
}));

export function filterCities(query: string): CitySearchItem[] {
  const q = normalize(query);
  if (!q) return citySearchItems;
  return citySearchItems.filter((c) => c.searchText.includes(q));
}
