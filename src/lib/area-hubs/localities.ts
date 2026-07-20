import { LOCALITY_SEED } from "@/lib/chennai-map/locality-seed";
import { normalizeAreaHubSlug } from "@/lib/area-hubs/geography";
import type { AreaHubLocalityCard } from "./types";

/** Localities whose primary macro hub matches `hubSlug`. */
export function localityCardsForHub(hubSlug: string): AreaHubLocalityCard[] {
  const slug = normalizeAreaHubSlug(hubSlug) ?? hubSlug;
  return Object.values(LOCALITY_SEED)
    .filter((l) => normalizeAreaHubSlug(l.primaryHubSlug) === slug)
    .map((l) => ({
      id: l.id,
      name: l.name,
      zone: l.zone,
      description: l.description,
      tags: l.tags,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
