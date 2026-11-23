import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${site.legalName} (JetAeris)—how we collect, use, and protect personal information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalDoc title="Privacy Policy">
      <p>
        This Privacy Policy describes how <strong>{site.legalName}</strong>{" "}
        (“JetAeris,” “we,” “us”) collects, uses, and shares information when you
        use {site.url}, request a quote, or otherwise contact us.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">1. Who we are</h2>
      <p>
        Legal entity: {site.legalName}
        <br />
        Address: {site.address.display}, United States
        <br />
        Privacy contact: {site.privacyEmail}
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">2. Information we collect</h2>
      <p>We may collect:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Contact details (name, email, phone)</li>
        <li>Trip details (airports, dates, passengers, notes, limo preferences)</li>
        <li>Technical data (IP address, device/browser, pages viewed)</li>
        <li>Communications you send to our desk</li>
      </ul>
      <h2 className="serif pt-4 text-2xl text-ink">3. How we use information</h2>
      <p>We use information to:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Respond to charter, empty-leg, and limo requests</li>
        <li>Coordinate with air carriers and ground partners</li>
        <li>Improve our website and services</li>
        <li>Comply with law and enforce our Terms</li>
        <li>Send service messages you request</li>
      </ul>
      <h2 className="serif pt-4 text-2xl text-ink">4. Sharing</h2>
      <p>
        We may share trip-related information with operators, brokers, and ground
        providers solely to fulfill your request. We may use processors for
        hosting, analytics, and email. We do not sell personal information for
        money. See our{" "}
        <a className="underline" href="/do-not-sell">
          Do Not Sell / Share
        </a>{" "}
        page for California choices.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">5. Cookies</h2>
      <p>
        We use cookies and similar technologies as described in our{" "}
        <a className="underline" href="/cookies">
          Cookie Policy
        </a>
        .
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">6. Retention & security</h2>
      <p>
        We retain information as needed for the purposes above and legal
        obligations. We use reasonable administrative and technical safeguards;
        no method of transmission is 100% secure.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">7. Your rights</h2>
      <p>
        Depending on your location, you may request access, correction, deletion,
        or limitation of certain processing. Email {site.privacyEmail}. We may
        need to verify your request.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">8. Children</h2>
      <p>
        Our services are not directed to children under 16. We do not knowingly
        collect their personal information.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">9. Changes</h2>
      <p>
        We may update this Policy. The “Last updated” date will change when we
        do. Continued use means you acknowledge the updated Policy.
      </p>
    </LegalDoc>
  );
}
