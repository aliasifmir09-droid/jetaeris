import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private jet charter New York",
  description:
    "Private jet charter from New York with JetAeris—Teterboro, Westchester, JFK, and Newark access for on-demand and empty-leg flights.",
  alternates: { canonical: "/charter/new-york" },
};

export default function NewYorkCharterPage() {
  return (
    <div className="bg-paper pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container">
        <p className="eyebrow">City guide</p>
        <h1 className="serif mt-4 max-w-4xl text-[clamp(2.6rem,6vw,4.8rem)] text-ink">
          Private jet charter in New York
        </h1>
        <p className="lede mt-6 max-w-2xl">
          New York remains the gravitational center of East Coast private
          aviation. We arrange departures and arrivals across the metro FBO
          network with the same concierge standard whether you fly south for the
          weekend or west for business.
        </p>
        <ul className="mt-10 max-w-xl space-y-3 text-[1.05rem] leading-8 text-ink-soft">
          <li>Teterboro (TEB) — preferred for many corporate and leisure trips</li>
          <li>Westchester (HPN) — strong for northern suburbs and Connecticut</li>
          <li>JFK / EWR — selective use when itinerary or customs demand it</li>
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/quote" className="btn btn-primary">
            Request a New York departure
          </Link>
          <Link href="/routes/new-york-miami" className="btn btn-line">
            NY → Miami route
          </Link>
        </div>
      </div>
    </div>
  );
}
