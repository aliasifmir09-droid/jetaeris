import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Contact ${site.legalName} (JetAeris) in Queens, NY for private jet charter, empty legs, and FBO limo coordination.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="page-hero-wash pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="serif mt-4 text-[clamp(2.6rem,5vw,4.2rem)] text-ink">
            Talk to the JetAeris desk
          </h1>
          <p className="lede mt-5 max-w-md">
            Flight requests, limo coordination, partnerships, and press—reach{" "}
            {site.legalName} directly.
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="tracking-[0.14em] text-accent uppercase">
                Company
              </dt>
              <dd className="mt-2 text-[1.05rem] text-ink">{site.legalName}</dd>
            </div>
            <div>
              <dt className="tracking-[0.14em] text-accent uppercase">
                Address
              </dt>
              <dd className="mt-2 text-[1.05rem] leading-7 text-ink">
                {site.address.line1}
                <br />
                {site.address.city}, {site.address.region}
                <br />
                United States
              </dd>
            </div>
            <div>
              <dt className="tracking-[0.14em] text-accent uppercase">Email</dt>
              <dd className="mt-2">
                <a
                  className="text-[1.05rem] text-ink underline underline-offset-4"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="tracking-[0.14em] text-accent uppercase">Phone</dt>
              <dd className="mt-2">
                <a
                  className="text-[1.05rem] text-ink underline underline-offset-4"
                  href={site.phoneHref}
                >
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="tracking-[0.14em] text-accent uppercase">
                Legal / privacy
              </dt>
              <dd className="mt-2 space-y-1 text-[1.05rem]">
                <a
                  className="block underline underline-offset-4"
                  href={`mailto:${site.legalEmail}`}
                >
                  {site.legalEmail}
                </a>
                <a
                  className="block underline underline-offset-4"
                  href={`mailto:${site.privacyEmail}`}
                >
                  {site.privacyEmail}
                </a>
              </dd>
            </div>
          </dl>

          <p className="mt-10 text-sm text-muted">
            Prefer policies first? Visit the{" "}
            <Link href="/legal" className="underline underline-offset-4">
              Legal Center
            </Link>
            .
          </p>
        </div>

        <div className="panel p-6 md:p-10">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-ink">
            Send a trip request
          </h2>
          <p className="mt-2 text-sm text-muted">
            Same concierge form used for charter and optional FBO limo.
          </p>
          <div className="mt-6">
            <Suspense
              fallback={<p className="text-sm text-muted">Loading form…</p>}
            >
              <QuoteForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
