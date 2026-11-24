"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { filterCities } from "@/lib/locations";

export function CitiesSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => filterCities(query), [query]);

  return (
    <div>
      <div className="field max-w-xl">
        <label htmlFor="city-search">Search cities</label>
        <input
          id="city-search"
          type="search"
          placeholder="Type a city or airport code — e.g. Dallas, LAS, Boston"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </div>
      <p className="mt-3 text-sm text-muted">
        {results.length} cit{results.length === 1 ? "y" : "ies"}
        {query.trim() ? ` matching “${query.trim()}”` : ""}
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((city) => (
          <Link
            key={city.slug}
            href={`/charter/${city.slug}`}
            className="panel p-7 transition-transform hover:-translate-y-0.5"
          >
            <p className="text-xs tracking-[0.16em] text-accent uppercase">
              {city.state}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-ink">
              {city.name}
            </h2>
            <p className="mt-3 text-sm text-muted">{city.airports}</p>
            <p className="mt-4 line-clamp-3 text-sm leading-6 text-ink-soft">
              {city.blurb}
            </p>
          </Link>
        ))}
      </div>
      {results.length === 0 ? (
        <p className="mt-8 text-ink-soft">
          No cities match. Try another spelling, or{" "}
          <Link href="/quote" className="text-accent underline underline-offset-4">
            tell us the trip
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
