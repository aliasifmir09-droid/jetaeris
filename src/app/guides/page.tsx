import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { guides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Private jet guides",
  description:
    "USA private jet guides from JetAeris—charter costs, empty legs, and how to book with confidence.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Answers that move people to a quote."
        body="Practical SEO content on cost, empty legs, and the charter process—written for travelers, not keyword stuffing."
      />
      <section className="pb-20 md:pb-28">
        <div className="container grid gap-5 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="panel p-8 transition-transform hover:-translate-y-0.5"
            >
              <h2 className="serif text-2xl text-ink md:text-3xl">
                {guide.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
