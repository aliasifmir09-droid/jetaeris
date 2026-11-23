import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { limoCities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Private jet limo service USA",
  description:
    "FBO limousine and black-car service in top USA cities—coordinated with JetAeris private jet charter for true door-to-door travel.",
  alternates: { canonical: "/limo" },
};

export default function LimoIndexPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Ground transfer"
        title="Limo & black-car service timed to your FBO."
        body="The flight is only the middle. JetAeris coordinates executive sedans, SUVs, sprinters, and stretch limos in top USA cities—so wheels-down becomes front-door without the scramble."
        primaryHref="/quote"
        primaryLabel="Book flight + limo"
        secondaryHref="/guides/private-jet-limo-transfer"
        secondaryLabel="How it works"
      />

      <section className="py-16 md:py-24">
        <div className="container grid gap-8 md:grid-cols-4">
          {[
            ["Sedan", "Discreet executive travel"],
            ["SUV", "Families & luggage"],
            ["Sprinter", "Teams & gear"],
            ["Stretch", "Events & arrivals"],
          ].map(([t, d]) => (
            <div key={t} className="panel p-6">
              <p className="font-[family-name:var(--font-display)] text-xl text-ink">
                {t}
              </p>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>

        <div className="container mt-16">
          <h2 className="serif text-3xl text-ink md:text-4xl">
            Top cities for FBO limo
          </h2>
          <p className="lede mt-4 max-w-2xl">
            Select a city for airports, vehicle options, and a direct request
            path. Add “limo transfer” on any flight quote.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {limoCities.map((city) => (
              <Link
                key={city.slug}
                href={`/limo/${city.slug}`}
                className="panel p-6 transition-transform hover:-translate-y-0.5"
              >
                <p className="text-xs tracking-[0.16em] text-accent uppercase">
                  {city.state}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-ink">
                  {city.name}
                </h3>
                <p className="mt-3 text-sm text-muted">
                  {city.fbOs.join(" · ")}
                </p>
                <p className="mt-4 line-clamp-2 text-sm leading-6 text-ink-soft">
                  {city.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Need a car at the FBO?"
        body="Request a flight and check limo transfer—or send a ground-only note to the desk."
      />
    </>
  );
}
