import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getGuide, guides } from "@/lib/guides-catalog";
import { isIndexableGuide, robotsForIndexable } from "@/lib/seo-index";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    robots: robotsForIndexable(isIndexableGuide(guide)),
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const updated = guide.updated ?? site.priceGuidanceUpdated;
  const faqs = guide.faqs ?? [];
  const related = guide.related ?? [];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: updated,
    author: {
      "@type": "Organization",
      name: site.guideAuthor.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
    mainEntityOfPage: `${site.url}/guides/${guide.slug}`,
  };

  const faqLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <>
      <PageHero
        eyebrow={guide.category ? `Guide · ${guide.category}` : "Guide"}
        title={guide.title}
        body={guide.description}
        primaryHref="/quote"
        primaryLabel="Request a quote"
        secondaryHref="/guides"
        secondaryLabel="All guides"
      />
      <article className="pb-16 md:pb-24">
        <div className="container pt-4">
          <Breadcrumbs
            items={[
              { name: "Guides", href: "/guides" },
              ...(guide.category
                ? [
                    {
                      name: guide.category,
                      href: `/guides/topics/${guide.category}`,
                    },
                  ]
                : []),
              { name: guide.title },
            ]}
          />
        </div>
        <div className="container-narrow mt-8 space-y-12">
          <p className="text-sm text-muted">
            Updated {updated} · {site.guideAuthor.name} ·{" "}
            {site.guideAuthor.role}
          </p>
          <p className="text-sm font-medium text-accent">
            Quotes open now · Confirmed bookings begin {site.bookingOpensLabel}
          </p>

          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="serif text-3xl text-ink">{section.heading}</h2>
              <p className="mt-4 text-[1.08rem] leading-8 text-ink-soft">
                {section.body}
              </p>
              {section.bullets && section.bullets.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.02rem] leading-7 text-ink-soft">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {faqs.length > 0 ? (
            <section>
              <h2 className="serif text-3xl text-ink">FAQs</h2>
              <div className="mt-6 space-y-6">
                {faqs.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-lg font-medium text-ink">{item.q}</h3>
                    <p className="mt-2 text-[1.05rem] leading-7 text-ink-soft">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {related.length > 0 ? (
            <section>
              <h2 className="serif text-2xl text-ink">Related</h2>
              <ul className="mt-4 space-y-2">
                {related.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-accent hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <Link href="/quote" className="btn btn-primary">
            Request a private quote
          </Link>
        </div>
      </article>
      <CtaBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}
    </>
  );
}
