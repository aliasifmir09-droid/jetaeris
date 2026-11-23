import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { airports, getAirport } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ code: string }> };

export async function generateStaticParams() {
  return airports.map((a) => ({ code: a.code.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const airport = getAirport(code);
  if (!airport) return {};
  return {
    title: `${airport.name} private jet charter | ${airport.code} FBO guide`,
    description: `${airport.name} (${airport.code}) private jet charter and FBO coordination for ${airport.cityName}. ${site.name} arranges Part 135 options and optional limo—request a quote.`,
    alternates: { canonical: `/airports/${airport.code.toLowerCase()}` },
  };
}

export default async function AirportPage({ params }: Props) {
  const { code } = await params;
  const airport = getAirport(code);
  if (!airport) notFound();

  return (
    <>
      <PageHero
        eyebrow="Airport / FBO"
        title={`${airport.code} · ${airport.name}`}
        body={airport.note}
        primaryHref="/quote"
        primaryLabel="Request a quote"
        secondaryHref={`/limo/${airport.citySlug}`}
        secondaryLabel={`${airport.cityName} limo`}
        imageSrc="/media/airport.jpg"
        imageAlt={`${airport.name} private aviation access`}
      />
      <section className="pb-16 md:pb-24">
        <div className="container pt-4">
          <Breadcrumbs
            items={[
              { name: "Airports", href: "/airports" },
              { name: airport.code },
            ]}
          />
        </div>
        <div className="container-narrow space-y-6">
          {airport.details.map((p) => (
            <p key={p} className="text-[1.08rem] leading-8 text-ink-soft">
              {p}
            </p>
          ))}
          <div className="flex flex-wrap gap-3 pt-4">
            <Link href="/quote" className="btn btn-primary">
              Request via {airport.code}
            </Link>
            <Link
              href={`/charter/${airport.citySlug}`}
              className="btn btn-line"
            >
              {airport.cityName} charter guide
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
