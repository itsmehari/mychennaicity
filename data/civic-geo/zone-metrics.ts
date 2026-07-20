import type { ZoneMetricsRecord } from "../../src/lib/civic-geo/types";
import { DATAMEET_WARDS_PROVENANCE } from "../../src/lib/civic-geo/provenance";

const missingMetric = (key: string, label: string) => ({
  key,
  label,
  value: null,
  unit: null,
  provenance: {
    ...DATAMEET_WARDS_PROVENANCE,
    verificationStatus: "missing" as const,
    methodology: "Awaiting official zone-wise published statistics.",
    confidence: "none" as const,
  },
});

/** Zone dashboard seed — metrics marked missing until official sources are ingested. */
export function buildZoneMetricsSeed(
  zones: { zoneId: string; zoneLabel: string; wardCount: number }[],
): ZoneMetricsRecord[] {
  return zones.map((z) => ({
    zoneId: z.zoneId,
    zoneLabel: z.zoneLabel,
    metrics: [
      {
        key: "ward_count",
        label: "Ward count",
        value: z.wardCount,
        unit: "wards",
        provenance: {
          ...DATAMEET_WARDS_PROVENANCE,
          methodology: "Counted from operational Datameet ward polygons in this zone.",
        },
      },
      missingMetric("area_sq_km", "Area"),
      missingMetric("population", "Population"),
      missingMetric("population_density", "Population density"),
      missingMetric("property_count", "Property count"),
      missingMetric("road_length_km", "Road length"),
      missingMetric("waste_generation_tpd", "Waste generation"),
      missingMetric("parks", "Parks"),
      missingMetric("public_toilets", "Public toilets"),
      missingMetric("health_facilities", "Health facilities"),
      missingMetric("schools", "Schools"),
      missingMetric("stormwater_drain_km", "Stormwater drain length"),
      missingMetric("waterlogging_complaints", "Waterlogging complaints"),
      missingMetric("civic_complaint_volume", "Civic complaint volume"),
      missingMetric("complaint_resolution_days", "Complaint resolution time"),
      missingMetric("budget_allocation_cr", "Budget allocation"),
      missingMetric("works_completed", "Works completed"),
      missingMetric("works_pending", "Works pending"),
    ],
  }));
}
