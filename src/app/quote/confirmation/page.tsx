import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { site } from "@/lib/site";
import { ConfirmationId } from "./ConfirmationId";

export const metadata: Metadata = {
  title: "Request received",
  robots: { index: false, follow: false },
};

export default function QuoteConfirmationPage() {
  return (
    <div className="page-hero-wash pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container-narrow">
        <p className="eyebrow">Confirmation</p>
        <h1 className="serif mt-4 text-[clamp(2.4rem,5vw,3.8rem)] text-ink">
          Your private quote request is in the desk queue.
        </h1>
        <p className="lede mt-5">{site.responsePromise}</p>
        <Suspense fallback={null}>
          <ConfirmationId />
        </Suspense>
        <ul className="mt-8 space-y-3 text-[1.05rem] leading-8 text-ink-soft">
          <li>You will receive options by email (and phone/SMS if selected).</li>
          <li>
            Aircraft examples remain representative until a specific tail is
            assigned by the operating carrier.
          </li>
          <li>
            {site.legalName} arranges flights with Part 135 carriers and is not
            the operational-control holder unless your itinerary says otherwise.
          </li>
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/empty-legs" className="btn btn-primary">
            Browse empty legs
          </Link>
          <Link href="/contact" className="btn btn-line">
            Contact the desk
          </Link>
          <a href={`mailto:${site.email}`} className="btn btn-line">
            Email {site.email}
          </a>
        </div>
      </div>
    </div>
  );
}
