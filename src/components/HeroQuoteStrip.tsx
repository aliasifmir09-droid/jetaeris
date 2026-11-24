"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchableList } from "@/components/SearchableList";
import { site } from "@/lib/site";

export function HeroQuoteStrip() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("2");
  const [tripType, setTripType] = useState("one-way");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("date", date);
    if (passengers) params.set("passengers", passengers);
    if (tripType) params.set("tripType", tripType);
    router.push(`/quote?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="hero-quote-strip grid gap-3 border border-white/15 bg-black/35 p-4 backdrop-blur-md md:grid-cols-[1fr_1fr_0.9fr_0.65fr_0.85fr_auto] md:items-end md:p-5"
      data-hero-quote="true"
    >
      <SearchableList
        id="hero-from"
        name="from"
        label="Origin"
        placeholder="Type city or airport"
        value={from}
        onChange={setFrom}
        required
        variant="dark"
      />
      <SearchableList
        id="hero-to"
        name="to"
        label="Destination"
        placeholder="Type city or airport"
        value={to}
        onChange={setTo}
        required
        variant="dark"
      />
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
      <div className="field-dark">
        <label htmlFor="hero-trip">Trip type</label>
        <select
          id="hero-trip"
          name="tripType"
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
        >
          <option value="one-way">One-way</option>
          <option value="round-trip">Round-trip</option>
          <option value="multi-city">Multi-city</option>
          <option value="empty-leg">Empty leg</option>
        </select>
      </div>
      <button type="submit" className="btn btn-light h-[46px] w-full md:w-auto">
        Request a quote
      </button>
      <p className="text-xs leading-5 text-white/55 md:col-span-full">
        Start typing a city or airport code to open the list · Quotes open now ·
        Bookings {site.bookingOpensLabel}
      </p>
    </form>
  );
}
