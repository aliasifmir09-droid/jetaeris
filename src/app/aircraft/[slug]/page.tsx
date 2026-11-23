import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { aircraft, getAircraft } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return aircraft.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getAircraft(slug);
  if (!item) return {};
  return {
    title: `${item.name} charter USA`,
    description: `${item.name} private jet charter: ${item.seats} seats, ${item.range}. ${item.summary}`,
    alternates: { canonical: `/aircraft/${item.slug}` },
  };
}

export default async function AircraftPage({ params }: Props) {
  const { slug } = await params;
  const item = getAircraft(slug);
  if (!item) notFound();

  return (
    <>
      <PageHero
        eyebrow="Aircraft class"
        title={item.name}
        body={item.summary}
        secondaryHref="/aircraft"
        secondaryLabel="All classes"
      />
      <section className="pb-16 md:pb-24">
        <div className="container grid gap-8 md:grid-cols-3">
          {[
            ["Passengers", item.seats],
            ["Best range", item.range],
            ["Best for", item.bestFor],
          ].map(([k, v]) => (
            <div key={k} className="panel p-6">
              <p className="text-xs tracking-[0.16em] text-accent uppercase">
                {k}
              </p>
              <p className="mt-3 text-lg text-ink-soft">{v}</p>
            </div>
          ))}
        </div>
        <div className="container mt-14">
          <h2 className="serif text-3xl text-ink">Representative aircraft</h2>
          <ul className="mt-6 space-y-3 text-[1.05rem] text-ink-soft">
            {item.examples.map((ex) => (
              <li key={ex} className="border-b border-[var(--line)] pb-3">
                {ex}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-muted">
            Examples are representative. Your confirmed itinerary names the
            operating carrier and specific aircraft assigned to the trip.
          </p>
          <Link href="/quote" className="btn btn-primary mt-8">
            Request {item.name.toLowerCase()} options
          </Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
