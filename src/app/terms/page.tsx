import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="bg-paper pt-28 pb-20 md:pt-36">
      <div className="container-narrow">
        <h1 className="serif text-4xl text-ink">Terms</h1>
        <p className="lede mt-5">
          JetAeris provides an online request experience for private aviation
          arrangements in the United States. Quotes are informational until
          confirmed in writing with the operating carrier. Aircraft availability,
          pricing, and schedules change. Flights are operated by third-party air
          carriers; JetAeris is not the operational control holder unless
          expressly stated on your itinerary documents.
        </p>
      </div>
    </div>
  );
}
