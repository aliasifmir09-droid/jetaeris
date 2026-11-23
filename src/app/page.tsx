import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { aircraftClasses, featuredRoutes, site } from "@/lib/site";

const heroImage =
  "https://images.unsplash.com/photo-1540962351504-eee142fea5fc?auto=format&fit=crop&w=2400&q=80";
const cabinImage =
  "https://images.unsplash.com/photo-1474302770737-173a5371cec3?auto=format&fit=crop&w=1800&q=80";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-white">
        <Image
          src={heroImage}
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

        <div className="container relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 md:pb-24">
          <p className="eyebrow reveal text-[var(--accent-soft)]">{site.name}</p>
          <h1 className="display reveal reveal-delay-1 mt-5 max-w-4xl text-[clamp(3.4rem,9vw,7.2rem)] text-white">
            Private flight,
            <br />
            without the noise.
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-xl text-[1.08rem] leading-8 text-white/78">
            On-demand charter and empty legs across the United States—arranged
            with the calm precision of a private concierge desk.
          </p>
          <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-3">
            <Link href="/quote" className="btn btn-primary bg-white text-ink hover:bg-white/90">
              Request a flight
            </Link>
            <Link href="/empty-legs" className="btn btn-ghost">
              View empty legs
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-paper py-20 md:py-28">
        <div className="container grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionHeading
            eyebrow="The JetAeris standard"
            title="Built like a flagship brand. Priced like a serious desk."
            body="Billion-dollar aviation sites lead with confidence, not clutter. We borrowed that discipline: one clear path to a quote, honest trip language, and operators you can verify."
          />
          <div className="grid gap-6 border-t border-[var(--line)] pt-6 sm:grid-cols-3 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            {[
              ["Minutes", "Typical first response during desk hours"],
              ["USA focus", "City pairs, FBOs, and empty legs that matter here"],
              ["Vetted", "Part 135 partners · safety-first sourcing"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="font-[family-name:var(--font-display)] text-2xl text-ink">
                  {k}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--section-dark)] py-20 text-white md:py-28">
        <div className="container">
          <SectionHeading
            light
            eyebrow="Plan a trip"
            title="Start with the route—not a membership pitch."
            body="Like the best brokers, we ask for departure, arrival, date, and passengers. Like the best brands, we keep the rest out of your way."
          />
          <div className="mt-14 grid gap-0 border-t border-white/15 md:grid-cols-2">
            {featuredRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="group border-b border-white/15 px-0 py-8 transition-colors hover:bg-white/[0.03] md:px-8 md:odd:border-r"
              >
                <p className="text-xs tracking-[0.18em] text-[var(--accent-soft)] uppercase">
                  {route.airports}
                </p>
                <h3 className="serif mt-4 text-3xl md:text-4xl">
                  {route.from}
                  <span className="mx-3 text-white/35">→</span>
                  {route.to}
                </h3>
                <p className="mt-3 text-sm text-white/55">{route.time}</p>
                <p className="mt-6 text-xs tracking-[0.16em] text-white/70 uppercase transition-transform group-hover:translate-x-1">
                  Explore route
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/routes" className="btn btn-ghost">
              All featured routes
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
            <Image
              src={cabinImage}
              alt="Private jet cabin interior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Aircraft, not jargon"
              title="The right cabin for the trip—confirmed before you fly."
              body="Ordinary charter sites bury you in specs. We present classes the way NetJets and Flexjet taught the market: what the cabin is for, then the conversation."
            />
            <ul className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {aircraftClasses.map((item) => (
                <li key={item.name} className="grid gap-2 py-5 md:grid-cols-[140px_1fr]">
                  <p className="font-semibold tracking-[0.04em] text-ink">
                    {item.name}
                  </p>
                  <div>
                    <p className="text-sm text-ink-soft">
                      {item.seats} seats · {item.bestFor}
                    </p>
                    <p className="mt-1 text-sm text-muted">{item.examples}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/quote" className="btn btn-primary mt-8">
              Match my trip
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-paper-deep py-20 md:py-28">
        <div className="container-narrow text-center">
          <p className="eyebrow">Ready when you are</p>
          <h2 className="serif mt-4 text-[clamp(2.2rem,5vw,3.8rem)] text-ink">
            Tell us the trip. We return options—not a brochure.
          </h2>
          <p className="lede mx-auto mt-5 max-w-2xl">
            JetAeris is a USA private aviation desk. We arrange flights with
            preferred carrier partners and keep the path from inquiry to options
            deliberately short.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/quote" className="btn btn-primary">
              Request a flight
            </Link>
            <Link href="/how-it-works" className="btn btn-line">
              How it works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
