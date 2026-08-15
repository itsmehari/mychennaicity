export const CIVIC_TOOLS_HUB_PATH = "/civic-tools";

export const CIVIC_TOOL_PATHS = {
  hub: CIVIC_TOOLS_HUB_PATH,
  zoneWardFinder: "/civic-tools/zone-ward-finder",
  zoneMap: "/civic-tools/zone-map",
  wardMigration: "/civic-tools/ward-migration",
  responsibilityRouter: "/civic-tools/responsibility-router",
  zonalOfficeAccess: "/civic-tools/zonal-office-access",
  zoneDashboard: "/civic-tools/zone-dashboard",
  reorgTracker: "/civic-tools/reorg-tracker",
  civicCard: "/civic-tools/civic-card",
  areaSabha: "/civic-tools/area-sabha",
  boundaryFeedback: "/civic-tools/boundary-feedback",
  addressFormFixer: "/civic-tools/address-form-fixer",
  streetlightDeadSpots: "/civic-tools/streetlight-dead-spots",
  powerFeeder: "/civic-tools/power-feeder-desk",
  metroWater: "/civic-tools/metro-water-schedule",
  floodStreet: "/civic-tools/flood-street-score",
} as const;

export const CIVIC_TOOL_SITEMAP_PATHS = Object.values(CIVIC_TOOL_PATHS);
