import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: `Cancellation and change policy for ${site.legalName} charter inquiries and how provider terms apply after confirmation.`,
  alternates: { canonical: "/cancellation-policy" },
};

export default function CancellationPolicyPage() {
  return (
    <LegalDoc title="Cancellation Policy">
      <p>
        High-value charter cancellations are controlled by the{" "}
        <strong>named operating carrier</strong> (and any ground provider) on
        your confirmation—not by a single website-wide fee table. This page
        explains what happens at each stage with {site.legalName}.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">1. Before written confirmation</h2>
      <p>
        Quote requests are free and non-binding. You may withdraw an inquiry at
        any time before you accept a written confirmation. No charter
        cancellation fee applies at the inquiry stage.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">2. At quote acceptance / checkout</h2>
      <p>
        Before you commit funds, the desk provides (or links) the provider’s
        cancellation schedule for that trip, including:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Provider legal name and trip reference</li>
        <li>Cancellation deadlines and penalty percentages or amounts</li>
        <li>Weather, mechanical, and crew-duty rules that excuse or limit fees</li>
        <li>No-show and late-change fees</li>
        <li>Refund timing and method</li>
        <li>Who decides whether a flight can operate (the operating carrier)</li>
      </ul>
      <p>
        If those terms are not visible in your confirmation package, do not
        pay—ask the desk to reissue them.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">3. After confirmation</h2>
      <p>
        Once a trip is confirmed with an operator or ground partner, that
        provider’s contract controls. JetAeris will help communicate changes but
        cannot override operator cancellation schedules.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">4. Empty legs</h2>
      <p>
        Empty legs can be withdrawn by operators with little notice before
        confirmation. After confirmation, the operator’s cancellation schedule
        controls. Do not treat a public listing as a held inventory item.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">5. Limo / ground</h2>
      <p>
        Ground cancellations typically use a shorter notice window than air
        charter (commonly a few hours before pickup, provider-specific). Exact
        timing, wait-time charges, and no-show rules are stated when the car is
        confirmed—not inferred from this page.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">6. How to cancel</h2>
      <p>
        Email {site.email} with your request ID and trip date, or use the
        contact channel named on your confirmation. Keep written acknowledgment.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">Contact</h2>
      <p>
        {site.legalName} · {site.address.kind}: {site.address.display}
        <br />
        {site.email} · {site.legalEmail}
      </p>
    </LegalDoc>
  );
}
