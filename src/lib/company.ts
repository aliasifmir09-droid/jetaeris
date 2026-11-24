import { site } from "@/lib/site";

/**
 * Crawlable company narrative for /about, schema, and llms.txt.
 * Honest broker positioning — no invented fleet, ratings, or logos.
 */

export const companyWhatWeDo = {
  headline: "What JetAeris does",
  lead: `${site.legalName} is a USA air charter brokerage and arranging agent. We help travelers and companies request private jet charter, empty legs, and FBO ground transfers—then return curated options operated by licensed Part 135 direct air carriers.`,
  items: [
    {
      title: "On-demand USA charter",
      body: "Light through heavy jet classes matched to passengers, bags, range, and timing. You get comparable options—not a pretend live fleet we do not operate.",
    },
    {
      title: "Empty-leg opportunities",
      body: "One-way repositioning flights when your city pair and window fit. Our public board shows status accurately; a listing is not a hold until the carrier confirms.",
    },
    {
      title: "FBO limo coordination",
      body: "Optional curb-to-cabin ground transfers timed around wheels-up and wheels-down—not generic airport curb quotes.",
    },
    {
      title: "Multi-leg & corporate support",
      body: "Day trips, multi-city itineraries, and group missions planned as one desk conversation with clear operator disclosure on each segment.",
    },
  ],
} as const;

export const companyWhyUs = {
  headline: "Why travelers choose JetAeris",
  lead: "We compete on clarity: who flies the trip, what you pay for, and how confirmation works—without inventing fleet ownership or instant inventory.",
  items: [
    {
      title: "Named Part 135 operator before you pay",
      body: "The operating carrier is identified before payment or final confirmation. We are the arranging broker—not the airline—unless an itinerary expressly states otherwise.",
    },
    {
      title: "Quote-and-concierge, not fake instant booking",
      body: `Our product promise is ${site.productPromise.toLowerCase()}. You get human-reviewed options you can actually confirm—not marketplace listings that cannot be booked.`,
    },
    {
      title: "Certificate-aware safety screening",
      body: "Part 135 certificate status is reviewed before options are presented and again before confirmation. See Safety for the full process.",
    },
    {
      title: "Transparent pricing language",
      body: "Planning cost bands on route and city pages are labeled as estimates with update dates—not guaranteed fares. Empty legs and peak dates can move the number.",
    },
    {
      title: "Fast desk response during staffed hours",
      body: site.responsePromise,
    },
    {
      title: "Research before you inquire",
      body: "Routes, cities, airports, aircraft classes, guides, and FAQ pages help you understand the trip before you request a quote.",
    },
  ],
} as const;

export const companyProcess = {
  headline: "How a JetAeris trip is arranged",
  steps: [
    {
      title: "Tell us the mission",
      body: "Origin, destination, date or window, passengers, bags/pets, and any hard meeting times.",
    },
    {
      title: "We source Part 135 options",
      body: "Aircraft class, timing, indicative pricing, and operator confirmation status—clearly labeled.",
    },
    {
      title: "You compare in plain language",
      body: "We explain tradeoffs (light vs midsize, alternate FBOs, empty-leg risk) without membership theater.",
    },
    {
      title: "Confirm with the carrier’s terms",
      body: "Itinerary, cancellation window, and operating carrier identity are reviewed before funds are committed.",
    },
  ],
} as const;

export const companyServices = [
  "USA on-demand private jet charter brokerage",
  "Empty-leg matching and status-accurate board",
  "FBO limo / ground transfer coordination",
  "Corporate and multi-city itinerary support",
  "Pet-friendly and catering notes relayed to operators",
  "Airport and FBO planning content for major USA hubs",
] as const;

export const companyRegions = {
  headline: "Where we arrange flights",
  body: "JetAeris focuses on United States private aviation corridors—Northeast, Florida, California, Texas, Mountain West, and connecting city pairs nationwide. International legs may be discussed with extra lead time for permits and operator approvals; domestic USA is our primary desk.",
} as const;

export const companyFaqs = [
  {
    q: "Is JetAeris an airline or a broker?",
    a: `${site.legalName} is an air charter broker and arranging agent. Flights are operated by licensed Part 135 direct air carriers. The operating carrier is named before you confirm.`,
  },
  {
    q: "What does JetAeris arrange?",
    a: "On-demand USA private jet charter, empty legs, optional FBO limo, and multi-leg corporate support—through vetted Part 135 partners, not an owned marketed fleet.",
  },
  {
    q: "Why choose JetAeris over an online marketplace?",
    a: "We do not sell fake instant inventory. You get curated options, operator identity before payment, and a concierge desk that answers during staffed hours with typical first response under 15 minutes.",
  },
  {
    q: "When can I confirm a booking?",
    a: `Quotes are open now. Confirmed bookings begin ${site.bookingOpensLabel}.`,
  },
  {
    q: "Where is JetAeris based?",
    a: `${site.address.publicNote}`,
  },
] as const;

export const companyFacts = [
  { label: "Legal name", value: site.legalName },
  { label: "Brand", value: site.name },
  { label: site.address.kind, value: site.address.display },
  { label: "Country", value: "United States" },
  { label: "Role", value: site.role },
  { label: "Primary market", value: "United States private aviation" },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Desk hours", value: site.deskHours },
  {
    label: "Bookings",
    value: `Quotes open now · Confirmed bookings begin ${site.bookingOpensLabel}`,
  },
] as const;
