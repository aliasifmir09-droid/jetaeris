import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getRoute, relatedRoutes, routes } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) return {};
  return {
    title: `Private jet ${route.from} to ${route.to} · cost & charter`,
    description: `Request a private jet quote from ${route.from} to ${route.to}. ${route.airports}. ${route.blockTime}. Indicative light-jet range ${route.priceEstimate.light}. ${site.name}.`,
    alternates: { canonical: `/routes/${route.slug}` },
  };
}

export default async function RoutePage({ params }: Props) {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) notFound();

  const quoteHref = `/quote?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`;
  const related = relatedRoutes(route.slug);

  return (
    <>
      <PageHero
        eyebrow="Route"
        title={`Private jet from ${route.from} to ${route.to}`}
        body={route.summary}
        primaryHref={quoteHref}
        primaryLabel="Request a quote"
        secondaryHref={`/limo/${route.toSlug}`}
        secondaryLabel={`${route.to} limo`}
        imageSrc="/media/hero-jet.jpg"
        imageAlt={`Private jet for the ${route.from} to ${route.to} corridor`}
      />

      <section className="pb-16 md:pb-24">
        <div className="container pt-4">
          <Breadcrumbs
            items={[
              { name: "Routes", href: "/routes" },
              { name: `${route.from} → ${route.to}` },
            ]}
          />
        </div>
        <div className="container grid gap-8 border-t border-[var(--line)] pt-12 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Airports", route.airports],
            ["Distance", route.distanceNm],
            ["Typical block", route.blockTime],
            ["Aircraft fit", route.bestFit],
          ].map(([k, v]) => (
            <div key={k} className="panel p-6">
              <p className="text-xs tracking-[0.16em] text-accent uppercase">
                {k}
              </p>
              <p className="mt-3 text-lg text-ink-soft">{v}</p>
            </div>
          ))}
        </div>

        <div className="container mt-12 border border-[var(--line)] bg-white/50 p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="text-xs tracking-[0.16em] text-accent uppercase">
              Indicative one-way price ranges
            </p>
            <p className="text-xs text-muted">
              Verified {route.priceEstimate.updated} · {route.reviewedBy}
            </p>
          </div>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted">Light jet</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-ink">
                {route.priceEstimate.light}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted">Midsize jet</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-ink">
                {route.priceEstimate.midsize}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted">
            {route.priceEstimate.assumptions} These are planning estimates—not
            live inventory or a confirmed fare. Request a quote for your date
            and passenger count.
          </p>
          <div className="mt-8 border-t border-[var(--line)] pt-6">
            <h2 className="text-sm font-semibold tracking-[0.08em] text-ink uppercase">
              What changes the price
            </h2>
            <ul className="mt-4 grid gap-2 text-sm leading-7 text-muted md:grid-cols-2">
              {route.priceFactors.map((factor) => (
                <li key={factor} className="flex gap-2">
                  <span className="text-accent" aria-hidden>
                    ·
                  </span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container mt-12 grid gap-8 lg:grid-cols-2">
          <div className="border border-[var(--line)] p-6 md:p-8">
            <h2 className="serif text-2xl text-ink">Seasonal & ops notes</h2>
            <p className="mt-4 text-[1.02rem] leading-8 text-ink-soft">
              {route.seasonalNotes}
            </p>
          </div>
          <div className="border border-[var(--line)] p-6 md:p-8">
            <h2 className="serif text-2xl text-ink">Ground transfer</h2>
            <p className="mt-4 text-[1.02rem] leading-8 text-ink-soft">
              Add FBO limo or black-car in {route.from} and {route.to} so the
              curb-to-cabin plan is one itinerary. Sedans, SUVs, sprinters, and
              stretch options where available.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/limo/${route.fromSlug}`} className="btn btn-line">
                {route.from} limo
              </Link>
              <Link href={`/limo/${route.toSlug}`} className="btn btn-line">
                {route.to} limo
              </Link>
              <Link
                href={`${quoteHref}&limo=1`}
                className="btn btn-primary"
              >
                Quote with ground
              </Link>
            </div>
          </div>
        </div>

        <div className="container mt-16 max-w-3xl space-y-5">
          <h2 className="serif text-3xl text-ink">Trip detail</h2>
          {route.details.map((p) => (
            <p key={p} className="text-[1.05rem] leading-8 text-ink-soft">
              {p}
            </p>
          ))}
          <p className="text-sm text-muted">
            Reviewed by {route.reviewedBy} ({route.reviewedRole}). Price
            guidance last verified {route.priceEstimate.updated}.
          </p>
        </div>

        <div className="container mt-16">
          <h2 className="serif text-3xl text-ink md:text-4xl">
            What travelers ask
          </h2>
          <div className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {route.faqs.map((item) => (
              <div key={item.q} className="py-8">
                <h3 className="text-xl font-semibold text-ink">{item.q}</h3>
                <p className="mt-3 max-w-3xl text-[1.05rem] leading-8 text-muted">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={quoteHref} className="btn btn-primary">
              Request this route quote
            </Link>
            <Link
              href={`/guides/private-jet-cost-${route.slug}`}
              className="btn btn-line"
            >
              Cost guide
            </Link>
            <Link href={`/charter/${route.toSlug}`} className="btn btn-line">
              {route.to} city guide
            </Link>
          </div>
        </div>

        {related.length > 0 ? (
          <div className="container mt-20">
            <h2 className="serif text-3xl text-ink">Related corridors</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Connected city pairs for planning alternatives—each page stands
              alone with airports, estimates, and a prefilled quote path.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/routes/${r.slug}`}
                  className="border border-[var(--line)] px-5 py-5 transition-colors hover:border-[var(--line-strong)]"
                >
                  <p className="text-xs tracking-[0.14em] text-accent uppercase">
                    {r.airports}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-xl text-ink">
                    {r.from} → {r.to}
                  </p>
                  <p className="mt-1 text-sm text-muted">{r.blockTime}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: route.faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      <CtaBand title={`${route.from} → ${route.to}`} />
    </>
  );
}
