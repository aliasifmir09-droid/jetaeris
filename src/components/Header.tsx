"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = !isHome || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_92%,white)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          href="/"
          className={`font-[family-name:var(--font-display)] text-[1.55rem] tracking-[-0.04em] ${
            solid ? "text-ink" : "text-white"
          }`}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.78rem] font-semibold tracking-[0.14em] uppercase transition-opacity hover:opacity-70 ${
                solid ? "text-ink-soft" : "text-white/88"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/quote"
            className={`btn hidden sm:inline-flex ${
              solid ? "btn-primary" : "btn-ghost"
            }`}
          >
            Request a flight
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label="Toggle menu"
            className={`inline-flex h-11 w-11 items-center justify-center border lg:hidden ${
              solid
                ? "border-[var(--line-strong)] text-ink"
                : "border-white/35 text-white"
            }`}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-4 flex-col gap-1.5">
              <span className="block h-px w-full bg-current" />
              <span className="block h-px w-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--line)] bg-paper lg:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-sm font-semibold tracking-[0.12em] text-ink uppercase"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/quote" className="btn btn-primary mt-2 w-full">
              Request a flight
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
