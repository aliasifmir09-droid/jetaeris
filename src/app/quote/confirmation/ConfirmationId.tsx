"use client";

import { useSearchParams } from "next/navigation";

export function ConfirmationId() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (!id) return null;
  return (
    <p className="mt-6 border border-[var(--line)] bg-white/70 px-4 py-3 text-sm text-ink">
      Request ID: <strong>{id}</strong>
    </p>
  );
}
