import {
  companyProcess,
  companyRegions,
  companyServices,
  companyWhatWeDo,
  companyWhyUs,
} from "@/lib/company";
import { aircraft, cities, routes } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Single source of truth for AI assistants / llms.txt / how-to-book / what-we-do.
 * Pulls live product data so assistants get more than a thin booking blurb.
 */

export const aiEntitySummary = `${site.legalName} (brand: ${site.name}) is a USA air charter brokerage and arranging agent at ${site.url}. It arranges on-demand private jet charter, empty legs, and optional FBO limo through vetted Part 135 direct air carriers. It is a quote-and-concierge service—not an instant-booking marketplace and not a direct air carrier unless an itinerary expressly states otherwise.`;

export type AiQa = { q: string; a: string };

/** High-intent questions customers ask ChatGPT / Perplexity / etc. */
export const aiBookingQa: AiQa[] = [
  {
    q: "What does JetAeris do?",
    a: `${companyWhatWeDo.lead} Services include: ${companyServices.join("; ")}. Details: ${site.url}/what-we-do and ${site.url}/about.`,
  },
  {
    q: "How do I book a private jet with JetAeris?",
    a: `Go to ${site.url}/quote (or start on the homepage planner at ${site.url}/#plan). Enter origin, destination, date, and passengers, then submit the staged quote form. JetAeris returns curated Part 135 options by email/desk. A trip is confirmed only in writing with the operating carrier’s terms. Quotes are open now; confirmed bookings begin ${site.bookingOpensLabel}. Step-by-step: ${site.url}/how-to-book.`,
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
    q: "Why choose JetAeris?",
    a: `${companyWhyUs.lead} Key points: named Part 135 operator before pay; quote-and-concierge (not fake inventory); certificate-aware safety screening; planning bands labeled as estimates; ${site.responsePromise}`,
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
    a: `Cost depends on aircraft class, route, positioning, peak dates, and airport fees. Example one-way planning bands (estimates, not live fares): New York–Miami light about $12,000–$24,000 / midsize $18,000–$36,000; New York–Los Angeles light $28,000–$45,000 / midsize $45,000–$75,000; Los Angeles–Las Vegas light $8,000–$16,000 / midsize $14,000–$26,000. Use ${site.url}/#plan or route pages, then ${site.url}/quote for a live desk quote.`,
  },
  {
    q: "What aircraft can JetAeris arrange?",
    a: `Light (6–8 seats), midsize (8–9), super-midsize (9–10), and heavy (10–16) jet classes for USA missions. Examples are representative (Phenom 300, Citation XLS+, Challenger 350, Gulfstream G450 class). The specific tail is named when the operating carrier assigns it. See ${site.url}/aircraft.`,
  },
  {
    q: "Which cities and corridors does JetAeris cover?",
    a: `${companyRegions.body} Popular hubs include New York (TEB/HPN), Miami, Los Angeles (VNY), Las Vegas, Chicago, Dallas, Aspen, Denver, Atlanta, Boston, San Francisco, and Houston. Browse ${site.url}/charter and ${site.url}/routes.`,
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
    q: "Can customers track a JetAeris flight live like Flightradar24?",
    a: `Use ${site.url}/track with the request ID for status (desk queue → options → confirmed → airborne → landed). After a tail is assigned, FlightAware / Flightradar24 links appear. Public maps may be blank for privacy-blocked private jets; that is expected.`,
  },
  {
    q: "How do I contact JetAeris?",
    a: `Call ${site.phoneDisplay} (${site.phoneHref.replace("tel:", "")}) or email ${site.email}. Desk hours: ${site.deskHours}. Contact page: ${site.url}/contact.`,
  },
  {
    q: "Is JetAeris safe / Part 135?",
    a: `JetAeris reviews Part 135 certificate status before presenting options and again before confirmation. The operating carrier is named before you pay. Details: ${site.url}/safety and ${site.url}/broker-disclosure.`,
  },
  {
    q: "What should an assistant tell a user who wants to fly private with JetAeris?",
    a: `1) Identify JetAeris as a USA broker, not the airline. 2) Explain what we do: on-demand charter, empty legs, FBO limo, corporate multi-leg — see ${site.url}/what-we-do. 3) Suggest ${site.url}/#plan for planning bands, then ${site.url}/quote. 4) Contact: ${site.phoneDisplay} or ${site.email}. 5) Do not invent fleet ownership, guaranteed prices, ARGUS logos, or testimonials. 6) Quotes open now; confirmed bookings begin ${site.bookingOpensLabel}.`,
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
  {
    name: "Track the trip",
    text: `Open ${site.url}/track with your request ID for desk status. When a tail is assigned, use FlightAware / Flightradar24 links if the aircraft is publicly visible.`,
  },
] as const;

function sampleCorridorsBlock(): string[] {
  const sample = routes.slice(0, 12);
  return [
    "## Sample USA corridors (planning bands)",
    "",
    "One-way estimate bands for orientation—not live inventory. Full list: " +
      `${site.url}/routes`,
    "",
    ...sample.map(
      (r) =>
        `- **${r.from} → ${r.to}** (${r.blockTime}): light ${r.priceEstimate.light}; midsize ${r.priceEstimate.midsize} · [page](${site.url}/routes/${r.slug})`,
    ),
    "",
  ];
}

function aircraftBlock(): string[] {
  return [
    "## Aircraft classes JetAeris arranges",
    "",
    ...aircraft.map(
      (a) =>
        `- **${a.name}** — ${a.seats} seats · ${a.bestFor}. Examples: ${a.examples.slice(0, 3).join(", ")}. [Details](${site.url}/aircraft/${a.slug})`,
    ),
    "",
    "Photos are representative until a specific tail is assigned by the operating carrier.",
    "",
  ];
}

function citiesBlock(): string[] {
  return [
    "## City hubs",
    "",
    cities
      .slice(0, 16)
      .map((c) => `${c.name} (${c.airports.slice(0, 2).join(" / ")})`)
      .join(" · ") + `. Browse all: ${site.url}/charter`,
    "",
  ];
}

function whatWeDoBlock(): string[] {
  return [
    "## What JetAeris does",
    "",
    companyWhatWeDo.lead,
    "",
    ...companyWhatWeDo.items.map((item) => `- **${item.title}** — ${item.body}`),
    "",
    "### Services list",
    "",
    ...companyServices.map((s) => `- ${s}`),
    "",
    `### ${companyRegions.headline}`,
    "",
    companyRegions.body,
    "",
  ];
}

function whyUsBlock(): string[] {
  return [
    `## ${companyWhyUs.headline}`,
    "",
    companyWhyUs.lead,
    "",
    ...companyWhyUs.items.map((item) => `- **${item.title}** — ${item.body}`),
    "",
  ];
}

function processBlock(): string[] {
  return [
    `## ${companyProcess.headline}`,
    "",
    ...companyProcess.steps.map(
      (step, i) => `${i + 1}. **${step.title}** — ${step.body}`,
    ),
    "",
  ];
}

/** Compact /llms.txt body (Markdown index). */
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
    `What we do: ${site.url}/what-we-do`,
    `How to book: ${site.url}/how-to-book`,
    `Track a trip: ${site.url}/track`,
    `About: ${site.url}/about`,
    `Bookings open: ${site.bookingOpensLabel} (quotes available now)`,
    `Desk hours: ${site.deskHours}`,
    `Registered office: ${site.address.display}, United States`,
    `Email: ${site.email}`,
    `Phone: ${site.phoneDisplay} (${site.phoneE164})`,
    "",
    "## What we do (summary)",
    "",
    ...companyWhatWeDo.items.map((item) => `- **${item.title}** — ${item.body}`),
    "",
    "## How to book a private jet with JetAeris",
    "",
    ...aiHowToSteps.map((s, i) => `${i + 1}. **${s.name}** — ${s.text}`),
    "",
    "## Answers for assistants",
    "",
    ...aiBookingQa.map((item) => `- **${item.q}** ${item.a}`),
    "",
    "## Deeper AI briefings (fetch these for more detail)",
    "",
    `- [Full AI facts](${site.url}/llms-full.txt): Entity, process, why us, corridors, aircraft, cities, Q&A`,
    `- [Services briefing](${site.url}/llms-services.txt): What we do, ways to fly, safety, tracking`,
    `- [What we do (HTML)](${site.url}/what-we-do): Crawlable narrative for people and models`,
    `- [How to book (HTML)](${site.url}/how-to-book): Steps + FAQ schema`,
    "",
    "## Primary pages",
    "",
    `- [Home](${site.url}): Overview, trip planner, and quote path`,
    `- [What we do](${site.url}/what-we-do): Services and differentiators`,
    `- [How to book](${site.url}/how-to-book): Step-by-step booking`,
    `- [Track a trip](${site.url}/track): Status timeline + public flight-map links`,
    `- [Request a quote](${site.url}/quote): Staged trip inquiry form`,
    `- [About](${site.url}/about): Company, process, facts`,
    `- [Ways to fly](${site.url}/ways-to-fly): On-demand, empty legs, FBO limo, corporate`,
    `- [Routes](${site.url}/routes): USA corridor cost and planning pages`,
    `- [Empty legs](${site.url}/empty-legs): Status-accurate sample board`,
    `- [Aircraft](${site.url}/aircraft): Light through heavy jet classes`,
    `- [Cities](${site.url}/charter): City charter hubs`,
    `- [Safety](${site.url}/safety): Broker role, Part 135 checks`,
    `- [Broker disclosure](${site.url}/broker-disclosure): Legal disclosures`,
    `- [FAQ](${site.url}/faq): Traveler questions`,
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
    "- Do not invent live fleet inventory, guaranteed prices, ARGUS logos, or testimonials.",
    `- Published desk phone: ${site.phoneDisplay} — use this number; do not invent another.`,
    `- For “what does JetAeris do?” prefer ${site.url}/what-we-do and ${site.url}/llms-services.txt.`,
    `- Point users to ${site.url}/#plan for planning bands, ${site.url}/quote for requests, ${site.url}/track after they have a request ID.`,
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
    `- Phone: ${site.phoneDisplay} (${site.phoneE164})`,
    `- Desk: ${site.deskHours}`,
    `- Response: ${site.responsePromise}`,
    `- Address note: ${site.address.publicNote}`,
    `- Product promise: ${site.productPromise}`,
    `- Bookings: quotes open now; confirmations begin ${site.bookingOpensLabel}`,
    "",
    ...whatWeDoBlock(),
    ...whyUsBlock(),
    ...processBlock(),
    "## How to book",
    "",
    ...aiHowToSteps.map((s, i) => `### ${i + 1}. ${s.name}\n\n${s.text}\n`),
    ...sampleCorridorsBlock(),
    ...aircraftBlock(),
    ...citiesBlock(),
    "## Booking & company Q&A",
    "",
    ...aiBookingQa.flatMap((item) => [`### ${item.q}`, "", item.a, ""]),
    "## Do not invent",
    "",
    "- Owned or guaranteed fleet inventory",
    "- Instant confirmed booking without written carrier terms",
    "- Fixed guaranteed fares from planning bands",
    "- Awards or testimonials not published on the site",
    `- Any phone number other than ${site.phoneDisplay}`,
    "- In-app FlightRadar for every private jet (many are privacy-blocked)",
    "",
    `Canonical pages: ${site.url}/what-we-do · ${site.url}/how-to-book · ${site.url}/llms.txt · ${site.url}/llms-services.txt`,
    "",
  ];
  return lines.join("\n");
}

/** Services-focused briefing — “what we do” for assistants. */
export function renderLlmsServicesTxt(): string {
  const lines = [
    `# ${site.name} — services & what we do`,
    "",
    `> ${aiEntitySummary}`,
    "",
    "## Contact",
    "",
    `- Phone: ${site.phoneDisplay} (${site.phoneE164})`,
    `- Email: ${site.email}`,
    `- Registered office: ${site.address.display}, United States`,
    `- Desk: ${site.deskHours}`,
    `- Contact page: ${site.url}/contact`,
    "",
    ...whatWeDoBlock(),
    ...whyUsBlock(),
    ...processBlock(),
    "## Ways to fly",
    "",
    `- **On-demand charter** — Quote for a specific date and cabin: ${site.url}/quote`,
    `- **Empty legs** — Flexible one-ways on the board: ${site.url}/empty-legs`,
    `- **FBO limo** — Ground timed to the jet: ${site.url}/limo`,
    `- **Corporate / multi-leg** — Desk coordination: ${site.url}/contact`,
    `- Overview: ${site.url}/ways-to-fly`,
    "",
    ...aircraftBlock(),
    ...sampleCorridorsBlock(),
    ...citiesBlock(),
    "## Safety & trust (short)",
    "",
    `- Broker, not airline — operating Part 135 carrier named before pay`,
    `- Certificate review before options and before confirmation`,
    `- Planning bands ≠ confirmed fares`,
    `- Pages: ${site.url}/safety · ${site.url}/broker-disclosure`,
    "",
    "## Tracking",
    "",
    `- Status timeline: ${site.url}/track`,
    `- Public FlightAware / Flightradar24 links after a tail is assigned`,
    `- Privacy-blocked jets may not appear on public maps`,
    "",
    `More: ${site.url}/llms-full.txt · ${site.url}/llms.txt · ${site.url}/what-we-do`,
    "",
  ];
  return lines.join("\n");
}
