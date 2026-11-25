"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  type TripStageId,
  isTripStageId,
  writeTripToStorage,
} from "@/lib/trip-track";

/**
 * On quote confirmation, seed browser trip status so /track works immediately.
 */
export function SeedTrackedTrip() {
  const params = useSearchParams();

  useEffect(() => {
    const id = params.get("id");
    if (!id) return;
    const stageRaw = params.get("stage") || "received";
    const stage: TripStageId = isTripStageId(stageRaw) ? stageRaw : "received";
    writeTripToStorage({
      id,
      from: params.get("from") || "",
      to: params.get("to") || "",
      passengers: params.get("passengers") || "",
      date: params.get("date") || "",
      stage,
      tail: params.get("tail") || "",
      updatedAt: new Date().toISOString(),
    });
  }, [params]);

  return null;
}
