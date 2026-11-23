import { aircraft, cities, routes } from "@/lib/content";

export const site = {
  name: "JetAeris",
  legalName: "Jet Aeris Inc",
  domain: "jetaeris.com",
  url: "https://www.jetaeris.com",
  tagline: "Private charter, precisely arranged",
  /** Honest product promise — broker-led inquiry, not instant marketplace booking. */
  productPromise: "Request a private charter quote",
  description:
    "Jet Aeris Inc (JetAeris) is a USA air charter brokerage arranging on-demand private jet flights, empty legs, and FBO ground transfers through vetted Part 135 direct air carriers. JetAeris is a quote-and-concierge service—not an instant-booking marketplace.",
  // Do not use fictional 555 numbers. Leave blank until a real monitored line is provisioned.
  phoneDisplay: "",
  phoneHref: "",
  email: "concierge@jetaeris.com",
  legalEmail: "legal@jetaeris.com",
  privacyEmail: "privacy@jetaeris.com",
  locale: "en_US",
  responsePromise:
    "24/7 inquiry intake online and by email. Typical first response under 15 minutes during desk hours (Mon–Sun, 8:00–22:00 ET). After-hours requests are queued; target first response at the next open desk window.",
  deskHours: "Desk hours: Mon–Sun, 8:00–22:00 Eastern",
  address: {
    line1: "87-81",
    city: "Queens",
    region: "NY",
    postalCode: "",
    country: "US",
    /** Short display for compact UI */
    display: "87-81, Queens, NY",
    kind: "Registered office",
    /** Honest labeling until full street/ZIP are authorized for public use */
    publicNote:
      "Registered office locality: 87-81, Queens, NY, United States. Full street name, suite, and ZIP are confirmed on contracting documents and available on request for verification. Do not treat this listing as a walk-in customer facility.",
  },
  role:
    "Air charter broker / arranging agent — not a direct air carrier unless an itinerary expressly states otherwise.",
  guideAuthor: {
    name: "JetAeris Aviation Desk",
    role: "Editorial review · operations desk",
  },
  priceGuidanceUpdated: "November 23, 2026",
} as const;

export const nav = [
  { href: "/routes", label: "Routes" },
  { href: "/charter", label: "Cities" },
  { href: "/empty-legs", label: "Empty legs" },
  { href: "/aircraft", label: "Aircraft" },
  { href: "/safety", label: "Safety" },
  { href: "/limo", label: "Limo" },
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

export type EmptyLeg = {
  id: string;
  from: string;
  to: string;
  date: string;
  /** ISO date for quote-form prefills */
  dateIso: string;
  window: string;
  aircraft: string;
  seats: string;
  status: "available" | "pending" | "sold" | "expired";
  note: string;
  priceLabel: string;
};

/** Public sample board — statuses must stay accurate; expired legs are not bookable. */
export const emptyLegs: EmptyLeg[] = [
  {
    id: "el-1",
    from: "Teterboro (TEB)",
    to: "Palm Beach (PBI)",
    date: "Dec 4, 2026",
    dateIso: "2026-12-04",
    window: "13:00–17:00 ET",
    aircraft: "Citation XLS+ (representative)",
    seats: "Up to 8",
    status: "available",
    note: "One-way positioning · subject to operator confirmation",
    priceLabel: "Request current quote",
  },
  {
    id: "el-2",
    from: "Van Nuys (VNY)",
    to: "Las Vegas (LAS)",
    date: "Dec 7, 2026",
    dateIso: "2026-12-07",
    window: "14:00–19:00 PT",
    aircraft: "Phenom 300 (representative)",
    seats: "Up to 7",
    status: "available",
    note: "Afternoon departure window · verify live before hold",
    priceLabel: "Request current quote",
  },
  {
    id: "el-3",
    from: "Dallas Love (DAL)",
    to: "Aspen (ASE)",
    date: "Dec 12, 2026",
    dateIso: "2026-12-12",
    window: "09:00–12:00 CT",
    aircraft: "Challenger 350 (representative)",
    seats: "Up to 9",
    status: "pending",
    note: "Mountain ops · pending operator/weather confirmation",
    priceLabel: "Request current quote",
  },
  {
    id: "el-4",
    from: "Westchester (HPN)",
    to: "Opa-locka (OPF)",
    date: "Dec 14, 2026",
    dateIso: "2026-12-14",
    window: "10:00–16:00 ET",
    aircraft: "Citation Latitude (representative)",
    seats: "Up to 8",
    status: "available",
    note: "Sunday positioning · flexible ±3 hours",
    priceLabel: "Request current quote",
  },
];

export const emptyLegsUpdatedAt = "November 23, 2026 · 14:00 ET";
