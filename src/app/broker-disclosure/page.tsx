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
        United States.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">Operational control</h2>
      <p>
        Unless an itinerary expressly states otherwise, flights are operated by
        certificated direct air carriers holding FAA Part 135 authority (or
        equivalent). {site.legalName} arranges transportation; the named carrier
        on your itinerary holds operational control of the flight.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">What we disclose</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>That JetAeris is not the airline unless stated</li>
        <li>The operating carrier identity on confirmed itineraries</li>
        <li>That aircraft shown in marketing may be representative</li>
      </ul>
      <h2 className="serif pt-4 text-2xl text-ink">Company details</h2>
      <p>
        {site.legalName}
        <br />
        {site.address.display}
        <br />
        {site.legalEmail}
      </p>
    </LegalDoc>
  );
}
