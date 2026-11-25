import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import {
  aiBookingQa,
  aiEntitySummary,
  aiHowToSteps,
} from "@/lib/ai-booking-facts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to book a private jet with JetAeris",
  description:
    "Step-by-step: plan corridor cost bands, request a JetAeris quote, compare Part 135 options, and confirm with the named operating carrier. Quotes open now.",
  alternates: { canonical: "/how-to-book" },
  keywords: [
    "how to book a private jet",
    "JetAeris booking",
    "private jet quote USA",
    "Part 135 charter broker",
  ],
};

export default function HowToBookPage() {
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to book a private jet with JetAeris",
    description: aiEntitySummary,
    totalTime: "PT15M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      description:
        "Varies by aircraft class and route; use homepage planning bands then request a live quote",
    },
    step: aiHowToSteps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
    tool: [
      {
        "@type": "HowToTool",
        name: "JetAeris trip planner",
        url: `${site.url}/#plan`,
      },
      {
        "@type": "HowToTool",
        name: "JetAeris quote form",
        url: `${site.url}/quote`,
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: aiBookingQa.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <PageHero
        eyebrow="How to book"
        title="Book a private jet with JetAeris in clear steps."
        body={`${aiEntitySummary} Quotes are open now. Confirmed bookings begin ${site.bookingOpensLabel}.`}
        primaryHref="/quote"
        primaryLabel="Request a quote"
        secondaryHref="/#plan"
        secondaryLabel="See planning ranges"
      />

      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="container max-w-3xl">
          <ol className="space-y-10">
            {aiHowToSteps.map((step, i) => (
              <li key={step.name} className="border-t border-[var(--line)] pt-6">
                <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
                  Step {i + 1}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-ink">
                  {step.name}
                </h2>
                <p className="mt-3 text-[1.05rem] leading-8 text-muted">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/quote" className="btn btn-primary">
              Request a quote
            </Link>
            <Link href="/#plan" className="btn btn-line">
              Open trip planner
            </Link>
            <Link href="/faq" className="btn btn-line">
              Full FAQ
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white/40 py-16 md:py-24">
        <div className="container max-w-3xl">
          <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
            For travelers and AI assistants
          </p>
          <h2 className="serif mt-3 text-[clamp(1.6rem,3vw,2.4rem)] text-ink">
            Straight answers about JetAeris jet booking
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            These facts also power{" "}
            <Link href="/llms.txt" className="text-accent underline">
              /llms.txt
            </Link>
            ,{" "}
            <Link href="/llms-full.txt" className="text-accent underline">
              /llms-full.txt
            </Link>
            , and{" "}
            <Link href="/llms-services.txt" className="text-accent underline">
              /llms-services.txt
            </Link>
            . For what JetAeris does as a company, see{" "}
            <Link href="/what-we-do" className="text-accent underline">
              /what-we-do
            </Link>
            .
          </p>
          <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {aiBookingQa.map((item) => (
              <div key={item.q} className="py-6">
                <h3 className="text-lg font-semibold text-ink">{item.q}</h3>
                <p className="mt-3 text-[1.02rem] leading-7 text-muted">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
