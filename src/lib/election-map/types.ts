/** Runtime bundle from scripts/build-election-map-data.ts */

export type ElectionMapManifest = {
  version: string;
  generatedAt: string;
  source: string;
  sourceLicenseNote: string;
  featureCount: number;
  viewBox: string;
  bbox: { minLng: number; minLat: number; maxLng: number; maxLat: number };
  simplifyToleranceDeg: number;
};

export type ConstituencyPathRecord = {
  id: string;
  acNo: number;
  name: string;
  district: string;
  group: "core" | "suburban";
  d: string;
};

export type ElectionMapViewFilter = "all" | "core" | "suburban";
