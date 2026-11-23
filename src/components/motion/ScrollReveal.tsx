"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  /** Stagger children with data-reveal */
  stagger?: boolean;
} & React.HTMLAttributes<HTMLElement>;

/**
 * GSAP ScrollTrigger fade/rise — SSR text stays in HTML for crawlers.
 */
export function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  stagger = false,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.gsap;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const targets = stagger
          ? el.querySelectorAll("[data-reveal]")
          : [el];
        gsap.fromTo(
          targets,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: stagger ? 0.1 : 0,
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          },
        );
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [stagger]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
