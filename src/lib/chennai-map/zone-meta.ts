/**
 * Maps GCC zone codes (Roman numerals from open datasets) to macro regions,
 * stable zone ids, and existing site area-hub slugs (/areas/[slug]).
 */

export type MacroRegionId = "north" | "central" | "south" | "extended";

export type ZoneMeta = {
  zoneId: string;
  zoneLabel: string;
  regionId: MacroRegionId;
  primaryHubSlug: string;
};

/** Roman numeral Zone_No as in Datameet GCC wards GeoJSON */
export const ZONE_ROMAN_TO_META: Record<string, ZoneMeta> = {
  I: {
    zoneId: "zone-thiruvottiyur",
    zoneLabel: "Thiruvottiyur",
    regionId: "north",
    primaryHubSlug: "tiruvottiyur-manali-belt",
  },
  II: {
    zoneId: "zone-manali",
    zoneLabel: "Manali",
    regionId: "north",
    primaryHubSlug: "tiruvottiyur-manali-belt",
  },
  III: {
    zoneId: "zone-madhavaram",
    zoneLabel: "Madhavaram",
    regionId: "north",
    primaryHubSlug: "madhavaram-madhavaram",
  },
  IV: {
    zoneId: "zone-tondiarpet",
    zoneLabel: "Tondiarpet",
    regionId: "north",
    primaryHubSlug: "royapuram-tondiarpet",
  },
  V: {
    zoneId: "zone-royapuram",
    zoneLabel: "Royapuram",
    regionId: "north",
    primaryHubSlug: "royapuram-tondiarpet",
  },
  VI: {
    zoneId: "zone-thiru-vi-ka-nagar",
    zoneLabel: "Thiru Vi Ka Nagar",
    regionId: "north",
    primaryHubSlug: "royapuram-tondiarpet",
  },
  VII: {
    zoneId: "zone-ambattur",
    zoneLabel: "Ambattur",
    regionId: "central",
    primaryHubSlug: "ambattur-annanagar",
  },
  VIII: {
    zoneId: "zone-annanagar",
    zoneLabel: "Anna Nagar",
    regionId: "central",
    primaryHubSlug: "ambattur-annanagar",
  },
  IX: {
    zoneId: "zone-teynampet",
    zoneLabel: "Teynampet",
    regionId: "central",
    primaryHubSlug: "teynampet-nungambakkam",
  },
  X: {
    zoneId: "zone-kodambakkam",
    zoneLabel: "Kodambakkam",
    regionId: "central",
    primaryHubSlug: "kodambakkam-t-nagar",
  },
  XI: {
    zoneId: "zone-valasaravakkam",
    zoneLabel: "Valasaravakkam",
    regionId: "central",
    primaryHubSlug: "valasaravakkam-porur",
  },
  XII: {
    zoneId: "zone-alandur",
    zoneLabel: "Alandur",
    regionId: "south",
    primaryHubSlug: "saidapet-guindy-alandur",
  },
  XIII: {
    zoneId: "zone-adyar",
    zoneLabel: "Adyar",
    regionId: "south",
    primaryHubSlug: "adyar-thiruvanmiyur",
  },
  XIV: {
    zoneId: "zone-perungudi",
    zoneLabel: "Perungudi",
    regionId: "south",
    primaryHubSlug: "omr-perungudi-sholinganallur",
  },
  XV: {
    zoneId: "zone-sholinganallur",
    zoneLabel: "Sholinganallur",
    regionId: "south",
    primaryHubSlug: "omr-perungudi-sholinganallur",
  },
};

export const EXTENDED_ZONE_META: ZoneMeta = {
  zoneId: "zone-st-thomas-mount",
  zoneLabel: "St. Thomas Mount",
  regionId: "extended",
  primaryHubSlug: "saidapet-guindy-alandur",
};

export function metaForZoneRoman(roman: string): ZoneMeta {
  const key = roman.trim().toUpperCase();
  if (key === "-" || key === "" || key === "NA")
    return EXTENDED_ZONE_META;
  return ZONE_ROMAN_TO_META[key] ?? EXTENDED_ZONE_META;
}
