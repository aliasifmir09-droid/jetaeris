import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="bg-paper pt-28 pb-20 md:pt-36">
      <div className="container-narrow prose-like">
        <h1 className="serif text-4xl text-ink">Privacy</h1>
        <p className="lede mt-5">
          JetAeris collects contact and trip details you submit to respond to
          charter inquiries. We do not sell personal information. Data is used
          to arrange flights, improve our service, and meet legal obligations.
          Contact concierge@jetaeris.com for access or deletion requests.
        </p>
      </div>
    </div>
  );
}
