import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import {
  companyFaqs,
  companyFacts,
  companyProcess,
  companyRegions,
  companyServices,
  companyWhatWeDo,
  companyWhyUs,
} from "@/lib/company";
import { site } from "@/lib/site";

const aboutDescription = `${site.legalName} is a USA private jet charter broker in Queens, NY. On-demand flights, empty legs, and FBO limo via Part 135 carriers—named before you pay.`;

export const metadata: Metadata = {
  title: "About JetAeris | USA Private Jet Charter Broker",
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About JetAeris | USA Private Jet Charter Broker",
    description: `What ${site.legalName} does, why travelers choose our desk, and how Part 135 charter is arranged.`,
    url: "/about",
  },
};

export default function AboutPage() {
  const aboutLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${site.legalName}`,
    url: `${site.url}/about`,
    description: aboutDescription,
    mainEntity: {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      alternateName: site.name,
      url: site.url,
      email: site.email,
      description: site.description,
      slogan: site.tagline,
      areaServed: { "@type": "Country", name: "United States" },
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line1,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      knowsAbout: [
        "Private jet charter",
        "Air charter brokerage",
        "Part 135",
        "Empty legs",
        "FBO ground transfer",
      ],
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: companyFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <PageHero
        eyebrow="About JetAeris"
        title={`${site.legalName} — USA private jet charter brokerage.`}
        body="What we do, why travelers choose our desk, and how we arrange Part 135 flights without fake fleet claims or instant-booking theater."
        primaryHref="/quote"
        primaryLabel="Request a quote"
        secondaryHref="/broker-disclosure"
        secondaryLabel="Broker disclosure"
        imageSrc="/media/cabin-window-uhd.jpg"
        imageAlt="View through a private jet cabin window arranged via JetAeris partners"
      />

      {/* What we do */}
      <section className="border-b border-[var(--line)] pb-16 md:pb-24">
        <div className="container">
          <p className="eyebrow">Company overview</p>
          <h2 className="display mt-3 max-w-3xl text-[clamp(1.8rem,3.5vw,2.8rem)] text-ink">
            {companyWhatWeDo.headline}
          </h2>
          <p className="mt-5 max-w-3xl text-[1.08rem] leading-8 text-ink-soft">
            {companyWhatWeDo.lead}
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {companyWhatWeDo.items.map((item) => (
              <div key={item.title} className="border-t border-[var(--line)] pt-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[1.02rem] leading-7 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper-deep)_40%,transparent)] py-16 md:py-24">
        <div className="container">
          <p className="eyebrow">Why JetAeris</p>
          <h2 className="display mt-3 max-w-3xl text-[clamp(1.8rem,3.5vw,2.8rem)] text-ink">
            {companyWhyUs.headline}
          </h2>
          <p className="mt-5 max-w-3xl text-[1.08rem] leading-8 text-ink-soft">
            {companyWhyUs.lead}
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companyWhyUs.items.map((item) => (
              <div key={item.title} className="panel p-6">
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-[var(--line)] py-16 md:pb-24">
        <div className="container">
          <p className="eyebrow">Process</p>
          <h2 className="display mt-3 max-w-3xl text-[clamp(1.8rem,3.5vw,2.8rem)] text-ink">
            {companyProcess.headline}
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {companyProcess.steps.map((step, i) => (
              <li key={step.title} className="border-t border-[var(--line)] pt-6">
                <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/how-it-works" className="btn btn-line">
              How it works
            </Link>
            <Link href="/safety" className="btn btn-line">
              Safety & carrier checks
            </Link>
          </div>
        </div>
      </section>

      {/* Services + regions + facts */}
      <section className="border-b border-[var(--line)] py-16 md:pb-24">
        <div className="container grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow">Services</p>
            <h2 className="display mt-3 text-[clamp(1.8rem,3.5vw,2.6rem)] text-ink">
              Arranged through vetted Part 135 partners.
            </h2>
            <ul className="mt-8 space-y-3 text-[1.02rem] leading-7 text-ink-soft">
              {companyServices.map((service) => (
                <li key={service} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-12 font-[family-name:var(--font-display)] text-xl text-ink">
              {companyRegions.headline}
            </h3>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-8 text-muted">
              {companyRegions.body}
            </p>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-ink-soft">
              JetAeris is the consumer brand of <strong>{site.legalName}</strong>.{" "}
              {site.address.publicNote} We do not invent fleet ownership, flight
              counts, testimonials, or safety logos. Real operating history will
              appear here when cleared for publication.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/broker-disclosure" className="btn btn-line">
                Broker disclosure
              </Link>
              <Link href="/legal" className="btn btn-line">
                Legal center
              </Link>
              <Link href="/contact" className="btn btn-line">
                Contact the desk
              </Link>
            </div>
          </div>

          <aside className="panel h-fit p-8">
            <p className="eyebrow">Company facts</p>
            <dl className="mt-5 space-y-4 text-sm">
              {companyFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-ink">
                    {"href" in fact && fact.href ? (
                      <a href={fact.href} className="underline underline-offset-4">
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="text-muted">Phone</dt>
                <dd className="mt-1 text-muted">
                  {site.phoneDisplay && site.phoneHref ? (
                    <a href={site.phoneHref} className="text-ink underline">
                      {site.phoneDisplay}
                    </a>
                  ) : (
                    "Monitored U.S. line publishing when provisioned—email for immediate requests."
                  )}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* Company FAQ */}
      <section className="pb-16 md:pb-24">
        <div className="container">
          <p className="eyebrow">Company Q&A</p>
          <h2 className="display mt-3 max-w-3xl text-[clamp(1.8rem,3.5vw,2.8rem)] text-ink">
            Straight answers about who we are.
          </h2>
          <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {companyFaqs.map((item) => (
              <div key={item.q} className="py-7">
                <h3 className="text-lg font-semibold text-ink md:text-xl">{item.q}</h3>
                <p className="mt-3 max-w-3xl text-[1.05rem] leading-8 text-muted">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/faq" className="btn btn-line">
              Full FAQ
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
