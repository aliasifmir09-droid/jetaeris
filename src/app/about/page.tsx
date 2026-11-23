import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About JetAeris—the USA private aviation desk for on-demand charter and empty legs.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About JetAeris"
        title="A modern desk for American private flight."
        body="We studied how VistaJet separates the trip from the relationship, how NetJets leads with confidence over spec sheets, and how strong brokers begin with the itinerary. JetAeris is the synthesis."
      />
      <section className="pb-16 md:pb-24">
        <div className="container-narrow space-y-6 text-[1.08rem] leading-8 text-ink-soft">
          <p>
            Private aviation websites usually fail in one of two ways: they look
            cheap while shouting “luxury,” or they look expensive while hiding
            how to book. We refuse both.
          </p>
          <p>
            Our product is simple. You request a flight. We return options from
            vetted partners. You confirm. You fly. Empty legs are a first-class
            path—because that is where a new brand can outmaneuver incumbents.
          </p>
          <p>
            Contact{" "}
            <a
              className="underline decoration-[var(--accent)] underline-offset-4"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>{" "}
            or{" "}
            <a
              className="underline decoration-[var(--accent)] underline-offset-4"
              href={site.phoneHref}
            >
              {site.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
