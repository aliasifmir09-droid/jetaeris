import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { airports } from "@/lib/content";

export const metadata: Metadata = {
  title: "Private jet airports & FBOs USA",
  description:
    "USA private jet airports and FBO gateways arranged with JetAeris—TEB, VNY, OPF, ASE, and dozens more city access points.",
  alternates: { canonical: "/airports" },
};

export default function AirportsIndexPage() {
  const sorted = [...airports].sort((a, b) => a.code.localeCompare(b.code));
  return (
    <>
      <PageHero
        eyebrow="Airports"
        title="FBO gateways across the United States"
        body="Private aviation lives at FBOs—not crowded terminals. Browse airports we commonly coordinate for charter and limo meet-ups."
      />
      <section className="pb-20 md:pb-28">
        <div className="container grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((a) => (
            <Link
              key={`${a.code}-${a.citySlug}`}
              href={`/airports/${a.code.toLowerCase()}`}
              className="panel flex items-baseline justify-between gap-3 px-5 py-4 transition-transform hover:-translate-y-0.5"
            >
              <span className="font-[family-name:var(--font-display)] text-xl text-ink">
                {a.code}
              </span>
              <span className="text-sm text-muted">{a.cityName}</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
