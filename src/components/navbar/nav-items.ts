export interface NavItem {
  name: string;
  href: string;
  badge?: string;
  description?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: "Home",         href: "#home" },
  { name: "About Me",     href: "#about" },
  { name: "Expertise",    href: "#expertise" },
  { name: "Experience",   href: "#experience" },
  { name: "Education",    href: "#education" },
  { name: "Achievements", href: "#achievements" },
  { name: "Gallery",      href: "#gallery" },
];

export interface VitalsData {
  heartRate: number;
  spo2: number;
  bpSystolic: number;
  bpDiastolic: number;
  etco2: number;
  bisScore: number;
  status: "STABLE" | "VIGILANT" | "OPTIMAL";
  drugInfusion: string;
}

export const DEFAULT_VITALS: VitalsData = {
  heartRate: 72,
  spo2: 99,
  bpSystolic: 118,
  bpDiastolic: 76,
  etco2: 36,
  bisScore: 48,
  status: "OPTIMAL",
  drugInfusion: "Propofol @ 120 mcg/kg/min",
};
