/**
 * GeoJSON (GCC wards) → simplified SVG paths + public JSON bundle.
 *
 * Input: data/chennai/wards.geojson (gitignored) or DATAMEET_WARDS_URL.
 * Output: public/data/chennai-map/*.json
 *
 * Source: Datameet Municipal_Spatial_Data Chennai/Wards.geojson — verify license (ODbL/CC) before production.
 */

import fs from "node:fs";
import path from "node:path";
import simplify from "@turf/simplify";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";
import bbox from "@turf/bbox";
import {
  createProjector,
  multipolygonToPaths,
  type BBox,
} from "../src/lib/chennai-map/project";
import { metaForZoneRoman } from "../src/lib/chennai-map/zone-meta";
import {
  LOCALITY_SEED,
  WARD_LOCALITY_OVERRIDE,
  buildSyntheticLocality,
  defaultLocalityIdForWard,
} from "../src/lib/chennai-map/locality-seed";
import type { LocalityRecord, WardPathRecord } from "../src/lib/chennai-map/types";

const ROOT = path.join(__dirname, "..");
const INPUT_PATH = path.join(ROOT, "data", "chennai", "wards.geojson");
const OUT_DIR = path.join(ROOT, "public", "data", "chennai-map");
const DATAMEET_WARDS_URL =
  "https://raw.githubusercontent.com/datameet/Municipal_Spatial_Data/master/Chennai/Wards.geojson";

const VIEW_W = 1000;
const VIEW_H = 780;
const SIMPLIFY_TOLERANCE_DEG = 0.00012;
const MAP_VERSION = "gcc-wards-datameet-v1";

async function loadGeoJsonAsync(): Promise<FeatureCollection> {
  if (fs.existsSync(INPUT_PATH)) {
    const raw = fs.readFileSync(INPUT_PATH, "utf8");
    return JSON.parse(raw) as FeatureCollection;
  }
  const r = await fetch(DATAMEET_WARDS_URL);
  if (!r.ok) throw new Error(`Fetch wards failed: ${r.status}`);
  return (await r.json()) as FeatureCollection;
}

function regionLabel(id: string): string {
  switch (id) {
    case "north":
      return "North Chennai";
    case "central":
      return "Central Chennai";
    case "south":
      return "South Chennai";
    case "extended":
      return "Greater Chennai / Extended";
    default:
      return "Greater Chennai";
  }
}

function geometryToPaths(
  g: Polygon | MultiPolygon,
  project: (lng: number, lat: number) => [number, number],
): string {
  if (g.type === "Polygon") {
    return multipolygonToPaths([g.coordinates], project);
  }
  return multipolygonToPaths(g.coordinates, project);
}

function main(): Promise<void> {
  return (async () => {
    const fc = await loadGeoJsonAsync();
    const crs = (fc as unknown as { crs?: { properties?: { name?: string } } }).crs;
    const crsName = crs?.properties?.name ?? "";
    if (crsName && !crsName.includes("CRS84") && !crsName.includes("4326")) {
      console.warn(`[build-chennai-map-data] Unexpected CRS: ${crsName}`);
    }

    const turfB = bbox(fc);
    const bboxFromTurf: BBox = {
      minLng: turfB[0]!,
      minLat: turfB[1]!,
      maxLng: turfB[2]!,
      maxLat: turfB[3]!,
    };

    const project = createProjector(bboxFromTurf, VIEW_W, VIEW_H, 14);

    const wards: WardPathRecord[] = [];
    const localityMap = new Map<string, LocalityRecord>();
  for (const k of Object.keys(LOCALITY_SEED)) {
    localityMap.set(k, LOCALITY_SEED[k]!);
  }

    let skipped = 0;
    for (const feature of fc.features) {
      const geom = feature.geometry;
      if (!geom || (geom.type !== "Polygon" && geom.type !== "MultiPolygon")) {
        skipped++;
        continue;
      }

      const props = (feature.properties ?? {}) as Record<string, unknown>;
      const wardNo = Number(props.Ward_No);
      const zoneRoman = String(props.Zone_No ?? "-").trim();
      const zoneName = String(props.Zone_Name ?? "Chennai").trim();
      const meta = metaForZoneRoman(zoneRoman);

      const simplified = simplify(feature as Feature<Polygon | MultiPolygon>, {
        tolerance: SIMPLIFY_TOLERANCE_DEG,
        highQuality: false,
        mutate: false,
      });

      const sg = simplified.geometry;
      if (!sg) {
        skipped++;
        continue;
      }

      const d = geometryToPaths(sg, project);
      if (!d) {
        skipped++;
        continue;
      }

      const id =
        wardNo === 0 || Number.isNaN(wardNo)
          ? `ward-stm-${zoneName.replace(/\s+/g, "-").toLowerCase()}`
          : `ward-${wardNo}`;

      const overrideLocality = !Number.isNaN(wardNo)
        ? WARD_LOCALITY_OVERRIDE[wardNo]
        : undefined;
      const localityId =
        overrideLocality ?? defaultLocalityIdForWard(wardNo || 0, zoneName);

      if (!localityMap.has(localityId)) {
        localityMap.set(
          localityId,
          buildSyntheticLocality(
            wardNo || 0,
            zoneName,
            zoneRoman === "-" ? "STM" : zoneRoman,
            regionLabel(meta.regionId),
            meta.primaryHubSlug,
          ),
        );
      }

      const loc = localityMap.get(localityId)!;

      wards.push({
        id,
        wardNo: Number.isNaN(wardNo) ? 0 : wardNo,
        d,
        zoneId: meta.zoneId,
        zoneLabel: meta.zoneLabel,
        zoneRoman: zoneRoman === "-" ? "STM" : zoneRoman,
        regionId: meta.regionId,
        primaryHubSlug: loc.primaryHubSlug,
        localityId,
      });
    }

    const manifest = {
      version: MAP_VERSION,
      generatedAt: new Date().toISOString(),
      source: "Datameet Municipal_Spatial_Data / Chennai / Wards.geojson",
      sourceLicenseNote:
        "Verify ODbL / community license terms before commercial use; attribute source.",
      featureCount: wards.length,
      viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
      bbox: bboxFromTurf,
      simplifyToleranceDeg: SIMPLIFY_TOLERANCE_DEG,
    };

    const zonesOut: Record<
      string,
      { zoneId: string; zoneLabel: string; regionId: string; wardIds: string[] }
    > = {};
    for (const w of wards) {
      if (!zonesOut[w.zoneId]) {
        zonesOut[w.zoneId] = {
          zoneId: w.zoneId,
          zoneLabel: w.zoneLabel,
          regionId: w.regionId,
          wardIds: [],
        };
      }
      zonesOut[w.zoneId]!.wardIds.push(w.id);
    }

    const regionsOut: Record<
      string,
      { regionId: string; label: string; zoneIds: string[] }
    > = {};
    for (const z of Object.values(zonesOut)) {
      if (!regionsOut[z.regionId]) {
        regionsOut[z.regionId] = {
          regionId: z.regionId,
          label: regionLabel(z.regionId),
          zoneIds: [],
        };
      }
      if (!regionsOut[z.regionId]!.zoneIds.includes(z.zoneId)) {
        regionsOut[z.regionId]!.zoneIds.push(z.zoneId);
      }
    }

    const wardToLocality: Record<string, string> = {};
    for (const w of wards) wardToLocality[w.id] = w.localityId;

    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(OUT_DIR, "manifest.json"),
      JSON.stringify(manifest, null, 0),
    );
    fs.writeFileSync(
      path.join(OUT_DIR, "wards.json"),
      JSON.stringify(wards, null, 0),
    );
    fs.writeFileSync(
      path.join(OUT_DIR, "zones.json"),
      JSON.stringify(zonesOut, null, 0),
    );
    fs.writeFileSync(
      path.join(OUT_DIR, "regions.json"),
      JSON.stringify(regionsOut, null, 0),
    );
    fs.writeFileSync(
      path.join(OUT_DIR, "ward-to-locality.json"),
      JSON.stringify(wardToLocality, null, 0),
    );
    fs.writeFileSync(
      path.join(OUT_DIR, "localities.json"),
      JSON.stringify(Object.fromEntries(localityMap), null, 0),
    );

    const overrideHits = Object.keys(WARD_LOCALITY_OVERRIDE).length;
    console.log(
      `[build-chennai-map-data] Wrote ${wards.length} wards (${skipped} skipped). Localities: ${localityMap.size}. Ward→locality overrides defined: ${overrideHits} (expand in locality-seed.ts).`,
    );
  })();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
