/**
 * Builds civic-geo bundle from chennai-map wards + editorial seed data.
 * Output: public/data/civic-geo/*.json
 */

import fs from "node:fs";
import path from "node:path";
import type { WardPathRecord } from "../src/lib/chennai-map/types";
import { DATAMEET_WARDS_PROVENANCE } from "../src/lib/civic-geo/provenance";
import {
  centroidFromSvgPath,
  svgToLngLat,
} from "../src/lib/civic-geo/geo-utils";
import { PIN_WARD_HINTS_SEED } from "../data/civic-geo/pin-ward-hints";
import { WARD_MIGRATION_SEED } from "../data/civic-geo/ward-migration";
import { ZONAL_OFFICE_SEED } from "../data/civic-geo/zonal-offices";
import { buildZoneMetricsSeed } from "../data/civic-geo/zone-metrics";
import type {
  CivicWard15,
  LayerMeta,
  ZonalOfficeRecord,
} from "../src/lib/civic-geo/types";

const ROOT = path.join(__dirname, "..");
const MAP_DIR = path.join(ROOT, "public", "data", "chennai-map");
const OUT_DIR = path.join(ROOT, "public", "data", "civic-geo");
const CIVIC_GEO_VERSION = "civic-geo-v1";

function main(): void {
  const manifestPath = path.join(MAP_DIR, "manifest.json");
  const wardsPath = path.join(MAP_DIR, "wards.json");
  const zonesPath = path.join(MAP_DIR, "zones.json");

  if (!fs.existsSync(wardsPath) || !fs.existsSync(manifestPath)) {
    console.error(
      "[build-civic-geo-data] Missing chennai-map bundle. Run npm run geo:build first.",
    );
    process.exit(1);
  }

  const mapManifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const wards = JSON.parse(fs.readFileSync(wardsPath, "utf8")) as WardPathRecord[];
  const zonesJson = fs.existsSync(zonesPath)
    ? (JSON.parse(fs.readFileSync(zonesPath, "utf8")) as Record<
        string,
        { zoneId: string; zoneLabel: string; wardIds: string[] }
      >)
    : {};

  const wards15: CivicWard15[] = wards
    .filter((w) => w.wardNo > 0)
    .map((w) => {
    const { x, y } = centroidFromSvgPath(w.d);
    const { lng, lat } = svgToLngLat(x, y, mapManifest);
    return {
      wardId: w.id,
      wardNo: w.wardNo,
      zoneId: w.zoneId,
      zoneLabel: w.zoneLabel,
      localityId: w.localityId,
      centroidX: x,
      centroidY: y,
      centroidLng: lng,
      centroidLat: lat,
    };
    });

  const zoneLabelById = new Map<string, string>();
  for (const w of wards) zoneLabelById.set(w.zoneId, w.zoneLabel);

  const zones15: ZonalOfficeRecord[] = ZONAL_OFFICE_SEED.map((o) => ({
    ...o,
    zoneLabel: zoneLabelById.get(o.zoneId) ?? o.zoneId,
  }));

  const layersMeta: LayerMeta[] = [
    {
      layerId: "gcc-15",
      label: "Current 15 zones",
      status: "operational",
      statusLabel: "Operational",
      geometryAvailable: true,
      description:
        "Present Greater Chennai Corporation zonal structure (Zones I–XV).",
      provenance: DATAMEET_WARDS_PROVENANCE,
    },
    {
      layerId: "gcc-20-proposed",
      label: "Proposed 20 zones",
      status: "approved_future",
      statusLabel: "Approved future structure",
      geometryAvailable: false,
      description:
        "Future reorganisation map — geometry and ward assignments published only when officially verified.",
      provenance: {
        source: "Awaiting official GCC / government GIS for 20-zone structure",
        sourceDate: "2026-03-28",
        geographyVersion: "gcc-20-proposed",
        verificationStatus: "missing",
        methodology: "No verified ward-level geometry ingested.",
        confidence: "none",
      },
    },
    {
      layerId: "gcc-23-2022",
      label: "2022 23-zone map",
      status: "historical",
      statusLabel: "Historical proposal",
      geometryAvailable: false,
      description:
        "2022 delimitation proposal — shown only when verified historical data is available.",
      provenance: {
        source: "Awaiting verified historical 23-zone ward table",
        sourceDate: "2026-03-28",
        geographyVersion: "gcc-23-2022",
        verificationStatus: "missing",
        methodology: "No verified ward-level geometry ingested.",
        confidence: "none",
      },
    },
  ];

  const operationalZoneIds = new Set(zones15.map((zone) => zone.zoneId));
  const zoneMetricsInput = Object.values(zonesJson)
    .filter((zone) => operationalZoneIds.has(zone.zoneId))
    .map((zone) => ({
      zoneId: zone.zoneId,
      zoneLabel: zone.zoneLabel,
      wardCount: zone.wardIds.filter(
        (wardId) => wardId !== "ward-stm-st.-thomas-mount",
      ).length,
    }));
  const zoneMetrics = buildZoneMetricsSeed(zoneMetricsInput);

  const manifest = {
    version: CIVIC_GEO_VERSION,
    generatedAt: new Date().toISOString(),
    chennaiMapVersion: mapManifest.version,
    source: mapManifest.source,
    sourceLicenseNote: mapManifest.sourceLicenseNote,
    wardCount: wards15.length,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const write = (name: string, data: unknown) =>
    fs.writeFileSync(path.join(OUT_DIR, name), JSON.stringify(data, null, 0));

  write("manifest.json", manifest);
  write("layers-meta.json", layersMeta);
  write("wards-15.json", wards15);
  write("zones-15.json", zones15);
  write("ward-migration.json", WARD_MIGRATION_SEED);
  write("pin-hints.json", PIN_WARD_HINTS_SEED);
  write("councillors.json", []);
  write("zone-metrics.json", zoneMetrics);

  console.log(
    `[build-civic-geo-data] Wrote ${wards15.length} wards, ${zones15.length} zones, ${WARD_MIGRATION_SEED.length} migration rows.`,
  );
}

main();
