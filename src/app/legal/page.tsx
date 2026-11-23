import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { legalLinks, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal Center",
  description: `Legal policies for ${site.legalName} (JetAeris)—privacy, terms, cookies, cancellation, broker disclosure, and contact.`,
  alternates: { canonical: "/legal" },
};

export default function LegalCenterPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={`${site.legalName} · Legal Center`}
        body={`Policies and disclosures for JetAeris private aviation and ground-transfer arrangements. Registered address: ${site.address.display}.`}
        primaryHref="/contact"
        primaryLabel="Contact us"
        secondaryHref="/broker-disclosure"
        secondaryLabel="Broker disclosure"
      />
      <section className="pb-20 md:pb-28">
        <div className="container grid gap-4 md:grid-cols-2">
          {legalLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="panel p-6 transition-transform hover:-translate-y-0.5"
            >
              <h2 className="font-[family-name:var(--font-display)] text-xl text-ink">
                {item.label}
              </h2>
              <p className="mt-2 text-sm text-muted">{item.href}</p>
            </Link>
          ))}
          <Link
            href="/contact"
            className="panel p-6 transition-transform hover:-translate-y-0.5"
          >
            <h2 className="font-[family-name:var(--font-display)] text-xl text-ink">
              Contact us
            </h2>
            <p className="mt-2 text-sm text-muted">/contact</p>
          </Link>
          <Link
            href="/faq"
            className="panel p-6 transition-transform hover:-translate-y-0.5"
          >
            <h2 className="font-[family-name:var(--font-display)] text-xl text-ink">
              FAQ / Q&A
            </h2>
            <p className="mt-2 text-sm text-muted">/faq</p>
          </Link>
        </div>
      </section>
    </>
  );
}
