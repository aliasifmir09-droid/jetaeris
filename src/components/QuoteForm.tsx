"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Status = "idle" | "loading" | "success" | "error";

const initial = {
  from: "",
  to: "",
  date: "",
  passengers: "2",
  name: "",
  email: "",
  phone: "",
  notes: "",
  limo: false,
  limoCity: "",
};

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const searchParams = useSearchParams();
  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const limo = searchParams.get("limo") === "1";
    const city = searchParams.get("city") || "";
    const interest = searchParams.get("interest") || "";
    setValues((v) => ({
      ...v,
      from: from || v.from,
      to: to || v.to,
      limo: limo || v.limo,
      limoCity: city || v.limoCity,
      notes:
        v.notes ||
        [interest === "empty-leg" ? "Empty leg interest" : "", limo ? "Please include FBO limo / black-car transfer" : ""]
          .filter(Boolean)
          .join(". "),
    }));
  }, [searchParams]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Unable to send your request.");
      }
      setStatus("success");
      setMessage(
        values.limo
          ? "Request received—including ground transfer. A JetAeris concierge will respond shortly."
          : "Request received. A JetAeris concierge will respond with options shortly.",
      );
      setValues(initial);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please email concierge@jetaeris.com.",
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className={`grid gap-5 ${compact ? "md:grid-cols-2" : "md:grid-cols-2"}`}>
        <div className="field">
          <label htmlFor="from">Departure</label>
          <input
            id="from"
            name="from"
            required
            placeholder="City or airport (e.g. TEB)"
            value={values.from}
            onChange={(e) => setValues((v) => ({ ...v, from: e.target.value }))}
          />
        </div>
        <div className="field">
          <label htmlFor="to">Arrival</label>
          <input
            id="to"
            name="to"
            required
            placeholder="City or airport (e.g. OPF)"
            value={values.to}
            onChange={(e) => setValues((v) => ({ ...v, to: e.target.value }))}
          />
        </div>
        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            required
            value={values.date}
            onChange={(e) => setValues((v) => ({ ...v, date: e.target.value }))}
          />
        </div>
        <div className="field">
          <label htmlFor="passengers">Passengers</label>
          <select
            id="passengers"
            name="passengers"
            value={values.passengers}
            onChange={(e) =>
              setValues((v) => ({ ...v, passengers: e.target.value }))
            }
          >
            {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) =>
              setValues((v) => ({ ...v, email: e.target.value }))
            }
          />
        </div>
        <div className="field md:col-span-2">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={values.phone}
            onChange={(e) =>
              setValues((v) => ({ ...v, phone: e.target.value }))
            }
          />
        </div>
        <div className="md:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 border border-[var(--line)] bg-white/50 px-4 py-4">
            <input
              type="checkbox"
              className="mt-1"
              checked={values.limo}
              onChange={(e) =>
                setValues((v) => ({ ...v, limo: e.target.checked }))
              }
            />
            <span>
              <span className="block text-sm font-semibold text-ink">
                Add FBO limo / black-car transfer
              </span>
              <span className="mt-1 block text-sm leading-6 text-muted">
                Sedan, SUV, sprinter, or stretch—timed to wheels-up and
                wheels-down in top USA cities.
              </span>
            </span>
          </label>
        </div>
        <div className="field md:col-span-2">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Preferred aircraft, limo vehicle type, addresses, empty-leg flexibility…"
            value={values.notes}
            onChange={(e) =>
              setValues((v) => ({ ...v, notes: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending…" : "Submit request"}
        </button>
        <p className="max-w-sm text-sm leading-6 text-muted">
          Typical response under 15 minutes during desk hours. No obligation.
        </p>
      </div>

      {message ? (
        <p
          role="status"
          className={`border px-4 py-3 text-sm leading-6 ${
            status === "success"
              ? "border-[var(--line-strong)] bg-white text-ink"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
