/** Runtime bundle from scripts/build-civic-geo-data.ts */

import type { DataProvenance } from "./provenance";

export type CivicGeoManifest = {
  version: string;
  generatedAt: string;
  chennaiMapVersion: string;
  source: string;
  sourceLicenseNote: string;
  wardCount: number;
};

export type LayerStatus =
  | "operational"
  | "approved_future"
  | "historical"
  | "pending_data";

export type LayerMeta = {
  layerId: "gcc-15" | "gcc-20-proposed" | "gcc-23-2022";
  label: string;
  status: LayerStatus;
  statusLabel: string;
  geometryAvailable: boolean;
  description: string;
  provenance: DataProvenance;
};

export type CivicWard15 = {
  wardId: string;
  wardNo: number;
  zoneId: string;
  zoneLabel: string;
  localityId: string;
  centroidX: number;
  centroidY: number;
  centroidLng: number;
  centroidLat: number;
};

export type ZonalOfficeRecord = {
  zoneId: string;
  zoneLabel: string;
  officeName: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  phone: string | null;
  email: string | null;
  workingHours: string | null;
  wheelchairAccessible: boolean | null;
  floodRiskRouteNote: string | null;
  publicTransportNotes: string | null;
  gccComplaintUrl: string;
  officialVerificationUrl: string;
  provenance: DataProvenance;
};

export type WardCouncillorRecord = {
  wardNo: number;
  name: string | null;
  party: string | null;
  contact: string | null;
  provenance: DataProvenance;
};

export type WardMigrationRow = {
  wardNo: number;
  presentZoneId: string;
  presentZoneLabel: string;
  proposed20ZoneId: string | null;
  proposed20ZoneLabel: string | null;
  historical23ZoneId: string | null;
  historical23ZoneLabel: string | null;
  zoneChanges: boolean;
  boundaryChanges: boolean;
  provenance: DataProvenance;
};

export type PinWardHint = {
  pin: string;
  wardNo: number | null;
  localityHint: string | null;
  provenance: DataProvenance;
};

export type ZoneMetricValue = {
  key: string;
  label: string;
  value: number | string | null;
  unit: string | null;
  provenance: DataProvenance;
};

export type ZoneMetricsRecord = {
  zoneId: string;
  zoneLabel: string;
  metrics: ZoneMetricValue[];
};

export type CivicGeoBundle = {
  manifest: CivicGeoManifest;
  layersMeta: LayerMeta[];
  wards15: CivicWard15[];
  zones15: ZonalOfficeRecord[];
  wardMigration: WardMigrationRow[];
  pinHints: PinWardHint[];
  councillors: WardCouncillorRecord[];
  zoneMetrics: ZoneMetricsRecord[];
};
