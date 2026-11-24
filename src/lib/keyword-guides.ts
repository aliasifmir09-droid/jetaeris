import {
  aircraft,
  airports,
  cities,
  routes,
  type City,
  type Guide,
  type Route,
} from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Keyword guide library for Google crawl visibility.
 *
 * Built to Google Search Central expectations:
 * - People-first answers (helpful content), not keyword-only shells
 * - Unique entity facts per page (airports, prices, block times, neighborhoods)
 * - Distinct intents (not doorway clones that all funnel identically)
 * - Browseable hierarchy via category hubs + related links
 * - FAQs for FAQPage schema; Article metadata on the page template
 *
 * Avoids scaled-content / doorway abuse by varying section structure per intent
 * and grounding every page in real JetAeris content entities.
 */

const UPDATED = site.priceGuidanceUpdated;
const BOOK = site.bookingOpensLabel;

function slugify(parts: string[]) {
  return parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function quoteCta(topic: string) {
  return `Request a JetAeris quote for ${topic}. Quotes are open now; confirmed bookings begin ${BOOK}. We name the operating Part 135 carrier before you confirm—never fake live inventory.`;
}

function cityAirports(city: City) {
  return city.airports.join(", ");
}

function cityCorridors(city: City) {
  const names = city.corridors
    .map((slug) => cities.find((c) => c.slug === slug)?.name)
    .filter(Boolean);
  return names.length ? names.join(", ") : "major USA hubs";
}

/** —— City × search intent (people type these into Google) —— */
function cityGuides(): Guide[] {
  const out: Guide[] = [];

  for (const city of cities) {
    const air = cityAirports(city);
    const corridors = cityCorridors(city);
    const hoods = city.neighborhoods.slice(0, 3).join(", ");

    out.push({
      slug: slugify(["private-jet-charter", city.slug]),
      title: `Private jet charter ${city.name}, ${city.state}`,
      description: `How private jet charter works in ${city.name}—airports ${air}, popular corridors, pricing drivers, and how to request a JetAeris quote.`,
      category: "how-to",
      updated: UPDATED,
      sections: [
        {
          heading: `Private aviation in ${city.name}`,
          body: `${city.blurb} JetAeris arranges on-demand charter and empty legs through vetted Part 135 carriers—not a marketed fleet we pretend to own.`,
        },
        {
          heading: "Airports travelers actually use",
          body: `Common private-aviation fields for ${city.name} include ${air}. The best choice depends on your ground address (${hoods} and nearby), runway needs, and customs requirements—not which commercial terminal is largest.`,
          bullets: city.airports.map(
            (code) =>
              `${code} is a common private-aviation access point for ${city.name}—confirm FBO and hours on the itinerary.`,
          ),
        },
        {
          heading: "Corridors from this market",
          body: `Frequent requests from ${city.name} include trips toward ${corridors}. Share date flexibility if you want empty-leg watches on those pairs.`,
        },
        {
          heading: "What to send for a usable quote",
          body: quoteCta(`${city.name} charter`),
        },
      ],
      faqs: [
        {
          q: `Which airport should I use for private jet charter in ${city.name}?`,
          a: `It depends on drive time and aircraft. Common options are ${air}. Tell the desk your pickup address and we recommend the smarter field.`,
        },
        {
          q: `Does JetAeris operate aircraft in ${city.name}?`,
          a: "No. JetAeris is an air charter broker. Flights are operated by licensed Part 135 direct air carriers named before confirmation.",
        },
      ],
      related: [
        { href: `/charter/${city.slug}`, label: `${city.name} charter hub` },
        { href: `/limo/${city.slug}`, label: `${city.name} FBO limo` },
        { href: "/quote", label: "Request a quote" },
      ],
    });

    out.push({
      slug: slugify(["private-jet-cost", city.slug]),
      title: `Private jet cost in ${city.name}: what drives the quote`,
      description: `Private jet pricing for ${city.name} trips—positioning, peak dates, airport fees, aircraft class, and how to get a date-stamped JetAeris estimate.`,
      category: "cost",
      updated: UPDATED,
      sections: [
        {
          heading: "There is no honest sticker price",
          body: `Searches for “private jet cost ${city.name}” expect ranges and drivers—not a fake instant fare. Your total moves with aircraft category, one-way positioning, overnight fees, peak calendars, and which of ${air} you use.`,
        },
        {
          heading: `What usually raises ${city.name} quotes`,
          body: `Holiday weekends into or out of ${city.name}, constrained FBO slots, last-minute requests, oversized cabins for small parties, and ferry legs when the aircraft is not already nearby.`,
        },
        {
          heading: "How to compare options fairly",
          body: `Ask for light vs midsize assumptions, passenger and bag counts, and whether an empty leg could apply. Pricing guidance on JetAeris pages was reviewed ${UPDATED}; live quotes still replace website bands.`,
        },
        {
          heading: "Next step",
          body: quoteCta(`${city.name} pricing`),
        },
      ],
      faqs: [
        {
          q: `How much is a private jet from ${city.name}?`,
          a: `It depends on destination, aircraft, and dates. Share the trip details for a curated estimate—website bands are planning only.`,
        },
        {
          q: "Can empty legs lower the cost?",
          a: `Sometimes, when an operator is already positioning through ${city.name}. Flexibility on time and exact airport helps.`,
        },
      ],
      related: [
        { href: `/charter/${city.slug}`, label: `${city.name} charter` },
        { href: "/guides/how-much-does-a-private-jet-cost", label: "USA cost guide" },
        { href: "/quote", label: "Request a quote" },
      ],
    });

    out.push({
      slug: slugify(["empty-leg", city.slug]),
      title: `Empty leg flights to or from ${city.name}`,
      description: `What empty legs mean for ${city.name} travelers—tradeoffs, airports ${air}, and how JetAeris watches corridors without fake inventory.`,
      category: "empty-legs",
      updated: UPDATED,
      sections: [
        {
          heading: "Positioning flights, not scheduled deals",
          body: `An empty leg is an aircraft that must move with or without passengers—often after a one-way charter. Discounts appear when your ${city.name} timing matches operator needs.`,
        },
        {
          heading: `${city.name} empty-leg realities`,
          body: `Holds are short, times can slip, and the airport may be one of ${air} rather than your first choice. Empty legs reward flexible travelers—not rigid board meetings.`,
        },
        {
          heading: "How JetAeris handles them",
          body: `We confirm status with the operating carrier before you plan around a listing. Expired or speculative legs are not sold as locked inventory.`,
        },
        {
          heading: "Ask for a watch",
          body: quoteCta(`empty legs near ${city.name}`),
        },
      ],
      faqs: [
        {
          q: `Are empty legs always available in ${city.name}?`,
          a: "No. They appear when operators need to reposition. Ask us to watch your city pair and flexibility window.",
        },
      ],
      related: [
        { href: "/empty-legs", label: "Empty legs board" },
        { href: `/charter/${city.slug}`, label: `${city.name} hub` },
        { href: "/guides/empty-leg-flights-explained", label: "Empty legs explained" },
      ],
    });

    out.push({
      slug: slugify(["private-jet-airports", city.slug]),
      title: `Best private jet airports for ${city.name}`,
      description: `Compare ${air} for private jet access to ${city.name}—drive time, typical use cases, and how JetAeris helps pick the field.`,
      category: "airports",
      updated: UPDATED,
      sections: [
        {
          heading: `FBO choice in ${city.name}`,
          body: `${city.name} travelers usually choose among ${air}. Secondary fields often beat the main commercial airport for private aviation speed—when runway and customs allow.`,
        },
        {
          heading: "Match airport to ground plan",
          body: `Neighborhoods like ${hoods} change which field wins on door-to-door time. Event days and rush hours matter more than block time alone.`,
        },
        {
          heading: "International and special ops",
          body: "Customs, landing rights, and handler arrangements must be confirmed on the itinerary—never assumed from a marketing page.",
        },
        {
          heading: "Plan the trip",
          body: quoteCta(`${city.name} airport selection`),
        },
      ],
      faqs: [
        {
          q: `Is the biggest ${city.name} airport always best for private jets?`,
          a: `Not usually. Many clients prefer executive fields among ${air} for faster FBO turns when the mission allows.`,
        },
      ],
      related: city.airports.slice(0, 3).map((code) => ({
        href: `/airports/${code.toLowerCase()}`,
        label: `${code} airport guide`,
      })),
    });

    out.push({
      slug: slugify(["how-to-charter-private-jet", city.slug]),
      title: `How to charter a private jet in ${city.name}`,
      description: `Step-by-step private jet charter from ${city.name}: trip details, airports ${air}, comparing options, and confirming with JetAeris.`,
      category: "how-to",
      updated: UPDATED,
      sections: [
        {
          heading: "1 · Define the mission",
          body: `Origin (or ${city.name} as either end), destination, date/time window, passengers, bags, pets, and must-haves like Wi-Fi or catering.`,
        },
        {
          heading: "2 · Pick the smarter field",
          body: `Choose among ${air} based on ground access to ${hoods}. We can add limo timed to the FBO.`,
        },
        {
          heading: "3 · Compare, then confirm",
          body: `Review aircraft class, timing, and the named Part 135 operator. Payment and passenger details lock the trip with the carrier partner.`,
        },
        {
          heading: "Start here",
          body: quoteCta(`chartering from ${city.name}`),
        },
      ],
      faqs: [
        {
          q: `How early should I request a ${city.name} charter?`,
          a: "More notice helps on peak dates and constrained airports. Last-minute trips are possible when aircraft are available—but options narrow.",
        },
      ],
      related: [
        { href: "/guides/how-to-charter-a-private-jet", label: "USA how-to guide" },
        { href: `/charter/${city.slug}`, label: `${city.name} charter` },
        { href: "/quote", label: "Quote form" },
      ],
    });

    out.push({
      slug: slugify(["corporate-private-jet", city.slug]),
      title: `Corporate private jet charter in ${city.name}`,
      description: `Executive and team charter in ${city.name}—multi-city days, confidentiality, airports ${air}, and broker transparency with JetAeris.`,
      category: "traveler",
      updated: UPDATED,
      sections: [
        {
          heading: "When companies choose charter",
          body: `Teams use ${city.name} charter when commercial connections risk a missed meeting, when two cities in one day matter, or when confidentiality is required.`,
        },
        {
          heading: "Cabin as a workroom",
          body: "Midsize and larger cabins support working groups with bags and materials. Declare headcount and luggage early so we do not under-cabin the trip.",
        },
        {
          heading: "Ground continuity",
          body: `Sprinters or SUVs at ${air} keep the team moving as one unit from office to aircraft door.`,
        },
        {
          heading: "Request options",
          body: quoteCta(`${city.name} corporate charter`),
        },
      ],
      faqs: [
        {
          q: "Can invoices support company travel policy?",
          a: "Yes—note billing entity and documentation needs on the quote request so the desk aligns confirmation paperwork.",
        },
      ],
      related: [
        { href: `/charter/${city.slug}`, label: `${city.name} hub` },
        { href: "/safety", label: "Safety & carriers" },
        { href: "/quote", label: "Request a quote" },
      ],
    });

    out.push({
      slug: slugify(["private-jet-with-pets", city.slug]),
      title: `Private jet with pets from ${city.name}`,
      description: `Flying pets on private jets via ${city.name}—cabin policies, airports ${air}, and what to declare on a JetAeris quote.`,
      category: "traveler",
      updated: UPDATED,
      sections: [
        {
          heading: "Pets are trip details—not assumptions",
          body: `Operators and aircraft differ on in-cabin pets. Declare breed, weight, crate needs, and which of ${air} you prefer when you request ${city.name} service.`,
        },
        {
          heading: "Ground and FBO",
          body: "Relief stops, temperature, and handler rules vary. We coordinate honest constraints before you travel—not after you arrive at the ramp.",
        },
        {
          heading: "International notes",
          body: "Health certificates and destination rules can block a trip. International pet legs need extra lead time.",
        },
        {
          heading: "Include pets on the quote",
          body: quoteCta(`pet travel from ${city.name}`),
        },
      ],
      faqs: [
        {
          q: `Can my dog fly in-cabin from ${city.name}?`,
          a: "Often yes on suitable aircraft when declared early—but it is operator- and aircraft-specific. Never assume airline-style pet rules.",
        },
      ],
      related: [
        { href: "/guides/private-jet-with-pets", label: "USA pets guide" },
        { href: `/charter/${city.slug}`, label: `${city.name} charter` },
      ],
    });

    out.push({
      slug: slugify(["last-minute-private-jet", city.slug]),
      title: `Last-minute private jet from ${city.name}`,
      description: `Same-day and short-notice charter from ${city.name}—availability realities, airports ${air}, and how JetAeris responds quickly without fake inventory.`,
      category: "how-to",
      updated: UPDATED,
      sections: [
        {
          heading: "Speed without fiction",
          body: `Last-minute ${city.name} charter is possible when aircraft and crew are free—not because a website shows a green “book now” button. We search the network and return real options.`,
        },
        {
          heading: "What helps us move fast",
          body: `Flexible departure windows, willingness among ${air}, passenger passport details ready, and clarity on bags or pets.`,
        },
        {
          heading: "Peak-day caution",
          body: `Events and holidays around ${city.name} shrink supply. Earlier notice still wins on constrained days.`,
        },
        {
          heading: "Send the trip now",
          body: quoteCta(`last-minute ${city.name} charter`),
        },
      ],
      faqs: [
        {
          q: "How fast can you respond?",
          a: site.responsePromise,
        },
      ],
      related: [
        { href: "/quote", label: "Urgent quote" },
        { href: `/charter/${city.slug}`, label: `${city.name} hub` },
      ],
    });

    out.push({
      slug: slugify(["private-jet-vs-first-class", city.slug]),
      title: `Private jet vs first class from ${city.name}`,
      description: `When charter from ${city.name} beats commercial first class—door-to-door time, airports ${air}, group economics, and when airlines still win.`,
      category: "traveler",
      updated: UPDATED,
      sections: [
        {
          heading: "Compare door-to-door, not cabin glamour",
          body: `From ${city.name}, charter often wins when FBOs among ${air} beat terminal lines, when secondary airports sit closer to ${hoods}, or when a group shares one aircraft.`,
        },
        {
          heading: "When first class is smarter",
          body: "Solo travelers on dense long-haul airline routes with flexible schedules may still prefer scheduled first class. Charter is a tool—not a status trophy.",
        },
        {
          heading: "Run the numbers on your trip",
          body: quoteCta(`${city.name} charter vs airline`),
        },
      ],
      faqs: [
        {
          q: `Is private always faster from ${city.name}?`,
          a: "Often for security and boarding, but weather and ground traffic still apply. We plan honest door-to-door timing.",
        },
      ],
      related: [
        { href: `/charter/${city.slug}`, label: `${city.name} charter` },
        { href: "/ways-to-fly", label: "Ways to fly" },
      ],
    });

    out.push({
      slug: slugify(["private-jet-fbo-limo", city.slug]),
      title: `Private jet FBO limo in ${city.name}`,
      description: `FBO car service in ${city.name} timed to private jets—sedan, SUV, sprinter options at ${air}, coordinated by JetAeris.`,
      category: "traveler",
      updated: UPDATED,
      sections: [
        {
          heading: "Ground is part of the flight",
          body: `Meet-and-greet at ${air} should match wheels-down—not a generic terminal curb. Popular drop-offs include ${hoods}.`,
        },
        {
          heading: "Vehicle fit",
          body: "Sedan for discreet pairs, SUV for luggage, sprinter for teams, stretch for events. Child seats and extra stops can be noted on the request.",
        },
        {
          heading: "Bundle with charter",
          body: quoteCta(`${city.name} flight + limo`),
        },
      ],
      faqs: [
        {
          q: `Can I book only ground in ${city.name}?`,
          a: "Yes—submit a request noting ground-only. Most clients bundle limo with charter for tighter timing.",
        },
      ],
      related: [
        { href: `/limo/${city.slug}`, label: `${city.name} limo page` },
        { href: "/guides/private-jet-limo-transfer", label: "Limo transfer guide" },
      ],
    });
  }

  return out;
}

/** —— Route × intent (corridor searches) —— */
function routeGuides(): Guide[] {
  const out: Guide[] = [];

  for (const route of routes) {
    out.push({
      slug: slugify([route.slug, "private-jet-flight-time"]),
      title: `${route.from} to ${route.to} private jet flight time`,
      description: `Typical private jet block time ${route.from}–${route.to}: ${route.blockTime}. Airports ${route.airports}, distance ${route.distanceNm}, and what changes timing.`,
      category: "routes",
      updated: UPDATED,
      sections: [
        {
          heading: "Block time vs door-to-door",
          body: `Planning block for ${route.from}–${route.to} is about ${route.blockTime} over roughly ${route.distanceNm}. Door-to-door adds FBO arrival buffers and ground transfers—often still faster than airline connections.`,
        },
        {
          heading: "Airports on this corridor",
          body: `Common pairings: ${route.airports}. ${route.seasonalNotes}`,
        },
        {
          heading: "Aircraft fit",
          body: route.bestFit,
        },
        {
          heading: "Get timing options",
          body: quoteCta(`${route.from} to ${route.to}`),
        },
      ],
      faqs: [
        {
          q: `How long is a private jet from ${route.from} to ${route.to}?`,
          a: `About ${route.blockTime} in the air for typical routings, before ground time. Winds and ATC can move the number.`,
        },
      ],
      related: [
        { href: `/routes/${route.slug}`, label: `${route.from}–${route.to} route` },
        {
          href: `/guides/private-jet-cost-${route.slug}`,
          label: "Cost guide",
        },
      ],
    });

    out.push({
      slug: slugify([route.slug, "private-jet-airports"]),
      title: `${route.from} to ${route.to} private jet airports`,
      description: `Airport choices for ${route.from}–${route.to} private jets: ${route.airports}. How JetAeris helps pick fields for drive time and runway fit.`,
      category: "airports",
      updated: UPDATED,
      sections: [
        {
          heading: "Pair the right fields",
          body: `${route.summary} Typical airport string: ${route.airports}.`,
        },
        {
          heading: "Why the “big” airport is not always best",
          body: "Executive fields often cut ground time. Runway length, customs, and aircraft performance still govern what is legal and comfortable.",
        },
        {
          heading: "Price factors on this pair",
          body: route.priceFactors.slice(0, 4).join(" "),
        },
        {
          heading: "Confirm airports on the quote",
          body: quoteCta(`${route.from}–${route.to} airports`),
        },
      ],
      faqs: [
        {
          q: `Which airports for ${route.from} to ${route.to}?`,
          a: `Common private pairings include ${route.airports}. Share ground addresses so we optimize both ends.`,
        },
      ],
      related: [
        { href: `/routes/${route.slug}`, label: "Full route page" },
        { href: `/charter/${route.fromSlug}`, label: `${route.from} charter` },
        { href: `/charter/${route.toSlug}`, label: `${route.to} charter` },
      ],
    });

    out.push({
      slug: slugify(["empty-leg", route.slug]),
      title: `Empty leg ${route.from} to ${route.to}`,
      description: `Empty-leg possibilities on ${route.from}–${route.to}: when discounts appear, tradeoffs, airports ${route.airports}, and how JetAeris confirms status.`,
      category: "empty-legs",
      updated: UPDATED,
      sections: [
        {
          heading: "Only when positioning matches",
          body: `Empty legs on ${route.from}–${route.to} appear when an operator must move an aircraft on or near this corridor. They are not a guaranteed daily product.`,
        },
        {
          heading: "Tradeoffs",
          body: "Less schedule control, short holds, and possible airport substitutions. Ideal when your dates flex.",
        },
        {
          heading: "Indicative one-way bands (planning)",
          body: `Light jet about ${route.priceEstimate.light}; midsize about ${route.priceEstimate.midsize}. ${route.priceEstimate.assumptions} Updated ${route.priceEstimate.updated}. Empty legs can price below these bands when available.`,
        },
        {
          heading: "Ask us to watch this pair",
          body: quoteCta(`empty leg ${route.from}–${route.to}`),
        },
      ],
      faqs: [
        {
          q: `Is there an empty leg from ${route.from} to ${route.to} today?`,
          a: "Listings change constantly. Request a watch—we confirm with the operator before you rely on any leg.",
        },
      ],
      related: [
        { href: "/empty-legs", label: "Empty legs board" },
        { href: `/routes/${route.slug}`, label: "Route details" },
      ],
    });

    out.push({
      slug: slugify([route.slug, "private-jet-charter"]),
      title: `${route.from} to ${route.to} private jet charter`,
      description: `Charter a private jet ${route.from}–${route.to}: block ${route.blockTime}, airports ${route.airports}, aircraft fit, and JetAeris quote path.`,
      category: "routes",
      updated: UPDATED,
      sections: [
        {
          heading: "Corridor snapshot",
          body: route.summary,
        },
        {
          heading: "Timing and distance",
          body: `About ${route.distanceNm} with typical block ${route.blockTime}. ${route.seasonalNotes}`,
        },
        {
          heading: "Aircraft",
          body: route.bestFit,
        },
        {
          heading: "Indicative pricing context",
          body: `Light ${route.priceEstimate.light}; midsize ${route.priceEstimate.midsize}. ${route.priceEstimate.assumptions}`,
          bullets: route.priceFactors.slice(0, 4),
        },
        {
          heading: "Request this trip",
          body: quoteCta(`${route.from} to ${route.to} charter`),
        },
      ],
      faqs: route.faqs.slice(0, 2),
      related: [
        { href: `/routes/${route.slug}`, label: "Full route guide" },
        {
          href: `/guides/private-jet-cost-${route.slug}`,
          label: "Cost deep-dive",
        },
        { href: "/quote", label: "Quote" },
      ],
    });
  }

  return out;
}

/** —— Airport keyword pages —— */
function airportGuides(): Guide[] {
  return airports.flatMap((ap) => {
    const code = ap.code;
    const low = code.toLowerCase();
    return [
      {
        slug: slugify(["private-jet", low]),
        title: `Private jet charter at ${ap.name} (${code})`,
        description: `Private jet access via ${ap.name} (${code}) for ${ap.cityName}—FBO planning notes, alternatives, and JetAeris quote coordination.`,
        category: "airports" as const,
        updated: UPDATED,
        sections: [
          {
            heading: `${code} for private aviation`,
            body: ap.note,
          },
          {
            heading: "Operational details to verify",
            body: ap.details[0] ?? `Confirm FBO, hours, and fees for ${code} on your itinerary.`,
          },
          {
            heading: "Nearby alternatives",
            body: ap.details[1] ?? `Ask the desk about alternate fields near ${ap.cityName} if ${code} is constrained.`,
          },
          {
            heading: "Arrange the flight",
            body: quoteCta(`charter via ${code}`),
          },
        ],
        faqs: [
          {
            q: `Can I charter a private jet from ${code}?`,
            a: `Yes—JetAeris can request Part 135 options using ${ap.name} (${code}) when the aircraft and mission fit. Confirm FBO details on the itinerary.`,
          },
        ],
        related: [
          { href: `/airports/${low}`, label: `${code} airport page` },
          { href: `/charter/${ap.citySlug}`, label: `${ap.cityName} charter` },
          { href: "/quote", label: "Request a quote" },
        ],
      },
      {
        slug: slugify(["fbo", low, "private-jet"]),
        title: `FBO private jet service at ${code}`,
        description: `Using FBOs at ${ap.name} (${code}) for private jets—ramp realities, ground transfer, and JetAeris coordination for ${ap.cityName}.`,
        category: "airports" as const,
        updated: UPDATED,
        sections: [
          {
            heading: "FBO is not the airline terminal",
            body: `At ${ap.name}, private clients typically use an FBO for check-in, security posture, and ramp access. Exact provider depends on the operating carrier and day of travel.`,
          },
          {
            heading: "Ground transfer",
            body: ap.details[2] ?? `Limo or black car can be timed to ${code} arrival or departure.`,
          },
          {
            heading: "What we confirm",
            body: "Operating hours, handling, and any prior-permission requirements are verified for your aircraft—not copied blindly from a static webpage.",
          },
          {
            heading: "Add FBO ground to the quote",
            body: quoteCta(`${code} FBO trip`),
          },
        ],
        faqs: [
          {
            q: `Which FBO at ${code}?`,
            a: "The handling FBO is assigned with the operator confirmation. We communicate the meeting point before flight day.",
          },
        ],
        related: [
          { href: `/airports/${low}`, label: `${code} details` },
          { href: `/limo/${ap.citySlug}`, label: `${ap.cityName} limo` },
        ],
      },
    ];
  });
}

/** —— Aircraft class × city —— */
function aircraftCityGuides(): Guide[] {
  const out: Guide[] = [];
  for (const jet of aircraft) {
    for (const city of cities) {
      out.push({
        slug: slugify([jet.slug, "charter", city.slug]),
        title: `${jet.name} charter in ${city.name}`,
        description: `When a ${jet.name.toLowerCase()} fits ${city.name} trips—seats ${jet.seats}, ${jet.range}, airports ${cityAirports(city)}, examples ${jet.examples.slice(0, 2).join(", ")}.`,
        category: "aircraft",
        updated: UPDATED,
        sections: [
          {
            heading: `${jet.name} mission fit`,
            body: `${jet.summary} Best for: ${jet.bestFor}.`,
          },
          {
            heading: `Using ${jet.name.toLowerCase()}s from ${city.name}`,
            body: `From ${city.name} (${cityAirports(city)}), a ${jet.name.toLowerCase()} is considered when passenger count, bags, and stage length match ${jet.range}. Examples operators may offer include ${jet.examples.join(", ")}—representative until a tail is assigned.`,
          },
          {
            heading: "Cabin notes",
            body: jet.details[0] ?? jet.summary,
          },
          {
            heading: "Request this class",
            body: quoteCta(`${jet.name} in ${city.name}`),
          },
        ],
        faqs: [
          {
            q: `Do I need a ${jet.name.toLowerCase()} for every ${city.name} trip?`,
            a: "No. We match class to passengers, bags, and distance. Oversizing wastes budget; undersizing creates a bad day.",
          },
        ],
        related: [
          { href: `/aircraft/${jet.slug}`, label: `${jet.name} class` },
          { href: `/charter/${city.slug}`, label: `${city.name} charter` },
        ],
      });
    }
  }
  return out;
}

/** —— National evergreen keyword guides people search —— */
function nationalGuides(): Guide[] {
  const topics: Array<{
    slug: string;
    title: string;
    description: string;
    category: Guide["category"];
    sections: Guide["sections"];
    faqs: NonNullable<Guide["faqs"]>;
  }> = [
    {
      slug: "private-jet-wifi",
      title: "Private jet Wi-Fi: what to expect on USA charters",
      description:
        "Cabin connectivity on private jets—what to request, what varies by aircraft, and how JetAeris notes Wi-Fi on quotes.",
      category: "traveler",
      sections: [
        {
          heading: "Connectivity is aircraft-specific",
          body: "Some light jets have limited or no Wi-Fi; many midsize and heavy cabins offer Ka- or ATG-based service. Speeds vary—treat marketing claims as subject to confirmation.",
        },
        {
          heading: "How to request it",
          body: "Say whether you need email-only or video calls. We flag Wi-Fi as a hard requirement so options without it are not presented as fits.",
        },
        {
          heading: "Quote path",
          body: quoteCta("Wi-Fi capable charter"),
        },
      ],
      faqs: [
        {
          q: "Is Wi-Fi guaranteed on every private jet?",
          a: "No. Declare it on the quote so we filter aircraft that meet your need.",
        },
      ],
    },
    {
      slug: "private-jet-catering",
      title: "Private jet catering in the USA",
      description:
        "How catering works on Part 135 charters—lead times, FBO delivery, dietary needs, and what to put on a JetAeris request.",
      category: "traveler",
      sections: [
        {
          heading: "Catering is arranged—not assumed",
          body: "Galleys and vendor access differ by aircraft and departure FBO. Simple snacks may be stocked; plated meals need notice.",
        },
        {
          heading: "Tell us constraints early",
          body: "Allergies, kosher/halal, kid meals, and champagne service should be on the first quote note—not the morning of departure.",
        },
        {
          heading: "Add catering to the trip",
          body: quoteCta("charter with catering"),
        },
      ],
      faqs: [
        {
          q: "Is alcohol included?",
          a: "It depends on the operator and aircraft stock. Request what you want explicitly.",
        },
      ],
    },
    {
      slug: "part-135-vs-part-91",
      title: "Part 135 vs Part 91: what charter clients should know",
      description:
        "Plain-English difference between Part 135 charter and Part 91 private flying—and why JetAeris quotes Part 135 carriers for paying passengers.",
      category: "safety",
      sections: [
        {
          heading: "Why the regulation matters",
          body: "Paying passengers on on-demand charter in the USA generally fly under Part 135 rules with a certificated carrier. Part 91 covers many private non-commercial operations.",
        },
        {
          heading: "What JetAeris does",
          body: "We arrange trips on vetted Part 135 direct air carriers and identify the operator before you confirm. We do not sell gray-market flights.",
        },
        {
          heading: "Read more / quote",
          body: quoteCta("Part 135 charter"),
        },
      ],
      faqs: [
        {
          q: "Should I fly Part 91 with a friend who owns a jet?",
          a: "Private arrangements have different rules and risk profiles. For commercial charter brokerage, JetAeris works Part 135.",
        },
      ],
    },
    {
      slug: "private-jet-baggage-limits",
      title: "Private jet baggage: golf clubs, skis, and soft bags",
      description:
        "How baggage works on light vs heavy jets—golf, skis, soft-sided bags, and what to declare so JetAeris sizes the cabin correctly.",
      category: "traveler",
      sections: [
        {
          heading: "Baggage shapes aircraft choice",
          body: "Light jets handle light travel well; skis, multiple hard cases, or production gear can force a larger cabin or a different aircraft.",
        },
        {
          heading: "Declare early",
          body: "List bag count, golf/ski equipment, and any freight-like items on the quote. Surprises at the FBO cause delays or aircraft changes.",
        },
        {
          heading: "Plan the cabin",
          body: quoteCta("charter with baggage details"),
        },
      ],
      faqs: [
        {
          q: "Can I bring golf clubs on a light jet?",
          a: "Often yes in limited numbers—confirm count. Groups with many sets may need midsize or larger.",
        },
      ],
    },
    {
      slug: "private-jet-safety-checklist",
      title: "Private jet safety checklist for USA charter clients",
      description:
        "Practical safety questions before you pay—operator identity, Part 135 status, and how JetAeris reviews carriers.",
      category: "safety",
      sections: [
        {
          heading: "Know who is flying you",
          body: "You should see the operating carrier before funds are committed. Certificate status and trip terms matter more than brochure photography.",
        },
        {
          heading: "Weather and substitutes",
          body: "Honest operators discuss weather holds and substitution rules. Ask before you need them.",
        },
        {
          heading: "Our process",
          body: `JetAeris reviews Part 135 certificate status before presenting options. ${quoteCta("a vetted charter")}`,
        },
      ],
      faqs: [
        {
          q: "Do you own the jets?",
          a: "No. We are a broker arranging flights on certificated carriers.",
        },
      ],
    },
    {
      slug: "one-way-private-jet-pricing",
      title: "One-way private jet pricing explained",
      description:
        "Why one-way charters often include positioning—and how empty legs or round trips change USA private jet quotes.",
      category: "cost",
      sections: [
        {
          heading: "Aircraft live somewhere",
          body: "A one-way passenger trip may require a ferry leg to position the jet. That cost shows up unless an empty leg or nearby aircraft reduces it.",
        },
        {
          heading: "Ways to improve economics",
          body: "Flexible timing, round trips, or empty-leg watches can help. We show assumptions clearly on options.",
        },
        {
          heading: "Get a one-way quote",
          body: quoteCta("one-way charter"),
        },
      ],
      faqs: [
        {
          q: "Is one-way always double a half round-trip?",
          a: "Not exactly—but positioning often makes one-ways price higher than travelers expect from hourly rate math alone.",
        },
      ],
    },
    {
      slug: "private-jet-for-weddings",
      title: "Private jet for weddings and events",
      description:
        "Charter for weddings, galas, and destination events—group size, baggage, timing, and JetAeris coordination tips.",
      category: "traveler",
      sections: [
        {
          heading: "Event logistics first",
          body: "Ceremony times, dress bags, photographer gear, and multi-stop guest lists drive aircraft and ground choices more than brochure cabins.",
        },
        {
          heading: "Arrive with margin",
          body: "Build weather and traffic buffers. We can stage sprinters at both FBOs for wedding parties.",
        },
        {
          heading: "Plan the event trip",
          body: quoteCta("wedding charter"),
        },
      ],
      faqs: [
        {
          q: "Can we fly a full wedding party together?",
          a: "Often with midsize or heavy cabins—or multiple aircraft. Share exact headcount and bags early.",
        },
      ],
    },
    {
      slug: "ski-trip-private-jet",
      title: "Private jet ski trips in the USA",
      description:
        "Charter for ski destinations—mountain airports, ski-bag volume, weather holds, and how JetAeris plans honest options.",
      category: "traveler",
      sections: [
        {
          heading: "Mountain performance matters",
          body: "Altitude, runway length, and weather can limit aircraft. Aspen and similar fields need early, honest performance checks.",
        },
        {
          heading: "Bags and boots",
          body: "Ski bags fill light-jet holds quickly. Declare equipment counts so we size correctly.",
        },
        {
          heading: "Request a ski trip",
          body: quoteCta("ski charter"),
        },
      ],
      faqs: [
        {
          q: "What if the mountain airport closes for weather?",
          a: "Operators may hold, divert, or retime. Ask about contingency airports when you quote.",
        },
      ],
    },
    {
      slug: "private-jet-red-eye",
      title: "Private jet red-eye and overnight flights",
      description:
        "Overnight and early-morning charter considerations—crew duty, quiet FBOs, and when a heavier cabin helps rest.",
      category: "how-to",
      sections: [
        {
          heading: "Crew and duty rules",
          body: "Night departures must fit crew duty and aircraft positioning. Last-minute red-eyes need available crew—not just an empty airframe.",
        },
        {
          heading: "Cabin for sleep",
          body: "Longer cabins with berthing-capable layouts help on overnight missions. Say if sleep matters more than speed.",
        },
        {
          heading: "Quote a night departure",
          body: quoteCta("overnight charter"),
        },
      ],
      faqs: [
        {
          q: "Are red-eye private jets quieter at FBOs?",
          a: "Usually yes versus airline terminals, but local noise rules and hours still apply—verified per airport.",
        },
      ],
    },
    {
      slug: "private-jet-multi-city",
      title: "Multi-city private jet itineraries",
      description:
        "How multi-city charter days work—routing, wait time, aircraft fit, and how to brief JetAeris for complex USA trips.",
      category: "how-to",
      sections: [
        {
          heading: "One aircraft, several stops",
          body: "Multi-city days are a core private-aviation advantage. Share all stops, meeting times, and whether the aircraft should wait or release.",
        },
        {
          heading: "Cost drivers",
          body: "Wait time, extra landings, and overnight fees add up. A clear itinerary prevents under-quoting.",
        },
        {
          heading: "Build the itinerary",
          body: quoteCta("multi-city charter"),
        },
      ],
      faqs: [
        {
          q: "Can we change the middle stop later?",
          a: "Often with notice—subject to crew, slots, and aircraft performance. Flag uncertainty early.",
        },
      ],
    },
  ];

  return topics.map((t) => ({
    ...t,
    updated: UPDATED,
    related: [
      { href: "/guides", label: "All guides" },
      { href: "/quote", label: "Request a quote" },
      { href: "/safety", label: "Safety" },
    ],
  }));
}

function dedupeBySlug(guides: Guide[]): Guide[] {
  const seen = new Set<string>();
  const out: Guide[] = [];
  for (const g of guides) {
    if (seen.has(g.slug)) continue;
    seen.add(g.slug);
    out.push(g);
  }
  return out;
}

/** Generated keyword guides (merged into `guides` after hand-written ones). */
export function generateKeywordGuides(existingSlugs: Set<string>): Guide[] {
  const generated = dedupeBySlug([
    ...cityGuides(),
    ...routeGuides(),
    ...airportGuides(),
    ...aircraftCityGuides(),
    ...nationalGuides(),
  ]).map((g) => ({ ...g, scaled: true as const }));
  return generated.filter((g) => !existingSlugs.has(g.slug));
}

export const GUIDE_CATEGORIES = [
  { id: "cost", label: "Cost & pricing", blurb: "What drives USA private jet quotes." },
  { id: "how-to", label: "How to charter", blurb: "Step-by-step trip planning." },
  { id: "empty-legs", label: "Empty legs", blurb: "Positioning flights and tradeoffs." },
  { id: "airports", label: "Airports & FBOs", blurb: "Fields travelers actually use." },
  { id: "aircraft", label: "Aircraft classes", blurb: "Light to heavy by mission." },
  { id: "routes", label: "Routes & corridors", blurb: "City-pair timing and airports." },
  { id: "traveler", label: "Traveler topics", blurb: "Pets, events, corporate, ground." },
  { id: "safety", label: "Safety & rules", blurb: "Part 135 and client checklists." },
] as const;

export type GuideCategoryId = (typeof GUIDE_CATEGORIES)[number]["id"];
