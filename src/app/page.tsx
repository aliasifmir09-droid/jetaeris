import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroQuoteStrip } from "@/components/HeroQuoteStrip";
import { SectionHeading } from "@/components/SectionHeading";
import { aircraft, guides, limoCities, routes } from "@/lib/content";
import { faqItems } from "@/lib/faq";
import { aircraftClasses, featuredCities, site } from "@/lib/site";

export default function HomePage() {
  const rail = [...routes, ...routes].map((r) => `${r.from} → ${r.to}`);

  return (
    <>
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--section-dark)] text-white">
        <Image
          src="/media/hero-jet.jpg"
          alt="Private jet on the tarmac at dusk"
          fill
          priority
          className="hero-media object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-veil)" }}
          aria-hidden
        />
        <div className="atmosphere-dark opacity-80" aria-hidden />

        <div className="container relative flex min-h-[100svh] flex-col justify-end pb-10 pt-28 md:pb-16 md:pt-32">
          <p className="display reveal text-[clamp(2.8rem,8vw,6.2rem)] text-white">
            {site.name}
          </p>
          <h1 className="serif reveal reveal-delay-1 mt-4 max-w-3xl text-[clamp(1.45rem,3vw,2.2rem)] text-white/90">
            {site.tagline}.
          </h1>
          <p className="reveal reveal-delay-2 mt-4 max-w-xl text-[1.02rem] leading-8 text-white/70">
            On-demand USA charter and empty legs through vetted Part 135
            carriers. Itinerary-first quoting. Optional FBO ground transfer.
          </p>

          <div className="reveal reveal-delay-3 mt-8 max-w-5xl">
            <HeroQuoteStrip />
          </div>

          <div className="reveal reveal-delay-3 mt-5 flex flex-wrap gap-3">
            <Link href="/empty-legs" className="btn btn-ghost">
              Live empty legs
            </Link>
            <Link href="/how-it-works" className="btn btn-ghost">
              How we arrange flights
            </Link>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-black/30 py-4 backdrop-blur-sm">
          <div className="route-rail">
            <div className="route-rail-track">
              {rail.map((item, i) => (
                <span key={`${item}-${i}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white/40 py-8">
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
            <div key={label}>
              <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
                {label}
              </p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-[var(--line)] py-20 md:py-28">
        <div className="container">
          <SectionHeading
            eyebrow="How we operate"
            title="Broker transparency before you pay."
            body={`${site.legalName} is an air charter broker and arranging agent. Flights are operated by licensed Part 135 direct air carriers. The operating carrier is identified before payment or confirmation.`}
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              [
                "01 · Request",
                "Share origin, destination, date, and passengers. We return curated options—not fake live inventory.",
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
      </section>

      <section className="relative overflow-hidden bg-[var(--section-dark)] py-20 text-white md:py-28">
        <div className="atmosphere-dark" aria-hidden />
        <div className="container relative">
          <SectionHeading
            light
            eyebrow="Featured corridors"
            title="Route pages built like products."
            body="Airports, block time, aircraft fit, and a direct quote path—not a generic luxury landing page."
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
                <p className="mt-3 text-sm text-white/55">{route.blockTime}</p>
                <p className="mt-6 text-xs tracking-[0.16em] text-white/70 uppercase transition-transform group-hover:translate-x-1">
                  Explore route
                </p>
              </Link>
            ))}
          </div>
          <Link href="/routes" className="btn btn-ghost mt-10">
            All routes
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <SectionHeading
            eyebrow="Fleet by mission"
            title="The right cabin for the trip."
            body="Short regional hops, coast-to-coast business travel, and group charters—class first, then a confirmed tail."
          />
          <ul className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {aircraftClasses.map((item) => (
              <li
                key={item.name}
                className="grid gap-2 py-5 md:grid-cols-[160px_1fr_auto] md:items-center"
              >
                <p className="font-semibold text-ink">{item.name}</p>
                <p className="text-sm text-muted">
                  {item.seats} seats · {item.bestFor}
                </p>
                <Link
                  href={item.href}
                  className="text-xs tracking-[0.14em] text-accent uppercase"
                >
                  Details
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[color-mix(in_srgb,var(--paper-deep)_55%,transparent)] py-20 md:py-28">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep shadow-[0_30px_80px_rgba(16,21,28,0.18)]">
            <Image
              src="/media/cabin.jpg"
              alt="Private jet cabin interior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Cities & FBOs"
              title="Charter where American private aviation actually flies."
              body="City hubs link airports, corridors, aircraft classes, and limo service—built for search and for sales."
            />
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {featuredCities.map((city) => (
                <Link
                  key={city.href}
                  href={city.href}
                  className="border border-[var(--line)] bg-white/50 px-4 py-4 transition-colors hover:border-[var(--line-strong)]"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-lg text-ink">
                    {city.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{city.airports}</p>
                </Link>
              ))}
            </div>
            <Link href="/charter" className="btn btn-line mt-8">
              All cities
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--section-dark)] py-20 text-white md:py-28">
        <div className="atmosphere-dark" aria-hidden />
        <div className="container relative">
          <SectionHeading
            light
            eyebrow="Limo & ground"
            title="FBO limousine service timed to wheels-down."
            body="Sedans, SUVs, sprinters, and stretch limos in major U.S. cities—booked with the jet when you want one arrival."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {limoCities.slice(0, 8).map((city) => (
              <Link
                key={city.slug}
                href={`/limo/${city.slug}`}
                className="border border-white/15 px-5 py-6 transition-colors hover:bg-white/[0.04]"
              >
                <p className="text-xs tracking-[0.16em] text-[var(--accent-soft)] uppercase">
                  {city.state}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl">
                  {city.name}
                </h3>
                <p className="mt-2 text-sm text-white/55">
                  {city.fbOs.slice(0, 3).join(" · ")}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/limo" className="btn btn-light">
              All limo cities
            </Link>
            <Link href="/quote?limo=1" className="btn btn-ghost">
              Request flight + limo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <SectionHeading
            eyebrow="Guides"
            title="Answers that earn trust—and rankings."
            body="Cost, empty legs, Part 135 vs commercial, baggage, pets, and booking timing—reviewed by the aviation desk."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {guides.slice(0, 6).map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="border border-[var(--line)] bg-white/40 p-8 transition-colors hover:border-[var(--line-strong)]"
              >
                <p className="eyebrow">Guide</p>
                <h3 className="serif mt-4 text-2xl text-ink md:text-3xl">
                  {guide.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted">
            {aircraft.map((a) => (
              <Link
                key={a.slug}
                href={`/aircraft/${a.slug}`}
                className="border border-[var(--line)] px-3 py-2 hover:border-[var(--line-strong)]"
              >
                {a.name}
              </Link>
            ))}
            <Link
              href="/guides"
              className="border border-[var(--line)] px-3 py-2 hover:border-[var(--line-strong)]"
            >
              All guides →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-20 md:py-28">
        <div className="container">
          <SectionHeading
            eyebrow="Q&A"
            title="Questions travelers ask before they request a flight."
            body="Expanded answers live on our FAQ—structured for people and for search."
          />
          <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {faqItems.slice(0, 6).map((item) => (
              <div
                key={item.q}
                className="grid gap-3 py-7 md:grid-cols-[1fr_1.2fr]"
              >
                <h3 className="text-lg font-semibold text-ink">{item.q}</h3>
                <p className="text-[1.02rem] leading-7 text-muted">{item.a}</p>
              </div>
            ))}
          </div>
          <Link href="/faq" className="btn btn-line mt-10">
            Full FAQ / Q&A
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
