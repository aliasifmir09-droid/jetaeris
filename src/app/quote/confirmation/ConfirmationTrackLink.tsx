"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buildTrackHref } from "@/lib/trip-track";

export function ConfirmationTrackLink({ asButton }: { asButton?: boolean }) {
  const params = useSearchParams();
  const id = params.get("id");
  if (!id) {
    return asButton ? (
      <Link href="/track" className="btn btn-primary">
        Track a trip
      </Link>
    ) : null;
  }

  const href = buildTrackHref({
    id,
    from: params.get("from") || "",
    to: params.get("to") || "",
    passengers: params.get("passengers") || "",
    date: params.get("date") || "",
    stage: "received",
    tail: params.get("tail") || "",
  });

  if (asButton) {
    return (
      <Link href={href} className="btn btn-primary">
        Open trip tracker
      </Link>
    );
  }

  return (
    <p className="mt-6 text-sm text-muted">
      Save this link:{" "}
      <Link href={href} className="font-semibold text-accent underline">
        Track request {id}
      </Link>
    </p>
  );
}
