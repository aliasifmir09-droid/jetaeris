import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  dark?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  body,
  primaryHref = "/quote",
  primaryLabel = "Request a flight",
  secondaryHref,
  secondaryLabel,
  dark = false,
}: Props) {
  return (
    <section
      className={`relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 ${
        dark ? "bg-[var(--section-dark)] text-white" : "page-hero-wash text-ink"
      }`}
    >
      <div className="atmosphere" aria-hidden />
      <div className="container relative">
        {eyebrow ? (
          <p className={`eyebrow ${dark ? "text-[var(--accent-soft)]" : ""}`}>
            {eyebrow}
          </p>
        ) : null}
        <h1 className="serif mt-4 max-w-4xl text-[clamp(2.5rem,6vw,4.8rem)]">
          {title}
        </h1>
        {body ? (
          <p
            className={`lede mt-6 max-w-2xl ${dark ? "text-white/70" : ""}`}
          >
            {body}
          </p>
        ) : null}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={primaryHref}
            className={`btn ${dark ? "btn-light" : "btn-primary"}`}
          >
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className={`btn ${dark ? "btn-ghost" : "btn-line"}`}
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
