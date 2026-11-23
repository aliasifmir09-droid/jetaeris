import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Jet Aeris Inc",
  description: `About ${site.legalName} (JetAeris)—USA private jet charter brokerage based in Queens, NY. Quote-and-concierge desk for on-demand flights, empty legs, and FBO limo.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`${site.legalName} — the company behind JetAeris.`}
        body="A USA air charter brokerage and concierge desk: request a quote for on-demand charter, empty legs, and coordinated FBO ground transfers. We do not claim instant marketplace booking or owned fleet inventory."
        primaryHref="/contact"
        primaryLabel="Contact us"
        secondaryHref="/broker-disclosure"
        secondaryLabel="Broker disclosure"
        imageSrc="/media/cabin.jpg"
        imageAlt="Private jet cabin arranged through JetAeris partners"
      />
      <section className="pb-16 md:pb-24">
        <div className="container grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 text-[1.08rem] leading-8 text-ink-soft">
            <p>
              JetAeris is the consumer brand of <strong>{site.legalName}</strong>
              . {site.address.publicNote}
            </p>
            <p>
              Our product promise is honest:{" "}
              <strong>{site.productPromise}</strong>. You describe the trip; we
              return curated Part 135 options; you confirm in writing with the
              operating carrier’s terms before payment.
            </p>
            <p>
              We are early-stage as a public brand. We do not invent fleet
              ownership, flight counts, testimonials, or safety logos. As real
              operating history, partnerships, and client stories are cleared for
              publication, they will appear here—not before.
            </p>
            <p>
              Flights are arranged with preferred Part 135 partners. The
              operating carrier is disclosed on your itinerary. See our{" "}
              <Link href="/broker-disclosure" className="underline underline-offset-4">
                Broker Disclosure
              </Link>
              ,{" "}
              <Link href="/safety" className="underline underline-offset-4">
                Safety & how we operate
              </Link>
              , and{" "}
              <Link href="/legal" className="underline underline-offset-4">
                Legal Center
              </Link>
              .
            </p>
          </div>
          <aside className="panel h-fit p-8">
            <p className="eyebrow">Company facts</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-muted">Legal name</dt>
                <dd className="mt-1 text-ink">{site.legalName}</dd>
              </div>
              <div>
                <dt className="text-muted">{site.address.kind}</dt>
                <dd className="mt-1 text-ink">{site.address.display}</dd>
              </div>
              <div>
                <dt className="text-muted">Role</dt>
                <dd className="mt-1 text-ink">{site.role}</dd>
              </div>
              <div>
                <dt className="text-muted">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.email}`} className="underline">
                    {site.email}
                  </a>
                </dd>
              </div>
              {site.phoneDisplay && site.phoneHref ? (
                <div>
                  <dt className="text-muted">Phone</dt>
                  <dd className="mt-1">
                    <a href={site.phoneHref} className="underline">
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
              ) : (
                <div>
                  <dt className="text-muted">Phone</dt>
                  <dd className="mt-1 text-muted">
                    Monitored U.S. line publishing when provisioned—email for
                    immediate requests.
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-muted">Desk</dt>
                <dd className="mt-1 text-ink">{site.deskHours}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
