import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { emptyLegs, emptyLegsUpdatedAt } from "@/lib/site";

export const metadata: Metadata = {
  title: "Empty legs USA",
  description:
    "USA private jet empty legs with JetAeris—statused one-way positioning flights with last-updated timestamps, subject to operator confirmation.",
  alternates: { canonical: "/empty-legs" },
};

const statusLabel: Record<(typeof emptyLegs)[number]["status"], string> = {
  available: "Available to request",
  pending: "Pending confirmation",
  sold: "Sold",
  expired: "Expired",
};

export default function EmptyLegsPage() {
  const live = emptyLegs.filter((l) => l.status !== "expired");
  const archived = emptyLegs.filter((l) => l.status === "expired");

  return (
    <>
      <PageHero
        dark
        eyebrow="Empty legs"
        title="One-way positioning. Serious savings when timing aligns."
        body="Empty legs are aircraft already moving. Status changes quickly. Every listing below shows availability state and is subject to operator confirmation—we never invent live inventory."
        secondaryHref="/guides/empty-leg-flights-explained"
        secondaryLabel="How empty legs work"
      />

      <section className="border-b border-[var(--line)] bg-white/40 py-5">
        <div className="container flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <p>
            Board last updated:{" "}
            <span className="text-ink">{emptyLegsUpdatedAt}</span>
          </p>
          <p>Prices and holds require live operator confirmation.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {live.map((leg) => {
            const bookable =
              leg.status === "available" || leg.status === "pending";
            return (
              <article
                key={leg.id}
                className="grid gap-4 py-8 md:grid-cols-[1.3fr_1fr_auto] md:items-end"
              >
                <div>
                  <p
                    className={`text-[0.68rem] tracking-[0.16em] uppercase ${
                      leg.status === "available"
                        ? "text-accent"
                        : leg.status === "pending"
                          ? "text-[color-mix(in_srgb,var(--accent)_70%,#66707c)]"
                          : "text-muted"
                    }`}
                  >
                    {statusLabel[leg.status]}
                  </p>
                  <h2 className="serif mt-2 text-3xl text-ink md:text-4xl">
                    {leg.from}
                    <span className="mx-3 text-ink/25">→</span>
                    {leg.to}
                  </h2>
                  <p className="mt-3 text-sm text-muted">{leg.note}</p>
                </div>
                <div className="text-sm leading-7 text-ink-soft">
                  <p>
                    <span className="text-muted">Date · </span>
                    {leg.date}
                  </p>
                  <p>
                    <span className="text-muted">Window · </span>
                    {leg.window}
                  </p>
                  <p>
                    <span className="text-muted">Aircraft · </span>
                    {leg.aircraft}
                  </p>
                  <p>
                    <span className="text-muted">Seats · </span>
                    {leg.seats}
                  </p>
                  <p>
                    <span className="text-muted">Price · </span>
                    {leg.priceLabel}
                  </p>
                </div>
                {bookable ? (
                  <Link
                    href={`/quote?interest=empty-leg&from=${encodeURIComponent(leg.from)}&to=${encodeURIComponent(leg.to)}`}
                    className="btn btn-line w-fit"
                  >
                    Request this leg
                  </Link>
                ) : (
                  <span className="text-xs tracking-[0.14em] text-muted uppercase">
                    Not bookable
                  </span>
                )}
              </article>
            );
          })}
        </div>

        {archived.length > 0 ? (
          <div className="container mt-16">
            <h2 className="font-[family-name:var(--font-display)] text-xl text-ink">
              Expired / archive
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Expired legs are kept as reference only and are not offered for
              booking.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              {archived.map((leg) => (
                <li key={leg.id}>
                  {leg.from} → {leg.to} · {leg.date} · {statusLabel[leg.status]}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="container mt-12 max-w-2xl">
          <p className="text-[1.05rem] leading-8 text-muted">
            Want corridor alerts? Submit a quote with your city pairs and note
            “empty leg watch,” or start a request with empty-leg interest
            enabled. Timing flexibility improves match rates.
          </p>
          <Link href="/quote?interest=empty-leg" className="btn btn-primary mt-8">
            Set an empty-leg alert
          </Link>
        </div>
      </section>
      <CtaBand title="Set an empty-leg watch" />
    </>
  );
}
