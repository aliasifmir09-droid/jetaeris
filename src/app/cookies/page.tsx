import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy for ${site.legalName} (JetAeris)—how cookies and similar technologies are used.`,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalDoc title="Cookie Policy">
      <p>
        {site.legalName} uses cookies and similar technologies on{" "}
        {site.domain} to operate the site, understand traffic, and improve
        services.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">Types of cookies</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Essential</strong> — required for security, load balancing,
          and form functionality.
        </li>
        <li>
          <strong>Analytics</strong> — help us understand which pages are used
          (e.g., privacy-friendly or Google Analytics if enabled).
        </li>
        <li>
          <strong>Preference</strong> — remember choices such as banner
          dismissals where applicable.
        </li>
      </ul>
      <h2 className="serif pt-4 text-2xl text-ink">Managing cookies</h2>
      <p>
        You can control cookies through your browser settings. Blocking
        essential cookies may break quote forms or login-free sessions.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">Contact</h2>
      <p>
        Questions: {site.privacyEmail} · {site.address.display}
      </p>
    </LegalDoc>
  );
}
