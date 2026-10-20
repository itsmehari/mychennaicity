/** Reader-submitted classified ad categories (stored in `classified_listings.category`). */
export const CLASSIFIED_CATEGORY_IDS = [
  "vehicles",
  "tuition",
  "services",
  "partnership",
  "flatmates-roommates",
  "wanted",
  "property",
] as const;

export type ClassifiedCategoryId = (typeof CLASSIFIED_CATEGORY_IDS)[number];

export type ClassifiedHubCategory = {
  id: ClassifiedCategoryId | "all";
  label: string;
  /** Short hub blurb when this filter is active. */
  description: string;
};

export const CLASSIFIED_HUB_CATEGORIES: ClassifiedHubCategory[] = [
  {
    id: "all",
    label: "All ads",
    description:
      "Reader-submitted wanted posts and local listings — vehicles, tuition, services, flatmates & roommates, and neighbourhood needs.",
  },
  {
    id: "vehicles",
    label: "Vehicles",
    description:
      "Used two-wheelers and cars for sale in Chennai — inspect RC, insurance, and the vehicle before you pay.",
  },
  {
    id: "flatmates-roommates",
    label: "Flatmates & Roommates",
    description:
      "Room and flatmate wanted posts in Chennai — shared flats, PG-style setups, and co-living near metro and IT corridors.",
  },
  {
    id: "tuition",
    label: "Tuition",
    description: "Tuition teacher wanted and tutor availability posts in Chennai.",
  },
  {
    id: "services",
    label: "Services",
    description: "Local service providers and neighbourhood help wanted in Chennai.",
  },
  {
    id: "partnership",
    label: "Partnership",
    description: "Business, contractor, and institutional partnership listings in Chennai and Tamil Nadu.",
  },
  {
    id: "wanted",
    label: "Wanted",
    description: "General wanted posts and reader requests across Chennai.",
  },
  {
    id: "property",
    label: "Property",
    description:
      "Sale, rent, plot, commercial, and buyer-requirement ads in Chennai. MyChennaiCity places the listing after you send the details.",
  },
];

const LABEL_BY_ID: Record<ClassifiedCategoryId, string> = {
  vehicles: "Vehicles",
  tuition: "Tuition",
  services: "Services",
  partnership: "Partnership",
  "flatmates-roommates": "Flatmates & Roommates",
  wanted: "Wanted",
  property: "Property",
};

export function isClassifiedCategoryId(value: string): value is ClassifiedCategoryId {
  return (CLASSIFIED_CATEGORY_IDS as readonly string[]).includes(value);
}

export function parseClassifiedCategoryParam(
  raw: string | undefined | null,
): ClassifiedCategoryId | null {
  const v = raw?.trim();
  if (!v || v === "all") return null;
  return isClassifiedCategoryId(v) ? v : null;
}

export function formatClassifiedCategoryLabel(category: string): string {
  const key = category.trim().toLowerCase();
  if (isClassifiedCategoryId(key)) return LABEL_BY_ID[key];
  return category
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function classifiedHubCategoryMeta(
  category: ClassifiedCategoryId | null,
): ClassifiedHubCategory {
  if (!category) return CLASSIFIED_HUB_CATEGORIES[0]!;
  return (
    CLASSIFIED_HUB_CATEGORIES.find((c) => c.id === category) ??
    CLASSIFIED_HUB_CATEGORIES[0]!
  );
}
