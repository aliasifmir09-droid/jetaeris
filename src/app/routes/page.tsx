import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { RoutesSearch } from "@/components/RoutesSearch";

export const metadata: Metadata = {
  title: "USA private jet routes",
  description:
    "Search USA private jet routes with JetAeris—type a city or airport to filter New York–Miami, LA–Vegas, Aspen, and more.",
  alternates: { canonical: "/routes" },
};

export default function RoutesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Routes"
        title="Find a corridor—type to filter the list."
        body="Start typing a city or airport code. Each route page covers airports, block time, aircraft fit, and FAQs."
        secondaryHref="/charter"
        secondaryLabel="Browse cities"
      />
      <section className="pb-20 md:pb-28">
        <div className="container">
          <RoutesSearch />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
