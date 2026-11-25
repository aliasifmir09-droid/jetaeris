import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { TripTrackClient } from "@/components/TripTrackClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Track your JetAeris trip",
  description:
    "Follow your JetAeris quote from desk queue to confirmation. When a tail is assigned, open FlightAware or Flightradar24 — public maps may be blank for privacy-blocked private jets.",
  alternates: { canonical: "/track" },
};

export default function TrackPage() {
  return (
    <>
      <PageHero
        eyebrow="Track a trip"
        title="Status first. Live map when a tail is assigned."
        body={`Follow where your request sits with the desk. After the Part 135 operator assigns an aircraft, open FlightAware or Flightradar24 from this page. Quotes open now; confirmed bookings begin ${site.bookingOpensLabel}.`}
        primaryHref="/quote"
        primaryLabel="Request a quote"
        secondaryHref="/how-to-book"
        secondaryLabel="How booking works"
      />

      <section className="border-b border-[var(--line)] pb-16 md:pb-24">
        <div className="container max-w-3xl">
          <Suspense
            fallback={
              <p className="text-sm text-muted">Loading trip tracker…</p>
            }
          >
            <TripTrackClient />
          </Suspense>
          <p className="mt-10 text-xs leading-5 text-muted">
            JetAeris is a broker — we do not operate a private FlightRadar
            network. Live positions come from public ADS-B pages when the
            aircraft is visible. Need help?{" "}
            <Link href="/contact" className="text-accent underline">
              Contact the desk
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
