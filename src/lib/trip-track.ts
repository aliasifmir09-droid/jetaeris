/**
 * Phase A — trip status timeline (desk → options → confirm → fly).
 * Phase B — public FlightAware / Flightradar24 links when a tail is assigned.
 *
 * Live radar is only meaningful after a Part 135 operator assigns a tail.
 * Many private jets are privacy-blocked on public trackers.
 */

export const TRIP_STAGES = [
  {
    id: "received",
    label: "Request received",
    detail: "Your quote is in the JetAeris desk queue.",
  },
  {
    id: "options",
    label: "Options sent",
    detail: "Curated aircraft options are on the way by email (and phone/SMS if selected).",
  },
  {
    id: "confirmed",
    label: "Trip confirmed",
    detail: "Written confirmation with the named Part 135 operating carrier.",
  },
  {
    id: "departure_window",
    label: "Departure window",
    detail: "FBO, timing, and passenger details locked for departure day.",
  },
  {
    id: "airborne",
    label: "Airborne",
    detail: "Aircraft is underway — public track links work only if the tail is not privacy-blocked.",
  },
  {
    id: "landed",
    label: "Landed",
    detail: "Arrival complete. Ground / limo updates follow your itinerary if arranged.",
  },
] as const;

export type TripStageId = (typeof TRIP_STAGES)[number]["id"];

export type TrackedTrip = {
  id: string;
  from: string;
  to: string;
  passengers?: string;
  date?: string;
  stage: TripStageId;
  /** Aircraft registration when assigned by the operator, e.g. N123AB */
  tail?: string;
  updatedAt: string;
};

export function isTripStageId(value: string): value is TripStageId {
  return TRIP_STAGES.some((s) => s.id === value);
}

export function stageIndex(stage: TripStageId): number {
  return TRIP_STAGES.findIndex((s) => s.id === stage);
}

/** Normalize US N-numbers and similar registrations for tracker URLs. */
export function normalizeTail(raw: string): string | null {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (cleaned.length < 2 || cleaned.length > 10) return null;
  return cleaned;
}

export function flightAwareLiveUrl(tail: string): string | null {
  const reg = normalizeTail(tail);
  if (!reg) return null;
  return `https://www.flightaware.com/live/flight/${encodeURIComponent(reg)}`;
}

export function flightradar24AircraftUrl(tail: string): string | null {
  const reg = normalizeTail(tail);
  if (!reg) return null;
  return `https://www.flightradar24.com/data/aircraft/${encodeURIComponent(reg)}`;
}

export const TRACK_PRIVACY_NOTE =
  "Public live maps (FlightAware / Flightradar24) only work when the operating carrier’s aircraft is visible on open ADS-B. Many private jets use privacy programs and will not appear — the desk still updates you by email/SMS.";

const STORAGE_KEY = "jetaeris.trackedTrips.v1";

export function readTripsFromStorage(): TrackedTrip[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as TrackedTrip[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeTripToStorage(trip: TrackedTrip): void {
  if (typeof window === "undefined") return;
  const existing = readTripsFromStorage().filter((t) => t.id !== trip.id);
  existing.unshift(trip);
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(existing.slice(0, 20)),
  );
}

export function findTripInStorage(id: string): TrackedTrip | null {
  return readTripsFromStorage().find((t) => t.id === id) ?? null;
}

export function buildTrackHref(trip: Pick<TrackedTrip, "id" | "from" | "to" | "passengers" | "date" | "stage" | "tail">): string {
  const params = new URLSearchParams();
  params.set("id", trip.id);
  if (trip.from) params.set("from", trip.from);
  if (trip.to) params.set("to", trip.to);
  if (trip.passengers) params.set("passengers", trip.passengers);
  if (trip.date) params.set("date", trip.date);
  if (trip.stage) params.set("stage", trip.stage);
  if (trip.tail) params.set("tail", trip.tail);
  return `/track?${params.toString()}`;
}
