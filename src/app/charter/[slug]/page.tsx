import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { cities, getCity, routes } from "@/lib/content";
import { site } from "@/lib/site";
import { getTopCitySeo, isTopCity } from "@/lib/top-cities-seo";
import { topicsForCitySlug } from "@/lib/top-city-topics";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const deep = getTopCitySeo(slug);
  const topicCount = topicsForCitySlug(slug).length;
  return {
    title: deep
      ? `Private jet charter ${city.name} · ${topicCount}+ guides`
      : `Private jet charter ${city.name}`,
    description: deep
      ? `${deep.heroSummary} Airports ${city.airports.join(", ")}. ${topicCount} SEO guides covering cost, FBOs, corridors, and FAQs.`
      : `Private jet charter in ${city.name}, ${city.state}. Airports ${city.airports.join(", ")}. On-demand, empty legs, and FBO limo with ${site.name}.`,
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
  const deep = getTopCitySeo(slug);
  const topics = isTopCity(slug) ? topicsForCitySlug(slug) : [];

  return (
    <>
      <PageHero
        eyebrow={
          deep ? `Top 5 USA · ${deep.rankLabel}` : `Charter · ${city.state}`
        }
        title={`Private jet charter in ${city.name}`}
        body={deep?.heroSummary || city.blurb}
        secondaryHref={city.limo ? `/limo/${city.slug}` : "/empty-legs"}
        secondaryLabel={city.limo ? `${city.name} limo` : "Empty legs"}
      />

      <section className="pb-16 md:pb-24">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            {deep ? (
              <>
                <h2 className="serif text-3xl text-ink">Market thesis</h2>
                <p className="mt-6 text-[1.05rem] leading-8 text-ink-soft">
                  {deep.marketThesis}
                </p>
                <div className="mt-10 space-y-8">
                  {deep.knowledge.map((block) => (
                    <div key={block.heading}>
                      <h3 className="text-xl font-semibold text-ink">
                        {block.heading}
                      </h3>
                      <p className="mt-3 text-[1.05rem] leading-8 text-ink-soft">
                        {block.body}
                      </p>
                      {block.bullets?.length ? (
                        <ul className="mt-3 list-disc space-y-2 pl-6 text-muted">
                          {block.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>

                <h2 className="serif mt-12 text-3xl text-ink">
                  Airports & FBOs
                </h2>
                <ul className="mt-6 space-y-5">
                  {deep.airports.map((a) => (
                    <li
                      key={a.code}
                      className="border-b border-[var(--line)] pb-4"
                    >
                      <Link
                        href={`/airports/${a.code.toLowerCase()}`}
                        className="text-lg font-semibold hover:text-accent"
                      >
                        {a.code} · {a.name}
                      </Link>
                      <p className="mt-1 text-sm text-accent">{a.bestFor}</p>
                      <p className="mt-2 text-[1.02rem] leading-7 text-ink-soft">
                        {a.notes}
                      </p>
                      <p className="mt-1 text-sm text-muted">{a.ground}</p>
                    </li>
                  ))}
                </ul>

                <h2 className="serif mt-12 text-3xl text-ink">
                  Cost planning bands
                </h2>
                <p className="mt-4 text-[1.05rem] leading-8 text-ink-soft">
                  Light jet: {deep.costBands.light}. Midsize:{" "}
                  {deep.costBands.midsize}. {deep.costBands.notes} Updated{" "}
                  {deep.costBands.updated}.
                </p>

                <h2 className="serif mt-12 text-3xl text-ink">
                  Ground transfer
                </h2>
                <p className="mt-4 text-[1.05rem] leading-8 text-ink-soft">
                  {deep.groundTransfer}
                </p>
              </>
            ) : (
              <>
                <h2 className="serif text-3xl text-ink">Local detail</h2>
                <div className="mt-6 space-y-5">
                  {city.details.map((p) => (
                    <p key={p} className="text-[1.05rem] leading-8 text-ink-soft">
                      {p}
                    </p>
                  ))}
                </div>

                <h2 className="serif mt-12 text-3xl text-ink">Airports & FBOs</h2>
                <ul className="mt-6 space-y-3 text-[1.05rem] text-ink-soft">
                  {city.airports.map((code) => (
                    <li key={code} className="border-b border-[var(--line)] pb-3">
                      <Link
                        href={`/airports/${code.toLowerCase()}`}
                        className="hover:text-accent"
                      >
                        {code}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className="panel h-fit p-8">
            <p className="eyebrow">Related routes</p>
            <ul className="mt-5 space-y-4">
              {related.length ? (
                related.slice(0, 8).map((r) => (
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
            {city.limo ? (
              <Link
                href={`/limo/${city.slug}`}
                className="btn btn-line mt-3 w-full"
              >
                FBO limo in {city.name}
              </Link>
            ) : null}
            {topics.length ? (
              <Link
                href={`/blog/private-jet-charter-${city.slug}`}
                className="btn btn-line mt-3 w-full"
              >
                {topics.length} SEO guides
              </Link>
            ) : null}
          </aside>
        </div>

        {topics.length ? (
          <div className="container mt-16">
            <h2 className="serif text-3xl text-ink">
              {city.name} information hub · {topics.length} topics
            </h2>
            <p className="mt-3 max-w-2xl text-[1.05rem] leading-8 text-muted">
              High-intent keywords and customer questions for {city.name} private
              aviation—cost, airports, empty legs, seasons, aircraft class, and
              booking.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/blog/${t.slug}`}
                  className="border border-[var(--line)] bg-white/40 px-4 py-4 transition-colors hover:border-[var(--line-strong)] hover:bg-white/70"
                >
                  <p className="text-[0.65rem] tracking-[0.14em] text-accent uppercase">
                    {t.category}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-ink">
                    {t.title}
                  </p>
                  <p className="mt-1 text-xs text-muted">{t.keyword}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

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
