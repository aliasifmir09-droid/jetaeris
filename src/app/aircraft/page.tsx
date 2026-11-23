import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { aircraft } from "@/lib/content";

export const metadata: Metadata = {
  title: "Private jet aircraft types",
  description:
    "Compare light, midsize, super-midsize, and heavy private jets for USA charter with JetAeris—seats, range, and best-fit trips.",
  alternates: { canonical: "/aircraft" },
};

export default function AircraftIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Aircraft"
        title="Choose the cabin for the mission."
        body="Four classes cover nearly every USA charter trip. We confirm the specific tail after you select an option."
      />
      <section className="pb-20 md:pb-28">
        <div className="container grid gap-5 md:grid-cols-2">
          {aircraft.map((item) => (
            <Link
              key={item.slug}
              href={`/aircraft/${item.slug}`}
              className="panel p-8 transition-transform hover:-translate-y-0.5"
            >
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink">
                {item.name}
              </h2>
              <p className="mt-3 text-sm text-muted">
                {item.seats} seats · {item.range}
              </p>
              <p className="mt-4 text-[1.02rem] leading-7 text-ink-soft">
                {item.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
