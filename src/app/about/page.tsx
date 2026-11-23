import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About JetAeris—the USA private aviation desk for on-demand charter and empty legs, built for speed, discretion, and clarity.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-paper pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="About JetAeris"
          title="A modern desk for American private flight."
          body="We studied how VistaJet separates the trip from the relationship, how NetJets leads with confidence over spec sheets, and how strong brokers begin with the itinerary. JetAeris is the synthesis for USA travelers who want flagship calm without institutional friction."
        />

        <div className="mt-12 space-y-6 text-[1.08rem] leading-8 text-ink-soft">
          <p>
            Private aviation websites usually fail in one of two ways: they look
            cheap while shouting “luxury,” or they look expensive while hiding
            how to actually book a trip. We refuse both.
          </p>
          <p>
            Our product is simple. You request a flight. We return options from
            vetted partners. You confirm. You fly. Empty legs are a first-class
            path—not a buried sidebar—because that is where a new brand can
            genuinely outmaneuver larger incumbents.
          </p>
          <p>
            Contact the desk at{" "}
            <a className="underline decoration-[var(--accent)] underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            or{" "}
            <a className="underline decoration-[var(--accent)] underline-offset-4" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
            .
          </p>
        </div>

        <Link href="/quote" className="btn btn-primary mt-12">
          Request a flight
        </Link>
      </div>
    </div>
  );
}
