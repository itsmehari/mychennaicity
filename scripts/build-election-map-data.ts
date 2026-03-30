/**
 * Tamil Nadu assembly GeoJSON → simplified SVG paths for Chennai metro+ allowlist.
 *
 * Input: data/tamil-nadu/tn_ac_2021.geojson (optional) or TN_ASSEMBLY_GEOJSON_URL.
 * Output: public/data/election-map/*.json
 *
 * Remote default: baskicanvas/tamilnadu-assembly-constituency-maps (verify license).
 */

import fs from "node:fs";
import path from "node:path";
import simplify from "@turf/simplify";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";
import bbox from "@turf/bbox";
import {
  METRO_PLUS_AC_SET,
  groupForAc,
} from "../src/content/elections-2026/metro-ac-allowlist";
import {
  createProjector,
  multipolygonToPaths,
  type BBox,
} from "../src/lib/chennai-map/project";
import type { ConstituencyPathRecord } from "../src/lib/election-map/types";

const ROOT = path.join(__dirname, "..");
const INPUT_PATH = path.join(ROOT, "data", "tamil-nadu", "tn_ac_2021.geojson");
const OUT_DIR = path.join(ROOT, "public", "data", "election-map");
const TN_ASSEMBLY_GEOJSON_URL =
  "https://raw.githubusercontent.com/baskicanvas/tamilnadu-assembly-constituency-maps/main/tn_ac_2021.geojson";

const VIEW_W = 1000;
const VIEW_H = 780;
const SIMPLIFY_TOLERANCE_DEG = 0.00014;
const MAP_VERSION = "tn-ac-metro-chennai-v1";

async function loadGeoJsonAsync(): Promise<FeatureCollection> {
  if (fs.existsSync(INPUT_PATH)) {
    const raw = fs.readFileSync(INPUT_PATH, "utf8");
    return JSON.parse(raw) as FeatureCollection;
  }
  const r = await fetch(TN_ASSEMBLY_GEOJSON_URL);
  if (!r.ok) throw new Error(`Fetch TN assembly GeoJSON failed: ${r.status}`);
  return (await r.json()) as FeatureCollection;
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
    const filtered: Feature<Polygon | MultiPolygon>[] = [];

    for (const feature of fc.features) {
      const geom = feature.geometry;
      if (!geom || (geom.type !== "Polygon" && geom.type !== "MultiPolygon")) {
        continue;
      }
      const props = (feature.properties ?? {}) as Record<string, unknown>;
      const acNo = Number(props.AC_NO);
      if (!Number.isFinite(acNo) || !METRO_PLUS_AC_SET.has(acNo)) continue;
      filtered.push(feature as Feature<Polygon | MultiPolygon>);
    }

    if (filtered.length === 0) {
      throw new Error(
        "[build-election-map-data] No features matched metro+ allowlist — check AC numbers.",
      );
    }

    const miniFc: FeatureCollection = { type: "FeatureCollection", features: filtered };
    const turfB = bbox(miniFc);
    const bboxFromTurf: BBox = {
      minLng: turfB[0]!,
      minLat: turfB[1]!,
      maxLng: turfB[2]!,
      maxLat: turfB[3]!,
    };

    const project = createProjector(bboxFromTurf, VIEW_W, VIEW_H, 14);

    const constituencies: ConstituencyPathRecord[] = [];
    let skipped = 0;

    for (const feature of filtered) {
      const props = (feature.properties ?? {}) as Record<string, unknown>;
      const acNo = Number(props.AC_NO);
      const name = String(props.AC_NAME ?? `AC ${acNo}`).trim();
      const district = String(props.DIST_NAME ?? "").trim();
      const grp = groupForAc(acNo);
      if (!grp) {
        skipped++;
        continue;
      }

      const simplified = simplify(feature, {
        tolerance: SIMPLIFY_TOLERANCE_DEG,
        highQuality: false,
        mutate: false,
      });

      const sg = simplified.geometry;
      if (!sg || (sg.type !== "Polygon" && sg.type !== "MultiPolygon")) {
        skipped++;
        continue;
      }

      const d = geometryToPaths(sg, project);
      if (!d) {
        skipped++;
        continue;
      }

      constituencies.push({
        id: `ac-${acNo}`,
        acNo,
        name,
        district,
        group: grp,
        d,
      });
    }

    constituencies.sort((a, b) => a.acNo - b.acNo);

    const manifest = {
      version: MAP_VERSION,
      generatedAt: new Date().toISOString(),
      source:
        "Community TN assembly boundaries (2021 delimitation) — tn_ac_2021.geojson",
      sourceLicenseNote:
        "Verify repository license and ECI terms before commercial use; attribute source.",
      featureCount: constituencies.length,
      viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
      bbox: bboxFromTurf,
      simplifyToleranceDeg: SIMPLIFY_TOLERANCE_DEG,
    };

    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(OUT_DIR, "manifest.json"),
      JSON.stringify(manifest, null, 0),
    );
    fs.writeFileSync(
      path.join(OUT_DIR, "constituencies.json"),
      JSON.stringify(constituencies, null, 0),
    );

    console.log(
      `[build-election-map-data] Wrote ${constituencies.length} constituencies (${skipped} skipped). Output: ${OUT_DIR}`,
    );
  })();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
