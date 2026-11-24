"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchableList } from "@/components/SearchableList";
import { site } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

const initial = {
  tripType: "one-way",
  from: "",
  to: "",
  date: "",
  returnDate: "",
  timePref: "",
  passengers: "2",
  bags: "",
  pets: "no",
  aircraftPref: "",
  flexibleAirports: true,
  emptyLegInterest: false,
  limo: false,
  catering: false,
  wifi: true,
  name: "",
  email: "",
  phone: "",
  company: "",
  channel: "email",
  notes: "",
  consent: false,
};

const steps = ["Trip", "Details", "Contact", "Review"] as const;

export function QuoteForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [requestId, setRequestId] = useState("");

  useEffect(() => {
    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const date = searchParams.get("date") || "";
    const passengers = searchParams.get("passengers") || "";
    const timePref = searchParams.get("timePref") || "";
    const tripType = searchParams.get("tripType") || "";
    const limo = searchParams.get("limo") === "1";
    const interest = searchParams.get("interest") || "";
    const aircraftPref = searchParams.get("aircraftPref") || "";
    setValues((v) => ({
      ...v,
      from: from || v.from,
      to: to || v.to,
      date: date || v.date,
      passengers: passengers || v.passengers,
      timePref: timePref || v.timePref,
      aircraftPref: aircraftPref || v.aircraftPref,
      tripType:
        tripType ||
        (interest === "empty-leg" ? "empty-leg" : v.tripType),
      limo: limo || v.limo,
      emptyLegInterest:
        interest === "empty-leg" ||
        tripType === "empty-leg" ||
        v.emptyLegInterest,
      notes:
        v.notes ||
        [
          interest === "empty-leg" || tripType === "empty-leg"
            ? "Empty leg interest"
            : "",
          timePref ? `Departure window: ${timePref}` : "",
          limo ? "Include FBO limo / black-car transfer" : "",
        ]
          .filter(Boolean)
          .join(". "),
    }));
  }, [searchParams]);

  function update<K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function canNext() {
    if (step === 0) return Boolean(values.from && values.to && values.date);
    if (step === 2)
      return Boolean(
        values.name && values.email && values.phone && values.consent,
      );
    return true;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < steps.length - 1) {
      if (!canNext()) return;
      setStep((s) => s + 1);
      return;
    }
    if (!values.consent) {
      setStatus("error");
      setMessage("Please agree to the privacy notice to continue.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        requestId?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Unable to send your request.");
      }
      const id = data.requestId || `JA-${Date.now().toString(36).toUpperCase()}`;
      setRequestId(id);
      setStatus("success");
      const confirm = new URLSearchParams();
      confirm.set("id", id);
      if (values.from) confirm.set("from", values.from);
      if (values.to) confirm.set("to", values.to);
      if (values.passengers) confirm.set("passengers", values.passengers);
      router.push(`/quote/confirmation?${confirm.toString()}`);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or use the contact page.",
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {steps.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => i < step && setStep(i)}
            className={`px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.14em] uppercase ${
              i === step
                ? "bg-ink text-white"
                : i < step
                  ? "border border-[var(--line-strong)] text-ink"
                  : "border border-[var(--line)] text-muted"
            }`}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      {step === 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="field md:col-span-2">
            <label htmlFor="tripType">Trip type</label>
            <select
              id="tripType"
              value={values.tripType}
              onChange={(e) => update("tripType", e.target.value)}
            >
              <option value="one-way">One-way</option>
              <option value="round-trip">Round trip</option>
              <option value="multi-city">Multi-city</option>
            </select>
          </div>
          <SearchableList
            id="from"
            label="Origin"
            placeholder="Type city or airport (e.g. TEB)"
            value={values.from}
            onChange={(v) => update("from", v)}
            required
          />
          <SearchableList
            id="to"
            label="Destination"
            placeholder="Type city or airport (e.g. OPF)"
            value={values.to}
            onChange={(v) => update("to", v)}
            required
          />
          <div className="field">
            <label htmlFor="date">Departure date</label>
            <input
              id="date"
              type="date"
              required
              value={values.date}
              onChange={(e) => update("date", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="timePref">Preferred time (optional)</label>
            <input
              id="timePref"
              placeholder="e.g. after 14:00 ET"
              value={values.timePref}
              onChange={(e) => update("timePref", e.target.value)}
            />
          </div>
          {values.tripType !== "one-way" ? (
            <div className="field md:col-span-2">
              <label htmlFor="returnDate">Return / next leg date</label>
              <input
                id="returnDate"
                type="date"
                value={values.returnDate}
                onChange={(e) => update("returnDate", e.target.value)}
              />
            </div>
          ) : null}
          <div className="field">
            <label htmlFor="passengers">Passengers</label>
            <select
              id="passengers"
              value={values.passengers}
              onChange={(e) => update("passengers", e.target.value)}
            >
              {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="aircraftPref">Preferred aircraft size</label>
            <select
              id="aircraftPref"
              value={values.aircraftPref}
              onChange={(e) => update("aircraftPref", e.target.value)}
            >
              <option value="">No preference — recommend for me</option>
              <option value="light">Light jet</option>
              <option value="midsize">Midsize</option>
              <option value="super-midsize">Super-midsize</option>
              <option value="heavy">Heavy jet</option>
            </select>
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="field">
            <label htmlFor="bags">Bags (optional)</label>
            <input
              id="bags"
              placeholder="e.g. 4 roll-aboards"
              value={values.bags}
              onChange={(e) => update("bags", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="pets">Pets</label>
            <select
              id="pets"
              value={values.pets}
              onChange={(e) => update("pets", e.target.value)}
            >
              <option value="no">No pets</option>
              <option value="yes">Yes — describe in notes</option>
            </select>
          </div>
          <label className="flex items-start gap-3 border border-[var(--line)] px-4 py-3 md:col-span-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={values.flexibleAirports}
              onChange={(e) => update("flexibleAirports", e.target.checked)}
            />
            <span className="text-sm text-ink-soft">
              Flexible on nearby FBOs if it improves aircraft or price
            </span>
          </label>
          <label className="flex items-start gap-3 border border-[var(--line)] px-4 py-3 md:col-span-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={values.emptyLegInterest}
              onChange={(e) => update("emptyLegInterest", e.target.checked)}
            />
            <span className="text-sm text-ink-soft">
              Interested in empty legs if timing is close
            </span>
          </label>
          <label className="flex items-start gap-3 border border-[var(--line)] px-4 py-3 md:col-span-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={values.limo}
              onChange={(e) => update("limo", e.target.checked)}
            />
            <span className="text-sm text-ink-soft">
              Add FBO limo / black-car transfer
            </span>
          </label>
          <label className="flex items-start gap-3 border border-[var(--line)] px-4 py-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={values.catering}
              onChange={(e) => update("catering", e.target.checked)}
            />
            <span className="text-sm text-ink-soft">Catering request</span>
          </label>
          <label className="flex items-start gap-3 border border-[var(--line)] px-4 py-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={values.wifi}
              onChange={(e) => update("wifi", e.target.checked)}
            />
            <span className="text-sm text-ink-soft">Cabin Wi-Fi preferred</span>
          </label>
          <div className="field md:col-span-2">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              placeholder="Multi-city legs, child seats, golf clubs, addresses…"
              value={values.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              required
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="company">Company (optional)</label>
            <input
              id="company"
              value={values.company}
              onChange={(e) => update("company", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              required
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
          <div className="field md:col-span-2">
            <label htmlFor="channel">Preferred contact channel</label>
            <select
              id="channel"
              value={values.channel}
              onChange={(e) => update("channel", e.target.value)}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="sms">SMS</option>
            </select>
          </div>
          <label className="flex items-start gap-3 border border-[var(--line)] px-4 py-3 md:col-span-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              required
            />
            <span className="text-sm leading-6 text-ink-soft">
              I agree that Jet Aeris Inc may use my details to respond to this
              charter request per the{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-4 border border-[var(--line)] bg-white/60 p-5 text-sm leading-7 text-ink-soft">
          <p>
            <strong className="text-ink">Trip:</strong> {values.tripType} ·{" "}
            {values.from} → {values.to} · {values.date}
            {values.returnDate ? ` · return ${values.returnDate}` : ""} ·{" "}
            {values.passengers} pax
          </p>
          <p>
            <strong className="text-ink">Preferences:</strong>{" "}
            {[
              values.aircraftPref || "recommend aircraft",
              values.flexibleAirports ? "flexible FBOs" : null,
              values.emptyLegInterest ? "empty-leg interest" : null,
              values.limo ? "FBO limo" : null,
              values.catering ? "catering" : null,
              values.wifi ? "Wi-Fi" : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <p>
            <strong className="text-ink">Contact:</strong> {values.name}
            {values.company ? ` · ${values.company}` : ""} · {values.email} ·{" "}
            {values.phone} · prefer {values.channel}
          </p>
          <p className="text-muted">{site.responsePromise}</p>
          <p className="text-xs text-muted">
            Options are subject to operator confirmation. Aircraft imagery and
            examples may be representative until a specific tail is assigned.
            Jet Aeris Inc arranges flights with Part 135 carriers and is not the
            operational-control holder unless an itinerary expressly states
            otherwise.
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        {step > 0 ? (
          <button
            type="button"
            className="btn btn-line"
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </button>
        ) : null}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "loading" || (step < 3 && !canNext())}
        >
          {status === "loading"
            ? "Sending…"
            : step < 3
              ? "Continue"
              : "Submit private quote request"}
        </button>
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
          {requestId ? ` Request ID: ${requestId}` : ""}
        </p>
      ) : null}
    </form>
  );
}
