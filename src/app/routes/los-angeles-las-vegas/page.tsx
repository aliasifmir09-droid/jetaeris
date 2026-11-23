import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private jet Los Angeles to Las Vegas",
  description:
    "Charter a private jet from Los Angeles to Las Vegas with JetAeris. Van Nuys and LA-area departures to LAS—ideal light-jet corridor with frequent empty legs.",
  alternates: { canonical: "/routes/los-angeles-las-vegas" },
};

export default function LaVegasPage() {
  return (
    <div className="bg-paper pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container">
        <p className="eyebrow">Route</p>
        <h1 className="serif mt-4 max-w-4xl text-[clamp(2.6rem,6vw,4.8rem)] text-ink">
          Private jet from Los Angeles to Las Vegas
        </h1>
        <p className="lede mt-6 max-w-2xl">
          A short-hop classic. Light jets shine on this corridor—quick FBO
          turns, evening returns, and frequent positioning flights that create
          empty-leg opportunities.
        </p>
        <div className="mt-10 grid gap-8 border-t border-[var(--line)] pt-10 md:grid-cols-3">
          {[
            ["Airports", "VNY · LAX · BUR → LAS · HND area FBOs"],
            ["Typical block", "≈ 1h 10m"],
            ["Best fit", "Phenom 300 · Citation CJ series"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-xs tracking-[0.16em] text-accent uppercase">{k}</p>
              <p className="mt-3 text-lg text-ink-soft">{v}</p>
            </div>
          ))}
        </div>
        <Link href="/quote" className="btn btn-primary mt-12">
          Request this route
        </Link>
      </div>
    </div>
  );
}
