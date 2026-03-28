/** Runtime bundle written by scripts/build-chennai-map-data.ts */

export type ChennaiMapManifest = {
  version: string;
  generatedAt: string;
  source: string;
  sourceLicenseNote: string;
  featureCount: number;
  viewBox: string;
  bbox: { minLng: number; minLat: number; maxLng: number; maxLat: number };
  simplifyToleranceDeg: number;
};

export type WardPathRecord = {
  id: string;
  wardNo: number;
  d: string;
  zoneId: string;
  zoneLabel: string;
  zoneRoman: string;
  regionId: string;
  primaryHubSlug: string;
  localityId: string;
};

export type LocalityRecord = {
  id: string;
  name: string;
  region: string;
  zone: string;
  type: string[];
  tags: string[];
  description: string;
  corridors: string[];
  overlays: {
    itCorridor: boolean;
    metro: boolean;
    industrial: boolean;
    floodRisk: boolean;
    growthZone: boolean;
  };
  primaryHubSlug: string;
  slug?: string;
  seoUrl?: string;
  stats?: {
    listings?: number;
    jobs?: number;
    schools?: number;
    articles?: number;
  };
};

export type OverlayKey = keyof LocalityRecord["overlays"];

export type MapViewMode = "core" | "greater" | "region" | "corridor";
