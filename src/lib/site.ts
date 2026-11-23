export const site = {
  name: "JetAeris",
  domain: "jetaeris.com",
  url: "https://jetaeris.com",
  tagline: "Private aviation for the United States",
  description:
    "JetAeris arranges on-demand private jet charter and empty-leg flights across the United States. Discreet concierge quoting, vetted operators, response measured in minutes.",
  phoneDisplay: "+1 (800) 555-0188",
  phoneHref: "tel:+18005550188",
  email: "concierge@jetaeris.com",
  locale: "en_US",
} as const;

export const nav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/empty-legs", label: "Empty legs" },
  { href: "/routes", label: "Routes" },
  { href: "/safety", label: "Safety" },
  { href: "/about", label: "About" },
] as const;

export const featuredRoutes = [
  {
    href: "/routes/new-york-miami",
    from: "New York",
    to: "Miami",
    airports: "TEB / JFK → OPF / MIA",
    time: "≈ 2h 45m",
  },
  {
    href: "/routes/los-angeles-las-vegas",
    from: "Los Angeles",
    to: "Las Vegas",
    airports: "VNY / LAX → LAS",
    time: "≈ 1h 10m",
  },
  {
    href: "/charter/new-york",
    from: "New York",
    to: "Charter hub",
    airports: "TEB · HPN · JFK · EWR",
    time: "Northeast access",
  },
  {
    href: "/charter/miami",
    from: "Miami",
    to: "Charter hub",
    airports: "OPF · MIA · FLL · PBI",
    time: "Florida access",
  },
] as const;

export const aircraftClasses = [
  {
    name: "Light jet",
    seats: "6–8",
    bestFor: "Short regional hops under ~3 hours",
    examples: "Citation CJ3, Phenom 300",
  },
  {
    name: "Midsize",
    seats: "8–9",
    bestFor: "Coast-to-coast comfort with a full cabin",
    examples: "Citation XLS+, Learjet 60",
  },
  {
    name: "Super-midsize",
    seats: "9–10",
    bestFor: "Transcontinental range and standing cabin",
    examples: "Challenger 350, Citation Latitude",
  },
  {
    name: "Heavy jet",
    seats: "10–16",
    bestFor: "Long-range, teams, and true intercontinental legs",
    examples: "Gulfstream G450, Challenger 650",
  },
] as const;

export const emptyLegs = [
  {
    id: "el-1",
    from: "Teterboro (TEB)",
    to: "Palm Beach (PBI)",
    date: "Mar 28",
    aircraft: "Citation XLS+",
    note: "One-way positioning · subject to confirmation",
  },
  {
    id: "el-2",
    from: "Van Nuys (VNY)",
    to: "Las Vegas (LAS)",
    date: "Mar 30",
    aircraft: "Phenom 300",
    note: "Afternoon departure window",
  },
  {
    id: "el-3",
    from: "Dallas Love (DAL)",
    to: "Aspen (ASE)",
    date: "Apr 2",
    aircraft: "Challenger 350",
    note: "Peak-season empty leg · limited hold",
  },
] as const;
