import { loadChennaiMapBundle } from "@/lib/chennai-map/load-map-bundle";
import { buildWards15FromMap } from "./build-wards-15";
import type {
  CivicGeoBundle,
  CivicGeoManifest,
  LayerMeta,
  PinWardHint,
  WardCouncillorRecord,
  WardMigrationRow,
  ZonalOfficeRecord,
  ZoneMetricsRecord,
} from "./types";

const BASE = "/data/civic-geo";

async function fetchJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url);
  if (!res.ok) return null;
  return (await res.json()) as T;
}

export async function loadCivicGeoBundle(
  baseUrl = BASE,
): Promise<CivicGeoBundle> {
  const mapBundle = await loadChennaiMapBundle();

  const [
    manifest,
    layersMeta,
    zones15,
    wardMigration,
    pinHints,
    councillors,
    zoneMetrics,
  ] = await Promise.all([
    fetchJson<CivicGeoManifest>(`${baseUrl}/manifest.json`),
    fetchJson<LayerMeta[]>(`${baseUrl}/layers-meta.json`),
    fetchJson<ZonalOfficeRecord[]>(`${baseUrl}/zones-15.json`),
    fetchJson<WardMigrationRow[]>(`${baseUrl}/ward-migration.json`),
    fetchJson<PinWardHint[]>(`${baseUrl}/pin-hints.json`),
    fetchJson<WardCouncillorRecord[]>(`${baseUrl}/councillors.json`),
    fetchJson<ZoneMetricsRecord[]>(`${baseUrl}/zone-metrics.json`),
  ]);

  if (!layersMeta || !zones15) {
    throw new Error("Civic geo bundle fetch failed");
  }

  const wards15 = buildWards15FromMap(mapBundle.wards, mapBundle.manifest);

  const resolvedManifest: CivicGeoManifest = manifest ?? {
    version: "civic-geo-runtime-v1",
    generatedAt: mapBundle.manifest.generatedAt,
    chennaiMapVersion: mapBundle.manifest.version,
    source: mapBundle.manifest.source,
    sourceLicenseNote: mapBundle.manifest.sourceLicenseNote,
    wardCount: wards15.length,
  };

  return {
    manifest: resolvedManifest,
    layersMeta,
    wards15,
    zones15,
    wardMigration: wardMigration ?? [],
    pinHints: pinHints ?? [],
    councillors: councillors ?? [],
    zoneMetrics: zoneMetrics ?? [],
  };
}
