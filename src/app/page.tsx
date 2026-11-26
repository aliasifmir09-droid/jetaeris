import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { JeskoScrollStory } from "@/components/jesko/JeskoScrollStory";
import { PlanningEstimator } from "@/components/PlanningEstimator";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { routes } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  const railItems = routes.slice(0, 12).map((r) => `${r.from} → ${r.to}`);

  return (
    <>
      <JeskoScrollStory rail={railItems} />

      {/* Easy-first product: anonymous planning ranges */}
      <PlanningEstimator />

      {/* Short operational proof */}
      <ScrollReveal
        as="section"
        stagger
        className="border-b border-[var(--line)] bg-white/40 py-8"
      >
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Response", site.responsePromise],
            ["Role", site.role],
            [
              "Safety review",
              "Part 135 certificate status checked before options are presented.",
            ],
            ["Desk", site.deskHours],
          ].map(([label, body]) => (
            <div key={label} data-reveal>
              <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
                {label}
              </p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                {label === "Desk" && site.phoneHref ? (
                  <>
                    {body} ·{" "}
                    <a
                      href={site.phoneHref}
                      className="text-accent underline underline-offset-2"
                    >
                      {site.phoneDisplay}
                    </a>
                  </>
                ) : (
                  body
                )}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Process — keep tight */}
      <ScrollReveal as="section" className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="How it works"
            title="Request. Compare. Confirm."
            body="Curated options from vetted Part 135 carriers — not fake live inventory. The operating carrier is named before you pay."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              [
                "01 · Request",
                "Share origin, destination, date, and passengers — or start from the planning ranges above.",
              ],
              [
                "02 · Compare",
                "Aircraft class, timing, price range, and operator confirmation status—clearly labeled.",
              ],
              [
                "03 · Confirm",
                "You see the operating carrier, cancellation terms, and itinerary before funds are committed.",
              ],
            ].map(([title, body]) => (
              <div key={title} className="border-t border-[var(--line)] pt-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/safety" className="btn btn-line">
              Safety & carrier verification
            </Link>
            <Link href="/broker-disclosure" className="btn btn-line">
              Broker disclosure
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Three clear paths */}
      <ScrollReveal
        as="section"
        stagger
        className="border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper-deep)_40%,transparent)] py-16 md:py-24"
      >
        <div className="container">
          <SectionHeading
            eyebrow="Ways to fly"
            title="Three clear paths."
            body="On-demand charter, empty legs when timing fits, and corporate multi-leg support."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              [
                "On-demand",
                "Quote for a specific date and cabin",
                "/quote",
                "Request a quote",
              ],
              [
                "Empty legs",
                "Flexible one-ways on the board",
                "/empty-legs",
                "Browse empty legs",
              ],
              [
                "Corporate",
                "Multi-leg desk coordination",
                "/contact",
                "Talk to the desk",
              ],
            ].map(([title, body, href, cta]) => (
              <Link
                key={title}
                href={href}
                data-reveal
                className="border border-[var(--line)] bg-white/60 px-5 py-6 transition-colors hover:border-[var(--line-strong)]"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
                <p className="mt-5 text-xs tracking-[0.14em] text-accent uppercase">
                  {cta} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <section className="relative overflow-hidden bg-[var(--section-dark)] py-20 text-white md:py-28">
        <div className="atmosphere-dark" aria-hidden />
        <div className="container relative">
          <SectionHeading
            light
            eyebrow="Featured corridors"
            title="Popular USA routes with planning bands."
            body="Airports, block time, and a direct path into the planner — not a generic luxury landing page."
          />
          <div className="mt-14 grid gap-0 border-t border-white/12 md:grid-cols-2">
            {routes.slice(0, 6).map((route) => (
              <Link
                key={route.slug}
                href={`/routes/${route.slug}`}
                className="group border-b border-white/12 px-0 py-8 transition-colors hover:bg-white/[0.03] md:px-8 md:odd:border-r"
              >
                <p className="text-xs tracking-[0.18em] text-[var(--accent-soft)] uppercase">
                  {route.airports}
                </p>
                <h3 className="serif mt-4 text-3xl md:text-[2.1rem]">
                  {route.from}
                  <span className="mx-3 text-white/30">→</span>
                  {route.to}
                </h3>
                <p className="mt-3 text-sm text-white/55">
                  {route.blockTime} · Light {route.priceEstimate.light}
                </p>
                <p className="mt-6 text-xs tracking-[0.16em] text-white/70 uppercase transition-transform group-hover:translate-x-1">
                  Route details →
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/routes" className="btn btn-ghost">
              All routes
            </Link>
            <Link href="/#plan" className="btn btn-light">
              Plan a trip
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
