import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private jet charter Miami",
  description:
    "Private jet charter in Miami and South Florida with JetAeris—Opa-locka, Miami International, Fort Lauderdale, and Palm Beach FBO access.",
  alternates: { canonical: "/charter/miami" },
};

export default function MiamiCharterPage() {
  return (
    <div className="bg-paper pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container">
        <p className="eyebrow">City guide</p>
        <h1 className="serif mt-4 max-w-4xl text-[clamp(2.6rem,6vw,4.8rem)] text-ink">
          Private jet charter in Miami
        </h1>
        <p className="lede mt-6 max-w-2xl">
          South Florida pairs year-round demand with dense FBO infrastructure.
          JetAeris covers leisure peaks, event weeks, and weekday corporate
          flows with on-demand options and empty-leg monitoring from the
          Northeast and Midwest.
        </p>
        <ul className="mt-10 max-w-xl space-y-3 text-[1.05rem] leading-8 text-ink-soft">
          <li>Opa-locka (OPF) — frequent private aviation gateway</li>
          <li>Fort Lauderdale (FLL) & Palm Beach (PBI) — strong leisure alternatives</li>
          <li>Miami (MIA) — when itinerary connectivity requires it</li>
        </ul>
        <Link href="/quote" className="btn btn-primary mt-12">
          Request a Miami trip
        </Link>
      </div>
    </div>
  );
}
