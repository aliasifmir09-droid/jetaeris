import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { aircraft, guides, limoCities, routes } from "@/lib/content";
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

        <div className="container relative flex min-h-[100svh] flex-col justify-end pb-14 pt-32 md:pb-20">
          <p className="display reveal text-[clamp(3.2rem,10vw,7.5rem)] text-white">
            {site.name}
          </p>
          <h1 className="serif reveal reveal-delay-1 mt-5 max-w-3xl text-[clamp(1.55rem,3.2vw,2.35rem)] text-white/90">
            Private flight for the United States—arranged like a flagship desk.
          </h1>
          <p className="reveal reveal-delay-2 mt-5 max-w-xl text-[1.05rem] leading-8 text-white/72">
            On-demand charter and empty legs. Trip-first quoting. Vetted Part 135
            partners. Response measured in minutes—not membership theater.
          </p>
          <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-3">
            <Link href="/quote" className="btn btn-light">
              Request a flight
            </Link>
            <Link href="/empty-legs" className="btn btn-ghost">
              View empty legs
            </Link>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-black/25 py-4 backdrop-blur-sm">
          <div className="route-rail">
            <div className="route-rail-track">
              {rail.map((item, i) => (
                <span key={`${item}-${i}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] py-20 md:py-28">
        <div className="container grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <SectionHeading
            eyebrow="Why JetAeris"
            title="Quiet luxury. Serious operations. No broker clutter."
            body="We studied how NetJets leads with confidence, how VistaJet separates the trip from the relationship, and how top brokers start with itinerary fields. JetAeris is that synthesis for USA travelers."
          />
          <div className="stat-grid">
            {[
              ["15 min", "Typical first response in desk hours"],
              ["USA", "City pairs, FBOs, and empty-leg watches"],
              ["Vetted", "Part 135 partners · safety-first"],
            ].map(([k, v]) => (
              <div key={k} className="panel p-5">
                <p className="font-[family-name:var(--font-display)] text-2xl text-ink">
                  {k}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--section-dark)] py-20 text-white md:py-28">
        <div className="atmosphere-dark" aria-hidden />
        <div className="container relative">
          <SectionHeading
            light
            eyebrow="Featured routes"
            title="Own the corridor—not a vague homepage claim."
            body="Big brands under-invest in route pages. Each corridor below is a product: airports, timing, aircraft fit, and a direct quote path."
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
            eyebrow="Cities"
            title="Charter where American private aviation actually flies."
            body="Dedicated city pages for SEO and for sales—airports, corridors, and a clear request path."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCities.map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className="panel group p-6 transition-transform hover:-translate-y-0.5"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl text-ink">
                  {city.name}
                </h3>
                <p className="mt-3 text-sm text-muted">{city.airports}</p>
                <p className="mt-6 text-xs tracking-[0.14em] text-accent uppercase">
                  View city →
                </p>
              </Link>
            ))}
          </div>
          <Link href="/charter" className="btn btn-line mt-10">
            All cities
          </Link>
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
              eyebrow="Aircraft"
              title="The right cabin for the trip—confirmed before you fly."
              body="Ordinary sites drown you in specs. We present classes the way flagship brands do: purpose first, then the conversation."
            />
            <ul className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {aircraftClasses.map((item) => (
                <li key={item.name} className="grid gap-2 py-5 md:grid-cols-[150px_1fr_auto] md:items-center">
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
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--section-dark)] py-20 text-white md:py-28">
        <div className="atmosphere-dark" aria-hidden />
        <div className="container relative">
          <SectionHeading
            light
            eyebrow="Limo & ground"
            title="FBO limousine service in America’s top cities."
            body="Book the jet and the car together. Sedans, SUVs, sprinters, and stretch limos timed to wheels-down—not a random airport curb."
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
              Book flight + limo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <SectionHeading
            eyebrow="Guides"
            title="SEO pages that answer money questions."
            body="Cost guides for major corridors, empty legs, limo transfers, and how-to charter—written to rank and convert."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {guides.slice(0, 6).map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="panel p-8 transition-transform hover:-translate-y-0.5"
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

      <CtaBand />
    </>
  );
}
