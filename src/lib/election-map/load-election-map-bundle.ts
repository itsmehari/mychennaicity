import type { ConstituencyPathRecord, ElectionMapManifest } from "./types";

const BASE = "/data/election-map";

export type ElectionMapBundle = {
  manifest: ElectionMapManifest;
  constituencies: ConstituencyPathRecord[];
};

export async function loadElectionMapBundle(
  baseUrl = BASE,
): Promise<ElectionMapBundle> {
  const [manifestRes, consRes] = await Promise.all([
    fetch(`${baseUrl}/manifest.json`),
    fetch(`${baseUrl}/constituencies.json`),
  ]);
  if (!manifestRes.ok || !consRes.ok) {
    throw new Error(
      `Election map bundle fetch failed: ${manifestRes.status} ${consRes.status}`,
    );
  }
  const manifest = (await manifestRes.json()) as ElectionMapManifest;
  const constituencies = (await consRes.json()) as ConstituencyPathRecord[];
  return { manifest, constituencies };
}
