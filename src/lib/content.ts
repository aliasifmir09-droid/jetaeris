export type City = {
  slug: string;
  name: string;
  state: string;
  airports: string[];
  blurb: string;
  corridors: string[];
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
};

export type Aircraft = {
  slug: string;
  name: string;
  seats: string;
  range: string;
  bestFor: string;
  examples: string[];
  summary: string;
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  sections: { heading: string; body: string }[];
};

export const cities: City[] = [
  {
    slug: "new-york",
    name: "New York",
    state: "NY",
    airports: ["TEB", "HPN", "JFK", "EWR"],
    blurb:
      "The East Coast’s private aviation center—corporate weekdays, weekend South Florida runs, and dense FBO choice.",
    corridors: ["miami", "los-angeles", "chicago", "aspen"],
  },
  {
    slug: "miami",
    name: "Miami",
    state: "FL",
    airports: ["OPF", "MIA", "FLL", "PBI"],
    blurb:
      "South Florida demand never really sleeps. Peak seasons, events, and Northeast empty-leg opportunities.",
    corridors: ["new-york", "chicago", "dallas", "atlanta"],
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    state: "CA",
    airports: ["VNY", "LAX", "BUR", "SNA"],
    blurb:
      "Entertainment, coastal business, and short-hop Vegas traffic make LA one of the country’s busiest private markets.",
    corridors: ["las-vegas", "san-francisco", "new-york", "denver"],
  },
  {
    slug: "las-vegas",
    name: "Las Vegas",
    state: "NV",
    airports: ["LAS", "VGT"],
    blurb:
      "Event-driven peaks and a classic light-jet corridor from Southern California.",
    corridors: ["los-angeles", "denver", "dallas", "san-francisco"],
  },
  {
    slug: "chicago",
    name: "Chicago",
    state: "IL",
    airports: ["MDW", "PWK", "ORD"],
    blurb:
      "Midwest hub for corporate travel with strong links to both coasts and Florida leisure.",
    corridors: ["new-york", "miami", "denver", "dallas"],
  },
  {
    slug: "dallas",
    name: "Dallas",
    state: "TX",
    airports: ["DAL", "ADS", "DFW"],
    blurb:
      "Texas corporate flying plus mountain and coastal leisure corridors year-round.",
    corridors: ["aspen", "los-angeles", "miami", "new-york"],
  },
  {
    slug: "aspen",
    name: "Aspen",
    state: "CO",
    airports: ["ASE"],
    blurb:
      "Seasonal pressure, mountain weather, and high-value empty legs when timing flexes.",
    corridors: ["dallas", "denver", "los-angeles", "new-york"],
  },
  {
    slug: "denver",
    name: "Denver",
    state: "CO",
    airports: ["APA", "BJC", "DEN"],
    blurb:
      "Rocky Mountain gateway for business and ski-season leisure traffic.",
    corridors: ["aspen", "los-angeles", "chicago", "dallas"],
  },
  {
    slug: "atlanta",
    name: "Atlanta",
    state: "GA",
    airports: ["PDK", "FTY", "ATL"],
    blurb:
      "Southeast corporate base with efficient hops to Florida and the Northeast.",
    corridors: ["miami", "new-york", "chicago", "dallas"],
  },
  {
    slug: "boston",
    name: "Boston",
    state: "MA",
    airports: ["BED", "BOS", "OWD"],
    blurb:
      "Finance and biotech demand with frequent New York and Florida itineraries.",
    corridors: ["new-york", "miami", "chicago", "washington"],
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    state: "CA",
    airports: ["SFO", "SQL", "OAK"],
    blurb:
      "Bay Area tech and finance traffic—coastal hops and transcontinental legs.",
    corridors: ["los-angeles", "las-vegas", "new-york", "denver"],
  },
  {
    slug: "houston",
    name: "Houston",
    state: "TX",
    airports: ["HOU", "IAH", "SGR"],
    blurb:
      "Energy-sector corporate flying with Gulf Coast and mountain leisure links.",
    corridors: ["dallas", "miami", "denver", "new-york"],
  },
  {
    slug: "washington",
    name: "Washington, D.C.",
    state: "DC",
    airports: ["IAD", "DCA", "HEF"],
    blurb:
      "Government and association travel with strong Northeast shuttle patterns.",
    corridors: ["new-york", "boston", "miami", "chicago"],
  },
  {
    slug: "phoenix",
    name: "Phoenix",
    state: "AZ",
    airports: ["SDL", "PHX", "DVT"],
    blurb:
      "Sun Belt business and winter leisure with short West Coast connections.",
    corridors: ["los-angeles", "las-vegas", "denver", "dallas"],
  },
];

export const routes: Route[] = [
  {
    slug: "new-york-miami",
    from: "New York",
    to: "Miami",
    fromSlug: "new-york",
    toSlug: "miami",
    airports: "TEB / HPN / JFK → OPF / MIA / FLL / PBI",
    blockTime: "≈ 2h 45m",
    bestFit: "Light jet for couples · midsize for teams",
    summary:
      "One of the most traveled private corridors in the United States—weekday corporate and weekend leisure.",
    faqs: [
      {
        q: "How long is a private jet from New York to Miami?",
        a: "Most light and midsize jets block about 2 hours 30 minutes to 3 hours depending on winds and airports.",
      },
      {
        q: "Which airports are typical?",
        a: "Common departures include Teterboro (TEB) and Westchester (HPN). Florida arrivals often use Opa-locka (OPF), Fort Lauderdale (FLL), or Palm Beach (PBI).",
      },
      {
        q: "Can I find empty legs on this route?",
        a: "Yes—especially around peak leisure weekends. Timing flexibility improves empty-leg odds.",
      },
    ],
  },
  {
    slug: "los-angeles-las-vegas",
    from: "Los Angeles",
    to: "Las Vegas",
    fromSlug: "los-angeles",
    toSlug: "las-vegas",
    airports: "VNY / LAX / BUR → LAS",
    blockTime: "≈ 1h 10m",
    bestFit: "Light jet · Phenom 300 / Citation CJ",
    summary:
      "A short-hop classic—evening returns, event weeks, and frequent positioning flights.",
    faqs: [
      {
        q: "How long is LA to Las Vegas by private jet?",
        a: "Typically around one hour of block time in a light jet, door-to-door far faster than commercial.",
      },
      {
        q: "Is this a good empty-leg corridor?",
        a: "Often yes. Aircraft reposition frequently between Southern California and Las Vegas.",
      },
    ],
  },
  {
    slug: "new-york-los-angeles",
    from: "New York",
    to: "Los Angeles",
    fromSlug: "new-york",
    toSlug: "los-angeles",
    airports: "TEB / JFK → VNY / LAX",
    blockTime: "≈ 5h 30m",
    bestFit: "Super-midsize or heavy for comfort",
    summary:
      "Transcontinental nonstop for teams that need the day intact—cabin class matters more than headline speed.",
    faqs: [
      {
        q: "What aircraft for coast-to-coast?",
        a: "Super-midsize and heavy jets are typical for nonstop comfort with luggage and a working cabin.",
      },
    ],
  },
  {
    slug: "chicago-miami",
    from: "Chicago",
    to: "Miami",
    fromSlug: "chicago",
    toSlug: "miami",
    airports: "MDW / PWK → OPF / FLL",
    blockTime: "≈ 2h 50m",
    bestFit: "Light to midsize jet",
    summary:
      "Midwest-to-Florida leisure and corporate traffic with strong winter seasonality.",
    faqs: [
      {
        q: "Winter demand?",
        a: "Holiday and winter months see higher Florida demand from Chicago—book early for peak weekends.",
      },
    ],
  },
  {
    slug: "dallas-aspen",
    from: "Dallas",
    to: "Aspen",
    fromSlug: "dallas",
    toSlug: "aspen",
    airports: "DAL / ADS → ASE",
    blockTime: "≈ 2h 15m",
    bestFit: "Midsize / super-midsize · mountain-capable operators",
    summary:
      "Ski-season favorite. Weather and airport constraints make operator selection critical.",
    faqs: [
      {
        q: "Any Aspen caveats?",
        a: "ASE is performance-limited. We match aircraft and operators experienced with mountain ops.",
      },
    ],
  },
  {
    slug: "boston-miami",
    from: "Boston",
    to: "Miami",
    fromSlug: "boston",
    toSlug: "miami",
    airports: "BED / BOS → OPF / PBI",
    blockTime: "≈ 3h",
    bestFit: "Light to midsize jet",
    summary:
      "Northeast–Florida leisure corridor with frequent Friday/Sunday patterns.",
    faqs: [
      {
        q: "Best departure airport from Boston?",
        a: "Hanscom (BED) is often preferred for private aviation; BOS is used when itinerary demands it.",
      },
    ],
  },
  {
    slug: "san-francisco-las-vegas",
    from: "San Francisco",
    to: "Las Vegas",
    fromSlug: "san-francisco",
    toSlug: "las-vegas",
    airports: "SFO / SQL → LAS",
    blockTime: "≈ 1h 25m",
    bestFit: "Light jet",
    summary:
      "Bay Area event and weekend traffic into Las Vegas on efficient light jets.",
    faqs: [
      {
        q: "Same-day return possible?",
        a: "Yes—block times support day trips when the schedule is planned tightly.",
      },
    ],
  },
  {
    slug: "houston-new-york",
    from: "Houston",
    to: "New York",
    fromSlug: "houston",
    toSlug: "new-york",
    airports: "HOU / IAH → TEB / EWR",
    blockTime: "≈ 3h 30m",
    bestFit: "Midsize to super-midsize",
    summary:
      "Energy and corporate corridor with reliable midsize nonstop options.",
    faqs: [
      {
        q: "Typical aircraft?",
        a: "Citation XLS+ through Challenger 350 class are common depending on passenger count and baggage.",
      },
    ],
  },
  {
    slug: "denver-los-angeles",
    from: "Denver",
    to: "Los Angeles",
    fromSlug: "denver",
    toSlug: "los-angeles",
    airports: "APA / DEN → VNY / LAX",
    blockTime: "≈ 2h 20m",
    bestFit: "Light to midsize jet",
    summary:
      "Mountain–coast link for business and leisure with flexible FBO choices on both ends.",
    faqs: [
      {
        q: "Weather impacts?",
        a: "Winter mountain weather can affect timing—we build buffers and alternate airports when needed.",
      },
    ],
  },
  {
    slug: "atlanta-new-york",
    from: "Atlanta",
    to: "New York",
    fromSlug: "atlanta",
    toSlug: "new-york",
    airports: "PDK / FTY → TEB / HPN",
    blockTime: "≈ 2h",
    bestFit: "Light jet",
    summary:
      "Southeast–Northeast shuttle for meetings that can’t absorb commercial connection risk.",
    faqs: [
      {
        q: "Preferred Atlanta FBO airport?",
        a: "Peachtree–DeKalb (PDK) is a frequent private aviation choice.",
      },
    ],
  },
];

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
  },
  {
    slug: "midsize-jet",
    name: "Midsize jet",
    seats: "8–9",
    range: "Most domestic nonstops",
    bestFor: "Full cabin comfort with more luggage",
    examples: ["Citation XLS+", "Learjet 60XR", "Hawker 800XP"],
    summary:
      "A standing-ish cabin feel and stronger baggage for teams that outgrow light jets.",
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
  },
];

export const guides: Guide[] = [
  {
    slug: "how-much-does-a-private-jet-cost",
    title: "How much does a private jet cost in the USA?",
    description:
      "A clear guide to private jet charter pricing in the United States—what drives cost, empty legs, and how to request an accurate quote.",
    sections: [
      {
        heading: "Charter is priced by the trip—not a sticker",
        body: "Hourly rates vary by aircraft category, but your total depends on positioning, overnight fees, airport costs, peak dates, and whether an empty leg can be used. Treat published averages as orientation only.",
      },
      {
        heading: "What usually raises the price",
        body: "One-ways that force a ferry flight, holiday weekends, constrained airports (like Aspen), last-minute requests, and larger cabins all move the number. Flexibility on time or airport can reduce it.",
      },
      {
        heading: "How JetAeris quotes",
        body: "Share from/to/date/passengers. We return vetted options with transparent assumptions—so you compare aircraft and timing, not vague estimates.",
      },
    ],
  },
  {
    slug: "private-jet-new-york-to-miami-cost",
    title: "Private jet cost: New York to Miami",
    description:
      "What drives pricing on the New York–Miami private jet corridor, which aircraft fit, and how empty legs can change the number.",
    sections: [
      {
        heading: "A high-frequency corridor",
        body: "NY–Miami sees constant private traffic. That competition can help pricing—especially if you can use nearby FBOs or flex your departure window.",
      },
      {
        heading: "Aircraft that fit",
        body: "Light jets handle most couple/family trips. Midsize is common for teams with bags or pets. Ask for both categories when you request a quote.",
      },
      {
        heading: "Empty legs",
        body: "Weekend positioning often creates one-way opportunities. Note empty-leg interest on your request if dates are flexible.",
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
        body: "An empty leg is a positioning flight—an aircraft that must move with or without paying passengers. When your trip matches that movement, rates can drop meaningfully.",
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
        body: "Departure city/airport, arrival, date, passenger count, and any must-haves (pets, golf clubs, Wi-Fi). That is enough for a first round of options.",
      },
      {
        heading: "Compare options, then confirm",
        body: "Review aircraft category, timing, and operator. Once you choose, passenger details and payment secure the trip with the carrier partner.",
      },
      {
        heading: "Flight day",
        body: "Arrive at the FBO with ID. Ground transport and catering can be arranged in advance. Your desk remains available for day-of changes.",
      },
    ],
  },
];

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
