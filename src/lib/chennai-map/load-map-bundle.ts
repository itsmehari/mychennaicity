import type {
  ChennaiMapManifest,
  LocalityRecord,
  WardPathRecord,
} from "./types";
import { normalizeAreaHubSlug } from "@/lib/area-hubs/geography";

const BASE = "/data/chennai-map";

export type ChennaiMapBundle = {
  manifest: ChennaiMapManifest;
  wards: WardPathRecord[];
  localities: Record<string, LocalityRecord>;
};

export async function loadChennaiMapBundle(
  baseUrl = BASE,
): Promise<ChennaiMapBundle> {
  const [manifestRes, wardsRes, locRes] = await Promise.all([
    fetch(`${baseUrl}/manifest.json`),
    fetch(`${baseUrl}/wards.json`),
    fetch(`${baseUrl}/localities.json`),
  ]);
  if (!manifestRes.ok || !wardsRes.ok || !locRes.ok) {
    throw new Error(
      `Chennai map bundle fetch failed: ${manifestRes.status} ${wardsRes.status} ${locRes.status}`,
    );
  }
  const manifest = (await manifestRes.json()) as ChennaiMapManifest;
  const wards = (await wardsRes.json()) as WardPathRecord[];
  const localities = (await locRes.json()) as Record<string, LocalityRecord>;
  for (const loc of Object.values(localities)) {
    const n = normalizeAreaHubSlug(loc.primaryHubSlug);
    if (n) loc.primaryHubSlug = n;
  }
  for (const w of wards) {
    const n = normalizeAreaHubSlug(w.primaryHubSlug);
    if (n) w.primaryHubSlug = n;
  }
  return { manifest, wards, localities };
}
