import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getLimoCity, limoCities, routes } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return limoCities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getLimoCity(slug);
  if (!city) return {};
  return {
    title: `Limo service ${city.name} FBO`,
    description: `${city.summary} Vehicles, airports, and JetAeris booking for private aviation ground transfer.`,
    alternates: { canonical: `/limo/${city.slug}` },
  };
}

export default async function LimoCityPage({ params }: Props) {
  const { slug } = await params;
  const city = getLimoCity(slug);
  if (!city) notFound();

  const related = routes
    .filter((r) => r.fromSlug === city.slug || r.toSlug === city.slug)
    .slice(0, 6);

  return (
    <>
      <PageHero
        eyebrow={`Limo · ${city.state}`}
        title={`${city.name} FBO limo & black-car service`}
        body={city.summary}
        primaryHref={`/quote?limo=1&city=${city.slug}`}
        primaryLabel="Request limo + flight"
        secondaryHref={`/charter/${city.slug}`}
        secondaryLabel={`${city.name} charter`}
      />

      <section className="pb-16 md:pb-24">
        <div className="container grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="serif text-3xl text-ink">How ground works here</h2>
            <div className="mt-8 space-y-5">
              {city.details.map((p) => (
                <p key={p} className="text-[1.05rem] leading-8 text-ink-soft">
                  {p}
                </p>
              ))}
            </div>

            <h3 className="mt-12 text-xl font-semibold text-ink">Vehicles</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {city.vehicles.map((v) => (
                <li key={v} className="panel px-4 py-3 text-sm text-ink-soft">
                  {v}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 text-xl font-semibold text-ink">FAQ</h3>
            <div className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {city.faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <p className="font-semibold text-ink">{f.q}</p>
                  <p className="mt-2 text-[1.02rem] leading-7 text-muted">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="panel h-fit p-8">
            <p className="eyebrow">FBO airports</p>
            <ul className="mt-5 space-y-3 text-ink-soft">
              {city.fbOs.map((code) => (
                <li key={code}>
                  <Link
                    href={`/airports/${code.toLowerCase()}`}
                    className="hover:text-accent"
                  >
                    {code}
                  </Link>
                </li>
              ))}
            </ul>
            {related.length ? (
              <>
                <p className="eyebrow mt-10">Pair with a flight</p>
                <ul className="mt-4 space-y-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/routes/${r.slug}`}
                        className="text-ink hover:text-accent"
                      >
                        {r.from} → {r.to}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            <Link
              href={`/quote?limo=1&city=${city.slug}`}
              className="btn btn-primary mt-8 w-full"
            >
              Request transfer
            </Link>
          </aside>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: city.faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      <CtaBand title={`Limo in ${city.name}`} />
    </>
  );
}
