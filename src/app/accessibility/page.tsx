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
        {site.legalName} aims to make JetAeris usable for as many people as
        possible. We work toward WCAG 2.2 Level AA practices for structure,
        contrast, keyboard access, and form labels.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">Feedback</h2>
      <p>
        If you encounter a barrier, email {site.email} with the page URL and a
        short description. We will work to provide the information another way
        while we improve the page.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">Address</h2>
      <p>{site.address.display}</p>
    </LegalDoc>
  );
}
