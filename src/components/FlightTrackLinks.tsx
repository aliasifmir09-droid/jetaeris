import {
  TRACK_PRIVACY_NOTE,
  flightAwareLiveUrl,
  flightradar24AircraftUrl,
  normalizeTail,
} from "@/lib/trip-track";

type Props = {
  tail?: string;
  stage?: string;
};

/**
 * Phase B — link-out live tracking when a tail is assigned.
 * Does not embed radar; uses public FlightAware / Flightradar24 pages.
 */
export function FlightTrackLinks({ tail, stage }: Props) {
  const reg = tail ? normalizeTail(tail) : null;
  const aware = reg ? flightAwareLiveUrl(reg) : null;
  const fr24 = reg ? flightradar24AircraftUrl(reg) : null;
  const showLiveHint = stage === "airborne" || stage === "departure_window";

  if (!reg || !aware) {
    return (
      <div className="border border-[var(--line)] bg-white/60 px-5 py-5">
        <p className="text-[0.68rem] tracking-[0.16em] text-accent uppercase">
          Live map
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg text-ink">
          Track link appears after a tail is assigned
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          When the operating Part 135 carrier assigns an aircraft registration,
          you can open FlightAware or Flightradar24 from this page. Until then,
          use the status timeline and desk updates.
        </p>
        <p className="mt-3 text-xs leading-5 text-muted">{TRACK_PRIVACY_NOTE}</p>
      </div>
    );
  }

  return (
    <div className="border border-[var(--line)] bg-white/60 px-5 py-5">
      <p className="text-[0.68rem] tracking-[0.16em] text-accent uppercase">
        Live map
      </p>
      <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg text-ink">
        Track {reg} on public flight maps
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        {showLiveHint
          ? "Open a public tracker for this registration. If the jet is privacy-blocked, the map will be empty — that is normal for many private flights."
          : "Tail assigned. Public trackers are most useful once the aircraft is airborne."}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={aware}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Track on FlightAware
        </a>
        {fr24 ? (
          <a
            href={fr24}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line"
          >
            Open Flightradar24
          </a>
        ) : null}
      </div>
      <p className="mt-4 text-xs leading-5 text-muted">{TRACK_PRIVACY_NOTE}</p>
    </div>
  );
}
