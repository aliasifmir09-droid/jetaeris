"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeroQuoteStrip } from "@/components/HeroQuoteStrip";
import { prefersReducedMotion } from "@/lib/motion";
import { site } from "@/lib/site";

type Props = {
  rail: string[];
};

/**
 * Jesko-class cinematic hero for Next.js:
 * GSAP intro timeline + ScrollTrigger scrub climb, UHD plates, quote always in DOM.
 */
export function CinematicFlightHero({ rail }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const jetRef = useRef<HTMLDivElement>(null);
  const climbRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const railLoop = [...rail, ...rail];

  useEffect(() => {
    const reduce = prefersReducedMotion();
    setEntered(true);
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
      const sky = skyRef.current;
      const jet = jetRef.current;
      const climb = climbRef.current;
      const vignette = vignetteRef.current;
      const copy = copyRef.current;
      if (!section || !pin || !sky || !jet || !copy) return;

      const words = copy.querySelectorAll("[data-word]");
      const lines = copy.querySelectorAll("[data-line]");

      ctx = gsap.context(() => {
        // Opening cinema — scale settle + word rise (Jesko pattern)
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .fromTo(
            sky,
            { scale: 1.14 },
            { scale: 1.06, duration: 2.1 },
            0,
          )
          .fromTo(
            jet,
            { autoAlpha: 0, xPercent: -18, yPercent: 10, scale: 1.2, rotate: -8 },
            { autoAlpha: 1, xPercent: 0, yPercent: 0, scale: 1, rotate: -3, duration: 1.7 },
            0.15,
          )
          .fromTo(
            words,
            { yPercent: 110, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, stagger: 0.07, duration: 0.95 },
            0.45,
          )
          .fromTo(
            lines,
            { y: 28, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, stagger: 0.12, duration: 0.7 },
            "-=0.55",
          );

        // Scroll scrub — jet climbs while page descends (signature Jesko feel)
        const scrub = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.1,
            pin: pin,
            anticipatePin: 1,
          },
        });

        scrub
          .to(
            sky,
            { scale: 1.18, yPercent: 8, ease: "none" },
            0,
          )
          .to(
            jet,
            {
              yPercent: -42,
              xPercent: 16,
              scale: 0.82,
              rotate: 8,
              ease: "none",
            },
            0,
          )
          .to(
            climb,
            { autoAlpha: 0.9, yPercent: -55, xPercent: 10, scale: 1.05, ease: "none" },
            0,
          )
          .to(vignette, { autoAlpha: 0, ease: "none" }, 0)
          .to(
            copy,
            { y: -40, autoAlpha: 0.35, filter: "blur(2px)", ease: "none" },
            0,
          );
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
      style={{ minHeight: "170svh" }}
      data-scene="hero"
    >
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden">
        <div ref={skyRef} className="absolute inset-[-10%] will-change-transform">
          <Image
            src="/media/sky-plate-uhd.jpg"
            alt=""
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 opacity-40">
            <Image
              src="/media/hero-jet.jpg"
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover mix-blend-luminosity"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(7,11,18,0.5)_0%,rgba(7,11,18,0.18)_45%,rgba(7,11,18,0.55)_100%)]" />
        </div>

        <div
          ref={vignetteRef}
          className="cinematic-vignette pointer-events-none absolute inset-0"
          aria-hidden
        />

        {/* Primary UHD jet */}
        <div
          ref={jetRef}
          className="cinematic-jet-photo absolute top-[42%] left-[50%] z-[5] w-[min(92vw,1100px)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{ opacity: entered ? undefined : 0 }}
        >
          <Image
            src="/media/cinematic-jet-uhd.jpg"
            alt="Private jet in flight"
            width={3840}
            height={2160}
            priority
            quality={95}
            sizes="(max-width: 768px) 92vw, 1100px"
            className="h-auto w-full select-none"
            draggable={false}
          />
          <span className="cinematic-photo-contrail" />
        </div>

        {/* Climb plate */}
        <div
          ref={climbRef}
          className="cinematic-jet-photo cinematic-jet-photo--climb absolute top-[62%] left-[42%] z-[6] w-[min(70vw,820px)] -translate-x-1/2 -translate-y-1/2 opacity-0 will-change-transform"
        >
          <Image
            src="/media/jet-climb-uhd.jpg"
            alt=""
            width={3840}
            height={2160}
            quality={92}
            sizes="(max-width: 768px) 70vw, 820px"
            className="h-auto w-full select-none"
            draggable={false}
          />
        </div>

        <div className="container relative z-10 flex h-full flex-col justify-end pb-10 pt-28 md:pb-14 md:pt-32">
          <div ref={copyRef} className="max-w-3xl will-change-transform">
            <p className="display flex flex-wrap gap-x-[0.28em] text-[clamp(2.8rem,8vw,6.2rem)] text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
              {titleWords.map((word) => (
                <span key={word} className="inline-block overflow-hidden">
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
              carriers. Request a quote now—JetAeris starts taking confirmed
              bookings from {site.bookingOpensLabel}. Optional FBO ground
              transfer.
            </p>
          </div>

          {/* Quote stays fully interactive — never opacity-gated for conversion */}
          <div data-line className="mt-8 max-w-5xl">
            <HeroQuoteStrip />
          </div>

          <div data-line className="mt-5 flex flex-wrap gap-3">
            <Link href="/empty-legs" className="btn btn-ghost">
              Live empty legs
            </Link>
            <Link href="/how-it-works" className="btn btn-ghost">
              How we arrange flights
            </Link>
          </div>

          <p className="mt-8 text-[0.68rem] tracking-[0.22em] text-white/40 uppercase">
            Scroll to climb
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/35 py-4 backdrop-blur-md">
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
