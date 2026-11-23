"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Page-transition jet (Barba alternative for Next.js App Router).
 * UHD photographic plate + GSAP fly-through on route change.
 */
export function AnimatedJet() {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);
  const jetRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!visible || prefersReducedMotion()) return;
    const el = jetRef.current;
    if (!el) return;

    let cancelled = false;
    let tween: { kill: () => void } | null = null;

    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;

      const first = prevPath.current === null;
      prevPath.current = pathname;

      // Soft dock on home (hero already cinematic); full fly elsewhere
      if (first && isHome) {
        gsap.set(el, {
          autoAlpha: 0.45,
          top: "auto",
          bottom: "4.75rem",
          right: "0.85rem",
          left: "auto",
          width: "min(200px, 32vw)",
          clearProps: "",
        });
        return;
      }

      gsap.set(el, {
        autoAlpha: 0,
        top: "16%",
        left: "-40%",
        right: "auto",
        bottom: "auto",
        width: "min(520px, 70vw)",
        rotate: -8,
      });

      tween = gsap.to(el, {
        keyframes: [
          { autoAlpha: 1, left: "36%", top: "26%", rotate: -2, duration: 0.85, ease: "power3.out" },
          {
            top: "auto",
            bottom: "4.75rem",
            left: "auto",
            right: "0.85rem",
            width: isHome ? "min(200px, 32vw)" : "min(280px, 42vw)",
            rotate: 0,
            autoAlpha: isHome ? 0.45 : 0.92,
            duration: 0.85,
            ease: "power2.inOut",
          },
        ],
      });
    })();

    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [pathname, visible, isHome]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      <div ref={jetRef} className="jetaeris-jet-hd absolute opacity-0">
        <Image
          src="/media/jet-climb-uhd.jpg"
          alt=""
          width={3840}
          height={2160}
          quality={92}
          sizes="(max-width: 768px) 240px, 420px"
          className="jetaeris-jet-hd-img"
          draggable={false}
        />
        <span className="jetaeris-jet-hd-glow" />
      </div>

      <button
        type="button"
        className="pointer-events-auto absolute right-3 bottom-3 z-[61] rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_88%,white)] px-2.5 py-1 text-[0.65rem] tracking-[0.14em] text-muted uppercase backdrop-blur-sm hover:text-ink"
        onClick={() => setVisible(false)}
        aria-label="Hide jet animation"
      >
        Hide jet
      </button>
    </div>
  );
}
