import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { cities, getCity, routes } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return {
    title: `Private jet charter ${city.name}`,
    description: `Private jet charter in ${city.name}, ${city.state}. Airports ${city.airports.join(", ")}. On-demand and empty-leg options with ${site.name}.`,
    alternates: { canonical: `/charter/${city.slug}` },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const related = routes.filter(
    (r) => r.fromSlug === city.slug || r.toSlug === city.slug,
  );
  const nearby = cities.filter((c) => city.corridors.includes(c.slug));

  return (
    <>
      <PageHero
        eyebrow={`Charter · ${city.state}`}
        title={`Private jet charter in ${city.name}`}
        body={city.blurb}
        secondaryHref="/empty-legs"
        secondaryLabel="Empty legs"
      />

      <section className="pb-16 md:pb-24">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="serif text-3xl text-ink">Airports & FBOs</h2>
            <ul className="mt-6 space-y-3 text-[1.05rem] text-ink-soft">
              {city.airports.map((code) => (
                <li key={code} className="border-b border-[var(--line)] pb-3">
                  {code}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[1.05rem] leading-8 text-muted">
              {site.name} arranges on-demand charter and empty legs through
              preferred Part 135 partners. Share your trip details and we return
              aircraft options with clear assumptions.
            </p>
          </div>

          <aside className="panel h-fit p-8">
            <p className="eyebrow">Related routes</p>
            <ul className="mt-5 space-y-4">
              {related.length ? (
                related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/routes/${r.slug}`}
                      className="text-lg text-ink hover:text-accent"
                    >
                      {r.from} → {r.to}
                    </Link>
                    <p className="text-sm text-muted">{r.blockTime}</p>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted">
                  Request any city pair from {city.name}.
                </li>
              )}
            </ul>
            <Link href="/quote" className="btn btn-primary mt-8 w-full">
              Request from {city.name}
            </Link>
          </aside>
        </div>

        {nearby.length ? (
          <div className="container mt-16">
            <h2 className="serif text-3xl text-ink">Nearby corridors</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  href={`/charter/${c.slug}`}
                  className="border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--line-strong)]"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>
      <CtaBand title={`Flying from ${city.name}?`} />
    </>
  );
}
