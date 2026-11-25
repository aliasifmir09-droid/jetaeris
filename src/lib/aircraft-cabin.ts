import { aircraft, type Aircraft } from "@/lib/content";

/**
 * First-time flyer cabin experience — representative class visuals & seat maps.
 * Not a specific tail; the operating carrier names the aircraft on confirmation.
 */

export type CabinSeat = {
  id: string;
  /** Row from nose (0 = cockpit bulkhead) */
  row: number;
  /** 0 = left aisle, 1 = right aisle */
  side: 0 | 1;
  /** Optional: facing aft (club) */
  facing?: "fwd" | "aft";
  zone?: "cabin" | "divan" | "conference";
};

export type AircraftCabinExperience = Aircraft & {
  typicalSeats: number;
  seatMax: number;
  cabinFeel: string;
  heightNote: string;
  bagsNote: string;
  interiorLead: string;
  interiorPoints: string[];
  firstTimerTip: string;
  exteriorSrc: string;
  cabinSrc: string;
  windowSrc: string;
  /** Top-down layout for the animated seat map */
  seatMap: CabinSeat[];
};

const SHARED_WINDOW = "/media/cabin-window-uhd.jpg";

const lightSeats: CabinSeat[] = [
  { id: "L1", row: 0, side: 0, facing: "fwd" },
  { id: "R1", row: 0, side: 1, facing: "fwd" },
  { id: "L2", row: 1, side: 0, facing: "aft" },
  { id: "R2", row: 1, side: 1, facing: "aft" },
  { id: "L3", row: 2, side: 0, facing: "fwd" },
  { id: "R3", row: 2, side: 1, facing: "fwd" },
  { id: "L4", row: 3, side: 0, facing: "fwd" },
  { id: "R4", row: 3, side: 1, facing: "fwd" },
];

const midSeats: CabinSeat[] = [
  { id: "L1", row: 0, side: 0, facing: "fwd" },
  { id: "R1", row: 0, side: 1, facing: "fwd" },
  { id: "L2", row: 1, side: 0, facing: "aft" },
  { id: "R2", row: 1, side: 1, facing: "aft" },
  { id: "L3", row: 2, side: 0, facing: "fwd" },
  { id: "R3", row: 2, side: 1, facing: "fwd" },
  { id: "L4", row: 3, side: 0, facing: "fwd" },
  { id: "R4", row: 3, side: 1, facing: "fwd" },
  { id: "L5", row: 4, side: 0, facing: "fwd" },
];

const superSeats: CabinSeat[] = [
  { id: "L1", row: 0, side: 0, facing: "fwd", zone: "conference" },
  { id: "R1", row: 0, side: 1, facing: "fwd", zone: "conference" },
  { id: "L2", row: 1, side: 0, facing: "aft", zone: "conference" },
  { id: "R2", row: 1, side: 1, facing: "aft", zone: "conference" },
  { id: "L3", row: 2, side: 0, facing: "fwd" },
  { id: "R3", row: 2, side: 1, facing: "fwd" },
  { id: "L4", row: 3, side: 0, facing: "fwd" },
  { id: "R4", row: 3, side: 1, facing: "fwd" },
  { id: "L5", row: 4, side: 0, facing: "fwd" },
  { id: "R5", row: 4, side: 1, facing: "fwd" },
];

const heavySeats: CabinSeat[] = [
  { id: "L1", row: 0, side: 0, facing: "fwd", zone: "conference" },
  { id: "R1", row: 0, side: 1, facing: "fwd", zone: "conference" },
  { id: "L2", row: 1, side: 0, facing: "aft", zone: "conference" },
  { id: "R2", row: 1, side: 1, facing: "aft", zone: "conference" },
  { id: "L3", row: 2, side: 0, facing: "fwd" },
  { id: "R3", row: 2, side: 1, facing: "fwd" },
  { id: "L4", row: 3, side: 0, facing: "fwd" },
  { id: "R4", row: 3, side: 1, facing: "fwd" },
  { id: "L5", row: 4, side: 0, facing: "fwd" },
  { id: "R5", row: 4, side: 1, facing: "fwd" },
  { id: "L6", row: 5, side: 0, facing: "fwd" },
  { id: "R6", row: 5, side: 1, facing: "fwd" },
  { id: "L7", row: 6, side: 0, facing: "fwd" },
  { id: "R7", row: 6, side: 1, facing: "fwd" },
  { id: "L8", row: 7, side: 0, facing: "fwd" },
  { id: "R8", row: 7, side: 1, facing: "fwd" },
];

const bySlug: Record<
  string,
  Omit<AircraftCabinExperience, keyof Aircraft>
> = {
  "light-jet": {
    typicalSeats: 7,
    seatMax: 8,
    cabinFeel: "Intimate club cabin — close enough to talk across the aisle.",
    heightNote: "Sit-down cabin on most light jets; easy boarding.",
    bagsNote: "Soft bags and light luggage; declare clubs or pets early.",
    interiorLead:
      "Think first-class lounge for a couple or small team—fast, quiet, and efficient on short USA hops.",
    interiorPoints: [
      "Club or club-plus seating for conversation",
      "Large oval windows relative to cabin size",
      "Quick FBO turns — often the smartest value under ~3 hours",
    ],
    firstTimerTip:
      "If you are 1–6 people on a short corridor, start here. Step up only if you need stand-up height or more bags.",
    exteriorSrc: "/media/cinematic-jet-uhd.jpg",
    cabinSrc: "/media/cabin-light-uhd.jpg",
    windowSrc: SHARED_WINDOW,
    seatMap: lightSeats,
  },
  "midsize-jet": {
    typicalSeats: 8,
    seatMax: 9,
    cabinFeel: "Roomier aisle and enclosed lav on many airframes.",
    heightNote: "Near stand-up feel on many midsize cabins.",
    bagsNote: "Better hold for weekend luggage and golf clubs.",
    interiorLead:
      "The step up when light jet feels tight—more cabin volume without jumping to heavy-jet cost.",
    interiorPoints: [
      "Club seating with more elbow room",
      "Enclosed lavatory on most midsize types",
      "Strong fit for 4–8 passengers with luggage",
    ],
    firstTimerTip:
      "Choose midsize when bags, pets, or passenger comfort matter more than the lowest hourly band.",
    exteriorSrc: "/media/jet-climb-uhd.jpg",
    cabinSrc: "/media/cabin-midsize-uhd.jpg",
    windowSrc: SHARED_WINDOW,
    seatMap: midSeats,
  },
  "super-midsize-jet": {
    typicalSeats: 9,
    seatMax: 10,
    cabinFeel: "Conference club — work tables and true coast-to-coast range.",
    heightNote: "Stand-up cabin on most super-midsize types.",
    bagsNote: "Generous hold for teams traveling with luggage.",
    interiorLead:
      "The sweet spot for executive groups who need a productive cabin and nonstop coast-to-coast capability.",
    interiorPoints: [
      "Club / conference seating for meetings in the air",
      "True transcontinental range on many types",
      "Cabin connectivity expectations for working flights",
    ],
    firstTimerTip:
      "If your trip is NY–LA (or similar) with a working team, this is usually the first class that feels right.",
    exteriorSrc: "/media/jet-overhead-uhd.jpg",
    cabinSrc: "/media/cabin-super-uhd.jpg",
    windowSrc: SHARED_WINDOW,
    seatMap: superSeats,
  },
  "heavy-jet": {
    typicalSeats: 12,
    seatMax: 16,
    cabinFeel: "Multi-zone cabin — club, divan, and quiet aft seating.",
    heightNote: "Full stand-up height with multiple living zones.",
    bagsNote: "Large galley and baggage for long missions and big parties.",
    interiorLead:
      "Flagship comfort when the cabin is the boardroom and the destination is far—or the passenger count is high.",
    interiorPoints: [
      "Separate cabin zones for work, rest, and conversation",
      "Long-range / intercontinental capability",
      "Cabin service expectations match ultra-premium travel",
    ],
    firstTimerTip:
      "Step to heavy when passenger count, luggage, or nonstop distance outgrows midsize and super-midsize.",
    exteriorSrc: "/media/jet-cutout-uhd.jpg",
    cabinSrc: "/media/cabin-heavy-uhd.jpg",
    windowSrc: SHARED_WINDOW,
    seatMap: heavySeats,
  },
};

export const aircraftCabinExperiences: AircraftCabinExperience[] = aircraft.map(
  (a) => {
    const extra = bySlug[a.slug];
    if (!extra) {
      throw new Error(`Missing cabin experience for ${a.slug}`);
    }
    return { ...a, ...extra };
  },
);

export function getAircraftCabin(slug: string) {
  return aircraftCabinExperiences.find((a) => a.slug === slug);
}
