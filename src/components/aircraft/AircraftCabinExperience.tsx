"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { CabinSeatMap } from "@/components/aircraft/CabinSeatMap";
import type { AircraftCabinExperience as CabinData } from "@/lib/aircraft-cabin";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  cabin: CabinData;
};

/**
 * Detail-page cabin story: exterior → seats → interior → decide.
 * HD motion for first-time flyers without fake fleet claims.
 */
export function AircraftCabinExperience({ cabin }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

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
        root.querySelectorAll<HTMLElement>("[data-cabin-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        const exterior = root.querySelector<HTMLElement>("[data-exterior-plate]");
        if (exterior) {
          gsap.fromTo(
            exterior,
            { scale: 1.08, yPercent: 4 },
            {
              scale: 1,
              yPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: exterior.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }

        const interior = root.querySelector<HTMLElement>("[data-interior-plate]");
        if (interior) {
          gsap.fromTo(
            interior,
            { scale: 1.06 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: interior.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      }, root);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [cabin.slug]);

  return (
    <div ref={rootRef} className="aircraft-cabin-experience">
      {/* Exterior cinema */}
      <section className="relative overflow-hidden bg-[var(--section-dark)] text-white">
        <div className="relative min-h-[70vh] md:min-h-[78vh]">
          <div className="absolute inset-0 overflow-hidden">
            <div data-exterior-plate className="absolute inset-[-6%] will-change-transform">
              <Image
                src={cabin.exteriorSrc}
                alt={`Representative ${cabin.name} exterior`}
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
            <div
              className="absolute inset-0"
              style={{ background: "var(--hero-veil)" }}
              aria-hidden
            />
          </div>

          <div className="container relative flex min-h-[70vh] flex-col justify-end pb-16 pt-36 md:min-h-[78vh] md:pb-24">
            <p className="eyebrow !text-white/80">Aircraft class</p>
            <h1 className="serif mt-4 max-w-3xl text-[clamp(2.6rem,6vw,4.8rem)]">
              {cabin.name}
            </h1>
            <p className="mt-5 max-w-2xl text-[1.08rem] leading-8 text-white/85">
              {cabin.summary} Imagery is representative of the class until the
              operating Part 135 carrier assigns a specific aircraft.
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/70">
              <span>
                <strong className="text-white">{cabin.typicalSeats}</strong> typical
                seats
              </span>
              <span className="text-white/30">·</span>
              <span>Up to {cabin.seatMax}</span>
              <span className="text-white/30">·</span>
              <span>{cabin.range}</span>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/quote" className="btn btn-light">
                Request {cabin.name.toLowerCase()} options
              </Link>
              <Link href="/aircraft" className="btn btn-ghost">
                Compare all classes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seat map + decide */}
      <section className="border-b border-[var(--line)] bg-white/50 py-16 md:py-24">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div data-cabin-reveal>
            <p className="eyebrow">How many can sit</p>
            <h2 className="serif mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)] text-ink">
              See the cabin fill before you request a quote.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-8 text-muted">
              {cabin.cabinFeel} {cabin.heightNote}
            </p>
            <p className="mt-4 border-l-2 border-accent pl-4 text-sm leading-7 text-ink-soft">
              <strong className="text-ink">First-timer tip — </strong>
              {cabin.firstTimerTip}
            </p>
            <ul className="mt-8 space-y-3 text-[1.02rem] leading-7 text-ink-soft">
              {cabin.details.map((d) => (
                <li key={d} className="border-t border-[var(--line)] pt-3">
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div
            data-cabin-reveal
            className="rounded-sm border border-[var(--line)] bg-[var(--paper)] p-6 md:p-8"
          >
            <CabinSeatMap
              seats={cabin.seatMap}
              typicalSeats={cabin.typicalSeats}
              seatMax={cabin.seatMax}
            />
          </div>
        </div>
      </section>

      {/* Interior look */}
      <section className="bg-[var(--section-dark)] py-16 text-white md:py-24">
        <div className="container">
          <div data-cabin-reveal className="max-w-3xl">
            <p className="eyebrow !text-white/80">How it looks inside</p>
            <h2 className="serif mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)]">
              {cabin.interiorLead}
            </h2>
          </div>

          <div
            data-cabin-reveal
            className="relative mt-10 aspect-[16/9] overflow-hidden"
          >
            <div data-interior-plate className="absolute inset-[-4%] will-change-transform">
              <Image
                src={cabin.cabinSrc}
                alt={`Representative ${cabin.name} cabin interior`}
                fill
                className="object-cover"
                sizes="(max-width: 1180px) 100vw, 1180px"
              />
            </div>
          </div>

          <div
            data-cabin-reveal
            className="mt-10 grid gap-8 md:grid-cols-[1fr_0.85fr]"
          >
            <ul className="space-y-4 text-[1.05rem] leading-8 text-white/80">
              {cabin.interiorPoints.map((point) => (
                <li key={point} className="flex gap-3 border-t border-white/10 pt-4">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-soft)]" />
                  {point}
                </li>
              ))}
              <li className="flex gap-3 border-t border-white/10 pt-4">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-soft)]" />
                Bags: {cabin.bagsNote}
              </li>
            </ul>

            <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-[320px]">
              <Image
                src={cabin.windowSrc}
                alt="Private jet cabin window view — representative atmosphere"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-0 left-0 p-6 text-sm leading-6 text-white/85">
                Window light and cabin finishes vary by aircraft. We show the
                class feel—not a guaranteed tail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Examples + CTA */}
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="container max-w-3xl" data-cabin-reveal>
          <p className="eyebrow">Representative types</p>
          <h2 className="serif mt-3 text-[clamp(1.6rem,3vw,2.4rem)] text-ink">
            Aircraft often arranged in this class
          </h2>
          <ul className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {cabin.examples.map((ex) => (
              <li key={ex} className="py-4 text-[1.08rem] text-ink-soft">
                {ex}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-7 text-muted">
            Examples are representative. Your written confirmation names the
            operating carrier and the specific aircraft assigned to the trip.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/quote" className="btn btn-primary">
              Request {cabin.name.toLowerCase()} options
            </Link>
            <Link href="/#plan" className="btn btn-line">
              See planning ranges
            </Link>
            <Link href="/how-to-book" className="btn btn-line">
              How to book
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
