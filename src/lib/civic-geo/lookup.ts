import type { LocalityRecord, WardPathRecord } from "@/lib/chennai-map/types";
import { isPublishableProvenance } from "./provenance";
import type {
  CivicGeoBundle,
  CivicWard15,
  WardCouncillorRecord,
  WardMigrationRow,
  ZonalOfficeRecord,
} from "./types";

export type WardLookupResult = {
  ward: CivicWard15;
  wardPath: WardPathRecord | null;
  locality: LocalityRecord | null;
  zoneOffice: ZonalOfficeRecord | null;
  councillor: WardCouncillorRecord | null;
  migration: WardMigrationRow | null;
  proposed20: {
    zoneId: string;
    zoneLabel: string;
    provenance: WardMigrationRow["provenance"];
  } | null;
};

export function getZoneOffice(
  bundle: CivicGeoBundle,
  zoneId: string,
): ZonalOfficeRecord | null {
  return bundle.zones15.find((z) => z.zoneId === zoneId) ?? null;
}

export function getCouncillor(
  bundle: CivicGeoBundle,
  wardNo: number,
): WardCouncillorRecord | null {
  const row = bundle.councillors.find((c) => c.wardNo === wardNo);
  if (!row || !isPublishableProvenance(row.provenance)) return null;
  if (!row.name) return null;
  return row;
}

export function getMigrationRow(
  bundle: CivicGeoBundle,
  wardNo: number,
): WardMigrationRow | null {
  const row = bundle.wardMigration.find((m) => m.wardNo === wardNo);
  if (!row || !isPublishableProvenance(row.provenance)) return null;
  return row;
}

export function getProposed20FromMigration(
  migration: WardMigrationRow | null,
): WardLookupResult["proposed20"] {
  if (!migration?.proposed20ZoneId || !migration.proposed20ZoneLabel) return null;
  if (!isPublishableProvenance(migration.provenance)) return null;
  return {
    zoneId: migration.proposed20ZoneId,
    zoneLabel: migration.proposed20ZoneLabel,
    provenance: migration.provenance,
  };
}

export function lookupByWardNo(
  bundle: CivicGeoBundle,
  wardNo: number,
  wardPaths: WardPathRecord[],
  localities: Record<string, LocalityRecord>,
): WardLookupResult | null {
  const ward = bundle.wards15.find((w) => w.wardNo === wardNo);
  if (!ward) return null;
  const wardPath = wardPaths.find((w) => w.id === ward.wardId) ?? null;
  const locality = wardPath ? (localities[wardPath.localityId] ?? null) : null;
  const migration = getMigrationRow(bundle, wardNo);
  return {
    ward,
    wardPath,
    locality,
    zoneOffice: getZoneOffice(bundle, ward.zoneId),
    councillor: getCouncillor(bundle, wardNo),
    migration,
    proposed20: getProposed20FromMigration(migration),
  };
}

export function lookupByLocalityId(
  bundle: CivicGeoBundle,
  localityId: string,
  wardPaths: WardPathRecord[],
  localities: Record<string, LocalityRecord>,
): WardLookupResult | null {
  const wardPath = wardPaths.find((w) => w.localityId === localityId);
  if (!wardPath) return null;
  return lookupByWardNo(bundle, wardPath.wardNo, wardPaths, localities);
}

export function searchLocalities(
  localities: Record<string, LocalityRecord>,
  q: string,
  limit = 12,
): LocalityRecord[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  return Object.values(localities)
    .filter(
      (l) =>
        l.name.toLowerCase().includes(needle) ||
        l.zone.toLowerCase().includes(needle) ||
        l.tags.some((t) => t.toLowerCase().includes(needle)),
    )
    .slice(0, limit);
}

export function lookupPin(
  bundle: CivicGeoBundle,
  pin: string,
): { wardNo: number | null; localityHint: string | null; publishable: boolean } {
  const row = bundle.pinHints.find((p) => p.pin === pin.trim());
  if (!row) return { wardNo: null, localityHint: null, publishable: false };
  const publishable = isPublishableProvenance(row.provenance);
  return {
    wardNo: publishable ? row.wardNo : null,
    localityHint: row.localityHint,
    publishable,
  };
}
