import { site } from "@/lib/site";

/** Top 5 USA private-aviation markets for the SEO information campaign. */
export const TOP_CITY_SLUGS = [
  "new-york",
  "los-angeles",
  "miami",
  "chicago",
  "dallas",
] as const;

export type TopCitySlug = (typeof TOP_CITY_SLUGS)[number];

export type CityAirportDeep = {
  code: string;
  name: string;
  bestFor: string;
  notes: string;
  ground: string;
};

export type TopCitySeo = {
  slug: TopCitySlug;
  name: string;
  state: string;
  rankLabel: string;
  heroSummary: string;
  marketThesis: string;
  knowledge: { heading: string; body: string; bullets?: string[] }[];
  airports: CityAirportDeep[];
  peakSeasons: { heading: string; body: string }[];
  costBands: {
    light: string;
    midsize: string;
    notes: string;
    updated: string;
  };
  topCorridors: { label: string; slug: string; why: string }[];
  travelerProfiles: string[];
  groundTransfer: string;
  neighborhoods: string[];
  faqs: { q: string; a: string }[];
};

export const topCitiesSeo: TopCitySeo[] = [
  {
    slug: "new-york",
    name: "New York",
    state: "NY",
    rankLabel: "#1 USA private aviation market (East Coast hub)",
    heroSummary:
      "New York is the densest private-aviation ecosystem in the United States—corporate weekdays, weekend South Florida runs, coast-to-coast nonstops, and the deepest FBO choice of any metro.",
    marketThesis:
      "Searchers who type “private jet New York,” “TEB charter,” or “New York to Miami private jet cost” want airports, timing, and price context—not luxury adjectives. JetAeris answers with corridor economics, FBO choice, and a quote path.",
    knowledge: [
      {
        heading: "How New York private aviation actually works",
        body: "Manhattan does not have a downtown jet runway. The market runs through Teterboro (TEB), Westchester (HPN), and—when needed—JFK or Newark. The winning plan is airport + limo as one itinerary. Door-to-door time beats block time for most NY travelers.",
        bullets: [
          "TEB dominates pure private ops for Manhattan and North Jersey",
          "HPN often wins for Westchester, Greenwich, and northern suburbs",
          "JFK/EWR matter when airline connectivity, customs, or operator preference requires them",
          "Peak Thursday/Friday South Florida demand tightens light- and midsize-jet availability",
        ],
      },
      {
        heading: "Corporate vs leisure demand patterns",
        body: "Weekdays skew corporate: board meetings, deal teams, and same-day multi-city East Coast hops. Weekends and holiday weeks skew leisure: Miami, Palm Beach, Aspen, and Nantucket/seasonal coasts. Empty-leg watches help when dates flex.",
      },
      {
        heading: "What a strong NY quote request includes",
        body: "Origin preference (TEB vs HPN), destination, date/window, passenger count, bags/pets, and ground address. That lets the desk avoid pricing the wrong airport or cabin.",
      },
    ],
    airports: [
      {
        code: "TEB",
        name: "Teterboro Airport",
        bestFor: "Manhattan / Midtown / North Jersey private aviation",
        notes:
          "The core NY business-aviation field. Multiple FBOs, heavy weekday traffic, and the default for many Part 135 operators serving the metro.",
        ground:
          "Hudson River crossings and midtown traffic dominate timing. Build buffer for rush hour; share exact pickup address.",
      },
      {
        code: "HPN",
        name: "Westchester County Airport",
        bestFor: "Westchester, Greenwich, northern suburbs",
        notes:
          "Often shorter ground time than TEB for northern addresses. Strong for leisure and corporate travelers living outside Manhattan.",
        ground:
          "I-287 / Merritt Parkway patterns matter. Limo from Greenwich or Scarsdale can beat a Manhattan–TEB plan.",
      },
      {
        code: "JFK",
        name: "John F. Kennedy International",
        bestFor: "Select international / operator-driven itineraries",
        notes:
          "Not the first choice for pure domestic private hops, but relevant for certain routings and connections.",
        ground:
          "Longer terminal/FBO logistics than TEB. Use only when the trip plan requires it.",
      },
      {
        code: "EWR",
        name: "Newark Liberty International",
        bestFor: "North Jersey / select repositionings",
        notes:
          "Useful for some operators and passengers west of the Hudson; still secondary to TEB for most charter.",
        ground: "Turnpike and airport roadway congestion—confirm FBO side early.",
      },
    ],
    peakSeasons: [
      {
        heading: "Winter South Florida rush",
        body: "November–April weekends and holidays push NY–Miami / Palm Beach demand. Book earlier for Thursday–Sunday windows.",
      },
      {
        heading: "Holiday and UN / event weeks",
        body: "Thanksgiving, Christmas/New Year, Fashion Week-adjacent peaks, and major UN or finance calendar weeks tighten TEB slots and aircraft.",
      },
      {
        heading: "Summer leisure diversification",
        body: "Northeast coasts, Nantucket/Martha’s Vineyard patterns, and Europe positioning can change empty-leg availability—even if you are flying domestically.",
      },
    ],
    costBands: {
      light: "$12,000–$24,000 typical short/medium one-ways (planning)",
      midsize: "$18,000–$36,000+ depending on corridor and positioning",
      notes:
        "NY–Miami light/midsize bands on our route page are a better micro-benchmark than a city-wide average. Coast-to-coast from NY prices like a different product.",
      updated: site.priceGuidanceUpdated,
    },
    topCorridors: [
      {
        label: "New York → Miami",
        slug: "new-york-miami",
        why: "Highest commercial search volume; weekend leisure + snowbird traffic.",
      },
      {
        label: "New York → Los Angeles",
        slug: "new-york-los-angeles",
        why: "Flagship coast-to-coast business and entertainment corridor.",
      },
      {
        label: "New York → Chicago",
        slug: "new-york-chicago",
        why: "Classic corporate same-day or overnight East–Midwest link.",
      },
      {
        label: "New York → Aspen",
        slug: "new-york-aspen",
        why: "Peak winter leisure; mountain ops and weather buffers matter.",
      },
    ],
    travelerProfiles: [
      "Finance and legal deal teams needing same-day returns",
      "Families splitting time between NYC and South Florida",
      "Executive assistants booking multi-city East Coast days",
      "Entertainment and media travelers connecting NY–LA",
    ],
    groundTransfer:
      "Treat limo as part of the aviation product. Manhattan–TEB, Greenwich–HPN, and Brooklyn/Queens plans differ by 30–90+ minutes depending on time of day. JetAeris can bundle FBO black-car with the flight quote.",
    neighborhoods: [
      "Manhattan",
      "Greenwich",
      "Westchester",
      "Brooklyn",
      "North Jersey",
    ],
    faqs: [
      {
        q: "Is TEB always better than HPN for Manhattan?",
        a: "Often yes for Midtown, but HPN can win for northern addresses. Share your ground address so we choose the shorter total day.",
      },
      {
        q: "How far in advance should I request a NY charter?",
        a: "Weekday corporate can be short-notice; peak Florida weekends and holidays need more lead time for aircraft and FBO handling.",
      },
      {
        q: "Can I fly private from JFK instead?",
        a: "Yes when the itinerary requires it, but most domestic private trips prefer TEB or HPN for speed.",
      },
    ],
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    state: "CA",
    rankLabel: "#2 West Coast private aviation powerhouse",
    heroSummary:
      "Los Angeles combines entertainment, coastal business, Orange County wealth, and the country’s classic short-hop market to Las Vegas—anchored by Van Nuys (VNY).",
    marketThesis:
      "LA search intent splits between “private jet Van Nuys,” “LA to Vegas charter,” and coast-to-coast NY/Miami trips. Content must separate short-hop economics from heavy nonstop missions.",
    knowledge: [
      {
        heading: "Van Nuys is the private aviation capital of LA",
        body: "VNY handles a huge share of business aviation. LAX remains relevant for certain operators and international-adjacent plans; BUR and SNA cover Burbank and Orange County ground logic.",
        bullets: [
          "VNY: default for many Part 135 trips in the basin",
          "SNA: often smarter for Newport Beach / OC addresses",
          "BUR: useful for east San Fernando / Glendale patterns",
          "LAX: selective use—not the default for pure private hops",
        ],
      },
      {
        heading: "Traffic is part of the flight plan",
        body: "A 25-minute flight to Las Vegas can sit behind a 90-minute drive to the wrong airport. JetAeris plans airport + ground together.",
      },
      {
        heading: "Entertainment and production calendars",
        body: "Awards season, production shoots, and weekend Vegas events create burst demand. Flexible departure windows help capture better aircraft and pricing.",
      },
    ],
    airports: [
      {
        code: "VNY",
        name: "Van Nuys Airport",
        bestFor: "Westside, Valley, most pure private trips",
        notes:
          "One of the world’s busiest general aviation airports—deep FBO competition and operator familiarity.",
        ground:
          "405/101 congestion defines the day. Build buffers for westside pickups.",
      },
      {
        code: "SNA",
        name: "John Wayne Airport",
        bestFor: "Orange County / Newport Beach",
        notes:
          "Often the correct private-capable choice when the traveler lives or meets in OC.",
        ground: "Avoid forcing a VNY drive when SNA cuts an hour.",
      },
      {
        code: "BUR",
        name: "Hollywood Burbank Airport",
        bestFor: "East Valley / studio-adjacent itineraries",
        notes: "Complementary to VNY depending on address and operator.",
        ground: "Shorter for some studio and Glendale patterns.",
      },
      {
        code: "LAX",
        name: "Los Angeles International",
        bestFor: "Select itineraries / airline-adjacent needs",
        notes: "Heavier commercial environment; use deliberately.",
        ground: "Allow extra time for airport roadway complexity.",
      },
    ],
    peakSeasons: [
      {
        heading: "Awards / entertainment peaks",
        body: "Late winter into spring event weeks tighten cabin and FBO demand—especially for NY and Vegas links.",
      },
      {
        heading: "Weekend Las Vegas surges",
        body: "Fight nights, residencies, and conventions spike short-hop light-jet demand. Empty legs appear and disappear quickly.",
      },
      {
        heading: "Summer heat and payload",
        body: "High temperatures can affect light-jet payload—declare bags and passenger count early.",
      },
    ],
    costBands: {
      light: "LA–Vegas style short hops often $8,000–$16,000 one-way (planning)",
      midsize: "Regional midsize commonly $14,000–$28,000; coast-to-coast much higher",
      notes:
        "Do not price LA–NY like LA–LAS. Aircraft class and winds dominate transcon totals.",
      updated: site.priceGuidanceUpdated,
    },
    topCorridors: [
      {
        label: "Los Angeles → Las Vegas",
        slug: "los-angeles-las-vegas",
        why: "Highest-frequency short hop; empty-leg and event-driven pricing.",
      },
      {
        label: "Los Angeles → New York",
        slug: "los-angeles-new-york",
        why: "Transcon business/entertainment flagship.",
      },
      {
        label: "Los Angeles → San Francisco",
        slug: "los-angeles-san-francisco",
        why: "Same-day Bay Area meetings without airline schedule friction.",
      },
      {
        label: "Los Angeles → Aspen",
        slug: "los-angeles-aspen",
        why: "Winter leisure; mountain ops planning required.",
      },
    ],
    travelerProfiles: [
      "Entertainment principals and production teams",
      "OC families avoiding LAX airline chaos",
      "Founders doing LA–SF same-day loops",
      "Groups heading to Vegas events",
    ],
    groundTransfer:
      "Westside–VNY, OC–SNA, and downtown–BUR are different products. Request limo with the quote so wheels-up matches curb time.",
    neighborhoods: [
      "Beverly Hills",
      "Santa Monica",
      "Malibu",
      "Orange County",
      "Hollywood Hills",
    ],
    faqs: [
      {
        q: "Should I always fly out of Van Nuys?",
        a: "VNY is the default for many trips, but SNA or BUR can be faster overall depending on your address.",
      },
      {
        q: "Is LA to Vegas worth a private jet?",
        a: "For groups and event timing, yes—especially when commercial connections or delays risk the evening plan. Compare per-person charter vs first class + time.",
      },
    ],
  },
  {
    slug: "miami",
    name: "Miami",
    state: "FL",
    rankLabel: "#3 South Florida demand magnet",
    heroSummary:
      "Miami and South Florida absorb Northeast wealth, Latin American connectivity, and year-round event traffic—with OPF and PBI as core private-aviation gateways.",
    marketThesis:
      "“Private jet to Miami” and “New York to Miami private jet cost” are top commercial queries. Rank by publishing airport choice, seasonal peaks, and estimate bands—then a quote CTA.",
    knowledge: [
      {
        heading: "Opa-locka vs MIA vs Palm Beach",
        body: "OPF is a primary private-aviation gateway for Miami proper. PBI often wins for Palm Beach County. MIA is used selectively. FLL can serve Broward addresses. Ground address decides the field.",
      },
      {
        heading: "Seasonality is extreme",
        body: "Art Basel, boat shows, holidays, and spring break compress FBO capacity. Summer thunderstorms shift afternoon departure reliability. Flexible windows help.",
      },
      {
        heading: "Empty legs and Northeast positioning",
        body: "Aircraft repositioning between NY and South Florida creates empty-leg opportunities—and cancellations when schedules change. Status must stay honest.",
      },
    ],
    airports: [
      {
        code: "OPF",
        name: "Miami-Opa Locka Executive",
        bestFor: "Miami / Miami Beach private aviation",
        notes: "Core Part 135 gateway for many Miami charters.",
        ground: "Brickell, South Beach, and Coral Gables drives vary widely by hour.",
      },
      {
        code: "PBI",
        name: "Palm Beach International",
        bestFor: "Palm Beach / northern South Florida",
        notes: "Often the correct field for Palm Beach County travelers.",
        ground: "Do not force OPF when PBI saves an hour-plus.",
      },
      {
        code: "FLL",
        name: "Fort Lauderdale-Hollywood International",
        bestFor: "Broward / some repositionings",
        notes: "Useful depending on address and operator.",
        ground: "Plan I-95 timing carefully.",
      },
      {
        code: "MIA",
        name: "Miami International",
        bestFor: "Select itineraries",
        notes: "Heavier commercial environment; use with intent.",
        ground: "Allow extra logistics time vs OPF.",
      },
    ],
    peakSeasons: [
      {
        heading: "Winter high season",
        body: "Roughly November–April: Northeast arrivals, holidays, and events. Aircraft and FBO handling tighten on peak weekends.",
      },
      {
        heading: "Art Basel and major events",
        body: "Early December and marquee event weeks require earlier requests and realistic ground buffers.",
      },
      {
        heading: "Summer weather",
        body: "Afternoon convection can delay; morning departures are often more reliable.",
      },
    ],
    costBands: {
      light: "NY–Miami style bands often ~$12,000–$24,000 light one-way (planning)",
      midsize: "Often ~$18,000–$36,000 midsize one-way off-peak; peaks higher",
      notes:
        "Event weeks and one-way positioning can exceed planning bands. See the live NY–Miami route page for date-stamped ranges.",
      updated: site.priceGuidanceUpdated,
    },
    topCorridors: [
      {
        label: "New York → Miami",
        slug: "new-york-miami",
        why: "Flagship leisure/corporate corridor into South Florida.",
      },
      {
        label: "Chicago → Miami",
        slug: "chicago-miami",
        why: "Midwest–Florida leisure and second-home traffic.",
      },
      {
        label: "Dallas → Miami",
        slug: "dallas-miami",
        why: "Texas–Florida business and leisure link.",
      },
      {
        label: "Atlanta → Miami",
        slug: "atlanta-miami",
        why: "Southeast short/medium hop with strong commercial search.",
      },
    ],
    travelerProfiles: [
      "NY snowbirds and weekend leisure travelers",
      "Latin American business visitors using Miami as a hub",
      "Event attendees (Art Basel, boat shows, sports)",
      "Families splitting time between Florida and the Northeast",
    ],
    groundTransfer:
      "South Beach, Brickell, Palm Beach, and Fort Lauderdale are different ground products. Bundle limo with the quote for wheels-down timing.",
    neighborhoods: [
      "South Beach",
      "Brickell",
      "Palm Beach",
      "Fort Lauderdale",
      "Coral Gables",
    ],
    faqs: [
      {
        q: "OPF or PBI for Palm Beach?",
        a: "PBI is usually better for Palm Beach County. OPF is typically better for Miami/Miami Beach.",
      },
      {
        q: "Are empty legs common into Miami?",
        a: "They appear often on Northeast repositionings, but they can cancel. We confirm operator status before you treat a listing as locked.",
      },
    ],
  },
  {
    slug: "chicago",
    name: "Chicago",
    state: "IL",
    rankLabel: "#4 Midwest corporate & Florida leisure hub",
    heroSummary:
      "Chicago anchors Midwest corporate flying with strong Florida leisure demand—using Midway-area private options, Palwaukee (PWK), and ORD when needed.",
    marketThesis:
      "Chicago content should teach airport choice (PWK vs MDW vs ORD), winter ops reality, and the Miami/NY corridors that drive search.",
    knowledge: [
      {
        heading: "Private aviation around Chicago",
        body: "PWK (Chicago Executive) is a major business-aviation gateway. Midway-area options serve many city trips; ORD is selective. Winter weather and lake-effect patterns belong in every serious plan.",
      },
      {
        heading: "Corporate rhythm",
        body: "Loop and suburb executive travel favors morning departures and same-day returns to NY, Dallas, Atlanta, or Denver. Assistants should send hard meeting times with the quote.",
      },
      {
        heading: "Florida and mountain leisure",
        body: "Chicago–Miami and seasonal Aspen/Denver demand create predictable peaks. Empty legs can help when dates flex.",
      },
    ],
    airports: [
      {
        code: "PWK",
        name: "Chicago Executive (Palwaukee)",
        bestFor: "North Shore / many corporate private trips",
        notes: "Core business-aviation field for the metro.",
        ground: "North Shore limo timing is often better than forcing ORD.",
      },
      {
        code: "MDW",
        name: "Chicago Midway International",
        bestFor: "City-south / select private-capable itineraries",
        notes: "Useful depending on address and operator.",
        ground: "City traffic patterns differ sharply by time of day.",
      },
      {
        code: "ORD",
        name: "O’Hare International",
        bestFor: "Select itineraries",
        notes: "Heavy commercial environment—use when the trip requires it.",
        ground: "Build extra buffer vs PWK for pure private hops.",
      },
    ],
    peakSeasons: [
      {
        heading: "Winter weather ops",
        body: "De-icing, delays, and alternate airports are normal. Honest quotes include weather contingency language.",
      },
      {
        heading: "Holiday Florida lift",
        body: "Thanksgiving through spring break strengthens Chicago–Miami demand.",
      },
    ],
    costBands: {
      light: "Regional light-jet one-ways often ~$10,000–$22,000 (planning)",
      midsize: "Commonly ~$16,000–$34,000 depending on distance/positioning",
      notes:
        "Chicago–Miami and Chicago–NY are better priced on their route pages than via a single city average.",
      updated: site.priceGuidanceUpdated,
    },
    topCorridors: [
      {
        label: "Chicago → Miami",
        slug: "chicago-miami",
        why: "Top leisure search corridor from the Midwest.",
      },
      {
        label: "Chicago → New York",
        slug: "chicago-new-york",
        why: "Core corporate East Coast link.",
      },
      {
        label: "Chicago → Aspen",
        slug: "chicago-aspen",
        why: "Seasonal mountain leisure with ops complexity.",
      },
      {
        label: "Atlanta → Chicago",
        slug: "atlanta-chicago",
        why: "Southeast–Midwest business traffic.",
      },
    ],
    travelerProfiles: [
      "Corporate teams in the Loop and suburbs",
      "Families flying to South Florida for winter breaks",
      "Executive assistants running multi-city Midwest days",
    ],
    groundTransfer:
      "North Shore vs downtown vs west suburbs change the correct airport. Bundle limo to protect meeting times.",
    neighborhoods: ["Loop", "North Shore", "Naperville", "West suburbs"],
    faqs: [
      {
        q: "PWK or Midway for downtown meetings?",
        a: "It depends on exact address and time of day—share both so we minimize total door-to-door time.",
      },
      {
        q: "Do winters make private flying unreliable?",
        a: "Weather can delay any flight. Private aviation’s advantage is flexible airports and timing—not immunity to ice and snow.",
      },
    ],
  },
  {
    slug: "dallas",
    name: "Dallas",
    state: "TX",
    rankLabel: "#5 Texas corporate & mountain leisure gateway",
    heroSummary:
      "Dallas–Fort Worth pairs year-round Texas corporate flying with mountain leisure (Aspen) and coastal links—centered on Love Field (DAL), Addison (ADS), and DFW when required.",
    marketThesis:
      "Dallas SEO wins by explaining DAL vs ADS vs DFW, Aspen winter ops, and Miami/LA/NY corridor economics for Texas-based travelers.",
    knowledge: [
      {
        heading: "DAL and ADS for private aviation",
        body: "Love Field and Addison cover most business-aviation needs. DFW is large and commercial-heavy—use when the itinerary truly needs it.",
      },
      {
        heading: "Texas corporate tempo",
        body: "Energy, finance, and multi-city Texas/Oklahoma/Colorado days are common. Same-day returns favor midsize comfort on longer legs.",
      },
      {
        heading: "Mountain leisure awareness",
        body: "Dallas–Aspen is a signature winter corridor. Runway, weather, and density altitude planning matter—request early for peak ski weeks.",
      },
    ],
    airports: [
      {
        code: "DAL",
        name: "Dallas Love Field",
        bestFor: "Many corporate and leisure private trips",
        notes: "Central, operator-familiar, strong private-capable access.",
        ground: "Uptown / downtown drives are often shorter than DFW.",
      },
      {
        code: "ADS",
        name: "Addison Airport",
        bestFor: "North Dallas private aviation",
        notes: "Popular general aviation / business aviation field.",
        ground: "Often ideal for Plano / North Dallas addresses.",
      },
      {
        code: "DFW",
        name: "Dallas/Fort Worth International",
        bestFor: "Select itineraries",
        notes: "Use deliberately given commercial scale.",
        ground: "Longer airport campus times—budget accordingly.",
      },
    ],
    peakSeasons: [
      {
        heading: "Ski season Aspen demand",
        body: "Holiday and peak ski weeks fill mountain-capable cabins. Flexibility on departure time helps.",
      },
      {
        heading: "Summer heat",
        body: "High temperatures can affect performance/payload on lighter jets—declare bags early.",
      },
    ],
    costBands: {
      light: "Regional light one-ways often ~$10,000–$22,000 (planning)",
      midsize: "Commonly ~$16,000–$36,000; mountain/coastal peaks higher",
      notes:
        "Dallas–Aspen and Dallas–Miami should be quoted on corridor pages with seasonal assumptions.",
      updated: site.priceGuidanceUpdated,
    },
    topCorridors: [
      {
        label: "Dallas → Aspen",
        slug: "dallas-aspen",
        why: "Signature Texas–mountain leisure corridor.",
      },
      {
        label: "Dallas → Miami",
        slug: "dallas-miami",
        why: "Coastal leisure/business demand.",
      },
      {
        label: "Dallas → Los Angeles",
        slug: "dallas-los-angeles",
        why: "West Coast corporate and entertainment link.",
      },
      {
        label: "Dallas → New York",
        slug: "dallas-new-york",
        why: "Longer domestic corporate nonstop demand.",
      },
    ],
    travelerProfiles: [
      "DFW corporate executives and deal teams",
      "Families heading to Aspen or Miami",
      "Assistants coordinating multi-leg Texas weeks",
    ],
    groundTransfer:
      "Uptown, Plano, and Fort Worth change DAL vs ADS logic. Include limo on the quote for reliable curb-to-cabin timing.",
    neighborhoods: ["Uptown", "Plano", "Fort Worth", "Legacy"],
    faqs: [
      {
        q: "Love Field or Addison?",
        a: "Both are strong private-capable fields. Your address and operator availability decide—share both preferences if you have them.",
      },
      {
        q: "How early for Aspen peak weeks?",
        a: "Earlier than a normal domestic hop. Mountain capacity and weather mean peak dates should be requested as soon as plans firm up.",
      },
    ],
  },
];

export function getTopCitySeo(slug: string) {
  return topCitiesSeo.find((c) => c.slug === slug);
}

export function isTopCity(slug: string): slug is TopCitySlug {
  return (TOP_CITY_SLUGS as readonly string[]).includes(slug);
}
