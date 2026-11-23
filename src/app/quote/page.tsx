import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a flight",
  description:
    "Staged USA private jet charter quote with JetAeris—trip basics, preferences, contact, and review. Optional FBO limo.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <div className="page-hero-wash pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow">Flight request</p>
          <h1 className="serif mt-4 text-[clamp(2.6rem,5vw,4.2rem)] text-ink">
            A staged quote—built like a booking desk, not a lead dump.
          </h1>
          <p className="lede mt-5 max-w-md">
            Trip basics, passenger details, preferences, then contact and review.
            You receive a request ID and a clear response promise.
          </p>
          <ul className="mt-10 space-y-4 text-sm leading-6 text-ink-soft">
            <li>One-way, round-trip, or multi-city</li>
            <li>Aircraft preference, empty-leg interest, catering, Wi-Fi</li>
            <li>Optional limo / SUV / sprinter at either FBO</li>
            <li>{site.responsePromise}</li>
          </ul>
          <p className="mt-8 text-sm text-muted">
            {site.legalName} is a charter broker. Operating carriers are named
            before payment.{" "}
            <Link href="/safety" className="underline underline-offset-4">
              How we operate
            </Link>
          </p>
        </div>
        <div className="panel p-6 md:p-10">
          <Suspense
            fallback={
              <div className="space-y-4" aria-busy="true" aria-live="polite">
                <p className="text-sm font-semibold text-ink">
                  Preparing your quote form…
                </p>
                <p className="text-sm text-muted">
                  Trip · Details · Contact · Review. Your request receives a
                  confirmation ID when submitted.
                </p>
                <div className="h-40 animate-pulse border border-[var(--line)] bg-white/40" />
              </div>
            }
          >
            <QuoteForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
