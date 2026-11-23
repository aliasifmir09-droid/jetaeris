import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${site.legalName} (JetAeris) private jet charter inquiry and ground-transfer coordination.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalDoc title="Terms of Service">
      <p>
        These Terms govern your use of the JetAeris website and inquiry services
        operated by <strong>{site.legalName}</strong>.{" "}
        {site.address.publicNote}
      </p>
      <p>
        <strong>Product promise:</strong> JetAeris is a{" "}
        <em>request-a-private-charter-quote</em> and concierge brokerage service.
        It is not an instant-booking marketplace. No flight is reserved, ticketed,
        or paid through this website alone.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">1. Nature of service</h2>
      <p>
        JetAeris provides an online request experience and concierge desk for
        private aviation and related ground transfers. Unless expressly stated
        on your itinerary documents, flights are operated by third-party Part
        135 air carriers. JetAeris does not exercise operational control as a
        direct air carrier. See the{" "}
        <a className="underline" href="/broker-disclosure">
          Broker Disclosure
        </a>
        .
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">2. Quotes are not contracts</h2>
      <p>
        Website content, estimate ranges, and preliminary quotes are
        informational. A trip is confirmed only when accepted in writing under
        the operating carrier’s (and any ground provider’s) terms, including
        payment, taxes/fees, cancellation, and substitution rules. Carrier terms
        are provided or linked before you commit funds.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">3. Payment and taxes</h2>
      <p>
        Payment instructions, deposits, and final balances are stated in the
        written confirmation package for that trip. Amounts may include
        operator charges, airport and handling fees, taxes, fuel-related
        adjustments, and optional services (catering, ground). JetAeris does not
        collect unrestricted card data through ordinary email; use the secure
        method named in your confirmation.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">4. Carrier substitution and delays</h2>
      <p>
        Operators may substitute equivalent aircraft or revise schedules for
        maintenance, weather, crew duty, airspace, or airport constraints.
        Weather and force-majeure events can delay or cancel flights. Remedies
        follow the operating carrier’s contract for that trip.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">5. Cancellation and changes</h2>
      <p>
        Inquiry-stage requests may be withdrawn before written confirmation
        without a charter fee. After confirmation, cancellation deadlines,
        penalties, no-show rules, and change fees are those of the named
        provider. See the{" "}
        <a className="underline" href="/cancellation-policy">
          Cancellation Policy
        </a>
        .
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">6. Passengers, luggage, and pets</h2>
      <p>
        You agree to provide accurate passenger, contact, and itinerary
        information. Luggage limits, hazardous-materials rules, and pet policies
        follow the operating carrier. Special-needs or child-seating requests
        must be noted before confirmation.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">7. Empty legs</h2>
      <p>
        Empty-leg listings may change or cancel as operators adjust schedules.
        Status labels on the site are informational. Availability is confirmed
        only when locked with the operator.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">8. Ground transfers</h2>
      <p>
        Limo and car services are coordinated with third-party ground providers.
        Vehicle type, wait time, cancellation windows, and fees are confirmed
        case by case and are separate from the air charter contract unless your
        documents say otherwise.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">9. Acceptable use</h2>
      <p>
        You may not misuse the site, scrape content at scale, submit fraudulent
        requests, or interfere with security or availability.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">10. Privacy</h2>
      <p>
        Personal information is handled under our{" "}
        <a className="underline" href="/privacy">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a className="underline" href="/cookies">
          Cookie Policy
        </a>
        .
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">11. Disclaimers</h2>
      <p>
        THE SITE AND INQUIRY SERVICES ARE PROVIDED “AS IS.” TO THE MAXIMUM
        EXTENT PERMITTED BY LAW, WE DISCLAIM WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. Marketing
        aircraft imagery may be representative until a tail is assigned.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">12. Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, {site.legalName.toUpperCase()}{" "}
        SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
        PUNITIVE DAMAGES, OR LOST PROFITS, ARISING FROM YOUR USE OF THE SITE OR
        INQUIRIES. Liability related to operated flights rests primarily with
        the operating carrier under its contract.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">13. Indemnity</h2>
      <p>
        You agree to indemnify {site.legalName} against claims arising from your
        misuse of the site or inaccurate information you provide.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">14. Disputes and governing law</h2>
      <p>
        These Terms are governed by the laws of the State of New York, without
        regard to conflict-of-law rules, except where mandatory consumer laws
        apply. Contact {site.legalEmail} before formal dispute processes so we
        can attempt a practical resolution.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">15. Contact</h2>
      <p>
        {site.legalName}
        <br />
        {site.address.kind}: {site.address.display}
        <br />
        {site.legalEmail}
        <br />
        {site.email}
      </p>
      <p className="text-sm text-muted">
        These Terms are a website and inquiry framework. Aviation counsel should
        review them against your live contracting and payment flow before
        paid-media launch.
      </p>
    </LegalDoc>
  );
}
