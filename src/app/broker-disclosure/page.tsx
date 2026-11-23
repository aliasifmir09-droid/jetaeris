import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Broker Disclosure",
  description: `Air charter broker disclosure for ${site.legalName}—how JetAeris arranges flights with Part 135 carriers.`,
  alternates: { canonical: "/broker-disclosure" },
};

export default function BrokerDisclosurePage() {
  return (
    <LegalDoc title="Air Charter Broker Disclosure">
      <p>
        <strong>{site.legalName}</strong> operates the JetAeris brand and
        arranges private air charter and related services for clients in the
        United States as an air charter broker / arranging agent.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">Contracting entity</h2>
      <p>
        Unless documents state otherwise, the arranging entity named on customer
        communications is {site.legalName}. {site.address.publicNote}
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">Operational control</h2>
      <p>
        Unless an itinerary expressly states otherwise, flights are operated by
        certificated direct air carriers holding FAA Part 135 authority (or
        equivalent). {site.legalName} arranges transportation; the named carrier
        on your itinerary holds operational control of the flight.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">What we disclose before payment</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>That JetAeris is not the airline unless expressly stated</li>
        <li>The operating carrier’s identity on confirmed itineraries</li>
        <li>That aircraft shown in marketing may be representative until a tail is assigned</li>
        <li>Cancellation and payment terms from the provider for that trip</li>
      </ul>

      <h2 className="serif pt-4 text-2xl text-ink">Carrier verification process</h2>
      <p>
        Before presenting options and again before confirmation, the desk
        reviews Part 135 certificate status and related operational authority
        for candidate carriers. Insurance and safety-screening expectations are
        described on our{" "}
        <a className="underline" href="/safety">
          Safety & how we operate
        </a>{" "}
        page. We do not display third-party safety logos or ratings without
        current permission and evidence.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">Payment handling</h2>
      <p>
        Payment instructions are provided in written confirmation materials.
        JetAeris does not claim to be an escrow bank; funds flow according to
        the trip documents for that engagement.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">Complaints</h2>
      <p>
        Customer service and complaint intake: {site.email}. Legal notices:{" "}
        {site.legalEmail}.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">Company details</h2>
      <p>
        {site.legalName}
        <br />
        {site.address.kind}: {site.address.display}
        <br />
        {site.legalEmail}
      </p>
      <p className="text-sm text-muted">
        Have aviation counsel review this disclosure against your actual broker
        registrations, contracts, and payment flow before paid advertising.
      </p>
    </LegalDoc>
  );
}
