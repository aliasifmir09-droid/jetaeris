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

  // Over dark heroes (home + image PageHeros), keep light chrome until scroll.
  const overDarkHero =
    isHome ||
    pathname.startsWith("/empty-legs") ||
    pathname.startsWith("/safety") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/routes/") ||
    pathname.startsWith("/airports/") ||
    pathname === "/aircraft" ||
    pathname.startsWith("/aircraft/");
  const lightChrome = overDarkHero && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        lightChrome
          ? "border-b border-white/15 bg-[rgba(8,12,20,0.78)] text-white backdrop-blur-md"
          : "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_94%,white)] text-[var(--ink)] backdrop-blur-md"
      }`}
    >
      <div className="container flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          href="/"
          className={`font-[family-name:var(--font-display)] text-[1.55rem] tracking-[-0.04em] ${
            lightChrome ? "!text-white" : "text-[var(--ink)]"
          }`}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.72rem] font-semibold tracking-[0.12em] uppercase transition-opacity hover:opacity-70 ${
                lightChrome ? "!text-white/90" : "text-[var(--ink-soft)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {site.phoneHref ? (
            <a
              href={site.phoneHref}
              className={`hidden text-[0.72rem] font-semibold tracking-[0.12em] uppercase md:inline-flex ${
                lightChrome ? "!text-white/90" : "text-[var(--ink-soft)]"
              }`}
            >
              {site.phoneDisplay}
            </a>
          ) : null}
          <Link
            href="/quote"
            className={`btn hidden sm:inline-flex ${
              lightChrome ? "btn-light" : "btn-primary"
            }`}
          >
            Request a quote
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label="Toggle menu"
            className={`inline-flex h-11 w-11 items-center justify-center border lg:hidden ${
              lightChrome
                ? "border-white/35 text-white"
                : "border-[var(--line-strong)] text-[var(--ink)]"
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
            {site.phoneHref ? (
              <a
                href={site.phoneHref}
                className="px-2 py-3 text-[0.85rem] font-semibold tracking-[0.1em] text-[var(--ink)] uppercase"
              >
                Call {site.phoneDisplay}
              </a>
            ) : null}
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
              Request a quote
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
