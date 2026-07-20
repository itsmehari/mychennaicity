import { chennaiZones, getChennaiZoneBySlug } from "@/lib/chennai-zones";
import { LOCALITY_SEED } from "@/lib/chennai-map/locality-seed";

/** Canonical macro hub slugs used by map wards and /areas/[slug]. */
export const AREA_HUB_SLUGS = chennaiZones.map((z) => z.slug);

const HUB_SLUG_SET = new Set(AREA_HUB_SLUGS);

/**
 * Legacy / orphan locality hub slugs → nearest canonical hub.
 * Keep map + area pages on one geography contract.
 */
const ORPHAN_HUB_REMAP: Record<string, string> = {
  "tambaram-pallavaram-medavakkam": "saidapet-guindy-alandur",
};

export function normalizeAreaHubSlug(raw: string | null | undefined): string | null {
  const s = raw?.trim();
  if (!s) return null;
  if (HUB_SLUG_SET.has(s)) return s;
  const remapped = ORPHAN_HUB_REMAP[s];
  return remapped && HUB_SLUG_SET.has(remapped) ? remapped : null;
}

/** Deep link into the homepage interactive map, focused on a macro hub. */
export function homeMapUrlForHub(hubSlug: string): string {
  const slug = normalizeAreaHubSlug(hubSlug) ?? hubSlug;
  return `/#areas?hub=${encodeURIComponent(slug)}`;
}

export function homeMapUrlForWard(wardNo: number, hubSlug?: string): string {
  const params = new URLSearchParams();
  if (hubSlug) params.set("hub", hubSlug);
  params.set("ward", String(wardNo));
  return `/#areas?${params.toString()}`;
}

export function localitiesForHub(hubSlug: string) {
  const slug = normalizeAreaHubSlug(hubSlug) ?? hubSlug;
  return Object.values(LOCALITY_SEED)
    .filter((l) => normalizeAreaHubSlug(l.primaryHubSlug) === slug)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Neighbouring hubs for “related areas” (manual adjacency, not crow-flies). */
const RELATED: Record<string, string[]> = {
  "tiruvottiyur-manali-belt": ["madhavaram-madhavaram", "royapuram-tondiarpet"],
  "madhavaram-madhavaram": ["tiruvottiyur-manali-belt", "ambattur-annanagar"],
  "royapuram-tondiarpet": [
    "tiruvottiyur-manali-belt",
    "teynampet-nungambakkam",
  ],
  "ambattur-annanagar": [
    "madhavaram-madhavaram",
    "valasaravakkam-porur",
    "teynampet-nungambakkam",
  ],
  "teynampet-nungambakkam": [
    "royapuram-tondiarpet",
    "kodambakkam-t-nagar",
    "adyar-thiruvanmiyur",
  ],
  "kodambakkam-t-nagar": [
    "teynampet-nungambakkam",
    "saidapet-guindy-alandur",
    "ambattur-annanagar",
  ],
  "saidapet-guindy-alandur": [
    "kodambakkam-t-nagar",
    "adyar-thiruvanmiyur",
    "omr-perungudi-sholinganallur",
    "valasaravakkam-porur",
  ],
  "adyar-thiruvanmiyur": [
    "teynampet-nungambakkam",
    "saidapet-guindy-alandur",
    "omr-perungudi-sholinganallur",
  ],
  "omr-perungudi-sholinganallur": [
    "adyar-thiruvanmiyur",
    "saidapet-guindy-alandur",
  ],
  "valasaravakkam-porur": [
    "ambattur-annanagar",
    "saidapet-guindy-alandur",
    "kodambakkam-t-nagar",
  ],
};

export function relatedHubsFor(hubSlug: string) {
  const ids = RELATED[hubSlug] ?? [];
  return ids
    .map((slug) => getChennaiZoneBySlug(slug))
    .filter((z): z is NonNullable<typeof z> => Boolean(z));
}

export function parseHomeMapQuery(search: string): {
  hub: string | null;
  ward: number | null;
} {
  const q = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(q);
  const hub = normalizeAreaHubSlug(params.get("hub"));
  const wardRaw = params.get("ward");
  const ward = wardRaw ? Number.parseInt(wardRaw, 10) : NaN;
  return {
    hub,
    ward: Number.isFinite(ward) ? ward : null,
  };
}
