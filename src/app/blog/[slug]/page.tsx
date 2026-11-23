import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import {
  blogPosts,
  getBlogPost,
  relatedBlogPosts,
} from "@/lib/blog";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const related = relatedBlogPosts(post.slug, 4);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.updated,
    author: {
      "@type": "Organization",
      name: site.guideAuthor.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        body={post.description}
        primaryHref="/quote"
        primaryLabel="Request a quote"
        secondaryHref="/blog"
        secondaryLabel="All articles"
      />
      <article className="pb-16 md:pb-24">
        <div className="container pt-4">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.title },
            ]}
          />
        </div>
        <div className="container mt-8 grid gap-12 lg:grid-cols-[1fr_280px]">
          <div className="max-w-3xl space-y-12">
            <p className="text-sm text-muted">
              Updated {post.updated} · {post.readMinutes} min read ·{" "}
              {site.guideAuthor.name}
            </p>
            <p className="text-sm font-medium text-accent">
              Bookings open {site.bookingOpensLabel} · Quotes available now
            </p>
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="serif text-3xl text-ink">{section.heading}</h2>
                <p className="mt-4 text-[1.08rem] leading-8 text-ink-soft">
                  {section.body}
                </p>
                {section.bullets?.length ? (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-[1.02rem] leading-7 text-muted">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {post.faqs.length > 0 ? (
              <section>
                <h2 className="serif text-3xl text-ink">FAQ</h2>
                <div className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                  {post.faqs.map((item) => (
                    <div key={item.q} className="py-6">
                      <h3 className="text-lg font-semibold text-ink">
                        {item.q}
                      </h3>
                      <p className="mt-2 text-[1.02rem] leading-8 text-muted">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="btn btn-primary">
                Request a quote
              </Link>
              {post.relatedHref ? (
                <Link href={post.relatedHref} className="btn btn-line">
                  {post.relatedLabel || "Related page"}
                </Link>
              ) : null}
            </div>
          </div>

          <aside className="h-fit border border-[var(--line)] bg-white/50 p-6 lg:sticky lg:top-28">
            <p className="text-xs tracking-[0.16em] text-accent uppercase">
              Keep reading
            </p>
            <ul className="mt-4 space-y-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="text-sm font-medium leading-6 text-ink hover:underline"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="btn btn-line mt-8 w-full">
              Information hub
            </Link>
          </aside>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {post.faqs.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}
      <CtaBand />
    </>
  );
}
