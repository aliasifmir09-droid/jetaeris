"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { filterRoutes } from "@/lib/locations";

export function RoutesSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => filterRoutes(query), [query]);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  return (
    <div>
      <div className="field max-w-xl">
        <label htmlFor="route-search">Search routes</label>
        <input
          id="route-search"
          type="search"
          placeholder="Type a city or airport — e.g. Miami, TEB, Aspen"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </div>
      <p className="mt-3 text-sm text-muted">
        {results.length} route{results.length === 1 ? "" : "s"}
        {query.trim() ? ` matching “${query.trim()}”` : ""}
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {results.map((route) => (
          <Link
            key={route.slug}
            href={`/routes/${route.slug}`}
            className="panel p-8 transition-transform hover:-translate-y-0.5"
          >
            <p className="text-xs tracking-[0.16em] text-accent uppercase">
              {route.airports}
            </p>
            <h2 className="serif mt-4 text-3xl text-ink">{route.title}</h2>
            <p className="mt-3 text-sm text-muted">
              {route.blockTime} · {route.bestFit}
            </p>
            <p className="mt-4 text-sm leading-7 text-ink-soft">{route.summary}</p>
          </Link>
        ))}
      </div>
      {results.length === 0 ? (
        <p className="mt-8 text-ink-soft">
          No routes match that search. Try another city, or{" "}
          <Link href="/quote" className="text-accent underline underline-offset-4">
            request a custom quote
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
