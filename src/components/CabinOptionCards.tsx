import Link from "next/link";
import type { CabinOption } from "@/lib/planning-estimate";

type Props = {
  options: CabinOption[];
  /** Optional quote CTA builder per cabin */
  quoteHref?: (option: CabinOption) => string;
  compact?: boolean;
};

/**
 * Shared cabin compare cards — planning bands or quote-only.
 * Easy for customers to scan class vs price vs fit.
 */
export function CabinOptionCards({ options, quoteHref, compact }: Props) {
  return (
    <div
      className={`grid gap-3 ${
        compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"
      }`}
    >
      {options.map((opt) => {
        const href = quoteHref?.(opt);
        return (
          <article
            key={opt.id}
            className={`flex flex-col border border-[var(--line)] bg-white/70 p-5 transition-colors ${
              opt.fitsPassengers
                ? "hover:border-[var(--line-strong)]"
                : "opacity-55"
            }`}
          >
            <p
              className={`text-[0.62rem] tracking-[0.14em] uppercase ${
                opt.status === "estimate" ? "text-accent" : "text-muted"
              }`}
            >
              {opt.status === "estimate" ? "Planning band" : "Live quote"}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg text-ink">
              {opt.name}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {opt.seats} seats · {opt.bestFor}
            </p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-xl text-ink">
              {opt.priceLabel}
            </p>
            {!opt.fitsPassengers ? (
              <p className="mt-2 text-xs text-muted">
                May be tight for this passenger count — we will confirm fit.
              </p>
            ) : null}
            <div className="mt-auto flex flex-wrap gap-3 pt-5">
              {href ? (
                <Link href={href} className="btn btn-primary text-xs">
                  Request this class
                </Link>
              ) : null}
              <Link
                href={opt.href}
                className="text-xs tracking-[0.12em] text-accent uppercase"
              >
                Cabin details
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
