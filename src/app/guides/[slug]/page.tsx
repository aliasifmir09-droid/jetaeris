import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getGuide, guides } from "@/lib/content";

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
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <PageHero
        eyebrow="Guide"
        title={guide.title}
        body={guide.description}
        secondaryHref="/guides"
        secondaryLabel="All guides"
      />
      <article className="pb-16 md:pb-24">
        <div className="container-narrow space-y-12">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="serif text-3xl text-ink">{section.heading}</h2>
              <p className="mt-4 text-[1.08rem] leading-8 text-ink-soft">
                {section.body}
              </p>
            </section>
          ))}
          <Link href="/quote" className="btn btn-primary">
            Get a quote
          </Link>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
