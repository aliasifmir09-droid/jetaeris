import type { BlogPost, BlogSection } from "@/lib/blog-types";
import { site } from "@/lib/site";
import {
  getTopCitySeo,
  TOP_CITY_SLUGS,
  type TopCitySeo,
  type TopCitySlug,
} from "@/lib/top-cities-seo";

export { TOP_CITY_SLUGS };

/**
 * High-intent SEO topic definitions for the USA top-5 private-aviation cities.
 * Each city gets ≥50 unique topic pages targeting customer questions + ranking keywords.
 */

export type TopicIntent =
  | "hub"
  | "cost"
  | "airport"
  | "corridor"
  | "how-to"
  | "compare"
  | "seasonal"
  | "ops"
  | "traveler"
  | "product"
  | "faq";

export type CityTopicDef = {
  /** URL slug suffix after city prefix pattern — full slug is computed */
  id: string;
  /** Primary ranking keyword / search phrase */
  keyword: string;
  intent: TopicIntent;
  title: (city: TopCitySeo) => string;
  description: (city: TopCitySeo) => string;
  category: string;
  tags: (city: TopCitySeo) => string[];
  readMinutes: number;
  sections: (city: TopCitySeo) => BlogSection[];
  faqs: (city: TopCitySeo) => { q: string; a: string }[];
  relatedHref?: (city: TopCitySeo) => string;
  relatedLabel?: (city: TopCitySeo) => string;
};

function airportsList(city: TopCitySeo) {
  return city.airports.map((a) => a.code).join(", ");
}

function corridorNames(city: TopCitySeo) {
  return city.topCorridors.map((c) => c.label).join("; ");
}

function cta(city: TopCitySeo) {
  return `Request a ${city.name} quote with date, passengers, and preferred airport (${airportsList(city)}). Quotes are open now; confirmed bookings begin ${site.bookingOpensLabel}.`;
}

/** Shared 50+ topic templates — city-specific copy is injected at generate time. */
const SHARED_TOPICS: CityTopicDef[] = [
  {
    id: "private-jet-charter",
    keyword: "private jet charter {city}",
    intent: "hub",
    title: (c) => `Private jet charter in ${c.name}, ${c.state}: complete 2026 guide`,
    description: (c) =>
      `${c.name} private jet charter—airports ${airportsList(c)}, cost context, top corridors, FBO limo, and how to request a JetAeris quote. ${c.rankLabel}.`,
    category: "City guides",
    tags: (c) => [c.name, "private jet charter", "FBO", c.state],
    readMinutes: 12,
    relatedHref: (c) => `/charter/${c.slug}`,
    relatedLabel: (c) => `${c.name} charter hub`,
    sections: (c) => [
      {
        heading: `Why ${c.name} ranks among the top USA private aviation markets`,
        body: `${c.heroSummary} ${c.marketThesis}`,
      },
      ...c.knowledge.map((k) => ({
        heading: k.heading,
        body: k.body,
        bullets: k.bullets,
      })),
      {
        heading: "Primary airports and FBOs",
        body: `${c.name} private trips usually run through ${airportsList(c)}. Choose the field that shortens door-to-door time—not the largest commercial airport by default.`,
        bullets: c.airports.map(
          (a) => `${a.code} (${a.name}): ${a.bestFor}. ${a.notes}`,
        ),
      },
      {
        heading: "Top corridors from this market",
        body: `High-intent searches often pair ${c.name} with these routes: ${corridorNames(c)}.`,
        bullets: c.topCorridors.map(
          (r) => `${r.label} — ${r.why} → /routes/${r.slug}`,
        ),
      },
      {
        heading: "Cost planning bands",
        body: `Light jet: ${c.costBands.light}. Midsize: ${c.costBands.midsize}. ${c.costBands.notes} Guidance updated ${c.costBands.updated}.`,
      },
      {
        heading: "Ground transfer",
        body: c.groundTransfer,
      },
      {
        heading: "Next step",
        body: cta(c),
      },
    ],
    faqs: (c) => c.faqs,
  },
  {
    id: "private-jet-cost",
    keyword: "private jet cost {city}",
    intent: "cost",
    title: (c) => `Private jet cost in ${c.name}: 2026 price ranges and what moves them`,
    description: (c) =>
      `How much does a private jet cost from ${c.name}? Planning bands for light and midsize jets, peak premiums, and how to get a real JetAeris quote.`,
    category: "Pricing",
    tags: (c) => [c.name, "private jet cost", "charter pricing"],
    readMinutes: 8,
    relatedHref: () => "/quote",
    relatedLabel: () => "Request a quote",
    sections: (c) => [
      {
        heading: `There is no single ${c.name} sticker price`,
        body: `Private jet cost from ${c.name} is trip-based: aircraft class, positioning, FBO fees, overnight, peak dates, and whether a return ferry is required. Published hourly rates almost never equal the invoice.`,
      },
      {
        heading: "Planning ranges used by travelers",
        body: `For ${c.name} missions, use these planning bands (not live inventory): light jet — ${c.costBands.light}; midsize — ${c.costBands.midsize}. Updated ${c.costBands.updated}.`,
        bullets: [
          "One-ways can cost more when the aircraft must ferry home empty",
          "Holiday and event weekends in this market often exceed weekday bands",
          "Empty legs can price lower only when your dates match a real reposition",
        ],
      },
      {
        heading: "What usually raises the total in this market",
        body: `${c.costBands.notes} Also watch: ${c.peakSeasons.map((p) => p.heading.toLowerCase()).join("; ")}.`,
      },
      {
        heading: "How to get an accurate number",
        body: cta(c),
      },
    ],
    faqs: (c) => [
      {
        q: `Is private jet charter from ${c.name} cheaper as a round-trip?`,
        a: "Often yes, because the operator may avoid an empty reposition. One-ways still win when an empty leg already matches your direction.",
      },
      {
        q: "Do hourly rates include FBO and overnight fees?",
        a: "Rarely. Ask what is included before comparing quotes.",
      },
    ],
  },
  {
    id: "cheapest-private-jet",
    keyword: "cheapest private jet {city}",
    intent: "cost",
    title: (c) => `Cheapest private jet options from ${c.name} (without fake fares)`,
    description: (c) =>
      `How to lower private jet cost from ${c.name}: light jets, flexible windows, empty legs, and round-trips—honest tactics, not fake instant prices.`,
    category: "Pricing",
    tags: (c) => [c.name, "cheap private jet", "empty legs"],
    readMinutes: 7,
    sections: (c) => [
      {
        heading: "“Cheapest” still means a real aircraft",
        body: `The lowest serious quotes from ${c.name} usually come from light jets on short corridors, flexible departure windows, or empty-leg matches—not from marketplace stickers that cannot be booked.`,
      },
      {
        heading: "Levers that actually cut cost",
        body: "Flexibility beats haggling. Share alternate airports and ±1 day windows.",
        bullets: [
          `Prefer light jet when passenger count and bags fit (${c.name} short/medium hops)`,
          "Ask about empty legs on your date—confirm operator status before treating as locked",
          "Round-trips often beat two one-ways",
          `Use the smarter FBO among ${airportsList(c)} to avoid long positioning`,
        ],
      },
      {
        heading: "What we will not do",
        body: `JetAeris will not invent instant bookable fares. ${site.bookingOpensTagline}`,
      },
      { heading: "Request a cost-aware quote", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Are empty legs the cheapest way out of ${c.name}?`,
        a: "When dates match, yes. When they do not, a flexible light-jet one-way or round-trip is usually the next-best lever.",
      },
    ],
  },
  {
    id: "how-much-does-a-private-jet-cost",
    keyword: "how much does a private jet cost from {city}",
    intent: "cost",
    title: (c) => `How much does a private jet cost from ${c.name}?`,
    description: (c) =>
      `Direct answer: ${c.name} private jet planning costs run roughly ${c.costBands.light} for light jets and ${c.costBands.midsize} for midsize—plus what changes the number.`,
    category: "Pricing",
    tags: (c) => [c.name, "how much private jet", "cost"],
    readMinutes: 6,
    sections: (c) => [
      {
        heading: "Short answer",
        body: `From ${c.name}, expect planning bands around ${c.costBands.light} (light) and ${c.costBands.midsize} (midsize) for typical one-ways. Coast-to-coast and peak mountain trips price higher.`,
      },
      {
        heading: "Why your quote may differ",
        body: c.costBands.notes,
      },
      {
        heading: "Corridors that set the benchmark",
        body: `Use route pages for: ${corridorNames(c)}.`,
      },
      { heading: "Get your number", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Can I get an exact ${c.name} price online instantly?`,
        a: `Not honestly. Availability and positioning change daily. JetAeris returns curated options after your request; bookings open ${site.bookingOpensLabel}.`,
      },
    ],
  },
  {
    id: "private-jet-airports",
    keyword: "{city} private jet airports",
    intent: "airport",
    title: (c) => `${c.name} private jet airports and FBO guide (${airportsList(c)})`,
    description: (c) =>
      `Which ${c.name} airport for private aviation? Compare ${airportsList(c)}—best for, ground tips, and how JetAeris chooses the field.`,
    category: "Airports",
    tags: (c) => [c.name, "FBO", "private jet airports", ...c.airports.map((a) => a.code)],
    readMinutes: 9,
    relatedHref: (c) => `/charter/${c.slug}`,
    relatedLabel: (c) => `${c.name} charter hub`,
    sections: (c) => [
      {
        heading: `Airport choice is half the trip in ${c.name}`,
        body: `${c.heroSummary} The wrong field can erase the time you gained by flying private.`,
      },
      ...c.airports.map((a) => ({
        heading: `${a.code} — ${a.name}`,
        body: `Best for: ${a.bestFor}. ${a.notes} Ground: ${a.ground}`,
      })),
      {
        heading: "How we pick with you",
        body: `Share your address in ${c.neighborhoods.join(", ")}, or nearby. We match airport + limo to the itinerary.`,
      },
      { heading: "Next step", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `What is the best private jet airport in ${c.name}?`,
        a: `It depends on your ground address. Common options are ${airportsList(c)}. Tell us where you start and end the day.`,
      },
    ],
  },
  {
    id: "fbo-guide",
    keyword: "{city} FBO private jet",
    intent: "airport",
    title: (c) => `${c.name} FBO guide: what to expect at the private terminal`,
    description: (c) =>
      `How FBOs work for ${c.name} private jet trips—arrival flow, security, lounges, and coordinating limo at ${airportsList(c)}.`,
    category: "Airports",
    tags: (c) => [c.name, "FBO", "private terminal"],
    readMinutes: 6,
    sections: (c) => [
      {
        heading: "FBO vs airline terminal",
        body: `In ${c.name}, private flights use FBOs at ${airportsList(c)}—separate from commercial terminals. You typically clear a small lobby, meet your crew, and board nearby.`,
      },
      {
        heading: "What to bring and when to arrive",
        body: "Bring government ID for all passengers. Arrive on the time your desk confirms—often 15–30 minutes before departure for domestic private hops, longer if catering or pets are involved.",
      },
      {
        heading: "Limo at the FBO",
        body: c.groundTransfer,
      },
      { heading: "Book the trip + ground together", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Do I go through TSA at ${c.name} FBOs?`,
        a: "Private FBO security is different from airline TSA checkpoints. Your operator and FBO set the screening process for that trip.",
      },
    ],
  },
  {
    id: "empty-legs",
    keyword: "empty leg {city}",
    intent: "product",
    title: (c) => `${c.name} empty leg private jets: how they work (and when they cancel)`,
    description: (c) =>
      `Empty legs from or to ${c.name}—why they are cheaper, why schedules change, and how JetAeris confirms status before you plan around one.`,
    category: "Empty legs",
    tags: (c) => [c.name, "empty leg", "one-way deal"],
    readMinutes: 7,
    relatedHref: () => "/empty-legs",
    relatedLabel: () => "Empty legs board",
    sections: (c) => [
      {
        heading: `Why empty legs appear around ${c.name}`,
        body: `${c.name} sits on heavy reposition lanes (${corridorNames(c)}). When an aircraft must move without revenue passengers, operators may offer an empty leg.`,
      },
      {
        heading: "Honest limitations",
        body: "Empty legs can change or cancel when the paid trip changes. Treat listings as opportunities until the operating carrier confirms.",
        bullets: [
          "Dates and times are less flexible than on-demand charter",
          "Aircraft class is fixed by the reposition",
          "Peak event weeks may show fewer bargains than you expect",
        ],
      },
      {
        heading: "JetAeris approach",
        body: `We show status clearly and confirm before you build plans around a deal. ${site.bookingOpensTagline}`,
      },
      { heading: "Ask about empty legs on your dates", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Are ${c.name} empty legs always available?`,
        a: "No. Supply follows operator repositioning. If none match, we quote on-demand alternatives.",
      },
    ],
  },
  {
    id: "last-minute-private-jet",
    keyword: "last minute private jet {city}",
    intent: "how-to",
    title: (c) => `Last-minute private jet from ${c.name}: what is realistic`,
    description: (c) =>
      `Can you book a last-minute private jet in ${c.name}? Lead times, peak constraints, and how to request a same-day or next-day JetAeris option.`,
    category: "How to charter",
    tags: (c) => [c.name, "last minute", "on-demand"],
    readMinutes: 6,
    sections: (c) => [
      {
        heading: "Same-day is possible—not guaranteed",
        body: `On quiet weekdays, ${c.name} can often support short-notice light- or midsize-jet trips. Peak weekends and holidays (${c.peakSeasons[0]?.heading || "peak season"}) tighten aircraft and FBO handling.`,
      },
      {
        heading: "What speeds up a last-minute quote",
        body: "Send origin preference, destination, hard arrival time, passenger count, bags/pets, and alternate airports in one message.",
      },
      {
        heading: "Pricing reality",
        body: "Short-notice one-ways can carry positioning premiums. Empty legs help only if one already exists.",
      },
      { heading: "Request now", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `How fast can JetAeris respond for ${c.name}?`,
        a: site.responsePromise,
      },
    ],
  },
  {
    id: "how-to-charter",
    keyword: "how to charter a private jet in {city}",
    intent: "how-to",
    title: (c) => `How to charter a private jet in ${c.name} (step-by-step)`,
    description: (c) =>
      `Step-by-step: charter a private jet in ${c.name}—choose airport, send trip details, compare options, and understand JetAeris broker process through ${site.bookingOpensLabel}.`,
    category: "How to charter",
    tags: (c) => [c.name, "how to charter", "Part 135"],
    readMinutes: 8,
    sections: (c) => [
      {
        heading: "1. Define the trip, not the tail number",
        body: `Start with date, ${c.name} origin or destination, passenger count, and must-arrive time. Airport preference among ${airportsList(c)} comes next.`,
      },
      {
        heading: "2. Request options from a broker desk",
        body: `${site.name} is an air charter broker arranging flights on vetted Part 135 carriers—not an instant marketplace. ${site.role}`,
      },
      {
        heading: "3. Compare class, timing, and assumptions",
        body: "Look past the headline number: what is included, which FBO, ferry risk, and cancellation terms.",
      },
      {
        heading: "4. Confirm when bookings open",
        body: site.bookingOpensTagline,
      },
      { heading: "Start your request", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Do I need to pick the aircraft type for ${c.name}?`,
        a: "No. Share passengers and bags; we recommend light, midsize, or larger only when the mission needs it.",
      },
    ],
  },
  {
    id: "on-demand-charter",
    keyword: "on demand private jet {city}",
    intent: "product",
    title: (c) => `On-demand private jet charter in ${c.name}`,
    description: (c) =>
      `On-demand (ad hoc) private jet charter from ${c.name}—vs jet cards and ownership—plus how JetAeris quotes trip-by-trip.`,
    category: "Ways to fly",
    tags: (c) => [c.name, "on-demand", "ad hoc charter"],
    readMinutes: 6,
    relatedHref: () => "/ways-to-fly",
    relatedLabel: () => "Ways to fly",
    sections: (c) => [
      {
        heading: "On-demand means trip-by-trip",
        body: `Most ${c.name} travelers who fly a few times a year are better served by on-demand charter than a membership they under-use.`,
      },
      {
        heading: "When a card or ownership might differ",
        body: "Very high annual hours, guaranteed aircraft type, or balance-sheet preferences can change the math—ask for a comparison, not a hard sell.",
      },
      {
        heading: `${c.name} on-demand realities`,
        body: `Availability follows the same airport and season patterns as the rest of this market: ${c.peakSeasons.map((p) => p.heading).join("; ")}.`,
      },
      { heading: "Request an on-demand option", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Is on-demand more expensive than a jet card in ${c.name}?`,
        a: "Per hour it can look higher; annual spend is often lower if you fly infrequently. Compare full-year scenarios.",
      },
    ],
  },
  {
    id: "private-jet-limo",
    keyword: "private jet limo {city}",
    intent: "ops",
    title: (c) => `${c.name} private jet limo and FBO black-car transfers`,
    description: (c) =>
      `Coordinate FBO limo in ${c.name} with your private jet—neighborhoods ${c.neighborhoods.join(", ")}, airports ${airportsList(c)}.`,
    category: "Ground transfer",
    tags: (c) => [c.name, "limo", "FBO transfer", "black car"],
    readMinutes: 5,
    relatedHref: (c) => `/limo/${c.slug}`,
    relatedLabel: (c) => `${c.name} limo`,
    sections: (c) => [
      {
        heading: "Door-to-door is the product",
        body: c.groundTransfer,
      },
      {
        heading: "Neighborhoods we plan around",
        body: `Common pickup/drop patterns: ${c.neighborhoods.join(", ")}.`,
      },
      {
        heading: "Bundle with the flight quote",
        body: cta(c),
      },
    ],
    faqs: (c) => [
      {
        q: `Can limo wait on delay at ${c.name} FBOs?`,
        a: "Ask for wait-and-return or extended wait when you request ground. Weather and ATC can shift wheels-down.",
      },
    ],
  },
  {
    id: "same-day-private-jet",
    keyword: "same day private jet {city}",
    intent: "traveler",
    title: (c) => `Same-day private jet trips from ${c.name}`,
    description: (c) =>
      `Same-day out-and-back private jet from ${c.name} for meetings—aircraft class, turn times, and quote tips.`,
    category: "Business travel",
    tags: (c) => [c.name, "same-day", "corporate jet"],
    readMinutes: 6,
    sections: (c) => [
      {
        heading: "Built for hard meeting times",
        body: `Corporate travelers from ${c.name} often need wheels-up early and return the same evening. Midsize comfort helps on longer corridors; light jets win on short hops.`,
      },
      {
        heading: "Plan the turn",
        body: "Give us meeting start/end, city-center address, and whether a second stop is possible. We protect buffers for taxi and FBO.",
      },
      {
        heading: "Popular same-day patterns",
        body: corridorNames(c),
      },
      { heading: "Request a same-day plan", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Can I do ${c.name} to another city and back in one day?`,
        a: "Often yes on regional corridors. Longer legs need earlier starts and realistic meeting windows—send times and we will say if it fits.",
      },
    ],
  },
  {
    id: "corporate-private-jet",
    keyword: "corporate private jet {city}",
    intent: "traveler",
    title: (c) => `Corporate private jet charter in ${c.name}`,
    description: (c) =>
      `Corporate and executive private jet travel from ${c.name}—multi-city days, assistant workflows, and Part 135 carrier arrangement.`,
    category: "Business travel",
    tags: (c) => [c.name, "corporate jet", "executive travel"],
    readMinutes: 7,
    sections: (c) => [
      {
        heading: `${c.name} corporate demand`,
        body: c.travelerProfiles.filter((t) => /corporate|executive|finance|deal|founder/i.test(t)).join(" ") ||
          `Executives use ${c.name} as a hub for multi-city weeks and board travel.`,
      },
      {
        heading: "What assistants should send",
        body: "Passenger manifest, bill-to entity, hard times, baggage, Wi-Fi preference, and alternate airports.",
      },
      {
        heading: "Compliance posture",
        body: `${site.role} We arrange vetted Part 135 operators and document the itinerary clearly.`,
      },
      { heading: "Open a corporate request", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Can invoices support ${c.name} corporate travel policies?`,
        a: "Yes—request the billing details you need when you submit the quote form.",
      },
    ],
  },
  {
    id: "family-private-jet",
    keyword: "private jet with family {city}",
    intent: "traveler",
    title: (c) => `Family private jet travel from ${c.name}`,
    description: (c) =>
      `Flying private with family from ${c.name}—seats, bags, kids, pets, and choosing light vs midsize for leisure corridors.`,
    category: "Leisure travel",
    tags: (c) => [c.name, "family travel", "private jet"],
    readMinutes: 6,
    sections: (c) => [
      {
        heading: "Leisure profiles in this market",
        body: c.travelerProfiles.join(" "),
      },
      {
        heading: "Cabin choice for families",
        body: "Light jets work for smaller groups on short hops. Midsize helps with bags, longer legs, and stand-up cabins.",
      },
      {
        heading: "Peak leisure windows",
        body: c.peakSeasons.map((p) => `${p.heading}: ${p.body}`).join(" "),
      },
      { heading: "Plan a family trip", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Can children fly private from ${c.name}?`,
        a: "Yes. Share ages and any car-seat needs so the operator and FBO are prepared.",
      },
    ],
  },
  {
    id: "private-jet-with-pets",
    keyword: "private jet with pets {city}",
    intent: "ops",
    title: (c) => `Private jet with pets from ${c.name}: cabin rules and tips`,
    description: (c) =>
      `Bring pets on a private jet from ${c.name}—cabin travel norms, breed/weight disclosure, and what to tell JetAeris on the quote.`,
    category: "Traveler tips",
    tags: (c) => [c.name, "pets", "private jet dog"],
    readMinutes: 5,
    sections: (c) => [
      {
        heading: "Pets in the cabin are common—still declare them",
        body: `Most ${c.name} Part 135 trips can accommodate pets in cabin when disclosed early. Surprises at the FBO cause delays.`,
      },
      {
        heading: "What to send with the quote",
        body: "Species, breed, weight, crate vs loose-in-cabin preference, and any emotional-support documentation the operator requests.",
      },
      {
        heading: "Ground transfer with pets",
        body: `Confirm pet-friendly limo when bundling ground in ${c.name}.`,
      },
      { heading: "Request a pet-friendly option", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Are there breed restrictions from ${c.name}?`,
        a: "Operators set policies. Disclose breed and weight up front so we only return aircraft that accept your pet.",
      },
    ],
  },
  {
    id: "weekend-getaway",
    keyword: "weekend private jet {city}",
    intent: "seasonal",
    title: (c) => `Weekend private jet getaways from ${c.name}`,
    description: (c) =>
      `Weekend private jet ideas from ${c.name}—popular corridors, Friday–Sunday demand, and how to request flexible quotes.`,
    category: "Leisure travel",
    tags: (c) => [c.name, "weekend getaway", "private jet"],
    readMinutes: 6,
    sections: (c) => [
      {
        heading: "Friday lift, Sunday return",
        body: `Weekend demand from ${c.name} concentrates on ${corridorNames(c)}. Aircraft tighten Thursday–Sunday in peak seasons.`,
      },
      {
        heading: "Seasonal notes",
        body: c.peakSeasons.map((p) => `${p.heading}: ${p.body}`).join(" "),
      },
      {
        heading: "Flexibility saves money",
        body: "A Saturday morning instead of Friday 5 p.m. can change aircraft availability and price.",
      },
      { heading: "Plan the weekend", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `When should I request a weekend trip from ${c.name}?`,
        a: "As soon as dates firm—especially for holidays and major events.",
      },
    ],
  },
  {
    id: "holiday-private-jet",
    keyword: "holiday private jet {city}",
    intent: "seasonal",
    title: (c) => `Holiday private jet travel from ${c.name}`,
    description: (c) =>
      `Thanksgiving, Christmas, New Year, and peak holiday private jet demand from ${c.name}—lead times, pricing, and airports.`,
    category: "Seasonal",
    tags: (c) => [c.name, "holiday travel", "peak charter"],
    readMinutes: 6,
    sections: (c) => [
      {
        heading: "Holiday peaks are real",
        body: `Around ${c.name}, holiday weeks compress FBO capacity and aircraft. ${c.peakSeasons.map((p) => p.body).join(" ")}`,
      },
      {
        heading: "Pricing and lead time",
        body: "Expect premiums vs weekday off-peak bands. Request early; share alternate airports among " +
          airportsList(c) +
          ".",
      },
      { heading: "Reserve your holiday window", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Do holiday empty legs help from ${c.name}?`,
        a: "Sometimes—but paid holiday trips also create chaos. Confirm status; have an on-demand backup.",
      },
    ],
  },
  {
    id: "best-time-to-fly",
    keyword: "best time to fly private {city}",
    intent: "seasonal",
    title: (c) => `Best time to fly private from ${c.name}`,
    description: (c) =>
      `Best times of day and year for private jets in ${c.name}—weather, congestion, and price seasonality.`,
    category: "Seasonal",
    tags: (c) => [c.name, "best time to fly", "seasonality"],
    readMinutes: 5,
    sections: (c) => [
      {
        heading: "Time of day",
        body: `Morning departures from ${c.name} often beat afternoon weather and traffic for ground legs. Evening returns need limo buffers.`,
      },
      {
        heading: "Time of year",
        body: c.peakSeasons.map((p) => `${p.heading}: ${p.body}`).join(" "),
      },
      { heading: "Align your window", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Is midweek cheaper from ${c.name}?`,
        a: "Often yes versus peak leisure weekends—ask us to compare windows.",
      },
    ],
  },
  {
    id: "private-aviation-seasons",
    keyword: "{city} private aviation season",
    intent: "seasonal",
    title: (c) => `${c.name} private aviation seasons and event calendar peaks`,
    description: (c) =>
      `Seasonal private aviation patterns in ${c.name}: peak demand, weather, and event-driven FBO pressure.`,
    category: "Seasonal",
    tags: (c) => [c.name, "aviation season", "events"],
    readMinutes: 7,
    sections: (c) => [
      ...c.peakSeasons.map((p) => ({ heading: p.heading, body: p.body })),
      {
        heading: "How JetAeris plans around peaks",
        body: "We flag constrained dates early and suggest alternate airports or departure times when it protects the trip.",
      },
      { heading: "Request with your event dates", body: cta(c) },
    ],
    faqs: (c) => c.faqs.slice(0, 2),
  },
  {
    id: "light-jet",
    keyword: "light jet charter {city}",
    intent: "product",
    title: (c) => `Light jet charter from ${c.name}`,
    description: (c) =>
      `When a light jet fits ${c.name} trips—seats, range, cost band (${c.costBands.light}), and corridors that match.`,
    category: "Aircraft",
    tags: (c) => [c.name, "light jet", "Citation", "Phenom"],
    readMinutes: 5,
    relatedHref: () => "/aircraft/light-jet",
    relatedLabel: () => "Light jet guide",
    sections: (c) => [
      {
        heading: "Best missions",
        body: `Light jets suit many ${c.name} short and medium hops with smaller passenger counts. Cost context: ${c.costBands.light}.`,
      },
      {
        heading: "Watch payload and weather",
        body: "Bags, pets, and hot/high conditions can limit payload—declare early.",
      },
      { heading: "Ask for light-jet options", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Is a light jet enough for coast-to-coast from ${c.name}?`,
        a: "Sometimes with a fuel stop; many travelers prefer midsize or larger for nonstop comfort. We will say which fits your date.",
      },
    ],
  },
  {
    id: "midsize-jet",
    keyword: "midsize jet charter {city}",
    intent: "product",
    title: (c) => `Midsize jet charter from ${c.name}`,
    description: (c) =>
      `Midsize private jets from ${c.name}—stand-up cabins, longer legs, and planning costs (${c.costBands.midsize}).`,
    category: "Aircraft",
    tags: (c) => [c.name, "midsize jet", "charter"],
    readMinutes: 5,
    relatedHref: () => "/aircraft/midsize-jet",
    relatedLabel: () => "Midsize jet guide",
    sections: (c) => [
      {
        heading: "When midsize wins",
        body: `Longer corridors from ${c.name}, more passengers, or baggage-heavy leisure trips often justify midsize. Planning band: ${c.costBands.midsize}.`,
      },
      {
        heading: "Typical use cases",
        body: corridorNames(c),
      },
      { heading: "Request midsize options", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Is midsize always more expensive from ${c.name}?`,
        a: "Usually on hourly rate—but positioning can flip the comparison. Compare full quotes.",
      },
    ],
  },
  {
    id: "heavy-jet",
    keyword: "heavy jet charter {city}",
    intent: "product",
    title: (c) => `Heavy / large-cabin jet charter from ${c.name}`,
    description: (c) =>
      `When large-cabin or heavy jets make sense from ${c.name}—transcontinental comfort, groups, and nonstop missions.`,
    category: "Aircraft",
    tags: (c) => [c.name, "heavy jet", "large cabin"],
    readMinutes: 5,
    relatedHref: () => "/aircraft/heavy-jet",
    relatedLabel: () => "Heavy jet guide",
    sections: (c) => [
      {
        heading: "Missions that need the cabin",
        body: `Groups, long nonstops, and travelers who need a true stand-up cabin with range often step up from midsize for ${c.name} departures.`,
      },
      {
        heading: "Cost expectation",
        body: "Heavy one-ways are a different product than light regional hops—request a class-specific quote rather than extrapolating short-hop bands.",
      },
      { heading: "Request large-cabin options", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Do all ${c.name} FBOs handle heavy jets?`,
        a: `Most primary fields (${airportsList(c)}) can—confirm wingspan/weight with the operator for your specific tail.`,
      },
    ],
  },
  {
    id: "one-way-private-jet",
    keyword: "one way private jet {city}",
    intent: "cost",
    title: (c) => `One-way private jet from ${c.name}: pricing and ferry reality`,
    description: (c) =>
      `One-way private jet pricing from ${c.name}—why ferry legs matter, when empty legs help, and how to quote smarter.`,
    category: "Pricing",
    tags: (c) => [c.name, "one-way", "ferry leg"],
    readMinutes: 6,
    sections: (c) => [
      {
        heading: "One-ways are not half of a round-trip",
        body: `If the aircraft must return empty from your destination back toward ${c.name} (or onward), you may pay for that positioning somehow.`,
      },
      {
        heading: "When one-ways win",
        body: "Matching empty legs, or destinations where aircraft naturally reposition, can make one-ways efficient.",
      },
      { heading: "Compare one-way vs round-trip", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Should I always book round-trip from ${c.name}?`,
        a: "Not always. Send both preferences; we will show which structure prices better for your dates.",
      },
    ],
  },
  {
    id: "round-trip-private-jet",
    keyword: "round trip private jet {city}",
    intent: "cost",
    title: (c) => `Round-trip private jet from ${c.name}`,
    description: (c) =>
      `Round-trip private jet charter from ${c.name}—why it often prices better than two one-ways, and how to structure weekends.`,
    category: "Pricing",
    tags: (c) => [c.name, "round-trip", "charter"],
    readMinutes: 5,
    sections: (c) => [
      {
        heading: "Why round-trips help",
        body: `Keeping the aircraft on your itinerary can reduce ferry risk versus two separate one-ways out of ${c.name}.`,
      },
      {
        heading: "Weekend structure",
        body: "Friday out / Sunday return is common—share exact times so we protect FBO and crew duty limits.",
      },
      { heading: "Request a round-trip quote", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Can I stay longer than the crew overnight plan?`,
        a: "Yes, but overnight and duty rules affect price. Tell us your return date up front.",
      },
    ],
  },
  {
    id: "private-jet-vs-first-class",
    keyword: "private jet vs first class {city}",
    intent: "compare",
    title: (c) => `Private jet vs first class from ${c.name}: when charter wins`,
    description: (c) =>
      `Compare private jet charter vs first-class airlines from ${c.name}—door-to-door time, groups, and true trip cost.`,
    category: "Comparisons",
    tags: (c) => [c.name, "first class vs private", "value"],
    readMinutes: 7,
    sections: (c) => [
      {
        heading: "The fair comparison is door-to-door",
        body: `Airline first class from a major commercial hub can look cheaper per seat—until you add ${c.name} traffic to the terminal, security lines, connections, and baggage claim.`,
      },
      {
        heading: "When private wins",
        body: "Groups of 4–8, hard meeting times, multiple cities in one day, pets in cabin, or remote FBOs near your destination.",
      },
      {
        heading: "When airlines may win",
        body: "Solo travelers on well-served nonstops with flexible time and no ground complexity.",
      },
      { heading: "Run your scenario", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Is private always faster from ${c.name}?`,
        a: "Usually door-to-door—especially when you use the right FBO among " +
          airportsList(c) +
          ".",
      },
    ],
  },
  {
    id: "jet-card-vs-charter",
    keyword: "jet card vs charter {city}",
    intent: "compare",
    title: (c) => `Jet card vs on-demand charter for ${c.name} travelers`,
    description: (c) =>
      `Jet card vs on-demand private jet charter if you fly from ${c.name}—hours, flexibility, and honest broker advice.`,
    category: "Comparisons",
    tags: (c) => [c.name, "jet card", "on-demand"],
    readMinutes: 6,
    relatedHref: () => "/ways-to-fly",
    relatedLabel: () => "Ways to fly",
    sections: (c) => [
      {
        heading: "Start with annual hours",
        body: `If you only leave ${c.name} a handful of times a year, on-demand charter usually wins. Cards can help guaranteed availability for heavy users.`,
      },
      {
        heading: "JetAeris position",
        body: "We arrange on-demand trips through Part 135 carriers. We will not upsell a card you do not need.",
      },
      { heading: "Compare for your calendar", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Does JetAeris sell jet cards in ${c.name}?`,
        a: "Our core product is on-demand brokerage. Ask if you want a comparison framework for membership products.",
      },
    ],
  },
  {
    id: "private-jet-safety",
    keyword: "private jet safety {city}",
    intent: "ops",
    title: (c) => `Private jet safety standards for ${c.name} charter`,
    description: (c) =>
      `How JetAeris approaches safety for ${c.name} private jet charter—Part 135 operators, ARGUS/Wyvern-style vetting language, and what you should ask.`,
    category: "Safety",
    tags: (c) => [c.name, "safety", "Part 135"],
    readMinutes: 6,
    relatedHref: () => "/safety",
    relatedLabel: () => "Safety",
    sections: (c) => [
      {
        heading: "Broker role and carrier role",
        body: `${site.role} The operating Part 135 carrier holds operational control of the flight.`,
      },
      {
        heading: "What to ask on every ${c.name} trip",
        body: "Operator certificate, insurance, safety ratings where applicable, and aircraft specifics once a tail is assigned.",
      },
      {
        heading: "Weather and local ops",
        body: c.peakSeasons.map((p) => p.body).join(" "),
      },
      { heading: "Request a vetted option", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Who is the airline of record on my ${c.name} flight?`,
        a: "The Part 135 direct air carrier operating the aircraft—named on your itinerary—not the broker brand alone.",
      },
    ],
  },
  {
    id: "part-135-charter",
    keyword: "Part 135 charter {city}",
    intent: "ops",
    title: (c) => `Part 135 private charter from ${c.name}: what it means`,
    description: (c) =>
      `Part 135 explained for ${c.name} travelers—why on-demand charter uses certificated carriers and how JetAeris arranges them.`,
    category: "Safety",
    tags: (c) => [c.name, "Part 135", "FAA"],
    readMinutes: 5,
    sections: (c) => [
      {
        heading: "Part 135 in plain English",
        body: "Most on-demand USA private charters operate under FAA Part 135 rules for commuter and on-demand operations—distinct from scheduled airlines and from pure private Part 91 owner flights.",
      },
      {
        heading: `Relevance in ${c.name}`,
        body: `When you request a quote for ${c.name}, we source Part 135 operators familiar with local FBOs at ${airportsList(c)}.`,
      },
      { heading: "Start a Part 135 request", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Is JetAeris a Part 135 carrier in ${c.name}?`,
        a: site.role,
      },
    ],
  },
  {
    id: "what-to-expect",
    keyword: "what to expect private jet {city}",
    intent: "how-to",
    title: (c) => `What to expect on a private jet from ${c.name}`,
    description: (c) =>
      `First-time private jet experience from ${c.name}: FBO arrival, boarding, in-flight norms, and landing flow.`,
    category: "Traveler tips",
    tags: (c) => [c.name, "first time private jet", "what to expect"],
    readMinutes: 6,
    sections: (c) => [
      {
        heading: "Before wheels-up",
        body: `You arrive at an FBO among ${airportsList(c)}, not a crowded airline terminal. IDs checked, bags handled curbside or at the counter, short walk to the aircraft.`,
      },
      {
        heading: "In flight",
        body: "Cabin service varies by aircraft and operator. Wi-Fi, catering, and pets must be requested in advance.",
      },
      {
        heading: "On landing",
        body: "You typically exit to a waiting car at the destination FBO within minutes—another reason limo coordination matters.",
      },
      { heading: "Ready for your first trip?", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Is there a dress code for ${c.name} private flights?`,
        a: "No formal dress code. Comfortable attire is fine; some travelers dress for their meeting on arrival.",
      },
    ],
  },
  {
    id: "private-jet-catering",
    keyword: "private jet catering {city}",
    intent: "ops",
    title: (c) => `Private jet catering from ${c.name} FBOs`,
    description: (c) =>
      `Order catering for ${c.name} private jet flights—lead times, dietary needs, and how to add it to your JetAeris quote.`,
    category: "Traveler tips",
    tags: (c) => [c.name, "catering", "FBO"],
    readMinutes: 4,
    sections: (c) => [
      {
        heading: "Catering is arranged, not assumed",
        body: `Tell us dietary needs when you request a ${c.name} trip. FBO and operator catering partners need lead time—especially on peak dates.`,
      },
      {
        heading: "Cost note",
        body: "Catering is often itemized separately from the flight. Ask what is included.",
      },
      { heading: "Add catering to your request", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Can I bring my own food to a ${c.name} private jet?`,
        a: "Often yes for sealed items—confirm with the operator. Hot catering usually goes through approved vendors.",
      },
    ],
  },
  {
    id: "baggage-and-golf",
    keyword: "private jet baggage {city}",
    intent: "ops",
    title: (c) => `Private jet baggage limits from ${c.name} (including golf and skis)`,
    description: (c) =>
      `Bags, golf clubs, and skis on private jets from ${c.name}—payload reality for light vs midsize cabins.`,
    category: "Traveler tips",
    tags: (c) => [c.name, "baggage", "golf clubs", "skis"],
    readMinutes: 5,
    sections: (c) => [
      {
        heading: "Declare oversized items early",
        body: `Light jets serving ${c.name} have limited baggage volume. Golf, skis, and multiple large suitcases may push you to midsize.`,
      },
      {
        heading: "Payload vs range",
        body: "Hot days and long legs reduce useful load. Accurate bag counts protect the trip.",
      },
      { heading: "Send bag details with your quote", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `How many bags per passenger from ${c.name}?`,
        a: "It depends on aircraft. Share counts and oversized items; we match cabin class accordingly.",
      },
    ],
  },
  {
    id: "wifi-and-connectivity",
    keyword: "private jet wifi {city}",
    intent: "ops",
    title: (c) => `Private jet Wi-Fi from ${c.name}: what to request`,
    description: (c) =>
      `In-flight Wi-Fi on ${c.name} private charters—availability by aircraft, and how to require connectivity on your quote.`,
    category: "Traveler tips",
    tags: (c) => [c.name, "Wi-Fi", "connectivity"],
    readMinutes: 4,
    sections: (c) => [
      {
        heading: "Not every tail has the same Wi-Fi",
        body: `If you need connectivity for a ${c.name} departure, say so up front so we only return aircraft with suitable systems.`,
      },
      {
        heading: "Business travelers",
        body: "Same-day deal teams should treat Wi-Fi as a hard requirement when it is mission-critical.",
      },
      { heading: "Require Wi-Fi on your quote", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Is Wi-Fi guaranteed on all ${c.name} charters?`,
        a: "No. It is aircraft-specific. We filter for it when you request it.",
      },
    ],
  },
  {
    id: "night-flights",
    keyword: "night private jet {city}",
    intent: "ops",
    title: (c) => `Night private jet flights from ${c.name}`,
    description: (c) =>
      `Evening and night private jet departures from ${c.name}—curfews, crew duty, and limo timing.`,
    category: "Operations",
    tags: (c) => [c.name, "night flight", "curfew"],
    readMinutes: 5,
    sections: (c) => [
      {
        heading: "Night ops are common—still plan duty limits",
        body: `Many ${c.name} trips launch after business hours. Crew duty days and destination airport hours still constrain the plan.`,
      },
      {
        heading: "Ground at night",
        body: "Limo coordination matters more after dark—share exact addresses.",
      },
      { heading: "Request an evening departure", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Are there curfews at ${c.name} private airports?`,
        a: `Some fields and nearby communities have noise or hour restrictions. We confirm against ${airportsList(c)} for your date.`,
      },
    ],
  },
  {
    id: "weather-and-delays",
    keyword: "private jet weather delays {city}",
    intent: "ops",
    title: (c) => `${c.name} private jet weather, delays, and contingencies`,
    description: (c) =>
      `How weather affects private jets in ${c.name}—alternates among ${airportsList(c)}, and how JetAeris communicates delays.`,
    category: "Operations",
    tags: (c) => [c.name, "weather", "delays"],
    readMinutes: 5,
    sections: (c) => [
      {
        heading: "Private is flexible—not immune",
        body: `Weather can delay any flight. ${c.name}'s advantage is alternate FBOs (${airportsList(c)}) and timing flexibility when the itinerary allows.`,
      },
      {
        heading: "Seasonal weather notes",
        body: c.peakSeasons.map((p) => `${p.heading}: ${p.body}`).join(" "),
      },
      { heading: "Build a weather-aware plan", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `If ${c.name} is down, can we use another airport?`,
        a: "Often yes—share alternate tolerance when you quote so we pre-think backups.",
      },
    ],
  },
  {
    id: "group-charter",
    keyword: "group private jet {city}",
    intent: "traveler",
    title: (c) => `Group private jet charter from ${c.name}`,
    description: (c) =>
      `Group and party private jet travel from ${c.name}—seat counts, baggage, and when to step up cabin class.`,
    category: "Leisure travel",
    tags: (c) => [c.name, "group charter", "party travel"],
    readMinutes: 5,
    sections: (c) => [
      {
        heading: "Count seats and bags together",
        body: `A group of six from ${c.name} with golf bags is a different aircraft than six soft-duffel travelers.`,
      },
      {
        heading: "Events and weekends",
        body: "Group demand spikes around events—request early.",
      },
      { heading: "Quote a group trip", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `What is the maximum group size from ${c.name}?`,
        a: "It depends on aircraft. Share headcount; we may recommend large-cabin or dual-aircraft solutions for bigger parties.",
      },
    ],
  },
  {
    id: "multi-city",
    keyword: "multi city private jet {city}",
    intent: "traveler",
    title: (c) => `Multi-city private jet itineraries from ${c.name}`,
    description: (c) =>
      `Build a multi-city private jet trip starting in ${c.name}—stops, duty time, and quote structure.`,
    category: "Business travel",
    tags: (c) => [c.name, "multi-city", "itinerary"],
    readMinutes: 6,
    sections: (c) => [
      {
        heading: "One aircraft, several stops",
        body: `From ${c.name}, multi-city days are a core corporate use case. Send the full stop list with meeting times.`,
      },
      {
        heading: "Duty and overnight",
        body: "Crew duty limits may require overnight or a second crew—transparent quotes show that early.",
      },
      { heading: "Design the itinerary", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Can I add a stop after quoting from ${c.name}?`,
        a: "Yes, but it can change aircraft and price. Tell us as soon as the plan shifts.",
      },
    ],
  },
  {
    id: "quote-checklist",
    keyword: "private jet quote {city}",
    intent: "how-to",
    title: (c) => `${c.name} private jet quote checklist (what to send)`,
    description: (c) =>
      `What to include in a ${c.name} private jet quote request so JetAeris can return accurate options fast.`,
    category: "How to charter",
    tags: (c) => [c.name, "quote", "checklist"],
    readMinutes: 4,
    relatedHref: () => "/quote",
    relatedLabel: () => "Quote form",
    sections: (c) => [
      {
        heading: "Minimum viable quote request",
        body: "Date/window, origin, destination, passengers, bags/pets, and contact.",
        bullets: [
          `Preferred airports: ${airportsList(c)}`,
          "Hard arrival time if any",
          "One-way vs round-trip",
          "Wi-Fi / catering needs",
          "Ground address for limo",
        ],
      },
      {
        heading: "Why detail speeds pricing",
        body: `Wrong airport choice among ${airportsList(c)} wastes a full quote cycle.`,
      },
      { heading: "Submit your checklist", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `How fast will I hear back on a ${c.name} quote?`,
        a: site.responsePromise,
      },
    ],
  },
  {
    id: "bookings-open-2027",
    keyword: "private jet booking {city} 2027",
    intent: "product",
    title: (c) => `${c.name} private jet bookings open ${site.bookingOpensLabel}`,
    description: (c) =>
      `JetAeris takes ${c.name} private jet quotes now; confirmed bookings begin ${site.bookingOpensLabel}. How the timeline works.`,
    category: "Company",
    tags: (c) => [c.name, "bookings", site.bookingOpensLabel],
    readMinutes: 4,
    sections: (c) => [
      {
        heading: "Quotes now, confirmations later",
        body: site.bookingOpensTagline,
      },
      {
        heading: `Why request a ${c.name} quote early`,
        body: "Peak dates and preferred aircraft get planned before the confirmation window. Early requests help us map operator options.",
      },
      {
        heading: "What you receive before April 2027",
        body: "Trip options, assumptions, and a clear path to confirmation when bookings open.",
      },
      { heading: "Request today", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Can I fly before ${site.bookingOpensLabel} with JetAeris?`,
        a: `Confirmed bookings begin ${site.bookingOpensLabel}. Request quotes now so options are ready for confirmation.`,
      },
    ],
  },
  {
    id: "broker-vs-operator",
    keyword: "private jet broker {city}",
    intent: "compare",
    title: (c) => `Private jet broker in ${c.name}: how JetAeris works`,
    description: (c) =>
      `What a private jet broker does in ${c.name} vs the Part 135 operator—JetAeris disclosure and quote process.`,
    category: "Company",
    tags: (c) => [c.name, "broker", "charter broker"],
    readMinutes: 5,
    relatedHref: () => "/broker-disclosure",
    relatedLabel: () => "Broker disclosure",
    sections: (c) => [
      {
        heading: "Honest broker positioning",
        body: `${site.role} For ${c.name} trips we source and compare operator options, then arrange the selected itinerary.`,
      },
      {
        heading: "Why travelers use a broker",
        body: "One desk across multiple operators, airport advice, and ground coordination—without pretending we own a fleet we do not operate.",
      },
      { heading: "Work with the desk", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Does JetAeris own jets in ${c.name}?`,
        a: "We arrange flights on vetted Part 135 carriers. Ownership claims belong only to the operating company on your itinerary.",
      },
    ],
  },
  {
    id: "near-me-neighborhoods",
    keyword: "private jet near me {city}",
    intent: "airport",
    title: (c) => `Private jet near ${c.name}: neighborhoods and closest FBOs`,
    description: (c) =>
      `Private jet access near ${c.neighborhoods.join(", ")}—which ${c.name} FBO fits your address.`,
    category: "Airports",
    tags: (c) => [c.name, "near me", ...c.neighborhoods.slice(0, 3)],
    readMinutes: 6,
    sections: (c) => [
      {
        heading: "“Near me” means ground time",
        body: `Searchers saying private jet near me in ${c.name} usually need the closest smart FBO to ${c.neighborhoods.join(", ")}.`,
      },
      {
        heading: "Match neighborhood to airport",
        body: c.airports.map((a) => `${a.code}: ${a.bestFor}. ${a.ground}`).join(" "),
      },
      { heading: "Send your address", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Which FBO is closest to central ${c.name}?`,
        a: `It depends on the exact pin. Common fields are ${airportsList(c)}—share your address for a recommendation.`,
      },
    ],
  },
  {
    id: "international-connections",
    keyword: "international private jet {city}",
    intent: "ops",
    title: (c) => `International private jet connections via ${c.name}`,
    description: (c) =>
      `Using ${c.name} as a private aviation gateway for international-adjacent itineraries—customs awareness and airport choice.`,
    category: "Operations",
    tags: (c) => [c.name, "international", "customs"],
    readMinutes: 5,
    sections: (c) => [
      {
        heading: "Domestic core, international edges",
        body: `Most JetAeris ${c.name} volume is domestic USA. International legs need extra lead time for permits, customs, and operator approvals.`,
      },
      {
        heading: "Airport implications",
        body: `Some international-capable plans prefer larger fields; pure domestic hops still favor the private-centric FBOs among ${airportsList(c)}.`,
      },
      { heading: "Describe the full itinerary", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Can JetAeris arrange international departures from ${c.name}?`,
        a: "Often yes with enough lead time. Share passports countries and destinations early.",
      },
    ],
  },
  {
    id: "cost-per-seat",
    keyword: "private jet cost per person {city}",
    intent: "cost",
    title: (c) => `Private jet cost per person from ${c.name}`,
    description: (c) =>
      `How to think about private jet cost per seat from ${c.name}—group math vs airline first class.`,
    category: "Pricing",
    tags: (c) => [c.name, "cost per person", "group pricing"],
    readMinutes: 5,
    sections: (c) => [
      {
        heading: "Charter is priced by the aircraft",
        body: `Divide the trip quote by passengers to compare with first class. A midsize one-way near ${c.costBands.midsize} split across six people looks very different than a solo traveler paying the whole bill.`,
      },
      {
        heading: "Use real passenger counts",
        body: "Do not under-count to force a light jet—bags and comfort matter.",
      },
      { heading: "Get a group-aware quote", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Is per-seat charter available from ${c.name}?`,
        a: "JetAeris focuses on whole-aircraft on-demand. Shared/seat products are a different model—ask if you want us to explain the distinction.",
      },
    ],
  },
  {
    id: "faq-hub",
    keyword: "{city} private jet FAQ",
    intent: "faq",
    title: (c) => `${c.name} private jet FAQ: airports, cost, booking, and limo`,
    description: (c) =>
      `Frequently asked questions about private jet charter in ${c.name}, ${c.state}—airports ${airportsList(c)}, pricing, and JetAeris process.`,
    category: "FAQ",
    tags: (c) => [c.name, "FAQ", "private jet"],
    readMinutes: 8,
    sections: (c) => [
      {
        heading: "Quick market context",
        body: c.heroSummary,
      },
      {
        heading: "Cost snapshot",
        body: `Light: ${c.costBands.light}. Midsize: ${c.costBands.midsize}.`,
      },
      {
        heading: "Still need a human answer?",
        body: cta(c),
      },
    ],
    faqs: (c) => [
      ...c.faqs,
      {
        q: `How do I start a ${c.name} trip with JetAeris?`,
        a: `Use the quote form with your dates and passenger count. ${site.bookingOpensTagline}`,
      },
      {
        q: `Which airports serve private jets in ${c.name}?`,
        a: airportsList(c) + ". Share your address so we pick the best field.",
      },
    ],
  },
  {
    id: "latest-market-notes",
    keyword: "{city} private aviation 2026",
    intent: "seasonal",
    title: (c) => `${c.name} private aviation market notes (updated ${site.priceGuidanceUpdated})`,
    description: (c) =>
      `Latest ${c.name} private aviation context for 2026—demand patterns, cost guidance updated ${site.priceGuidanceUpdated}, and booking timeline to ${site.bookingOpensLabel}.`,
    category: "Market notes",
    tags: (c) => [c.name, "2026", "market update"],
    readMinutes: 6,
    sections: (c) => [
      {
        heading: "Where demand sits now",
        body: `${c.marketThesis} Rank context: ${c.rankLabel}.`,
      },
      {
        heading: "Price guidance timestamp",
        body: `Bands last reviewed ${c.costBands.updated}: light ${c.costBands.light}; midsize ${c.costBands.midsize}.`,
      },
      {
        heading: "Booking calendar",
        body: site.bookingOpensTagline,
      },
      { heading: "Talk to the desk", body: cta(c) },
    ],
    faqs: (c) => [
      {
        q: `Is this ${c.name} pricing live inventory?`,
        a: "No—planning guidance only. Request a quote for date-specific options.",
      },
    ],
  },
];

/** Per-city airport deep topics (adds ≥1 per primary airport). */
function airportTopicsFor(city: TopCitySeo): CityTopicDef[] {
  return city.airports.map((a) => ({
    id: `airport-${a.code.toLowerCase()}`,
    keyword: `${a.code} private jet`,
    intent: "airport" as const,
    title: () => `${a.code} private jet charter: ${a.name} FBO guide`,
    description: () =>
      `Private jet flights via ${a.code} (${a.name}) for ${city.name}—best for ${a.bestFor}. Ground tips and JetAeris quotes.`,
    category: "Airports",
    tags: () => [city.name, a.code, a.name, "FBO", "private jet"],
    readMinutes: 6,
    relatedHref: () => `/airports/${a.code.toLowerCase()}`,
    relatedLabel: () => `${a.code} airport page`,
    sections: () => [
      {
        heading: `${a.code} in the ${city.name} private network`,
        body: `${a.notes} Best for: ${a.bestFor}.`,
      },
      {
        heading: "Ground transfer reality",
        body: a.ground,
      },
      {
        heading: "Other airports to compare",
        body: `Also consider ${city.airports
          .filter((x) => x.code !== a.code)
          .map((x) => x.code)
          .join(", ")} depending on your address.`,
      },
      {
        heading: `Fly via ${a.code}`,
        body: cta(city),
      },
    ],
    faqs: () => [
      {
        q: `Is ${a.code} better than other ${city.name} fields?`,
        a: `It depends on your ground address. ${a.bestFor}. Share your pin on the quote form.`,
      },
      {
        q: `Can JetAeris arrange limo to ${a.code}?`,
        a: "Yes—request FBO limo with your flight quote.",
      },
    ],
  }));
}

/** Per-city corridor topics. */
function corridorTopicsFor(city: TopCitySeo): CityTopicDef[] {
  return city.topCorridors.map((r) => ({
    id: `route-${r.slug}`,
    keyword: `${r.label.toLowerCase()} private jet`,
    intent: "corridor" as const,
    title: () => `${r.label} private jet: time, airports, and cost context`,
    description: () =>
      `${r.label} private jet charter—${r.why} Airports, planning cost context from ${city.name}, and JetAeris quotes.`,
    category: "Route costs",
    tags: () => [city.name, r.label, "private jet", "route"],
    readMinutes: 6,
    relatedHref: () => `/routes/${r.slug}`,
    relatedLabel: () => `${r.label} route page`,
    sections: () => [
      {
        heading: `Why ${r.label} matters`,
        body: r.why,
      },
      {
        heading: `${city.name} side airports`,
        body: `Depart or arrive via ${airportsList(city)}. Choose based on ground address.`,
      },
      {
        heading: "Cost context",
        body: `Use planning bands for ${city.name} (${city.costBands.light}; ${city.costBands.midsize}) as a starting point, then open the live route page for corridor-specific estimates when available.`,
      },
      {
        heading: "Request this corridor",
        body: cta(city),
      },
    ],
    faqs: () => [
      {
        q: `How do I get an exact ${r.label} price?`,
        a: "Send your date and passenger count on the quote form or from the route page prefill.",
      },
    ],
  }));
}

/** Extra high-intent keyword topics unique enough per city. */
function extraKeywordTopics(city: TopCitySeo): CityTopicDef[] {
  const extras: CityTopicDef[] = [
    {
      id: "charter-flights",
      keyword: `${city.name.toLowerCase()} charter flights`,
      intent: "hub",
      title: () => `${city.name} charter flights: private aviation options`,
      description: () =>
        `${city.name} charter flights arranged via JetAeris—on-demand private jets, empty legs, and FBO limo. Bookings from ${site.bookingOpensLabel}.`,
      category: "City guides",
      tags: () => [city.name, "charter flights", "private aviation"],
      readMinutes: 6,
      sections: () => [
        {
          heading: `${city.name} charter flights overview`,
          body: city.heroSummary,
        },
        {
          heading: "Airports",
          body: `Primary private-capable fields: ${airportsList(city)}.`,
        },
        {
          heading: "Popular routes",
          body: corridorNames(city),
        },
        { heading: "Request charter options", body: cta(city) },
      ],
      faqs: () => city.faqs.slice(0, 2),
    },
    {
      id: "business-jet",
      keyword: `business jet ${city.name.toLowerCase()}`,
      intent: "traveler",
      title: () => `Business jet charter in ${city.name}`,
      description: () =>
        `Business jet travel in ${city.name}—executive itineraries, FBOs ${airportsList(city)}, and JetAeris brokerage.`,
      category: "Business travel",
      tags: () => [city.name, "business jet", "executive"],
      readMinutes: 5,
      sections: () => [
        {
          heading: "Business aviation footprint",
          body: city.marketThesis,
        },
        {
          heading: "Traveler profiles",
          body: city.travelerProfiles.join(" "),
        },
        { heading: "Open a business request", body: cta(city) },
      ],
      faqs: () => [
        {
          q: `Can I bill a company for ${city.name} business jet travel?`,
          a: "Yes—include billing entity details on your quote request.",
        },
      ],
    },
    {
      id: "luxury-charter-honest",
      keyword: `luxury private jet ${city.name.toLowerCase()}`,
      intent: "compare",
      title: () => `Luxury private jet ${city.name}: comfort without the hype`,
      description: () =>
        `Luxury private jet travel from ${city.name}—cabin comfort, service, and honest pricing without fake fleet claims.`,
      category: "Leisure travel",
      tags: () => [city.name, "luxury", "private jet"],
      readMinutes: 5,
      sections: () => [
        {
          heading: "Luxury is execution, not adjectives",
          body: `In ${city.name}, luxury means the right FBO, on-time crew, suitable cabin, and seamless limo—not stock photos of jets we do not operate.`,
        },
        {
          heading: "What we optimize",
          body: "Aircraft fit, ground time, catering when requested, and clear assumptions on price.",
        },
        { heading: "Request a refined option", body: cta(city) },
      ],
      faqs: () => [
        {
          q: `Do you guarantee a specific luxury tail in ${city.name}?`,
          a: "Specific tails are confirmed when the operating carrier assigns them. We quote class and representative types first.",
        },
      ],
    },
    {
      id: "executive-assistant-guide",
      keyword: `book private jet for executive ${city.name.toLowerCase()}`,
      intent: "how-to",
      title: () => `Executive assistant guide: booking private jets from ${city.name}`,
      description: () =>
        `EA playbook for ${city.name} private jets—manifest, timing, bill-to, and quote checklist.`,
      category: "Business travel",
      tags: () => [city.name, "executive assistant", "booking"],
      readMinutes: 6,
      sections: () => [
        {
          heading: "Send once, completely",
          body: "Passenger legal names, DOB if required by operator, bill-to, hard times, bags, pets, Wi-Fi, catering, and ground addresses.",
        },
        {
          heading: "Airport preference",
          body: `Default shortlist: ${airportsList(city)}.`,
        },
        { heading: "Submit for your principal", body: cta(city) },
      ],
      faqs: () => [
        {
          q: `Can multiple EAs be copied on ${city.name} quotes?`,
          a: "Yes—include all emails on the request.",
        },
      ],
    },
    {
      id: "snowbird-or-seasonal-home",
      keyword: `${city.name.toLowerCase()} seasonal private jet`,
      intent: "seasonal",
      title: () => `Seasonal and second-home private jet travel via ${city.name}`,
      description: () =>
        `Seasonal home and snowbird-style private jet patterns touching ${city.name}—peak windows and round-trip structure.`,
      category: "Leisure travel",
      tags: () => [city.name, "seasonal", "second home"],
      readMinutes: 5,
      sections: () => [
        {
          heading: "Seasonal rhythms",
          body: city.peakSeasons.map((p) => `${p.heading}: ${p.body}`).join(" "),
        },
        {
          heading: "Structure tips",
          body: "Lock outbound peak dates early; keep return flexible when possible for better aircraft.",
        },
        { heading: "Plan the season", body: cta(city) },
      ],
      faqs: () => city.faqs.slice(0, 1),
    },
  ];
  return extras;
}

export function topicsForCity(city: TopCitySeo): CityTopicDef[] {
  const all = [
    ...SHARED_TOPICS,
    ...airportTopicsFor(city),
    ...corridorTopicsFor(city),
    ...extraKeywordTopics(city),
  ];
  // De-dupe by id
  const seen = new Set<string>();
  return all.filter((t) => {
    if (seen.has(t.id)) return false;
    seen.add(t.id);
    return true;
  });
}

export function topicSlug(citySlug: TopCitySlug, topicId: string) {
  if (topicId === "private-jet-charter") {
    return `private-jet-charter-${citySlug}`;
  }
  return `${citySlug}-${topicId}`;
}

export function generateTopCityTopicPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const slug of TOP_CITY_SLUGS) {
    const city = getTopCitySeo(slug);
    if (!city) continue;
    const topics = topicsForCity(city);
    for (const topic of topics) {
      const slugFull = topicSlug(slug, topic.id);
      posts.push({
        slug: slugFull,
        title: topic.title(city),
        description: topic.description(city),
        category: `${city.name} · ${topic.category}`,
        tags: [...topic.tags(city), topic.keyword.replace("{city}", city.name)],
        published: "2026-11-23",
        updated: "2026-11-23",
        readMinutes: topic.readMinutes,
        wave: "city",
        relatedHref: topic.relatedHref?.(city) ?? `/charter/${city.slug}`,
        relatedLabel:
          topic.relatedLabel?.(city) ?? `${city.name} charter hub`,
        sections: topic.sections(city),
        faqs: topic.faqs(city),
      });
    }
  }
  return posts;
}

export function topCityTopicIndex() {
  return TOP_CITY_SLUGS.map((slug) => {
    const city = getTopCitySeo(slug)!;
    const topics = topicsForCity(city);
    return {
      city,
      topics: topics.map((t) => ({
        id: t.id,
        keyword: t.keyword.replace(/\{city\}/gi, city.name),
        slug: topicSlug(slug, t.id),
        title: t.title(city),
        intent: t.intent,
        category: t.category,
      })),
      count: topics.length,
    };
  });
}

export function topicsForCitySlug(slug: string) {
  if (!TOP_CITY_SLUGS.includes(slug as TopCitySlug)) return [];
  const city = getTopCitySeo(slug);
  if (!city) return [];
  return topicsForCity(city).map((t) => ({
    id: t.id,
    keyword: t.keyword.replace(/\{city\}/gi, city.name),
    slug: topicSlug(slug as TopCitySlug, t.id),
    title: t.title(city),
    description: t.description(city),
    intent: t.intent,
    category: t.category,
  }));
}
