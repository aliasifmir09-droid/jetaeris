import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AircraftCabinExplorer } from "@/components/aircraft/AircraftCabinExplorer";
import { CtaBand } from "@/components/CtaBand";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { aircraftCabinExperiences } from "@/lib/aircraft-cabin";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private jet aircraft & cabin guide | JetAeris",
  description:
    "See how many seats each private jet class holds and how the cabin looks inside—light through heavy jets—so first-time flyers can choose with clarity.",
  alternates: { canonical: "/aircraft" },
  keywords: [
    "private jet cabin seats",
    "light midsize heavy jet comparison",
    "private jet interior",
    "first time private jet",
  ],
  openGraph: {
    title: "Private jet aircraft & cabin guide",
    description:
      "Interactive seat maps and HD cabin views for light, midsize, super-midsize, and heavy jets.",
    url: "/aircraft",
    images: [{ url: "/media/cabin-super-uhd.jpg" }],
  },
};

export default function AircraftIndexPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "JetAeris private jet cabin classes",
    itemListElement: aircraftCabinExperiences.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.name,
      url: `${site.url}/aircraft/${a.slug}`,
      description: `${a.seats} seats. ${a.summary}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      {/* Full-bleed cinematic hero — brand-first, one composition */}
      <section className="relative overflow-hidden bg-[var(--section-dark)] text-white">
        <div className="absolute inset-0">
          <Image
            src="/media/cinematic-jet-uhd.jpg"
            alt="Private jet in flight — representative class imagery"
            fill
            priority
            className="object-cover object-[70%_40%] opacity-55"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "var(--hero-veil)" }}
            aria-hidden
          />
        </div>

        <div className="container relative pt-32 pb-16 md:pt-40 md:pb-20">
          <p className="eyebrow !text-white/80">Aircraft</p>
          <h1 className="serif mt-4 max-w-4xl text-[clamp(2.6rem,6.2vw,5rem)]">
            See the cabin. Count the seats. Decide with confidence.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.08rem] leading-8 text-white/85">
            First time flying private? Compare light through heavy jet classes
            with HD cabin views and animated seat maps—then request options from
            vetted Part 135 carriers. Imagery is representative until a specific
            tail is assigned.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="#cabin-explorer" className="btn btn-light">
              Explore cabins
            </Link>
            <Link href="/quote" className="btn btn-ghost">
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive explorer */}
      <section
        id="cabin-explorer"
        className="bg-[var(--section-dark)] pb-20 text-white md:pb-28"
      >
        <div className="container">
          <AircraftCabinExplorer />
        </div>
      </section>

      {/* Quick compare strip */}
      <ScrollReveal
        as="section"
        stagger
        className="border-b border-[var(--line)] bg-white/40 py-16 md:py-24"
      >
        <div className="container">
          <p className="eyebrow" data-reveal>
            Quick compare
          </p>
          <h2
            className="serif mt-3 max-w-3xl text-[clamp(1.8rem,3.5vw,2.8rem)] text-ink"
            data-reveal
          >
            Four classes cover almost every USA charter trip.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {aircraftCabinExperiences.map((item) => (
              <Link
                key={item.slug}
                href={`/aircraft/${item.slug}`}
                data-reveal
                className="group border-t border-[var(--line)] pt-6 transition-colors hover:border-accent"
              >
                <p className="text-[0.68rem] tracking-[0.16em] text-accent uppercase">
                  Up to {item.seatMax} seats
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-ink group-hover:text-accent">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {item.bestFor}
                </p>
                <p className="mt-4 text-xs tracking-[0.14em] text-accent uppercase">
                  Cabin details →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <CtaBand />
    </>
  );
}
