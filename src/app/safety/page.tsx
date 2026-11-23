import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Safety",
  description:
    "JetAeris safety standards for USA private jet charter: vetted Part 135 operators, audit culture, and transparent operating disclosure.",
  alternates: { canonical: "/safety" },
};

export default function SafetyPage() {
  return (
    <div className="bg-paper pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow="Safety & operations"
            title="Discretion without cutting corners."
            body="NetJets taught the category that luxury without operational seriousness is incomplete. We source only through preferred carrier partners and keep safety claims specific."
          />
          <div className="mt-12 space-y-8">
            {[
              [
                "Part 135 partners",
                "Flights are operated by certificated air carriers. JetAeris arranges charter; we do not exercise operational control as a direct air carrier.",
              ],
              [
                "Operator diligence",
                "We prioritize operators with established safety management practices and third-party audit participation where available (ARGUS / Wyvern as applicable to the partner).",
              ],
              [
                "Trip confirmation",
                "Aircraft, crew, and itinerary details are confirmed before you travel. Specs on marketing pages are representative until a specific tail is assigned.",
              ],
            ].map(([title, body]) => (
              <div key={title} className="border-t border-[var(--line)] pt-8">
                <h2 className="text-xl font-semibold text-ink">{title}</h2>
                <p className="mt-3 max-w-xl text-[1.02rem] leading-8 text-muted">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="border border-[var(--line)] bg-[var(--section-dark)] p-8 text-white md:p-10">
          <p className="eyebrow text-[var(--accent-soft)]">Disclosure</p>
          <h2 className="serif mt-4 text-3xl">How we describe ourselves</h2>
          <p className="mt-5 text-[1.02rem] leading-8 text-white/70">
            JetAeris is a private aviation concierge and charter brokerage
            experience for United States travel. We arrange flights with
            preferred air carrier partners. Always verify the operating
            certificate holder named on your itinerary.
          </p>
          <Link href="/quote" className="btn btn-ghost mt-10">
            Speak with the desk
          </Link>
        </aside>
      </div>
    </div>
  );
}
