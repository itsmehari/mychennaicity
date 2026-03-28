import type {
  ChennaiMapManifest,
  LocalityRecord,
  WardPathRecord,
} from "./types";

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
  return { manifest, wards, localities };
}
