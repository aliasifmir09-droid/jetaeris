"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Optional Lenis smooth scroll + GSAP ScrollTrigger sync.
 * Disabled under prefers-reduced-motion and on coarse pointers (touch-first).
 */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Avoid Lenis fighting native scroll on phones
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let destroyed = false;
    let rafId = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void; on: Function } | null =
      null;

    (async () => {
      const [{ default: Lenis }, gsapMod, stMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (destroyed) return;

      const gsap = gsapMod.gsap;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        smoothWheel: true,
        lerp: 0.09,
        syncTouch: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      // Expose for section scripts that need refresh after layout
      window.dispatchEvent(new CustomEvent("jetaeris:motion-ready"));
    })();

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
