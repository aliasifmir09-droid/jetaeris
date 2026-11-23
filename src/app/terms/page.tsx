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
        operated by <strong>{site.legalName}</strong>, {site.address.display}.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">1. Nature of service</h2>
      <p>
        JetAeris provides an online request experience and concierge desk for
        private aviation and related ground transfers. Unless expressly stated
        on your itinerary documents, flights are operated by third-party Part
        135 air carriers. JetAeris does not exercise operational control as a
        direct air carrier.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">2. Quotes are not contracts</h2>
      <p>
        Website content and preliminary quotes are informational. A booking is
        confirmed only when accepted in writing under the operating carrier’s
        (and any ground provider’s) terms, including payment and cancellation
        rules.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">3. Accuracy of information</h2>
      <p>
        You agree to provide accurate passenger, contact, and itinerary
        information. Aircraft examples on marketing pages are representative
        until a specific tail is assigned.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">4. Empty legs</h2>
      <p>
        Empty-leg listings may change or cancel as operators adjust schedules.
        Availability is confirmed only when locked with the operator.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">5. Ground transfers</h2>
      <p>
        Limo and car services are coordinated with third-party ground providers.
        Vehicle type, timing, and fees are confirmed case by case.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">6. Acceptable use</h2>
      <p>
        You may not misuse the site, scrape content at scale, submit fraudulent
        requests, or interfere with security or availability.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">7. Disclaimers</h2>
      <p>
        THE SITE AND INQUIRY SERVICES ARE PROVIDED “AS IS.” TO THE MAXIMUM
        EXTENT PERMITTED BY LAW, WE DISCLAIM WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">8. Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, {site.legalName.toUpperCase()}{" "}
        SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
        PUNITIVE DAMAGES, OR LOST PROFITS, ARISING FROM YOUR USE OF THE SITE OR
        INQUIRIES.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">9. Indemnity</h2>
      <p>
        You agree to indemnify {site.legalName} against claims arising from your
        misuse of the site or inaccurate information you provide.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">10. Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of New York, without
        regard to conflict-of-law rules, except where mandatory consumer laws
        apply.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">11. Contact</h2>
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
