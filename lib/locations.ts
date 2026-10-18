/**
 * Location Hierarchy and Configuration for Buner, KPK
 * Focused Tehsil: Tehsil Mandanr (Anchor Facility: Karam Shah Hospital, Nawagai)
 */

export interface LocationArea {
  name: string;
  fullName: string;
  displayName?: string;
  tehsil: string;
  district: string;
  isPrimary?: boolean;
  hospitalBase?: boolean;
  description?: string;
}

export const MANDANR_AREAS: LocationArea[] = [
  {
    name: "Nawagai",
    fullName: "Nawagai",
    displayName: "Nawagai — (Karam Shah Hospital Base, Tehsil Mandanr, Buner)",
    tehsil: "Mandanr",
    district: "Buner",
    isPrimary: true,
    hospitalBase: true,
    description: "Anchor Base — Karam Shah Hospital & Khidmat-e-Insaniyat Blood Bank",
  },
  {
    name: "Totalai",
    fullName: "Totalai",
    displayName: "Totalai — Tehsil Mandanr, Buner",
    tehsil: "Mandanr",
    district: "Buner",
    description: "Union Council & Key Population Hub",
  },
  {
    name: "Balo Khan",
    fullName: "Balo Khan",
    displayName: "Balo Khan — Tehsil Mandanr, Buner",
    tehsil: "Mandanr",
    district: "Buner",
  },
  {
    name: "Chinglai",
    fullName: "Chinglai",
    displayName: "Chinglai — Tehsil Mandanr, Buner",
    tehsil: "Mandanr",
    district: "Buner",
  },
  {
    name: "Rega",
    fullName: "Rega",
    displayName: "Rega — Tehsil Mandanr, Buner",
    tehsil: "Mandanr",
    district: "Buner",
  },
  {
    name: "Amazai",
    fullName: "Amazai",
    displayName: "Amazai — Tehsil Mandanr, Buner",
    tehsil: "Mandanr",
    district: "Buner",
  },
  {
    name: "Mandanr Proper",
    fullName: "Mandanr Proper",
    displayName: "Mandanr Proper — Tehsil Mandanr, Buner",
    tehsil: "Mandanr",
    district: "Buner",
  },
];

export const OTHER_PAKISTAN_CITIES = [
  "Abbottabad",
  "Buner",
  "Peshawar",
  "Islamabad",
  "Rawalpindi",
  "Swat",
  "Mardan",
  "Swabi",
  "Haripur",
  "Mansehra",
  "Lahore",
  "Karachi",
  "Quetta",
  "Multan",
  "Faisalabad",
];

export const PRIMARY_HOSPITAL_LOCATION = "Karam Shah Hospital, Nawagai, Tehsil Mandanr, Buner";
export const DEFAULT_SEARCH_LOCATION = "all";

export function normalizeLocationName(loc?: string): string {
  if (!loc || loc.trim().toLowerCase() === "all") return "all";
  const primary = loc.split(",")[0].trim();
  return primary.charAt(0).toUpperCase() + primary.slice(1);
}
