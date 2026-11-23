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
        {site.address.kind}: {site.address.display}, United States
        <br />
        Privacy contact: {site.privacyEmail}
      </p>
      <p className="text-sm">{site.address.publicNote}</p>

      <h2 className="serif pt-4 text-2xl text-ink">2. Information we collect</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Contact details (name, email, phone, company)</li>
        <li>
          Trip details (airports, dates, passengers, bags, pets, preferences,
          limo notes)
        </li>
        <li>Technical data (IP address, device/browser, pages viewed)</li>
        <li>Communications you send to our desk</li>
      </ul>

      <h2 className="serif pt-4 text-2xl text-ink">3. How we use information</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Respond to charter, empty-leg, and limo requests</li>
        <li>Coordinate with air carriers and ground partners</li>
        <li>Improve our website and services</li>
        <li>Comply with law and enforce our Terms</li>
        <li>Send service messages you request</li>
      </ul>

      <h2 className="serif pt-4 text-2xl text-ink">4. Sharing and processors</h2>
      <p>
        We may share trip-related information with operators, brokers, and
        ground providers solely to fulfill your request. Categories of service
        providers may include:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Website hosting and CDN (e.g., Vercel and related infrastructure)</li>
        <li>Transactional email delivery (when configured)</li>
        <li>Analytics (only if enabled; see Cookie Policy)</li>
      </ul>
      <p>
        We do not sell personal information for money. See{" "}
        <a className="underline" href="/do-not-sell">
          Do Not Sell / Share
        </a>{" "}
        for California requests.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">5. Cookies and similar technologies</h2>
      <p>
        We use cookies and similar technologies as follows (details also in our{" "}
        <a className="underline" href="/cookies">
          Cookie Policy
        </a>
        ):
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Essential</strong> — security, load balancing, form session
          integrity, and basic site operation.
        </li>
        <li>
          <strong>Analytics</strong> — only if an analytics product is enabled
          in production; used to understand page performance and conversion
          funnels.
        </li>
        <li>
          <strong>Preference</strong> — remembering dismissals or privacy
          choices where a control is offered.
        </li>
        <li>
          <strong>Advertising pixels</strong> — not enabled by default on this
          site. If added later, this Policy and the Cookie Policy will be
          updated before activation.
        </li>
      </ul>
      <p>
        You can control cookies through browser settings. Blocking essential
        cookies may break the quote form. There is no separate third-party
        preference-center widget today—use browser controls and email{" "}
        {site.privacyEmail} for California opt-out requests.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">6. Retention & security</h2>
      <p>
        We retain information as needed for the purposes above and legal
        obligations. We use reasonable administrative and technical safeguards;
        no method of transmission is 100% secure. Do not send payment-card PAN
        data by unencrypted email.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">7. Your rights</h2>
      <p>
        Depending on your state or country, you may request access, correction,
        deletion, or limitation of certain processing. Email {site.privacyEmail}.
        We may need to verify your request. California residents may also use
        the Do Not Sell / Share page.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">8. International transfers</h2>
      <p>
        Infrastructure providers may process data in the United States or other
        countries where they operate. We select processors that provide
        appropriate contractual protections for the nature of the data.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">9. Children</h2>
      <p>
        Our services are not directed to children under 16. We do not knowingly
        collect their personal information.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">10. Changes</h2>
      <p>
        We may update this Policy. The “Last updated” date will change when we
        do. Continued use means you acknowledge the updated Policy.
      </p>
    </LegalDoc>
  );
}
