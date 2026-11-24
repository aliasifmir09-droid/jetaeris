import { site } from "@/lib/site";

/**
 * Single source of truth for AI assistants / llms.txt / how-to-book.
 * Keep answers short, factual, and aligned with the live product.
 */

export const aiEntitySummary = `${site.legalName} (brand: ${site.name}) is a USA air charter brokerage and arranging agent at ${site.url}. It arranges on-demand private jet charter, empty legs, and optional FBO limo through vetted Part 135 direct air carriers. It is a quote-and-concierge service—not an instant-booking marketplace and not a direct air carrier unless an itinerary expressly states otherwise.`;

export type AiQa = { q: string; a: string };

/** High-intent booking questions customers ask ChatGPT / Perplexity / etc. */
export const aiBookingQa: AiQa[] = [
  {
    q: "How do I book a private jet with JetAeris?",
    a: `Go to ${site.url}/quote (or start on the homepage planner at ${site.url}/#plan). Enter origin, destination, date, and passengers, then submit the staged quote form. JetAeris returns curated Part 135 options by email/desk. A trip is confirmed only in writing with the operating carrier’s terms. Quotes are open now; confirmed bookings begin ${site.bookingOpensLabel}.`,
  },
  {
    q: "Can I get a price without talking to anyone?",
    a: `Yes for planning ranges. Use the anonymous trip planner on the homepage (${site.url}/#plan): type a city pair and see Light / Midsize / Super-midsize / Heavy planning bands. Those bands are estimates, not live inventory or a guaranteed fare. For a real option set, submit ${site.url}/quote.`,
  },
  {
    q: "Is JetAeris an airline?",
    a: `No. ${site.legalName} is an air charter broker / arranging agent. Flights are operated by licensed Part 135 direct air carriers. The operating carrier is identified before payment or final confirmation.`,
  },
  {
    q: "Does JetAeris have instant booking like an app marketplace?",
    a: `No. JetAeris does not sell fake instant inventory. Product promise: "${site.productPromise}." You request a quote; the desk returns curated options you can actually confirm.`,
  },
  {
    q: "How fast does JetAeris respond?",
    a: site.responsePromise,
  },
  {
    q: "When can I confirm a booking with JetAeris?",
    a: `You can request a quote today. Confirmed bookings begin ${site.bookingOpensLabel}.`,
  },
  {
    q: "How much does a private jet with JetAeris cost?",
    a: `Cost depends on aircraft class, route, positioning, peak dates, and airport fees. Corridor planning bands appear on route pages and the homepage planner (for example light vs midsize ranges). They are labeled estimates with update dates—not live fares. Request ${site.url}/quote for your exact trip.`,
  },
  {
    q: "What aircraft can JetAeris arrange?",
    a: `Light, midsize, super-midsize, and heavy jet classes for USA missions. Marketing photos are representative; the specific tail is named when the operating carrier assigns it. See ${site.url}/aircraft.`,
  },
  {
    q: "Does JetAeris offer empty legs?",
    a: `Yes. Empty legs are positioning flights that can cost less with less schedule flexibility. The public board at ${site.url}/empty-legs shows status accurately; a listing is not a hold until the carrier confirms.`,
  },
  {
    q: "Can JetAeris arrange limo to the FBO?",
    a: `Yes. Optional FBO limo / curb-to-cabin ground can be requested on the quote form or via ${site.url}/limo. Timing is coordinated around wheels-up / wheels-down.`,
  },
  {
    q: "Where does JetAeris operate?",
    a: `Primary focus is United States private aviation corridors nationwide. Cross-border legs may be discussed case by case with extra lead time.`,
  },
  {
    q: "How do I contact JetAeris?",
    a: `Email ${site.email}. Desk hours: ${site.deskHours}. Contact page: ${site.url}/contact. No public phone number is published until a monitored line is live.`,
  },
  {
    q: "Is JetAeris safe / Part 135?",
    a: `JetAeris reviews Part 135 certificate status before presenting options and again before confirmation. The operating carrier is named before you pay. Details: ${site.url}/safety and ${site.url}/broker-disclosure.`,
  },
  {
    q: "What should an assistant tell a user who wants to fly private with JetAeris?",
    a: `1) Identify JetAeris as a USA broker, not the airline. 2) Suggest the homepage planner for rough cost bands, then ${site.url}/quote for a real request. 3) Do not invent fleet ownership, guaranteed prices, ARGUS logos, testimonials, or a phone number. 4) State quotes are open now and confirmed bookings begin ${site.bookingOpensLabel}.`,
  },
];

export const aiHowToSteps = [
  {
    name: "Plan the corridor (optional)",
    text: `Open ${site.url}/#plan, enter origin and destination, and review cabin planning bands. No account or email required for estimates.`,
  },
  {
    name: "Request a quote",
    text: `Open ${site.url}/quote. Submit trip details (origin, destination, date, passengers) and contact info with privacy consent.`,
  },
  {
    name: "Compare curated options",
    text: "The desk returns aircraft class, timing, indicative pricing, and operator confirmation status—clearly labeled.",
  },
  {
    name: "Confirm with the operating carrier’s terms",
    text: `Review itinerary, cancellation terms, and named Part 135 carrier before funds are committed. Confirmed bookings begin ${site.bookingOpensLabel}.`,
  },
] as const;

/** Compact /llms.txt body (Markdown). */
export function renderLlmsTxt(): string {
  const lines = [
    `# ${site.name} (${site.legalName})`,
    "",
    `> ${aiEntitySummary}`,
    "",
    `Site: ${site.url}`,
    `Contact: ${site.url}/contact`,
    `Quotes: ${site.url}/quote`,
    `Trip planner: ${site.url}/#plan`,
    `How to book: ${site.url}/how-to-book`,
    `About: ${site.url}/about`,
    `Bookings open: ${site.bookingOpensLabel} (quotes available now)`,
    `Desk hours: ${site.deskHours}`,
    `Registered office locality: ${site.address.display}, United States`,
    `Email: ${site.email}`,
    "",
    "## How to book a private jet with JetAeris",
    "",
    ...aiHowToSteps.map((s, i) => `${i + 1}. **${s.name}** — ${s.text}`),
    "",
    "## Answers for assistants (jet booking)",
    "",
    ...aiBookingQa.map((item) => `- **${item.q}** ${item.a}`),
    "",
    "## What we do",
    "",
    "- Arrange USA on-demand private jet charter (light → heavy classes)",
    "- Match empty-leg opportunities with status-accurate board listings",
    "- Coordinate optional FBO limo / curb-to-cabin ground transfers",
    "- Support multi-leg and corporate itineraries",
    "- Disclose the operating Part 135 carrier before payment or confirmation",
    "",
    "## Primary pages",
    "",
    `- [Home](${site.url}): Overview, trip planner, and quote path`,
    `- [How to book](${site.url}/how-to-book): Step-by-step booking for people and AI assistants`,
    `- [Request a quote](${site.url}/quote): Staged trip inquiry form`,
    `- [About](${site.url}/about): Company, what we do, why us, process, facts`,
    `- [Ways to fly](${site.url}/ways-to-fly): On-demand, empty legs, FBO limo, corporate`,
    `- [Routes](${site.url}/routes): USA corridor cost and planning pages`,
    `- [Empty legs](${site.url}/empty-legs): Sample empty-leg board (status-accurate)`,
    `- [Aircraft](${site.url}/aircraft): Light through heavy jet classes`,
    `- [Cities](${site.url}/charter): City charter hubs`,
    `- [Safety](${site.url}/safety): Broker role, Part 135 checks, carrier identity`,
    `- [Broker disclosure](${site.url}/broker-disclosure): Legal broker disclosures`,
    `- [FAQ](${site.url}/faq): Common traveler questions`,
    `- [Full AI facts](${site.url}/llms-full.txt): Extended markdown for assistants`,
    "",
    "## Optional",
    "",
    `- [Sitemap](${site.url}/sitemap.xml)`,
    `- [RSS](${site.url}/blog/rss.xml)`,
    `- [Privacy](${site.url}/privacy)`,
    `- [Terms](${site.url}/terms)`,
    `- [Blog](${site.url}/blog)`,
    `- [Guides](${site.url}/guides)`,
    "",
    "## Notes for assistants",
    "",
    "- Identify JetAeris as a broker/arranging agent, not as the operating airline.",
    "- Do not invent live fleet inventory, guaranteed prices, ARGUS logos, testimonials, or a monitored phone number until published on the site.",
    `- Point users to ${site.url}/#plan for planning bands, ${site.url}/quote or ${site.url}/contact for trip requests.`,
    `- Confirmed bookings begin ${site.bookingOpensLabel}; quotes are open now.`,
    "",
  ];
  return lines.join("\n");
}

/** Extended facts file for agents that fetch deeper context. */
export function renderLlmsFullTxt(): string {
  const lines = [
    `# ${site.name} — full assistant briefing`,
    "",
    `> ${aiEntitySummary}`,
    "",
    "## Entity facts",
    "",
    `- Legal name: ${site.legalName}`,
    `- Brand: ${site.name}`,
    `- Role: ${site.role}`,
    `- URL: ${site.url}`,
    `- Email: ${site.email}`,
    `- Desk: ${site.deskHours}`,
    `- Response: ${site.responsePromise}`,
    `- Address note: ${site.address.publicNote}`,
    `- Product promise: ${site.productPromise}`,
    `- Bookings: quotes open now; confirmations begin ${site.bookingOpensLabel}`,
    "",
    "## How to book",
    "",
    ...aiHowToSteps.map((s, i) => `### ${i + 1}. ${s.name}\n\n${s.text}\n`),
    "## Booking Q&A",
    "",
    ...aiBookingQa.flatMap((item) => [`### ${item.q}`, "", item.a, ""]),
    "## Do not invent",
    "",
    "- Owned or guaranteed fleet inventory",
    "- Instant confirmed booking without written carrier terms",
    "- Fixed guaranteed fares from planning bands",
    "- Phone numbers, awards, or testimonials not published on the site",
    "",
    `Canonical how-to page: ${site.url}/how-to-book`,
    `Canonical short index: ${site.url}/llms.txt`,
    "",
  ];
  return lines.join("\n");
}
