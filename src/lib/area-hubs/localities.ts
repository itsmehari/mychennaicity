import { LOCALITY_SEED } from "@/lib/chennai-map/locality-seed";
import type { AreaHubLocalityCard } from "./types";

/** Localities whose primary macro hub matches `hubSlug`. */
export function localityCardsForHub(hubSlug: string): AreaHubLocalityCard[] {
  return Object.values(LOCALITY_SEED)
    .filter((l) => l.primaryHubSlug === hubSlug)
    .map((l) => ({
      id: l.id,
      name: l.name,
      zone: l.zone,
      description: l.description,
      tags: l.tags,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
