import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Jet Aeris Inc",
  description: `About ${site.legalName} (JetAeris)—USA private jet charter desk based in Queens, NY for on-demand flights, empty legs, and FBO limo.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`${site.legalName} — the company behind JetAeris.`}
        body="A modern USA private aviation desk: on-demand charter, empty legs, and coordinated FBO ground transfers—built for speed, discretion, and clarity."
        primaryHref="/contact"
        primaryLabel="Contact us"
        secondaryHref="/broker-disclosure"
        secondaryLabel="Broker disclosure"
      />
      <section className="pb-16 md:pb-24">
        <div className="container grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 text-[1.08rem] leading-8 text-ink-soft">
            <p>
              JetAeris is the consumer brand of <strong>{site.legalName}</strong>
              , based at <strong>{site.address.display}</strong>. We help
              travelers request private jet options and optional limousine
              transfers without marketplace clutter or membership hard sells.
            </p>
            <p>
              We studied how flagship aviation brands lead with confidence and
              how strong brokers start with the itinerary. Our product is
              simple: you request a flight, we return vetted options, you
              confirm, you fly.
            </p>
            <p>
              Flights are arranged with preferred Part 135 partners. The
              operating carrier is disclosed on your itinerary. See our{" "}
              <Link href="/broker-disclosure" className="underline underline-offset-4">
                Broker Disclosure
              </Link>{" "}
              and{" "}
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
                <dt className="text-muted">Address</dt>
                <dd className="mt-1 text-ink">{site.address.display}</dd>
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
              ) : null}
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
