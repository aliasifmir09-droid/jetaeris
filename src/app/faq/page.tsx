import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { faqCategories, faqItems } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ & Q&A · Private jet charter",
  description: `Frequently asked questions about ${site.legalName} private jet charter, empty legs, limo transfers, pricing, safety, and booking.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Q&A"
        title="Answers that help travelers—and search engines—understand JetAeris."
        body="Straight questions on booking, cost, empty legs, aircraft, limo, safety, and company details for Jet Aeris Inc."
        primaryHref="/quote"
        secondaryHref="/contact"
        secondaryLabel="Contact us"
      />

      <section className="pb-16 md:pb-24">
        <div className="container flex flex-wrap gap-2 pb-10">
          {faqCategories.map((cat) => (
            <a
              key={cat}
              href={`#${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="border border-[var(--line)] px-3 py-2 text-xs tracking-[0.12em] uppercase hover:border-[var(--line-strong)]"
            >
              {cat}
            </a>
          ))}
        </div>

        <div className="container space-y-16">
          {faqCategories.map((cat) => {
            const items = faqItems.filter((i) => i.category === cat);
            return (
              <div key={cat} id={cat.toLowerCase().replace(/\s+/g, "-")}>
                <h2 className="serif text-3xl text-ink">{cat}</h2>
                <div className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                  {items.map((item) => (
                    <div key={item.q} className="py-7">
                      <h3 className="text-lg font-semibold text-ink md:text-xl">
                        {item.q}
                      </h3>
                      <p className="mt-3 max-w-3xl text-[1.05rem] leading-8 text-muted">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="container mt-12 flex flex-wrap gap-3">
          <Link href="/quote" className="btn btn-primary">
            Request a quote
          </Link>
          <Link href="/guides" className="btn btn-line">
            Read guides
          </Link>
          <Link href="/legal" className="btn btn-line">
            Legal center
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      <CtaBand />
    </>
  );
}
