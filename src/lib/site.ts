import { aircraft, cities, routes } from "@/lib/content";

export const site = {
  name: "JetAeris",
  legalName: "Jet Aeris Inc",
  domain: "jetaeris.com",
  url: "https://www.jetaeris.com",
  tagline: "Private aviation for the United States",
  description:
    "Jet Aeris Inc (JetAeris) arranges on-demand private jet charter, empty-leg flights, and FBO limo coordination across the United States.",
  phoneDisplay: "+1 (800) 555-0188",
  phoneHref: "tel:+18005550188",
  email: "concierge@jetaeris.com",
  legalEmail: "legal@jetaeris.com",
  privacyEmail: "privacy@jetaeris.com",
  locale: "en_US",
  address: {
    line1: "87-81",
    city: "Queens",
    region: "NY",
    postalCode: "",
    country: "US",
    display: "87-81, Queens, NY",
  },
} as const;

export const nav = [
  { href: "/routes", label: "Routes" },
  { href: "/charter", label: "Cities" },
  { href: "/limo", label: "Limo" },
  { href: "/empty-legs", label: "Empty legs" },
  { href: "/aircraft", label: "Aircraft" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/cancellation-policy", label: "Cancellation Policy" },
  { href: "/broker-disclosure", label: "Broker Disclosure" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/do-not-sell", label: "Do Not Sell / Share" },
  { href: "/legal", label: "Legal Center" },
] as const;

export const featuredRoutes = routes.slice(0, 6).map((r) => ({
  href: `/routes/${r.slug}`,
  from: r.from,
  to: r.to,
  airports: r.airports,
  time: r.blockTime,
}));

export const featuredCities = cities.slice(0, 8).map((c) => ({
  href: `/charter/${c.slug}`,
  name: c.name,
  airports: c.airports.join(" · "),
}));

export const aircraftClasses = aircraft.map((a) => ({
  name: a.name,
  seats: a.seats,
  bestFor: a.bestFor,
  examples: a.examples.join(", "),
  href: `/aircraft/${a.slug}`,
}));

export const emptyLegs = [
  {
    id: "el-1",
    from: "Teterboro (TEB)",
    to: "Palm Beach (PBI)",
    date: "Dec 4",
    aircraft: "Citation XLS+",
    note: "One-way positioning · subject to confirmation",
  },
  {
    id: "el-2",
    from: "Van Nuys (VNY)",
    to: "Las Vegas (LAS)",
    date: "Dec 7",
    aircraft: "Phenom 300",
    note: "Afternoon departure window",
  },
  {
    id: "el-3",
    from: "Dallas Love (DAL)",
    to: "Aspen (ASE)",
    date: "Dec 12",
    aircraft: "Challenger 350",
    note: "Peak-season empty leg · limited hold",
  },
  {
    id: "el-4",
    from: "Westchester (HPN)",
    to: "Opa-locka (OPF)",
    date: "Dec 14",
    aircraft: "Citation Latitude",
    note: "Sunday positioning · flexible ±3 hours",
  },
] as const;
