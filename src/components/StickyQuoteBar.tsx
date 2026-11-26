"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/** Dark floating quote bar after the hero — matches cinematic sections. */
export function StickyQuoteBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[55] border-t border-[#2563eb]/30 bg-[#05080f]/94 px-4 py-3 shadow-[0_-16px_48px_rgba(0,0,0,0.45)] backdrop-blur-md transition-transform duration-400 md:px-6 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      aria-label="Request a quote"
    >
      <div className="container flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[0.68rem] tracking-[0.16em] text-[#93c5fd] uppercase">
            Quotes open now · Bookings {site.bookingOpensLabel}
          </p>
          <p className="mt-0.5 text-sm text-[#f4efe6]/85">
            Private charter, precisely arranged.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {site.phoneHref ? (
            <a href={site.phoneHref} className="btn btn-ghost">
              {site.phoneDisplay}
            </a>
          ) : null}
          <Link href="/quote" className="btn btn-light">
            Request a private quote
          </Link>
        </div>
      </div>
    </div>
  );
}
