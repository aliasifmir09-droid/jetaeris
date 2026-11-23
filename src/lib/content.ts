export type City = {
  slug: string;
  name: string;
  state: string;
  airports: string[];
  blurb: string;
  corridors: string[];
  limo: boolean;
  neighborhoods: string[];
  details: string[];
};

export type Route = {
  slug: string;
  from: string;
  to: string;
  fromSlug: string;
  toSlug: string;
  airports: string;
  blockTime: string;
  bestFit: string;
  summary: string;
  faqs: { q: string; a: string }[];
  details: string[];
};

export type Aircraft = {
  slug: string;
  name: string;
  seats: string;
  range: string;
  bestFor: string;
  examples: string[];
  summary: string;
  details: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  sections: { heading: string; body: string }[];
};

export type Airport = {
  code: string;
  name: string;
  citySlug: string;
  cityName: string;
  note: string;
  details: string[];
};

export type LimoCity = {
  slug: string;
  name: string;
  state: string;
  fbOs: string[];
  vehicles: string[];
  summary: string;
  details: string[];
  faqs: { q: string; a: string }[];
};

const citySeed: Array<Omit<City, "details"> & { details?: string[] }> = [
  {
    slug: "new-york",
    name: "New York",
    state: "NY",
    airports: ["TEB", "HPN", "JFK", "EWR"],
    blurb:
      "The East Coast’s private aviation center—corporate weekdays, weekend South Florida runs, and dense FBO choice.",
    corridors: ["miami", "los-angeles", "chicago", "aspen", "boston", "washington"],
    limo: true,
    neighborhoods: ["Manhattan", "Greenwich", "Westchester", "Brooklyn"],
  },
  {
    slug: "miami",
    name: "Miami",
    state: "FL",
    airports: ["OPF", "MIA", "FLL", "PBI"],
    blurb:
      "South Florida demand never really sleeps. Peak seasons, events, and Northeast empty-leg opportunities.",
    corridors: ["new-york", "chicago", "dallas", "atlanta", "boston", "houston"],
    limo: true,
    neighborhoods: ["South Beach", "Brickell", "Palm Beach", "Fort Lauderdale"],
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    state: "CA",
    airports: ["VNY", "LAX", "BUR", "SNA"],
    blurb:
      "Entertainment, coastal business, and short-hop Vegas traffic make LA one of the country’s busiest private markets.",
    corridors: ["las-vegas", "san-francisco", "new-york", "denver", "phoenix", "seattle"],
    limo: true,
    neighborhoods: ["Beverly Hills", "Santa Monica", "Malibu", "Orange County"],
  },
  {
    slug: "las-vegas",
    name: "Las Vegas",
    state: "NV",
    airports: ["LAS", "VGT"],
    blurb:
      "Event-driven peaks and a classic light-jet corridor from Southern California.",
    corridors: ["los-angeles", "denver", "dallas", "san-francisco", "phoenix", "seattle"],
    limo: true,
    neighborhoods: ["Strip", "Summerlin", "Henderson", "Airport corridor"],
  },
  {
    slug: "chicago",
    name: "Chicago",
    state: "IL",
    airports: ["MDW", "PWK", "ORD"],
    blurb:
      "Midwest hub for corporate travel with strong links to both coasts and Florida leisure.",
    corridors: ["new-york", "miami", "denver", "dallas", "atlanta", "minneapolis"],
    limo: true,
    neighborhoods: ["Loop", "North Shore", "Naperville", "Windy City suburbs"],
  },
  {
    slug: "dallas",
    name: "Dallas",
    state: "TX",
    airports: ["DAL", "ADS", "DFW"],
    blurb:
      "Texas corporate flying plus mountain and coastal leisure corridors year-round.",
    corridors: ["aspen", "los-angeles", "miami", "new-york", "houston", "denver"],
    limo: true,
    neighborhoods: ["Uptown", "Plano", "Fort Worth", "Legacy"],
  },
  {
    slug: "aspen",
    name: "Aspen",
    state: "CO",
    airports: ["ASE"],
    blurb:
      "Seasonal pressure, mountain weather, and high-value empty legs when timing flexes.",
    corridors: ["dallas", "denver", "los-angeles", "new-york", "chicago", "houston"],
    limo: true,
    neighborhoods: ["Aspen Village", "Snowmass", "Basalt"],
  },
  {
    slug: "denver",
    name: "Denver",
    state: "CO",
    airports: ["APA", "BJC", "DEN"],
    blurb:
      "Rocky Mountain gateway for business and ski-season leisure traffic.",
    corridors: ["aspen", "los-angeles", "chicago", "dallas", "seattle", "phoenix"],
    limo: true,
    neighborhoods: ["Downtown", "Boulder", "Cherry Creek", "Centennial"],
  },
  {
    slug: "atlanta",
    name: "Atlanta",
    state: "GA",
    airports: ["PDK", "FTY", "ATL"],
    blurb:
      "Southeast corporate base with efficient hops to Florida and the Northeast.",
    corridors: ["miami", "new-york", "chicago", "dallas", "nashville", "charlotte"],
    limo: true,
    neighborhoods: ["Buckhead", "Midtown", "Alpharetta", "Vinings"],
  },
  {
    slug: "boston",
    name: "Boston",
    state: "MA",
    airports: ["BED", "BOS", "OWD"],
    blurb:
      "Finance and biotech demand with frequent New York and Florida itineraries.",
    corridors: ["new-york", "miami", "chicago", "washington", "nashville"],
    limo: true,
    neighborhoods: ["Back Bay", "Cambridge", "Seaport", "North Shore"],
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    state: "CA",
    airports: ["SFO", "SQL", "OAK"],
    blurb:
      "Bay Area tech and finance traffic—coastal hops and transcontinental legs.",
    corridors: ["los-angeles", "las-vegas", "new-york", "denver", "seattle", "san-diego"],
    limo: true,
    neighborhoods: ["Downtown", "Palo Alto", "Marin", "Oakland"],
  },
  {
    slug: "houston",
    name: "Houston",
    state: "TX",
    airports: ["HOU", "IAH", "SGR"],
    blurb:
      "Energy-sector corporate flying with Gulf Coast and mountain leisure links.",
    corridors: ["dallas", "miami", "denver", "new-york", "aspen", "atlanta"],
    limo: true,
    neighborhoods: ["Downtown", "The Woodlands", "River Oaks", "Sugar Land"],
  },
  {
    slug: "washington",
    name: "Washington, D.C.",
    state: "DC",
    airports: ["IAD", "DCA", "HEF"],
    blurb:
      "Government and association travel with strong Northeast shuttle patterns.",
    corridors: ["new-york", "boston", "miami", "chicago", "atlanta", "charlotte"],
    limo: true,
    neighborhoods: ["Georgetown", "McLean", "Bethesda", "Capitol Hill"],
  },
  {
    slug: "phoenix",
    name: "Phoenix",
    state: "AZ",
    airports: ["SDL", "PHX", "DVT"],
    blurb:
      "Sun Belt business and winter leisure with short West Coast connections.",
    corridors: ["los-angeles", "las-vegas", "denver", "dallas", "san-diego", "seattle"],
    limo: true,
    neighborhoods: ["Scottsdale", "Paradise Valley", "Tempe", "Chandler"],
  },
  {
    slug: "seattle",
    name: "Seattle",
    state: "WA",
    airports: ["BFI", "SEA", "PAE"],
    blurb:
      "Pacific Northwest tech and corporate flying with California and mountain links.",
    corridors: ["los-angeles", "san-francisco", "denver", "las-vegas", "phoenix"],
    limo: true,
    neighborhoods: ["Downtown", "Bellevue", "Kirkland", "Redmond"],
  },
  {
    slug: "san-diego",
    name: "San Diego",
    state: "CA",
    airports: ["SAN", "MYF", "CRQ"],
    blurb:
      "Coastal leisure and biotech traffic with short hops across Southern California and Arizona.",
    corridors: ["los-angeles", "las-vegas", "phoenix", "san-francisco", "denver"],
    limo: true,
    neighborhoods: ["La Jolla", "Downtown", "Del Mar", "Coronado"],
  },
  {
    slug: "nashville",
    name: "Nashville",
    state: "TN",
    airports: ["BNA", "JWN"],
    blurb:
      "Fast-growing corporate and entertainment market with Southeast and Midwest links.",
    corridors: ["atlanta", "chicago", "miami", "new-york", "dallas", "charlotte"],
    limo: true,
    neighborhoods: ["Downtown", "Belle Meade", "Franklin", "Green Hills"],
  },
  {
    slug: "charlotte",
    name: "Charlotte",
    state: "NC",
    airports: ["CLT", "JQF"],
    blurb:
      "Banking hub with efficient Northeast and Florida private corridors.",
    corridors: ["new-york", "miami", "atlanta", "washington", "nashville"],
    limo: true,
    neighborhoods: ["Uptown", "SouthPark", "Ballantyne", "Lake Norman"],
  },
  {
    slug: "minneapolis",
    name: "Minneapolis",
    state: "MN",
    airports: ["FCM", "MSP", "STP"],
    blurb:
      "Upper Midwest corporate base with Chicago, coasts, and mountain leisure demand.",
    corridors: ["chicago", "denver", "new-york", "miami", "dallas"],
    limo: true,
    neighborhoods: ["Downtown", "Edina", "Wayzata", "Saint Paul"],
  },
  {
    slug: "detroit",
    name: "Detroit",
    state: "MI",
    airports: ["DET", "PTK", "DTW"],
    blurb:
      "Automotive and manufacturing travel with strong Midwest and East Coast links.",
    corridors: ["chicago", "new-york", "miami", "atlanta", "boston"],
    limo: true,
    neighborhoods: ["Downtown", "Bloomfield Hills", "Troy", "Ann Arbor"],
  },
  {
    slug: "austin",
    name: "Austin",
    state: "TX",
    airports: ["AUS", "GTU"],
    blurb:
      "Tech and corporate growth market with Dallas, coasts, and mountain getaways.",
    corridors: ["dallas", "houston", "los-angeles", "denver", "miami", "new-york"],
    limo: true,
    neighborhoods: ["Downtown", "Westlake", "Domain", "Lake Travis"],
  },
  {
    slug: "tampa",
    name: "Tampa",
    state: "FL",
    airports: ["TPA", "PIE", "VDF"],
    blurb:
      "Gulf Coast leisure and corporate flying alongside Miami and Northeast corridors.",
    corridors: ["miami", "new-york", "atlanta", "chicago", "dallas"],
    limo: true,
    neighborhoods: ["Downtown", "South Tampa", "Clearwater", "St. Petersburg"],
  },
  {
    slug: "orlando",
    name: "Orlando",
    state: "FL",
    airports: ["MCO", "ORL", "SFB"],
    blurb:
      "Events, entertainment, and family travel with frequent Northeast private demand.",
    corridors: ["new-york", "miami", "atlanta", "chicago", "boston"],
    limo: true,
    neighborhoods: ["Lake Nona", "Winter Park", "Dr. Phillips", "Celebration"],
  },
  {
    slug: "salt-lake-city",
    name: "Salt Lake City",
    state: "UT",
    airports: ["SLC", "TVY"],
    blurb:
      "Mountain gateway for ski seasons and West regional corporate hops.",
    corridors: ["denver", "los-angeles", "las-vegas", "seattle", "phoenix"],
    limo: true,
    neighborhoods: ["Downtown", "Park City", "Deer Valley", "Cottonwood"],
  },
];

function cityDetails(c: (typeof citySeed)[number]): string[] {
  return [
    `${c.name} private aviation typically flows through ${c.airports.join(", ")}—we match the FBO to your ground plan, not the other way around.`,
    `Common trip profiles include weekday corporate shuttles, weekend leisure, and peak-season event travel across ${c.state} and connected states.`,
    `Neighborhoods and suburbs we regularly coordinate around include ${c.neighborhoods.join(", ")}.`,
    `JetAeris can arrange the flight and a coordinated limo or black-car meet at the FBO so door-to-door timing stays tight.`,
    `For empty legs into or out of ${c.name}, flexibility on departure window materially improves options.`,
    `Safety and operator fit come first: every itinerary names the Part 135 certificate holder before you fly.`,
  ];
}

export const cities: City[] = citySeed.map((c) => ({
  ...c,
  details: c.details ?? cityDetails(c),
}));

const blockHints: Record<string, string> = {
  "new-york-miami": "≈ 2h 45m",
  "los-angeles-las-vegas": "≈ 1h 10m",
  "new-york-los-angeles": "≈ 5h 30m",
  "chicago-miami": "≈ 2h 50m",
  "dallas-aspen": "≈ 2h 15m",
  "boston-miami": "≈ 3h",
  "san-francisco-las-vegas": "≈ 1h 25m",
  "houston-new-york": "≈ 3h 30m",
  "denver-los-angeles": "≈ 2h 20m",
  "atlanta-new-york": "≈ 2h",
};

const pairSeeds: Array<[string, string]> = [
  ["new-york", "miami"],
  ["los-angeles", "las-vegas"],
  ["new-york", "los-angeles"],
  ["chicago", "miami"],
  ["dallas", "aspen"],
  ["boston", "miami"],
  ["san-francisco", "las-vegas"],
  ["houston", "new-york"],
  ["denver", "los-angeles"],
  ["atlanta", "new-york"],
  ["new-york", "aspen"],
  ["miami", "chicago"],
  ["los-angeles", "new-york"],
  ["dallas", "miami"],
  ["seattle", "los-angeles"],
  ["san-francisco", "new-york"],
  ["phoenix", "las-vegas"],
  ["boston", "new-york"],
  ["washington", "miami"],
  ["atlanta", "miami"],
  ["houston", "aspen"],
  ["denver", "aspen"],
  ["chicago", "new-york"],
  ["dallas", "los-angeles"],
  ["nashville", "new-york"],
  ["charlotte", "miami"],
  ["austin", "las-vegas"],
  ["tampa", "new-york"],
  ["orlando", "new-york"],
  ["san-diego", "las-vegas"],
  ["minneapolis", "miami"],
  ["detroit", "miami"],
  ["salt-lake-city", "los-angeles"],
  ["seattle", "denver"],
  ["phoenix", "denver"],
  ["houston", "miami"],
  ["austin", "new-york"],
  ["nashville", "miami"],
  ["charlotte", "new-york"],
  ["san-diego", "san-francisco"],
  ["boston", "chicago"],
  ["washington", "new-york"],
  ["los-angeles", "aspen"],
  ["miami", "aspen"],
  ["chicago", "aspen"],
  ["seattle", "las-vegas"],
  ["dallas", "new-york"],
  ["atlanta", "chicago"],
  ["orlando", "chicago"],
  ["tampa", "atlanta"],
];

function cityBySlug(slug: string) {
  return cities.find((c) => c.slug === slug);
}

function buildRoute(fromSlug: string, toSlug: string): Route | null {
  const from = cityBySlug(fromSlug);
  const to = cityBySlug(toSlug);
  if (!from || !to) return null;
  const slug = `${fromSlug}-${toSlug}`;
  const airports = `${from.airports.slice(0, 2).join(" / ")} → ${to.airports.slice(0, 2).join(" / ")}`;
  const blockTime = blockHints[slug] ?? "Varies by aircraft & winds";
  const bestFit =
    slug.includes("los-angeles-new-york") || slug.includes("new-york-los-angeles") || slug.includes("san-francisco-new-york")
      ? "Super-midsize or heavy for nonstop comfort"
      : slug.includes("aspen")
        ? "Mountain-capable midsize / super-midsize"
        : "Light to midsize jet for most parties";

  return {
    slug,
    from: from.name,
    to: to.name,
    fromSlug,
    toSlug,
    airports,
    blockTime,
    bestFit,
    summary: `Private jet charter from ${from.name} to ${to.name}—airports, timing, aircraft fit, and a direct JetAeris quote path for USA travelers.`,
    faqs: [
      {
        q: `How long is a private jet from ${from.name} to ${to.name}?`,
        a: `Block time is typically ${blockTime.toLowerCase()}. Door-to-door time depends on FBO choice and ground transfers.`,
      },
      {
        q: `Which airports are used for ${from.name}–${to.name}?`,
        a: `Common pairings include ${airports}. We confirm the best FBO pair for your itinerary.`,
      },
      {
        q: "Can I add a limo from the FBO?",
        a: `Yes. JetAeris can arrange black-car or limo meet-and-greet in ${from.name} and ${to.name} timed to your wheels-down.`,
      },
    ],
    details: [
      `This corridor connects ${from.name}, ${from.state} with ${to.name}, ${to.state}—one of the practical USA pairs travelers actually book.`,
      `Aircraft selection starts with passenger count, bags, pets, and whether you need nonstop range for weather or routing.`,
      `Peak dates, one-way positioning, and airport fees can move price more than the headline hourly rate.`,
      `Empty-leg potential exists when operators already need to reposition between these regions—note flexibility on your request.`,
      `Ground transportation can be bundled: limo or sprinter to/from the FBO so the private flight feels continuous.`,
      `Every confirmed itinerary lists the operating carrier. Marketing aircraft examples are representative until a tail is assigned.`,
    ],
  };
}

export const routes: Route[] = pairSeeds
  .map(([a, b]) => buildRoute(a, b))
  .filter((r): r is Route => Boolean(r));

export const aircraft: Aircraft[] = [
  {
    slug: "light-jet",
    name: "Light jet",
    seats: "6–8",
    range: "Regional hops under ~3 hours",
    bestFor: "Couples, small teams, short corridors",
    examples: ["Embraer Phenom 300", "Cessna Citation CJ3", "HondaJet Elite"],
    summary:
      "The workhorse of USA private aviation—fast FBO turns and excellent value on short city pairs.",
    details: [
      "Ideal for sub-3-hour missions where speed to the FBO matters more than cabin volume.",
      "Baggage is adequate for light travel; golf clubs and oversized items should be declared early.",
      "Often the best economic fit when an empty leg appears on a short corridor.",
    ],
  },
  {
    slug: "midsize-jet",
    name: "Midsize jet",
    seats: "8–9",
    range: "Most domestic nonstops",
    bestFor: "Full cabin comfort with more luggage",
    examples: ["Citation XLS+", "Learjet 60XR", "Hawker 800XP"],
    summary:
      "A stronger cabin and baggage hold for teams that outgrow light jets.",
    details: [
      "Better stand-up feel and enclosed lav on many airframes.",
      "Common choice for 4–8 passengers with weekend luggage.",
      "Still efficient on many East Coast and Midwest–Florida missions.",
    ],
  },
  {
    slug: "super-midsize-jet",
    name: "Super-midsize jet",
    seats: "9–10",
    range: "True transcontinental",
    bestFor: "Coast-to-coast nonstop with conference seating",
    examples: ["Challenger 350", "Citation Latitude", "Praetor 500"],
    summary:
      "The sweet spot for executive groups who need range, speed, and a productive cabin.",
    details: [
      "Typically the first class that makes NY–LA nonstop comfortable for working teams.",
      "Cabin connectivity and club seating support meetings in the air.",
      "Popular for ski-season mountain trips when performance allows.",
    ],
  },
  {
    slug: "heavy-jet",
    name: "Heavy jet",
    seats: "10–16",
    range: "Long-range / intercontinental",
    bestFor: "Large parties, ultra-long legs, premium cabins",
    examples: ["Gulfstream G450", "Challenger 650", "Global 5000"],
    summary:
      "Flagship comfort—when the trip is the boardroom and the destination is far.",
    details: [
      "Multiple cabin zones, larger galleys, and true long-range capability.",
      "Best when passenger count, luggage, or nonstop distance exceeds midsize limits.",
      "Crew and cabin service expectations match ultra-high-net-worth travel norms.",
    ],
  },
];

function guideFromRoute(route: Route): Guide {
  return {
    slug: `private-jet-cost-${route.slug}`,
    title: `Private jet cost: ${route.from} to ${route.to}`,
    description: `What drives private jet pricing from ${route.from} to ${route.to}, which aircraft fit, and how empty legs or limo transfers change the trip.`,
    sections: [
      {
        heading: "Pricing is trip-specific",
        body: `Hourly category rates are only a starting point for ${route.from}–${route.to}. Positioning, peak dates, overnight fees, and airport costs shape the final number.`,
      },
      {
        heading: "Aircraft that usually fit",
        body: `${route.bestFit}. Share passenger count and bags so we price the right cabin—not an oversized default.`,
      },
      {
        heading: "Empty legs & timing",
        body: `If your dates flex, ask for empty-leg watches on this corridor. One-ways that match operator positioning can reduce cost.`,
      },
      {
        heading: "Add ground transfer",
        body: `Many clients bundle a limo or black car at both FBOs. It keeps the private experience continuous from home to aircraft door.`,
      },
    ],
  };
}

export const guides: Guide[] = [
  {
    slug: "how-much-does-a-private-jet-cost",
    title: "How much does a private jet cost in the USA?",
    description:
      "A clear guide to private jet charter pricing in the United States—what drives cost, empty legs, and how to request an accurate quote.",
    sections: [
      {
        heading: "Charter is priced by the trip—not a sticker",
        body: "Hourly rates vary by aircraft category, but your total depends on positioning, overnight fees, airport costs, peak dates, and whether an empty leg can be used.",
      },
      {
        heading: "What usually raises the price",
        body: "Ferry flights on one-ways, holiday weekends, constrained airports, last-minute requests, and larger cabins all move the number.",
      },
      {
        heading: "How JetAeris quotes",
        body: "Share from/to/date/passengers. We return vetted options with transparent assumptions—so you compare aircraft and timing, not vague estimates.",
      },
    ],
  },
  {
    slug: "empty-leg-flights-explained",
    title: "Empty leg flights explained",
    description:
      "What empty legs are, why they’re discounted, the tradeoffs, and how to watch USA corridors with JetAeris.",
    sections: [
      {
        heading: "Aircraft already moving",
        body: "An empty leg is a positioning flight—an aircraft that must move with or without paying passengers.",
      },
      {
        heading: "Tradeoffs",
        body: "Schedules can change, holds are short, and routing is less flexible. Empty legs reward travelers who can decide quickly.",
      },
      {
        heading: "How to use them with JetAeris",
        body: "Tell us your preferred city pairs and flexibility. We’ll watch and confirm live availability with the operator before you commit.",
      },
    ],
  },
  {
    slug: "how-to-charter-a-private-jet",
    title: "How to charter a private jet in the USA",
    description:
      "Step-by-step: from first inquiry to FBO arrival—what information you need and what a serious desk handles for you.",
    sections: [
      {
        heading: "Start with the trip",
        body: "Departure, arrival, date, passenger count, and any must-haves (pets, golf clubs, Wi-Fi).",
      },
      {
        heading: "Compare options, then confirm",
        body: "Review aircraft category, timing, and operator. Passenger details and payment secure the trip with the carrier partner.",
      },
      {
        heading: "Flight day",
        body: "Arrive at the FBO with ID. Ground transport and catering can be arranged in advance.",
      },
    ],
  },
  {
    slug: "private-jet-limo-transfer",
    title: "Private jet limo & FBO car service",
    description:
      "How to coordinate limousine and black-car transfers with private jet charter in top USA cities—timing, vehicles, and FBO etiquette.",
    sections: [
      {
        heading: "Door-to-door is the product",
        body: "The flight is only the middle. A timed limo or sprinter at both ends is what makes private aviation feel effortless.",
      },
      {
        heading: "What to specify",
        body: "Passenger count, luggage, child seats, meet location (FBO name), and whether you need a discreet sedan or a stretch/sprinter.",
      },
      {
        heading: "How JetAeris helps",
        body: "Add ground transfer on your flight request. We coordinate pickup windows around wheels-up and wheels-down—not generic airport curb times.",
      },
    ],
  },
  {
    slug: "best-fbo-airports-usa",
    title: "Best FBO airports for private jets in the USA",
    description:
      "A practical overview of popular private aviation airports and FBO gateways across major USA cities.",
    sections: [
      {
        heading: "Why FBOs matter",
        body: "Private aviation rarely means the main commercial terminal. FBO choice affects drive time, customs, and aircraft performance.",
      },
      {
        heading: "City examples",
        body: "Teterboro for New York, Van Nuys for Los Angeles, Opa-locka for Miami, and Aspen for seasonal mountain access are frequent JetAeris conversations.",
      },
      {
        heading: "We match ground to air",
        body: "Tell us where you start and end on the ground—we’ll recommend airports that shorten the limo, not just the flight.",
      },
    ],
  },
  {
    slug: "private-jet-vs-first-class",
    title: "Private jet vs first class: when charter wins",
    description:
      "A clear comparison of private jet charter versus commercial first class for USA travelers—time, privacy, and total door-to-door cost.",
    sections: [
      {
        heading: "Time is the real currency",
        body: "FBO arrival, no terminal theater, and airports closer to home often beat cabin product alone.",
      },
      {
        heading: "When first class is enough",
        body: "Simple nonstops with light bags and flexible timing can still favor commercial—especially for solo travelers.",
      },
      {
        heading: "When charter wins",
        body: "Groups, pets, odd-hour departures, multi-city days, and privacy needs flip the math quickly.",
      },
    ],
  },
  ...routes.map(guideFromRoute),
];

export const airports: Airport[] = cities.flatMap((city) =>
  city.airports.map((code) => ({
    code,
    name: `${code} Airport`,
    citySlug: city.slug,
    cityName: city.name,
    note: `Private aviation gateway serving ${city.name}, ${city.state}.`,
    details: [
      `${code} is commonly used for private jet access to ${city.name}. Exact FBO options depend on the operating carrier and aircraft.`,
      `JetAeris coordinates flight arrangements and can add limo or black-car transfer timed to your ${code} arrival or departure.`,
      `Drive times to ${city.neighborhoods.slice(0, 3).join(", ")} vary by traffic—share your ground address so we pick the smarter airport when alternatives exist.`,
      `For international arrivals, customs and landing rights must be confirmed on the itinerary—never assumed from a marketing page.`,
    ],
  })),
);

export const limoCities: LimoCity[] = cities
  .filter((c) => c.limo)
  .map((c) => ({
    slug: c.slug,
    name: c.name,
    state: c.state,
    fbOs: c.airports,
    vehicles: ["Executive sedan", "Luxury SUV", "Sprinter van", "Stretch limousine"],
    summary: `FBO limo and black-car service in ${c.name}—coordinated with your JetAeris private jet itinerary.`,
    details: [
      `Meet-and-greet at ${c.airports.join(", ")} timed to wheels-down—not a generic terminal curb.`,
      `Popular drop-offs include ${c.neighborhoods.join(", ")}.`,
      `Choose sedan for discreet executive travel, SUV for luggage, sprinter for teams, or stretch limo for events.`,
      `We can arrange one-way FBO transfers or round-trip ground with wait time around your flight.`,
      `Child seats, extra stops, and discreet billing instructions can be noted on your request.`,
      `Ground partners are coordinated as part of the JetAeris trip desk—ask for limo when you request a flight.`,
    ],
    faqs: [
      {
        q: `Can I book only a limo in ${c.name}?`,
        a: `Yes—submit a request noting ground-only. Most clients bundle limo with charter for tighter timing.`,
      },
      {
        q: "How early should the car arrive at the FBO?",
        a: "We set pickup buffers around scheduled wheels-down and update if the aircraft revises ETA.",
      },
      {
        q: "Which vehicle should I choose?",
        a: "Sedan for 1–2 with light bags, SUV for families, sprinter for 6+ or excess luggage, stretch for formal events.",
      },
    ],
  }));

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}

export function getRoute(slug: string) {
  return routes.find((r) => r.slug === slug);
}

export function getAircraft(slug: string) {
  return aircraft.find((a) => a.slug === slug);
}

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function getAirport(code: string) {
  return airports.find((a) => a.code.toLowerCase() === code.toLowerCase());
}

export function getLimoCity(slug: string) {
  return limoCities.find((c) => c.slug === slug);
}
