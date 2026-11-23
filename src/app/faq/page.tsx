import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about JetAeris USA private jet charter, empty legs, pricing, safety, and booking.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "Is JetAeris an airline?",
    a: "No. JetAeris is a private aviation concierge and charter brokerage experience. Flights are operated by certificated Part 135 air carriers.",
  },
  {
    q: "How fast will I get options?",
    a: "During desk hours we typically respond in minutes with curated aircraft options. Complex itineraries or peak dates may take longer.",
  },
  {
    q: "What do I need to request a quote?",
    a: "Departure, arrival, date, passenger count, and your contact details. Notes about aircraft preference or flexibility help.",
  },
  {
    q: "Are empty legs guaranteed?",
    a: "No. Empty legs can change as operators adjust schedules. We confirm live availability before you commit.",
  },
  {
    q: "How is pricing determined?",
    a: "By aircraft category, routing, positioning, dates, and airport fees. We provide transparent assumptions with each option.",
  },
  {
    q: "Can you arrange round trips and multi-city?",
    a: "Yes. Include return or additional cities in your notes or speak with the desk after the first options arrive.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Straight answers before you request a flight."
        body="Safety, pricing, empty legs, and how the desk works—without the brochure voice."
      />
      <section className="pb-16 md:pb-24">
        <div className="container-narrow divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {faqs.map((item) => (
            <div key={item.q} className="py-8">
              <h2 className="text-xl font-semibold text-ink">{item.q}</h2>
              <p className="mt-3 text-[1.05rem] leading-8 text-muted">
                {item.a}
              </p>
            </div>
          ))}
        </div>
        <div className="container-narrow mt-10">
          <Link href="/quote" className="btn btn-primary">
            Request a flight
          </Link>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      <CtaBand />
    </>
  );
}
