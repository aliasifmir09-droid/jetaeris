import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: `Cancellation and change policy overview for ${site.legalName} charter and ground arrangements.`,
  alternates: { canonical: "/cancellation-policy" },
};

export default function CancellationPolicyPage() {
  return (
    <LegalDoc title="Cancellation Policy">
      <p>
        Charter and ground cancellations are governed by the operating carrier
        and ground provider terms confirmed on your itinerary. This page
        explains how {site.legalName} handles changes at the inquiry stage.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">Before confirmation</h2>
      <p>
        Quote requests are free and non-binding. You may cancel an inquiry at
        any time before you accept a written confirmation.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">After confirmation</h2>
      <p>
        Once a trip is confirmed with an operator or ground partner, cancellation
        windows, fees, and weather/crew policies of that provider apply. We will
        surface those terms before you commit.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">Empty legs</h2>
      <p>
        Empty legs can be withdrawn by operators with little notice before
        confirmation. After confirmation, the operator’s cancellation schedule
        controls.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">Limo / ground</h2>
      <p>
        Ground cancellations usually follow a shorter notice window (often a few
        hours). Exact timing is stated when the car is confirmed.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">Contact</h2>
      <p>
        {site.email} · {site.address.display}
      </p>
    </LegalDoc>
  );
}
