"use client";

import { FormEvent, useState } from "react";

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
};

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

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
        "Request received. A JetAeris concierge will respond with options shortly.",
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
      <div
        className={`grid gap-5 ${compact ? "md:grid-cols-2" : "md:grid-cols-2"}`}
      >
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
        <div className="field md:col-span-2">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Preferred aircraft, flexibility on time, return needs…"
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
          className={`text-sm leading-6 ${
            status === "success" ? "text-ink" : "text-red-700"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
