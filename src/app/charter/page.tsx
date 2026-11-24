import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { CitiesSearch } from "@/components/CitiesSearch";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Private jet charter cities USA",
  description:
    "Search USA private jet charter cities—type New York, Miami, TEB, LAS, and more to open matching JetAeris city pages.",
  alternates: { canonical: "/charter" },
};

export default function CharterIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Cities"
        title="Type a city—open the matching hub."
        body="Start typing a city name or airport code to filter the list. Each page covers airports, nearby routes, and a path to a quote."
        secondaryHref="/routes"
        secondaryLabel="Browse routes"
      />
      <section className="pb-20 md:pb-28">
        <div className="container">
          <CitiesSearch />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
