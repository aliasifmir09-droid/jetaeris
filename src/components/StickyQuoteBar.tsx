"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/** Persistent quote CTA after the hero — never hidden by cinema. */
export function StickyQuoteBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[55] border-t border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_94%,white)] px-4 py-3 shadow-[0_-12px_40px_rgba(16,21,28,0.12)] backdrop-blur-md transition-transform duration-400 md:px-6 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      aria-label="Request a quote"
    >
      <div className="container flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[0.68rem] tracking-[0.16em] text-accent uppercase">
            Quotes open now · Bookings {site.bookingOpensLabel}
          </p>
          <p className="mt-0.5 text-sm text-ink-soft">
            Private charter, precisely arranged.
          </p>
        </div>
        <Link href="/quote" className="btn btn-primary">
          Request a private quote
        </Link>
      </div>
    </div>
  );
}
