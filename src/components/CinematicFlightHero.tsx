"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeroQuoteStrip } from "@/components/HeroQuoteStrip";
import { prefersReducedMotion } from "@/lib/motion";
import { site } from "@/lib/site";

const FlightScene = dynamic(
  () =>
    import("@/components/flight/FlightScene").then((m) => m.FlightScene),
  { ssr: false },
);

type Props = {
  rail: string[];
};

/**
 * Jesko-class opening: WebGL fly-through + GSAP pin/scrub + word reveal.
 * Quote form stays fully interactive (conversion > decoration).
 */
export function CinematicFlightHero({ rail }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [webgl, setWebgl] = useState(false);
  const railLoop = [...rail, ...rail];

  useEffect(() => {
    setWebgl(!prefersReducedMotion());
  }, []);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    if (reduce) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.gsap;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const pin = pinRef.current;
      const copy = copyRef.current;
      const vignette = vignetteRef.current;
      if (!section || !pin || !copy) return;

      const words = copy.querySelectorAll("[data-word]");
      const lines = copy.querySelectorAll("[data-line]");

      ctx = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .fromTo(
            words,
            { yPercent: 120, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, stagger: 0.08, duration: 1.05 },
            0.35,
          )
          .fromTo(
            lines,
            { y: 36, autoAlpha: 0, filter: "blur(12px)" },
            { y: 0, autoAlpha: 1, filter: "blur(0px)", stagger: 0.1, duration: 0.85 },
            "-=0.55",
          );

        gsap.to(
          {},
          {
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.05,
              pin: pin,
              anticipatePin: 1,
              onUpdate: (self) => setProgress(self.progress),
            },
          },
        );

        if (vignette) {
          gsap.to(vignette, {
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          });
        }

        gsap.to(copy, {
          y: -48,
          autoAlpha: 0.25,
          filter: "blur(3px)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }, section);

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  const titleWords = site.name.split(" ");

  return (
    <section
      ref={sectionRef}
      className="cinematic-flight relative isolate bg-[#070b12] text-white"
      style={{ minHeight: "220svh" }}
      data-scene="hero"
    >
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden">
        {/* Live WebGL layer — not a photo collage */}
        {webgl ? (
          <FlightScene progress={progress} className="absolute inset-0" />
        ) : (
          <div
            className="absolute inset-0 bg-[linear-gradient(165deg,#070b12_0%,#1a2838_50%,#2a3340_100%)]"
            aria-hidden
          />
        )}

        {/* Cabin-window vignette dissolves as camera flies out */}
        <div
          ref={vignetteRef}
          className="cinematic-vignette pointer-events-none absolute inset-0"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b12]/70 via-transparent to-[#070b12]/35" />

        <div className="container relative z-10 flex h-full flex-col justify-end pb-10 pt-28 md:pb-14 md:pt-32">
          <div ref={copyRef} className="max-w-3xl will-change-transform">
            <p className="display flex flex-wrap gap-x-[0.28em] text-[clamp(2.8rem,8vw,6.2rem)] text-white">
              {titleWords.map((word) => (
                <span key={word} className="inline-block overflow-hidden pb-1">
                  <span data-word className="inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </p>
            <h1
              data-line
              className="serif mt-4 text-[clamp(1.45rem,3vw,2.25rem)] text-white/92"
            >
              {site.tagline}.
            </h1>
            <p
              data-line
              className="mt-3 max-w-2xl text-[0.95rem] font-semibold tracking-[0.04em] text-[var(--accent-soft)] uppercase"
            >
              Bookings open {site.bookingOpensLabel}
            </p>
            <p
              data-line
              className="mt-4 max-w-xl text-[1.02rem] leading-8 text-white/75"
            >
              On-demand USA charter and empty legs through vetted Part 135
              carriers. Request a quote now—confirmations open{" "}
              {site.bookingOpensLabel}.
            </p>
          </div>

          {/* Always interactive — never gated by cinema */}
          <div className="pointer-events-auto relative z-30 mt-8 max-w-5xl overflow-visible">
            <HeroQuoteStrip />
          </div>

          <div className="pointer-events-auto relative z-20 mt-5 flex flex-wrap gap-3">
            <Link href="/empty-legs" className="btn btn-ghost">
              Live empty legs
            </Link>
            <Link href="/how-it-works" className="btn btn-ghost">
              How we arrange flights
            </Link>
          </div>

          <p className="mt-8 text-[0.68rem] tracking-[0.22em] text-white/40 uppercase">
            Scroll to fly
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/40 py-4 backdrop-blur-md">
          <div className="route-rail">
            <div className="route-rail-track">
              {railLoop.map((item, i) => (
                <span key={`${item}-${i}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
