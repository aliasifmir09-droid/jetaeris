import { aircraft, cities, routes, type Aircraft, type City, type Route } from "@/lib/content";
import type { BlogPost } from "@/lib/blog-types";
import { isIndexableBlogPost } from "@/lib/seo-index";
import { site } from "@/lib/site";
import { isTopCity, TOP_CITY_SLUGS } from "@/lib/top-cities-seo";
import { generateTopCityTopicPosts } from "@/lib/top-city-topics";

export type { BlogPost, BlogSection } from "@/lib/blog-types";

const topCityDeepPosts = generateTopCityTopicPosts();
const topCityHubSlugs = new Set(
  TOP_CITY_SLUGS.map((s) => `private-jet-charter-${s}`),
);

const pillarPosts: BlogPost[] = [
  {
    slug: "how-much-does-a-private-jet-cost-usa",
    title: "How much does a private jet cost in the USA in 2026?",
    description:
      "Realistic USA private jet charter cost ranges by aircraft class, what moves the price, and how to request an accurate quote without fake instant fares.",
    category: "Pricing",
    tags: ["private jet cost", "charter pricing", "USA"],
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 8,
    relatedHref: "/quote",
    relatedLabel: "Request a quote",
    sections: [
      {
        heading: "There is no single sticker price",
        body: "Private jet charter in the United States is priced by the trip—not by a published fare table. Operators quote based on aircraft category, positioning, airport fees, overnight requirements, peak dates, and whether a return leg is empty. That is why serious desks give ranges with assumptions, then confirm a number only after the operating carrier locks availability.",
      },
      {
        heading: "Indicative one-way ranges by category (planning only)",
        body: `These are planning bands for weekday, off-peak USA trips with typical passenger loads. They are not live inventory prices. JetAeris last reviewed this guidance on ${site.priceGuidanceUpdated}.`,
        bullets: [
          "Light jet (short regional): often about $8,000–$24,000 one-way depending on distance and positioning",
          "Midsize jet: often about $14,000–$36,000 one-way on common domestic corridors",
          "Super-midsize / heavy (coast-to-coast comfort): frequently $28,000–$75,000+ one-way",
          "Empty legs can price lower when your dates match an operator reposition—but schedules can change",
        ],
      },
      {
        heading: "What usually raises the total",
        body: "One-way trips that require a ferry home, holiday weekends, Aspen/mountain ops, constrained FBOs, de-icing, last-minute requests, pets, oversized bags, and catering upgrades all move the number more than the headline hourly rate.",
      },
      {
        heading: "How to get a real number from JetAeris",
        body: `Share origin, destination, date, passengers, and flexibility. We return curated options with aircraft class, timing, and transparent assumptions. Quotes are open now; confirmed bookings begin ${site.bookingOpensLabel}. We do not show fake instant booking inventory.`,
      },
    ],
    faqs: [
      {
        q: "Is private jet charter cheaper as a round-trip?",
        a: "Often yes, because the operator may avoid an empty reposition. One-ways can still win when an empty leg already matches your direction.",
      },
      {
        q: "Do published hourly rates include everything?",
        a: "Rarely. Airport fees, overnight, catering, ground transfer, and peak premiums are commonly separate. Always ask what is included.",
      },
    ],
  },
  {
    slug: "new-york-to-miami-private-jet-cost",
    title: "New York to Miami private jet cost: airports, time, and estimates",
    description:
      "What a New York–Miami private jet typically costs, which airports (TEB, HPN, OPF, PBI) fit, block time, and how to request a date-stamped quote.",
    category: "Routes",
    tags: ["New York", "Miami", "route cost", "TEB", "OPF"],
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 7,
    relatedHref: "/routes/new-york-miami",
    relatedLabel: "Open NY → Miami route page",
    sections: [
      {
        heading: "Why this corridor ranks in search",
        body: "Travelers type “private jet New York to Miami cost” before they contact a broker. A useful page answers airports, block time, aircraft fit, estimate ranges, and the next step—not luxury adjectives alone.",
      },
      {
        heading: "Airports that usually work",
        body: "New York side: Teterboro (TEB) and Westchester (HPN) are common private-aviation choices; JFK/EWR are possible but often less convenient for pure private ops. Miami side: Opa-locka (OPF) and Palm Beach (PBI) are frequent; MIA can work depending on handling and timing.",
      },
      {
        heading: "Block time and aircraft fit",
        body: "Typical block is about 2 hours 45 minutes depending on winds and routing. Light to midsize jets fit most parties; larger cabins are chosen for groups, luggage, or preference—not because the distance requires them.",
      },
      {
        heading: "Indicative price guidance",
        body: `On our route page we publish date-stamped light- and midsize-jet estimate bands for New York–Miami with clear assumptions. Peak South Florida weeks (holidays, major events) and one-way positioning can move totals materially. See the live ranges on the route page, then request a quote for your date.`,
      },
    ],
    faqs: [
      {
        q: "Is TEB always better than JFK for private jets?",
        a: "Often for convenience, but the best airport depends on your ground address, slot/handling, and the operator’s preference for that day.",
      },
      {
        q: "Can I add a limo at both ends?",
        a: "Yes. JetAeris can bundle FBO limo or black-car timed to wheels-up and wheels-down in New York and Miami.",
      },
    ],
  },
  {
    slug: "empty-leg-flights-usa-explained",
    title: "Empty leg flights in the USA: how they work and when they save money",
    description:
      "A clear explanation of USA empty legs—why they are discounted, the tradeoffs, status risk, and how JetAeris confirms operator availability before you commit.",
    category: "Empty legs",
    tags: ["empty legs", "positioning flights", "savings"],
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 6,
    relatedHref: "/empty-legs",
    relatedLabel: "View empty-leg board",
    sections: [
      {
        heading: "What an empty leg actually is",
        body: "An empty leg (or positioning flight) is an aircraft that must move between cities with or without paying passengers—often after a one-way charter or before the next booked trip. Operators may offer a discount to fill that seat capacity.",
      },
      {
        heading: "The tradeoffs",
        body: "Dates and times are less flexible. Listings can change or cancel when the operator’s schedule changes. Holds are short. Empty legs reward travelers who can decide quickly and accept a confirmed window—not a custom itinerary.",
      },
      {
        heading: "How JetAeris treats empty legs",
        body: "Our public board shows status, windows, and a last-updated stamp. A listing is not a hold. We confirm with the operating carrier before you treat it as locked. Expired legs are not offered as bookable inventory.",
      },
    ],
    faqs: [
      {
        q: "Are empty legs always cheaper?",
        a: "They can be, when your city pair and window match. If you need a fixed time or opposite direction, a standard on-demand quote may be the better path.",
      },
      {
        q: "Can I change the destination?",
        a: "Usually only within limited operator flexibility. Treat the published routing as the baseline until the desk confirms otherwise.",
      },
    ],
  },
  {
    slug: "how-to-charter-a-private-jet-usa",
    title: "How to charter a private jet in the USA (step by step)",
    description:
      "From first inquiry to FBO arrival: what information you need, what a broker confirms, and when the operating carrier is named—without fake instant booking claims.",
    category: "How-to",
    tags: ["how to charter", "Part 135", "broker"],
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 7,
    relatedHref: "/how-it-works",
    relatedLabel: "How JetAeris arranges flights",
    sections: [
      {
        heading: "1. Start with the trip, not the membership pitch",
        body: "Share origin, destination, date, trip type (one-way / round-trip / multi-city), and passenger count. Add bags, pets, and ground-transfer needs when relevant. That is enough for a serious first quote round.",
      },
      {
        heading: "2. Compare options with clear assumptions",
        body: "A credible desk returns aircraft class, timing, price range, and what is included or excluded. Marketing photos may be representative until a specific aircraft is assigned.",
      },
      {
        heading: "3. See the operating carrier before you pay",
        body: "JetAeris is an air charter broker and arranging agent. Flights are operated by licensed Part 135 direct air carriers. The operating carrier is identified before payment or final confirmation.",
      },
      {
        heading: "4. Confirm terms, then travel",
        body: `Cancellation windows, weather rules, and substitution terms follow the provider contract for that trip. Quotes are open now; JetAeris starts taking confirmed bookings from ${site.bookingOpensLabel}.`,
      },
    ],
    faqs: [
      {
        q: "Do I need a jet card or membership?",
        a: "No for on-demand charter with JetAeris. Membership products are not required to request a quote.",
      },
      {
        q: "Who controls the flight?",
        a: "Operational control rests with the licensed direct air carrier named on your itinerary—not with the arranging broker, unless documents expressly say otherwise.",
      },
    ],
  },
  {
    slug: "broker-vs-operator-private-aviation",
    title: "Private jet broker vs operator: what the difference means for you",
    description:
      "Why broker vs Part 135 operator matters for contracts, operational control, cancellations, and who you actually fly with.",
    category: "Safety & trust",
    tags: ["broker", "operator", "Part 135", "disclosure"],
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 6,
    relatedHref: "/broker-disclosure",
    relatedLabel: "Read broker disclosure",
    sections: [
      {
        heading: "Operators fly the aircraft",
        body: "A Part 135 direct air carrier holds the certificate and operational control for the flight. Pilots, maintenance, and dispatch sit with that carrier.",
      },
      {
        heading: "Brokers arrange the trip",
        body: "An air charter broker or arranging agent sources options, coordinates logistics, and helps you compare. JetAeris operates in this role unless an itinerary expressly states otherwise.",
      },
      {
        heading: "Why the distinction protects you",
        body: "You should know who is flying the trip before you pay, how cancellations work, and which entity’s contract governs. Sites that blur this line create legal and trust risk.",
      },
    ],
    faqs: [
      {
        q: "Is JetAeris a Part 135 carrier?",
        a: "JetAeris arranges flights as a broker/agent with vetted Part 135 carriers. See our Safety and Broker Disclosure pages for the full wording.",
      },
    ],
  },
  {
    slug: "private-jet-vs-first-class",
    title: "Private jet vs first class: when charter actually wins",
    description:
      "A practical comparison of private jet charter and commercial first class—door-to-door time, privacy, cost, and when each makes sense.",
    category: "Comparisons",
    tags: ["first class", "comparison", "time savings"],
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 6,
    relatedHref: "/quote",
    relatedLabel: "Compare a charter quote",
    sections: [
      {
        heading: "Door-to-door time is the real metric",
        body: "Commercial first class can be excellent on dense long-haul routes. Private charter often wins when FBOs beat terminal security lines, when you need a secondary airport closer to home or meeting, or when multiple cities in one day matter.",
      },
      {
        heading: "Privacy, schedule control, and group travel",
        body: "Charter helps when you travel with a team, bring unusual luggage, travel with pets, or need departure timing the airline schedule cannot offer.",
      },
      {
        heading: "Cost reality",
        body: "For one passenger on a busy airline route, first class can be cheaper. For a group of four to eight on a short USA hop, charter per-person economics can compete—especially with an empty leg. Always compare the full door-to-door plan, not cabin glamour alone.",
      },
    ],
    faqs: [
      {
        q: "Is private always faster?",
        a: "Not always. Weather, airport choice, and ground transfer still matter. Charter shines when the commercial itinerary forces long connections or distant airports.",
      },
    ],
  },
  {
    slug: "teterboro-teb-private-jet-guide",
    title: "Teterboro (TEB) private jet guide: why NY travelers use it",
    description:
      "What to know about Teterboro Airport for private aviation—access, FBOs, ground transfer, and how TEB fits New York charter planning.",
    category: "Airports",
    tags: ["TEB", "Teterboro", "New York", "FBO"],
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 5,
    relatedHref: "/airports",
    relatedLabel: "Airports / FBOs",
    sections: [
      {
        heading: "Why TEB dominates NY private aviation",
        body: "Teterboro is purpose-built for business aviation near Manhattan. For many corporate and leisure trips, TEB reduces ground time versus major airline hubs.",
      },
      {
        heading: "Plan the ground transfer",
        body: "Traffic into and out of TEB varies by time of day. Share your Manhattan or borough address so the desk can time a limo or black car to wheels-up and wheels-down.",
      },
      {
        heading: "Alternatives",
        body: "Westchester (HPN) can be smarter for northern suburbs and Connecticut. JFK/EWR remain options when the operator or itinerary prefers them. The “best” airport is the one that shortens your total day.",
      },
    ],
    faqs: [
      {
        q: "Can I arrive at TEB at the last minute?",
        a: "Private aviation is faster than airline terminals, but FBOs still need passenger details and timing. Give the desk a realistic arrival window.",
      },
    ],
  },
  {
    slug: "what-is-part-135",
    title: "What is Part 135? A plain-English safety primer",
    description:
      "Part 135 explained for private charter passengers—what the certificate means, what brokers check, and what JetAeris discloses before confirmation.",
    category: "Safety & trust",
    tags: ["Part 135", "safety", "FAA"],
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 5,
    relatedHref: "/safety",
    relatedLabel: "Safety & how we operate",
    sections: [
      {
        heading: "Part 135 in one sentence",
        body: "Part 135 is the Federal Aviation Regulations framework under which many on-demand and commuter air carriers operate charter flights in the United States.",
      },
      {
        heading: "What passengers should ask",
        body: "Who is the operating carrier? When is the carrier named? What cancellation and weather rules apply? Serious desks answer these before payment—not after.",
      },
      {
        heading: "How JetAeris uses this",
        body: "We arrange with certificated Part 135 partners, review certificate status as part of option presentation, and identify the operating carrier before confirmation. We do not display safety logos without current permission and evidence.",
      },
    ],
    faqs: [
      {
        q: "Does Part 135 mean every flight is identical?",
        a: "No. Aircraft, crews, and operators differ. The certificate is a baseline framework—not a substitute for trip-specific confirmation.",
      },
    ],
    wave: "pillar",
  },
  {
    slug: "private-jet-with-pets-usa",
    title: "Flying private with pets in the USA: what to plan",
    description:
      "How pet travel works on USA private jets—carrier policies, kennels, fees, and what to tell the desk before you request a quote.",
    category: "Travel tips",
    tags: ["pets", "charter", "USA"],
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 5,
    wave: "pillar",
    relatedHref: "/quote",
    relatedLabel: "Request a quote with pets",
    sections: [
      {
        heading: "Cabin pets vs cargo myths",
        body: "On many charter flights, approved pets can travel in the cabin with you—subject to the operating carrier’s policy, aircraft type, and other passengers. This is a major difference from airline cargo holds, but it is not automatic.",
      },
      {
        heading: "What to declare early",
        body: "Species, weight, crate dimensions, service-animal status, and any anxiety medication plans. Late pet disclosures can force aircraft changes or denials.",
      },
      {
        heading: "How JetAeris handles it",
        body: "Note pets on your quote request. We match operators comfortable with your animal and confirm boarding rules before you commit.",
      },
    ],
    faqs: [
      {
        q: "Are pets free on private jets?",
        a: "Sometimes included, sometimes a fee—operator and aircraft dependent. Ask for the line item in your quote.",
      },
    ],
  },
  {
    slug: "corporate-private-jet-charter-usa",
    title: "Corporate private jet charter in the USA: when teams fly private",
    description:
      "How executive and team charter works—multi-city days, productivity math, and what assistants should send a broker for a clean quote.",
    category: "Corporate",
    tags: ["corporate", "executive travel", "multi-city"],
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 6,
    wave: "pillar",
    relatedHref: "/ways-to-fly",
    relatedLabel: "Corporate & multi-leg support",
    sections: [
      {
        heading: "The real ROI is the day, not the cabin",
        body: "Corporate charter often wins when a team must hit two or three cities in one day, protect confidentiality, or avoid connection risk before a board meeting.",
      },
      {
        heading: "What executive assistants should send",
        body: "Passenger manifest draft, hard meeting times, preferred FBOs, baggage/AV needs, and return flexibility. That lets the desk price the right cabin the first time.",
      },
      {
        heading: "JetAeris for corporate desks",
        body: `We coordinate on-demand charter and ground as one plan. Quotes are open now; confirmed bookings begin ${site.bookingOpensLabel}.`,
      },
    ],
    faqs: [
      {
        q: "Do you offer jet cards?",
        a: "Not at launch. On-demand charter and empty-leg watches are the current products—labeled honestly on Ways to Fly.",
      },
    ],
  },
];

function routeCostPost(route: Route): BlogPost {
  return {
    slug: `cost-${route.slug}`,
    title: `${route.from} to ${route.to} private jet cost (2026 guide)`,
    description: `Indicative private jet cost from ${route.from} to ${route.to}: airports ${route.airports}, block time ${route.blockTime}, light jet about ${route.priceEstimate.light}, midsize about ${route.priceEstimate.midsize}.`,
    category: "Route costs",
    tags: [route.from, route.to, "private jet cost", "charter"],
    published: "2026-11-23",
    updated: route.priceEstimate.updated,
    readMinutes: 5,
    wave: "route",
    relatedHref: `/routes/${route.slug}`,
    relatedLabel: `${route.from} → ${route.to} route page`,
    sections: [
      {
        heading: `What travelers ask about ${route.from}–${route.to}`,
        body: `Search demand for this corridor is commercial: how much, which airports, how long, and what to do next. ${route.summary}`,
      },
      {
        heading: "Airports, distance, and block time",
        body: `Common pairings: ${route.airports}. Approximate distance: ${route.distanceNm}. Typical block: ${route.blockTime}. Aircraft fit: ${route.bestFit}.`,
      },
      {
        heading: "Indicative one-way price ranges",
        body: `Planning estimates verified ${route.priceEstimate.updated} by ${route.reviewedBy}. Light jet: ${route.priceEstimate.light}. Midsize: ${route.priceEstimate.midsize}. ${route.priceEstimate.assumptions}`,
        bullets: route.priceFactors,
      },
      {
        heading: "Seasonal and ops notes",
        body: route.seasonalNotes,
      },
      {
        heading: "Next step with JetAeris",
        body: `Request a quote with your date and passenger count. Prefill from the route page. Quotes are open now; confirmed bookings begin ${site.bookingOpensLabel}.`,
      },
    ],
    faqs: route.faqs.slice(0, 3),
  };
}

function cityCharterPost(city: City): BlogPost {
  return {
    slug: `private-jet-charter-${city.slug}`,
    title: `Private jet charter in ${city.name}, ${city.state}`,
    description: `How private aviation works in ${city.name}—key airports (${city.airports.join(", ")}), popular corridors, FBO limo, and how to request a JetAeris quote.`,
    category: "City guides",
    tags: [city.name, "charter", "FBO"],
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 5,
    wave: "city",
    relatedHref: `/charter/${city.slug}`,
    relatedLabel: `${city.name} charter hub`,
    sections: [
      {
        heading: `Why ${city.name} matters for private aviation`,
        body: city.blurb,
      },
      {
        heading: "Airports and FBOs travelers use",
        body: `Primary codes for planning: ${city.airports.join(", ")}. The best airport is the one that shortens your ground day—not always the largest commercial field.`,
      },
      {
        heading: "Popular corridors",
        body: `Travelers often connect ${city.name} with ${city.corridors
          .slice(0, 5)
          .map((c) => c.replace(/-/g, " "))
          .join(", ")}. Each corridor has a JetAeris route page with timing and estimate bands where available.`,
      },
      {
        heading: "Ground transfer",
        body: city.limo
          ? `JetAeris can arrange FBO limo or black-car in ${city.name} timed to wheels-up and wheels-down.`
          : `Share your ground address so we choose the smarter airport and transfer plan for ${city.name}.`,
      },
      {
        heading: "Request a quote",
        body: `Tell us origin/destination (or ${city.name} as either end), date, and passengers. ${site.bookingOpensTagline}`,
      },
    ],
    faqs: [
      {
        q: `Which airport should I use in ${city.name}?`,
        a: `It depends on your address and the aircraft. Common options include ${city.airports.join(", ")}. Share your ground location on the quote form.`,
      },
      {
        q: `Can I get a limo in ${city.name}?`,
        a: city.limo
          ? `Yes—request FBO limo with your flight quote.`
          : `Ask the desk; we coordinate ground where partners are available.`,
      },
    ],
  };
}

function aircraftPost(item: Aircraft): BlogPost {
  return {
    slug: `aircraft-${item.slug}`,
    title: `${item.name} charter guide: seats, missions, and cost context`,
    description: `${item.name} private jet charter in the USA—typical seats (${item.seats}), best missions (${item.bestFor}), example types, and how JetAeris quotes this class.`,
    category: "Aircraft",
    tags: [item.name, "aircraft class", "charter"],
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 5,
    wave: "aircraft",
    relatedHref: `/aircraft/${item.slug}`,
    relatedLabel: `${item.name} details`,
    sections: [
      {
        heading: `When a ${item.name.toLowerCase()} fits`,
        body: `${item.summary} Best for: ${item.bestFor}. Typical seats: ${item.seats}. Range context: ${item.range}.`,
      },
      {
        heading: "Example aircraft in class",
        body: `Operators may offer types such as ${item.examples.join(", ")}. Marketing photos are representative until a specific tail is assigned.`,
      },
      {
        heading: "Trip details that matter",
        body: item.details.join(" "),
      },
      {
        heading: "How we quote this class",
        body: `Share passenger count, bags, and corridor. We return ${item.name.toLowerCase()} options only when they fit the mission—not as a default upsell. ${site.bookingOpensTagline}`,
      },
    ],
    faqs: [
      {
        q: `Is a ${item.name.toLowerCase()} always the cheapest option?`,
        a: "Not always. Positioning and one-way ferry costs can make a different class better for a specific date. Compare full trip quotes.",
      },
    ],
  };
}

/** Full SEO information campaign: pillars + top-5 city deep topics (50+/city) + other cities + routes + aircraft. */
export const blogPosts: BlogPost[] = [
  ...pillarPosts,
  ...topCityDeepPosts,
  ...routes.map(routeCostPost),
  ...cities
    .filter((c) => !isTopCity(c.slug))
    .map(cityCharterPost)
    .filter((p) => !topCityHubSlugs.has(p.slug)),
  ...aircraft.map(aircraftPost),
];

/** Count of deep SEO topics across NY / LA / Miami / Chicago / Dallas. */
export const topCityTopicCount = topCityDeepPosts.length;

export const blogPillars = blogPosts.filter((p) => p.wave === "pillar");

/** Posts Google should index in the quality-first phase. */
export const indexableBlogPosts = blogPosts.filter(isIndexableBlogPost);

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function relatedBlogPosts(slug: string, limit = 3) {
  const current = getBlogPost(slug);
  if (!current) return blogPillars.slice(0, limit);
  // Prefer indexable pages for internal PageRank flow
  const scored = indexableBlogPosts.filter((p) => p.slug !== slug);
  const sameWave = scored.filter((p) => p.wave === current.wave);
  const sameCategory = scored.filter((p) => p.category === current.category);
  const merged = [...sameCategory, ...sameWave, ...scored];
  const seen = new Set<string>();
  const out: BlogPost[] = [];
  for (const p of merged) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    out.push(p);
    if (out.length >= limit) break;
  }
  return out;
}

export function blogByCategory() {
  const map = new Map<string, BlogPost[]>();
  for (const post of blogPosts) {
    const list = map.get(post.category) || [];
    list.push(post);
    map.set(post.category, list);
  }
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}
