import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--section-dark)] text-white">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-3xl tracking-[-0.04em]">
            {site.name}
          </p>
          <p className="mt-4 max-w-sm text-[0.98rem] leading-7 text-white/65">
            {site.tagline}. Arranged through vetted Part 135 partners. Concierge
            quoting for on-demand charter and empty legs.
          </p>
        </div>

        <div>
          <p className="eyebrow text-[var(--accent-soft)]">Navigate</p>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-[var(--accent-soft)]">SEO hubs</p>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li>
              <Link href="/limo" className="hover:text-white">
                Limo service
              </Link>
            </li>
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
          </ul>
        </div>

        <div>
          <p className="eyebrow text-[var(--accent-soft)]">Concierge</p>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="pt-2 text-white/50">United States · 24/7 desk</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 text-xs tracking-[0.08em] text-white/45 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white/80">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/80">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
