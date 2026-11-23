"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function HeroQuoteStrip() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("2");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("date", date);
    if (passengers) params.set("passengers", passengers);
    router.push(`/quote?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="hero-quote-strip grid gap-3 border border-white/15 bg-black/35 p-4 backdrop-blur-md md:grid-cols-[1.1fr_1.1fr_1fr_0.7fr_auto] md:items-end md:p-5"
    >
      <div className="field-dark">
        <label htmlFor="hero-from">Origin</label>
        <input
          id="hero-from"
          name="from"
          placeholder="Teterboro (TEB)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
      </div>
      <div className="field-dark">
        <label htmlFor="hero-to">Destination</label>
        <input
          id="hero-to"
          name="to"
          placeholder="Miami / OPF / PBI"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>
      <div className="field-dark">
        <label htmlFor="hero-date">Date</label>
        <input
          id="hero-date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="field-dark">
        <label htmlFor="hero-pax">Passengers</label>
        <input
          id="hero-pax"
          name="passengers"
          type="number"
          min={1}
          max={16}
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-light h-[46px] w-full md:w-auto">
        Get a private quote
      </button>
    </form>
  );
}
