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

/** Editorial flood scores from GCC monsoon mapping + corridor pattern desks. */
const FLOOD_EDITORIAL: Record<
  string,
  { score: number; basis: string }
> = {
  "zone-sholinganallur": {
    score: 9,
    basis:
      "Mayor / GCC monsoon mapping (Aug 2026) cited 76 of 294 stagnation points in this zone.",
  },
  "zone-perungudi": {
    score: 8,
    basis:
      "IT-corridor service roads and marsh edges recur in monsoon desks. Not a separate official count in the 294 list.",
  },
  "zone-adyar": {
    score: 7,
    basis:
      "Canal overtopping and underpasses are a documented historic pattern — editorial watch, not a live gauge.",
  },
  "zone-thiruvottiyur": {
    score: 6,
    basis:
      "North coastal / industrial drainage appears in civic reporting; score is editorial, not the 76-point figure.",
  },
  "zone-manali": {
    score: 6,
    basis:
      "Ennore–Manali bund and industrial drainage issues appear in civic reporting; editorial score.",
  },
};

/** Zone dashboard seed — only ward counts are polygon-verified; other stats stay missing. */
export function buildZoneMetricsSeed(
  zones: { zoneId: string; zoneLabel: string; wardCount: number }[],
): ZoneMetricsRecord[] {
  return zones.map((z) => {
    const flood = FLOOD_EDITORIAL[z.zoneId];
    return {
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
            methodology:
              "Counted from operational Datameet ward polygons in this zone.",
          },
        },
        ...(flood
          ? [
              {
                key: "flood_editorial_score",
                label: "Editorial flood street-score",
                value: flood.score,
                unit: "/10",
                provenance: {
                  source:
                    "MyChennaiCity flood street-score desk (GCC monsoon mapping + corridor pattern)",
                  sourceDate: "2026-08-15",
                  geographyVersion: "gcc-15" as const,
                  verificationStatus: "reported" as const,
                  methodology: flood.basis,
                  confidence: "medium" as const,
                },
              },
            ]
          : []),
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
    };
  });
}
