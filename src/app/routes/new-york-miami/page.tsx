import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Private jet New York to Miami",
  description:
    "Charter a private jet from New York to Miami with JetAeris. TEB, JFK, HPN to OPF, MIA, FLL—light to heavy jet options and empty-leg watches.",
  alternates: { canonical: "/routes/new-york-miami" },
};

export default function NewYorkMiamiPage() {
  const faq = [
    {
      q: "How long is a private jet from New York to Miami?",
      a: "Most light and midsize jets block roughly 2 hours 30 minutes to 3 hours depending on winds, routing, and the specific city-pair airports.",
    },
    {
      q: "Which airports are typical?",
      a: "Common New York-area departures include Teterboro (TEB), Westchester (HPN), and sometimes JFK or Newark. Florida arrivals often use Opa-locka (OPF), Miami (MIA), Fort Lauderdale (FLL), or Palm Beach (PBI).",
    },
    {
      q: "What does it cost?",
      a: "Pricing moves with aircraft category, date, direction, and empty-leg availability. Request a quote for live options rather than relying on static averages.",
    },
  ];

  return (
    <div className="bg-paper pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container">
        <p className="eyebrow">Route</p>
        <h1 className="serif mt-4 max-w-4xl text-[clamp(2.6rem,6vw,4.8rem)] text-ink">
          Private jet from New York to Miami
        </h1>
        <p className="lede mt-6 max-w-2xl">
          The Northeast–South Florida corridor is one of the most traveled
          private routes in the United States. JetAeris arranges on-demand
          charter and watches empty legs when your timing is flexible.
        </p>
        <Link href="/quote" className="btn btn-primary mt-8">
          Request this route
        </Link>

        <div className="mt-16 grid gap-10 border-t border-[var(--line)] pt-12 lg:grid-cols-3">
          {[
            ["Airports", "TEB · HPN · JFK → OPF · MIA · FLL · PBI"],
            ["Typical block", "≈ 2h 45m"],
            ["Aircraft fit", "Light jet for couples · midsize for teams"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-xs tracking-[0.16em] text-accent uppercase">{k}</p>
              <p className="mt-3 text-lg text-ink-soft">{v}</p>
            </div>
          ))}
        </div>

        <section className="mt-20">
          <SectionHeading
            eyebrow="FAQ"
            title="What travelers ask before they book."
          />
          <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {faq.map((item) => (
              <div key={item.q} className="py-8">
                <h2 className="text-xl font-semibold text-ink">{item.q}</h2>
                <p className="mt-3 max-w-3xl text-[1.05rem] leading-8 text-muted">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </div>
  );
}
