"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { HeroQuoteStrip } from "@/components/HeroQuoteStrip";
import { prefersReducedMotion } from "@/lib/motion";
import { site } from "@/lib/site";

// Hero: Jesko window zoom + visible pitch + trip-start quote strip

type Props = {
  rail: string[];
};

/**
 * Jesko window zoom motion + conversion copy visible at load.
 * Animation moves the window; words/CTAs are never hidden at the start.
 */
export function JeskoScrollStory({ rail }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const railLoop = [...rail, ...rail];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.gsap;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);

      const root = rootRef.current;
      if (!root) return;

      ctx = gsap.context(() => {
        // —— Scene 1: cabin window zoom; copy stays visible ——
        const heroScene = root.querySelector<HTMLElement>("[data-scene='hero']");
        const windowFrame = root.querySelector<HTMLElement>("[data-window-frame]");
        const windowSky = root.querySelector<HTMLElement>("[data-window-sky]");
        const heroCopy = root.querySelectorAll("[data-hero-copy]");

        if (heroScene && windowFrame && windowSky) {
          gsap.set(heroCopy, {
            autoAlpha: 1,
            y: 0,
            filter: "none",
            clearProps: "filter",
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: heroScene,
              start: "top top",
              end: "+=170%",
              scrub: 0.9,
              pin: true,
              anticipatePin: 1,
            },
          });
          tl.fromTo(
            windowFrame,
            { scale: 1, borderRadius: "42% / 48%" },
            { scale: 3.05, borderRadius: "0%", ease: "none" },
            0,
          )
            .fromTo(
              windowSky,
              { scale: 1.04 },
              { scale: 1.18, ease: "none" },
              0,
            )
            // Words stay readable through most of the zoom; soft exit only late
            .to(
              heroCopy,
              { y: -16, autoAlpha: 0.95, ease: "none" },
              0.55,
            )
            .to(
              heroCopy,
              { y: -36, autoAlpha: 0, ease: "none" },
              0.82,
            );
        }

        // —— Scene 2: jet rises over manifesto text ——
        const jetScene = root.querySelector<HTMLElement>("[data-scene='jet']");
        const jetImg = root.querySelector<HTMLElement>("[data-jet-plate]");
        const jetWords = root.querySelectorAll("[data-jet-word]");
        if (jetScene && jetImg) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: jetScene,
              start: "top top",
              end: "+=200%",
              scrub: 1.05,
              pin: true,
              anticipatePin: 1,
            },
          });
          tl.fromTo(
            jetWords,
            { autoAlpha: 0.15, y: 60 },
            { autoAlpha: 1, y: 0, stagger: 0.04, ease: "none" },
            0,
          )
            .fromTo(
              jetImg,
              { yPercent: 85, scale: 1.35, autoAlpha: 0.9 },
              { yPercent: -35, scale: 0.85, autoAlpha: 1, ease: "none" },
              0.15,
            )
            .to(jetWords, { autoAlpha: 0.2, ease: "none" }, 0.55)
            .to(jetImg, { autoAlpha: 0, yPercent: -55, ease: "none" }, 0.78);
        }

        // —— Scene 3: blueprint reveal ——
        const blueScene = root.querySelector<HTMLElement>("[data-scene='blueprint']");
        const blueImg = root.querySelector<HTMLElement>("[data-blueprint]");
        const blueCopy = root.querySelectorAll("[data-blue-copy]");
        if (blueScene && blueImg) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: blueScene,
                start: "top top",
                end: "+=140%",
                scrub: 1,
                pin: true,
              },
            })
            .fromTo(
              blueImg,
              { autoAlpha: 0, scale: 1.08, filter: "blur(10px)" },
              { autoAlpha: 1, scale: 1, filter: "blur(0px)", ease: "none" },
              0,
            )
            .fromTo(
              blueCopy,
              { autoAlpha: 0, y: 28 },
              { autoAlpha: 1, y: 0, stagger: 0.06, ease: "none" },
              0.2,
            );
        }

        // —— Scene 4: globe / limitless ——
        const globeScene = root.querySelector<HTMLElement>("[data-scene='globe']");
        const globeOrb = root.querySelector<HTMLElement>("[data-globe-orb]");
        if (globeScene && globeOrb) {
          gsap.to(globeOrb, {
            rotate: 360,
            ease: "none",
            scrollTrigger: {
              trigger: globeScene,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }, root);

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="jesko-story bg-[#0a0a0a] text-[#f4efe6]">
      {/* HERO — Jesko window zoom + visible h1 + quote funnel */}
      <section
        data-scene="hero"
        className="jesko-hero relative h-[100svh] overflow-hidden bg-[#05080c]"
      >
        <div className="absolute inset-0 flex items-start justify-center pt-[min(8vh,72px)] md:items-center md:pt-0 md:pb-[28vh]">
          <div
            data-window-frame
            className="relative h-[min(48vh,420px)] w-[min(78vw,400px)] overflow-hidden rounded-[42%/48%] border-[10px] border-[#2a241c] shadow-[0_0_0_1px_rgba(212,175,122,0.35),0_40px_100px_rgba(0,0,0,0.65)] will-change-transform"
          >
            <div
              data-window-sky
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src="/media/cabin-window-uhd.jpg"
                alt="View from a private jet above the clouds at sunset"
                fill
                priority
                quality={95}
                sizes="(max-width: 480px) 78vw, 400px"
                className="object-cover object-[52%_40%]"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.35)_100%)]" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent pb-10 pt-28 md:pb-12 md:pt-40">
          <div className="container pointer-events-auto">
            <div className="max-w-2xl">
              <p
                data-hero-copy
                className="mb-2 text-[0.68rem] tracking-[0.24em] text-[#d4af7a] uppercase"
              >
                Private aviation in the United States
              </p>
              <h1
                data-hero-copy
                className="display text-[clamp(2rem,4.8vw,3.6rem)] leading-[0.95] text-[#f4efe6]"
              >
                Private jet charter,
                <br />
                precisely arranged.
              </h1>
              <p
                data-hero-copy
                className="mt-3 max-w-xl text-[0.98rem] leading-7 text-white/75"
              >
                Vetted aircraft, clear options, and a responsive concierge desk
                for travel across the United States.
              </p>
              <div
                data-hero-copy
                className="mt-4 flex flex-wrap items-center gap-3"
              >
                <Link href="/routes" className="btn btn-ghost">
                  Explore routes
                </Link>
                <span className="text-sm text-white/45">
                  Quotes open now · Bookings {site.bookingOpensLabel}
                </span>
              </div>
            </div>
            <div data-hero-copy className="mt-5 max-w-5xl">
              <HeroQuoteStrip />
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 2 — jet flies over text */}
      <section
        data-scene="jet"
        className="relative h-[100svh] overflow-hidden bg-[#0a0a0a]"
      >
        <div className="container relative z-10 flex h-full flex-col justify-center py-24">
          <p className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.05] tracking-[-0.03em] text-[#f4efe6]">
            {"Your freedom to move without compromise."
              .split(" ")
              .map((w, i) => (
                <span
                  key={`${w}-${i}`}
                  data-jet-word
                  className="mr-[0.28em] inline-block"
                >
                  {w}
                </span>
              ))}
          </p>
          <p
            data-jet-word
            className="mt-8 max-w-xl text-[1.05rem] leading-8 text-white/55"
          >
            JetAeris arranges on-demand USA charter and empty legs. The operating
            carrier is named before you confirm—never a fake fleet claim.
          </p>
        </div>

        <div
          data-jet-plate
          className="pointer-events-none absolute inset-x-0 top-[18%] z-20 mx-auto w-[min(110vw,1200px)] will-change-transform"
          style={{
            filter: "drop-shadow(0 40px 50px rgba(0,0,0,0.85))",
          }}
        >
          <Image
            src="/media/jet-cutout-uhd.png"
            alt="Private jet"
            width={2560}
            height={1440}
            quality={95}
            sizes="100vw"
            className="h-auto w-full"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* SCENE 3 — seat blueprint */}
      <section
        data-scene="blueprint"
        className="relative h-[100svh] overflow-hidden bg-[#0a0a0a]"
      >
        <div className="absolute inset-0 opacity-90">
          <div data-blueprint className="absolute inset-0 will-change-transform">
            <Image
              src="/media/seat-blueprint-uhd.jpg"
              alt="Private jet cabin seat blueprint showing layout for charter planning"
              fill
              quality={92}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>
        <div className="container relative z-10 flex h-full max-w-xl flex-col justify-center">
          <p
            data-blue-copy
            className="text-[0.7rem] tracking-[0.22em] text-[#d4af7a] uppercase"
          >
            Cabin by mission
          </p>
          <h2
            data-blue-copy
            className="display mt-4 text-[clamp(2.2rem,5vw,3.8rem)] text-[#f4efe6]"
          >
            Specs that matter in the air.
          </h2>
          <ul
            data-blue-copy
            className="mt-8 space-y-4 text-[1.02rem] leading-7 text-white/65"
          >
            <li>Light → heavy class matched to passengers, bags, and range</li>
            <li>Representative aircraft until a tail is assigned</li>
            <li>Wi-Fi, pets, catering declared on the quote—not assumed</li>
          </ul>
          <div data-blue-copy className="mt-10">
            <Link href="/aircraft" className="btn btn-ghost">
              View aircraft classes
            </Link>
          </div>
        </div>
      </section>

      {/* SCENE 4 — globe / reach */}
      <section
        data-scene="globe"
        className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-28 md:py-36"
      >
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center font-[family-name:var(--font-display)] text-[clamp(4rem,18vw,14rem)] tracking-[-0.06em] text-white/[0.06] uppercase select-none">
          Limitless
        </p>
        <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[0.7rem] tracking-[0.22em] text-[#d4af7a] uppercase">
              USA corridors
            </p>
            <h2 className="display mt-4 text-[clamp(2rem,4vw,3.2rem)] text-[#f4efe6]">
              Coast to coast. Desk to FBO.
            </h2>
            <p className="mt-5 max-w-md text-[1.05rem] leading-8 text-white/60">
              Top markets and routes with airports, timing, and planning cost
              bands—crawlable pages, not a decorative map only.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/routes" className="btn btn-ghost">
                Browse routes
              </Link>
              <Link href="/charter/new-york" className="btn btn-ghost">
                New York hub
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-[min(100%,420px)]">
            <div
              data-globe-orb
              className="jesko-globe absolute inset-0 rounded-full will-change-transform"
              aria-hidden
            />
            <div className="absolute inset-[12%] rounded-full border border-[#d4af7a]/25" />
            <div className="absolute inset-[28%] rounded-full border border-white/10" />
          </div>
        </div>
      </section>

      {/* SCENE 5 — quote conversion */}
      <section className="relative bg-[#0a0a0a] py-20 md:py-28">
        <div className="container">
          <p className="text-[0.7rem] tracking-[0.22em] text-[#d4af7a] uppercase">
            Start the trip
          </p>
          <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,4vw,3.2rem)] text-[#f4efe6]">
            Request a private quote.
          </h2>
          <p className="mt-4 max-w-xl text-white/60">
            Quotes open now. Confirmed bookings begin {site.bookingOpensLabel}.
          </p>
          <div className="mt-10 max-w-5xl">
            <HeroQuoteStrip />
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 py-4">
          <div className="route-rail">
            <div className="route-rail-track">
              {railLoop.map((item, i) => (
                <span key={`${item}-${i}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
