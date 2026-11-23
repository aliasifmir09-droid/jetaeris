/** Client-safe motion helpers. Prefer progressive enhancement over forced cinema. */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const motionEase = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
} as const;
