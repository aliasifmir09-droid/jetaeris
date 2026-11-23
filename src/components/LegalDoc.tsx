import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function LegalDoc({
  title,
  updated = "November 23, 2026",
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="page-hero-wash pt-28 pb-20 md:pt-36 md:pb-28">
      <article className="container-narrow">
        <p className="eyebrow">Legal</p>
        <h1 className="serif mt-4 text-[clamp(2.2rem,4.5vw,3.6rem)] text-ink">
          {title}
        </h1>
        <p className="mt-4 text-sm text-muted">
          Last updated {updated} · {site.legalName}
        </p>
        <div className="legal-prose mt-10 space-y-5 text-[1.05rem] leading-8 text-ink-soft">
          {children}
        </div>
        <p className="mt-12 text-sm text-muted">
          Questions?{" "}
          <Link href="/contact" className="underline underline-offset-4">
            Contact us
          </Link>{" "}
          or email{" "}
          <a
            href={`mailto:${site.legalEmail}`}
            className="underline underline-offset-4"
          >
            {site.legalEmail}
          </a>
          .
        </p>
      </article>
    </div>
  );
}
