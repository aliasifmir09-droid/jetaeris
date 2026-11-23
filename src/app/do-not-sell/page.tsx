import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Do Not Sell or Share My Personal Information",
  description: `California privacy choices for ${site.legalName} (JetAeris)—do not sell or share requests.`,
  alternates: { canonical: "/do-not-sell" },
};

export default function DoNotSellPage() {
  return (
    <LegalDoc title="Do Not Sell or Share My Personal Information">
      <p>
        Under the California Consumer Privacy Act (CCPA/CPRA), California
        residents may request that we not sell or share personal information as
        those terms are defined by law.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">Our practices</h2>
      <p>
        {site.legalName} does not sell personal information for money. Some
        analytics or advertising technologies could be considered “sharing”
        under California law depending on configuration.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">How to submit a request</h2>
      <p>
        Email {site.privacyEmail} with subject “Do Not Sell or Share” and your
        name, California residence confirmation, and the email used on our site.
        We will verify and respond as required.
      </p>
      <h2 className="serif pt-4 text-2xl text-ink">Company</h2>
      <p>
        {site.legalName}
        <br />
        {site.address.display}
      </p>
    </LegalDoc>
  );
}
