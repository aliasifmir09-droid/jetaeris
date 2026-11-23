import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy for ${site.legalName} (JetAeris)—essential, analytics, and preference cookies.`,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalDoc title="Cookie Policy">
      <p>
        {site.legalName} uses cookies and similar technologies on{" "}
        {site.domain} to operate the site, protect forms, and—only if
        enabled—understand traffic.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">What we use today</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Essential cookies / storage</strong> — required for security,
          CDN/edge routing, and quote-form functionality. These cannot be
          disabled without breaking the site.
        </li>
        <li>
          <strong>Analytics</strong> — not guaranteed on every environment. If
          Google Analytics 4 or a similar tool is connected in production, it
          may set first-party analytics cookies to measure page views and
          conversion events (quote starts/submits).
        </li>
        <li>
          <strong>Preference</strong> — may remember banner or privacy
          dismissals if such UI is present.
        </li>
        <li>
          <strong>Advertising / retargeting pixels</strong> — not enabled by
          default. We will update this policy before launching paid-pixel
          tracking.
        </li>
      </ul>

      <h2 className="serif pt-4 text-2xl text-ink">Managing cookies</h2>
      <p>
        Use your browser settings to block or delete cookies. Blocking essential
        cookies may break quote forms. JetAeris does not currently ship a
        separate cookie-preference modal; California “Do Not Sell/Share”
        requests can be emailed via{" "}
        <a className="underline" href="/do-not-sell">
          /do-not-sell
        </a>
        .
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">Contact</h2>
      <p>
        Questions: {site.privacyEmail}
        <br />
        {site.address.kind}: {site.address.display}
      </p>
    </LegalDoc>
  );
}
