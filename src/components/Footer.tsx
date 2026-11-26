import Link from "next/link";
import { legalLinks, nav, secondaryNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--section-dark)] text-white">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-3xl tracking-[-0.04em]">
            {site.name}
          </p>
          <p className="mt-3 text-sm text-white/55">{site.legalName}</p>
          <p className="mt-4 max-w-sm text-[0.98rem] leading-7 text-white/65">
            {site.tagline}. Arranged through vetted Part 135 partners. Concierge
            quoting for on-demand charter, empty legs, and FBO limo.
          </p>
          <p className="mt-3 max-w-sm text-sm font-medium leading-6 text-[var(--accent-soft)]">
            Bookings open {site.bookingOpensLabel}
          </p>
          <p className="mt-1 max-w-sm text-xs leading-5 text-white/45">
            {site.bookingOpensTagline}
          </p>
          <p className="mt-5 text-sm leading-7 text-white/50">
            {site.address.kind}
            <br />
            {site.address.display}
            <br />
            United States
          </p>
          <p className="mt-3 max-w-sm text-xs leading-5 text-white/35">
            Quote-and-concierge brokerage—not instant booking. Office address is
            not a walk-in FBO counter.
          </p>
        </div>

        <div>
          <p className="eyebrow text-[var(--accent-soft)]">Navigate</p>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            {[...nav, ...secondaryNav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-[var(--accent-soft)]">Popular</p>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li>
              <Link href="/limo/new-york" className="hover:text-white">
                New York limo
              </Link>
            </li>
            <li>
              <Link href="/charter/miami" className="hover:text-white">
                Miami charter
              </Link>
            </li>
            <li>
              <Link href="/routes/new-york-miami" className="hover:text-white">
                NY → Miami
              </Link>
            </li>
            <li>
              <Link href="/airports" className="hover:text-white">
                Airports / FBOs
              </Link>
            </li>
            <li>
              <Link href="/guides" className="hover:text-white">
                Guides
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-[var(--accent-soft)]">Legal</p>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/55">
            <Link href="/contact" className="hover:text-white">
              Contact the concierge desk
            </Link>
            {site.phoneDisplay && site.phoneHref ? (
              <>
                <br />
                <a href={site.phoneHref} className="hover:text-white">
                  {site.phoneDisplay}
                </a>
              </>
            ) : null}
            <br />
            <span className="mt-2 block text-xs normal-case tracking-normal text-white/40">
              {site.footerHours}
            </span>
            <span className="mt-1 block text-xs normal-case tracking-normal text-white/35">
              {site.deskHours}
            </span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 text-xs tracking-[0.08em] text-white/45 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {site.legalName}. All rights reserved. · {site.name}
          </p>
          <div className="flex flex-wrap gap-5">
            {site.phoneHref ? (
              <a href={site.phoneHref} className="hover:text-white/80">
                {site.phoneDisplay}
              </a>
            ) : null}
            <Link href="/privacy" className="hover:text-white/80">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/80">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white/80">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
