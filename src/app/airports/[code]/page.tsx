import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { airports, getAirport } from "@/lib/content";

type Props = { params: Promise<{ code: string }> };

export async function generateStaticParams() {
  return airports.map((a) => ({ code: a.code.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const airport = getAirport(code);
  if (!airport) return {};
  return {
    title: `${airport.code} private jet FBO · ${airport.cityName}`,
    description: `${airport.note} Charter and limo coordination with JetAeris.`,
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
        title={`${airport.code} · ${airport.cityName} private jet access`}
        body={airport.note}
        primaryHref="/quote"
        secondaryHref={`/limo/${airport.citySlug}`}
        secondaryLabel={`${airport.cityName} limo`}
      />
      <section className="pb-16 md:pb-24">
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
