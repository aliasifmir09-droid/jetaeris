import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `Accessibility statement for the JetAeris website operated by ${site.legalName}.`,
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalDoc title="Accessibility Statement">
      <p>
        {site.legalName} intends the JetAeris website to be usable by as many
        people as possible. We design toward WCAG 2.2 Level AA practices
        (structure, contrast, keyboard access, form labels), but this statement
        is a commitment—not a claim that a formal audit is complete.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">Current status</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          No independent WCAG conformance audit has been published for this
          site as of the last-updated date on this page.
        </li>
        <li>
          Known focus areas: mobile navigation keyboard paths, quote-form error
          announcement for screen readers, and deep-page imagery/alt text
          coverage.
        </li>
        <li>
          Automated checks and manual keyboard testing are planned before
          paid-media scale-up; remediation timing depends on issue severity.
        </li>
      </ul>

      <h2 className="serif pt-4 text-2xl text-ink">Feedback</h2>
      <p>
        If you encounter a barrier, email {site.email} with the page URL and a
        short description. We will work to provide the information another way
        while we improve the page. Accessibility contact: {site.email}.
      </p>

      <h2 className="serif pt-4 text-2xl text-ink">Address</h2>
      <p>
        {site.address.kind}: {site.address.display}
      </p>
    </LegalDoc>
  );
}
