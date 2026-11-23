"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { site } from "@/lib/site";

/** Jesko-style brand preloader — exits before the fly-through begins. */
export function SitePreloader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase("done");
      return;
    }
    const out = window.setTimeout(() => setPhase("out"), 1400);
    const done = window.setTimeout(() => setPhase("done"), 2100);
    return () => {
      window.clearTimeout(out);
      window.clearTimeout(done);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`site-preloader ${phase === "out" ? "site-preloader--out" : ""}`}
      aria-hidden
    >
      <div className="site-preloader-mark">
        <svg viewBox="0 0 120 40" width="140" height="46" fill="none">
          <path
            d="M8 22 C28 14, 55 12, 88 15 C100 16, 110 18, 116 20 C108 24, 92 26, 70 27 C40 29, 20 27, 10 24 Z"
            fill="#e8e4dc"
          />
          <path d="M20 18 L32 22 L24 26 Z" fill="#9a7b4f" />
          <path
            d="M30 22 C50 18, 75 17, 100 20"
            stroke="#9a7b4f"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <p>{site.name}</p>
      </div>
      <div className="site-preloader-bar">
        <span />
      </div>
    </div>
  );
}
