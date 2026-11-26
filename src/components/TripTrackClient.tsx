"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FlightTrackLinks } from "@/components/FlightTrackLinks";
import { TripStatusTimeline } from "@/components/TripStatusTimeline";
import {
  type TrackedTrip,
  type TripStageId,
  buildTrackHref,
  findTripInStorage,
  isTripStageId,
  writeTripToStorage,
} from "@/lib/trip-track";
import { site } from "@/lib/site";

function tripFromParams(
  params: URLSearchParams,
  fallback?: TrackedTrip | null,
): TrackedTrip | null {
  const id = params.get("id") || fallback?.id || "";
  if (!id) return null;
  const stageRaw = params.get("stage") || fallback?.stage || "received";
  const stage: TripStageId = isTripStageId(stageRaw) ? stageRaw : "received";
  return {
    id,
    from: params.get("from") || fallback?.from || "",
    to: params.get("to") || fallback?.to || "",
    passengers: params.get("passengers") || fallback?.passengers || "",
    date: params.get("date") || fallback?.date || "",
    stage,
    tail: params.get("tail") || fallback?.tail || "",
    updatedAt: fallback?.updatedAt || new Date().toISOString(),
  };
}

/**
 * Customer trip tracker: status timeline (A) + FlightAware link-out (B).
 */
export function TripTrackClient() {
  const searchParams = useSearchParams();
  const [lookupId, setLookupId] = useState("");
  const [trip, setTrip] = useState<TrackedTrip | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    const stored = id ? findTripInStorage(id) : null;
    const next = tripFromParams(searchParams, stored);
    if (next) {
      writeTripToStorage(next);
      setTrip(next);
      setLookupId(next.id);
    }
  }, [searchParams]);

  const corridor = useMemo(() => {
    if (!trip) return "";
    if (trip.from && trip.to) return `${trip.from} → ${trip.to}`;
    return "Trip details on file with the desk";
  }, [trip]);

  function onLookup(e: FormEvent) {
    e.preventDefault();
    const id = lookupId.trim();
    if (!id) return;
    const stored = findTripInStorage(id);
    if (stored) {
      setTrip(stored);
      window.history.replaceState(null, "", buildTrackHref(stored));
      return;
    }
    const created: TrackedTrip = {
      id,
      from: "",
      to: "",
      stage: "received",
      updatedAt: new Date().toISOString(),
    };
    writeTripToStorage(created);
    setTrip(created);
    window.history.replaceState(null, "", buildTrackHref(created));
  }

  return (
    <div className="space-y-10">
      <form
        onSubmit={onLookup}
        className="grid gap-3 border border-[var(--line)] bg-white/70 p-4 md:grid-cols-[1fr_auto] md:items-end md:p-5"
      >
        <div className="field">
          <label htmlFor="track-id">Request ID</label>
          <input
            id="track-id"
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
            placeholder="e.g. JA-…"
            autoComplete="off"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary h-[46px]">
          Track trip
        </button>
      </form>

      {trip ? (
        <>
          <div className="border border-[var(--line)] bg-white/70 px-5 py-5">
            <p className="text-[0.68rem] tracking-[0.16em] text-accent uppercase">
              Trip status
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-ink">
              {trip.id}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {corridor}
              {trip.date ? ` · ${trip.date}` : ""}
              {trip.passengers ? ` · ${trip.passengers} passengers` : ""}
            </p>
            <div className="mt-8">
              <TripStatusTimeline current={trip.stage} />
            </div>
          </div>

          <FlightTrackLinks tail={trip.tail} stage={trip.stage} />

          <p className="text-sm leading-6 text-muted">
            Desk updates: {site.responsePromise} Call{" "}
            {site.phoneHref ? (
              <a className="text-accent underline" href={site.phoneHref}>
                {site.phoneDisplay}
              </a>
            ) : (
              "the desk"
            )}{" "}
            or email{" "}
            <a className="text-accent underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            with your request ID if you need a status refresh. Confirmed
            bookings begin {site.bookingOpensLabel}.
          </p>
        </>
      ) : (
        <p className="text-sm leading-6 text-muted">
          Enter the request ID from your confirmation email, or{" "}
          <Link href="/quote" className="text-accent underline">
            request a quote
          </Link>{" "}
          to start a trackable trip.
        </p>
      )}
    </div>
  );
}
