import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Safety and how we operate",
  description:
    "How Jet Aeris Inc arranges USA private jet charter: broker role, Part 135 carrier verification, operational control, insurance screening, and aircraft imagery disclosures.",
  alternates: { canonical: "/safety" },
};

const blocks = [
  {
    title: "Who we are",
    body: `${site.legalName} (${site.name}) is an air charter broker and arranging agent. We are not a direct air carrier and do not hold operational control of flights unless an itinerary expressly states otherwise.`,
  },
  {
    title: "Legal entity and contracting",
    body: `Your contracting entity is ${site.legalName}, ${site.address.display}, United States. Charter agreements and payment instructions name the arranging entity and the operating carrier before confirmation.`,
  },
  {
    title: "Operating carrier identity",
    body: "Before payment or final confirmation, you receive the operating carrier’s legal name and relevant certificate information for that trip. Marketing aircraft examples are representative until a specific tail is assigned.",
  },
  {
    title: "Part 135 certificate checks",
    body: "We arrange flights with certificated Part 135 direct air carriers. Certificate status and operational authority are reviewed as part of option presentation and again before confirmation.",
  },
  {
    title: "Insurance and safety screening",
    body: "Preferred partners are evaluated for liability coverage, safety management practices, and third-party audit participation where available. We do not display safety logos or ratings without current permission and evidence.",
  },
  {
    title: "Operational control",
    body: "Operational control rests with the licensed direct air carrier named on your itinerary. JetAeris coordinates quoting, logistics, and passenger communication as the arranging broker.",
  },
  {
    title: "Cancellation, weather, and substitution",
    body: "Cancellation windows, weather delays, and aircraft substitution terms follow the operator’s contract for that trip and are summarized in your confirmation package. See our Cancellation Policy for brokerage-level guidance.",
  },
  {
    title: "Aircraft imagery",
    body: "Cabin and exterior photos on this site may be representative of class or similar aircraft. Confirmed itineraries specify the assigned aircraft or equivalent class subject to operator substitution terms.",
  },
];

export default function SafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Safety & operations"
        title="How we operate—and who flies the aircraft."
        body="Discretion without operational seriousness is incomplete. Every claim below is written for travelers who need clear broker disclosures before they commit."
        primaryLabel="Request a quote"
        imageSrc="/media/cabin.jpg"
        imageAlt="Cabin interior — representative until a specific aircraft is assigned"
      />
      <section className="pb-16 md:pb-24">
        <div className="container">
          <Breadcrumbs items={[{ name: "Safety" }]} />
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              {blocks.map((block) => (
                <div key={block.title} className="border-t border-[var(--line)] pt-8">
                  <h2 className="text-xl font-semibold text-ink">{block.title}</h2>
                  <p className="mt-3 max-w-2xl text-[1.02rem] leading-8 text-muted">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
            <aside className="h-fit border border-[var(--line)] bg-[var(--section-dark)] p-8 text-white md:p-10">
              <p className="eyebrow text-[var(--accent-soft)]">Desk</p>
              <h2 className="serif mt-4 text-3xl">Response & availability</h2>
              <p className="mt-5 text-[1.02rem] leading-8 text-white/70">
                {site.responsePromise}
              </p>
              <p className="mt-4 text-sm text-white/55">{site.deskHours}</p>
              <div className="mt-10 flex flex-col gap-3">
                <Link href="/broker-disclosure" className="btn btn-ghost">
                  Broker disclosure
                </Link>
                <Link href="/cancellation-policy" className="btn btn-ghost">
                  Cancellation policy
                </Link>
                <Link href="/quote" className="btn btn-light">
                  Request a quote
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
