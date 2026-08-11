export const CHENNAI_EV_GUIDE_PATH = "/guides/chennai-ev-charging";

export const EV_PUBLIC_FINDER_URL = "https://tnev.tn.gov.in/ev-chargers/find-charger";
export const EV_TN_PORTAL_URL = "https://tnev.tn.gov.in/";

export const EV_NETWORK_NOTES = [
  {
    name: "Official TN finder (TNGCEL / tnev)",
    detail: "State map to locate AC/DC chargers across Tamil Nadu — start here for authoritative pins",
    href: EV_PUBLIC_FINDER_URL,
  },
  {
    name: "Tata Power EZ Charge, ChargeZone, Statiq, EESL / CESL, Ather Grid",
    detail: "Common private networks in Chennai malls, Metro-adjacent lots, and petrol retail sites — use each app for live availability",
    href: EV_TN_PORTAL_URL,
  },
];

export const EV_HOME_WIRING_CHECKLIST = [
  "Get apartment association / builder NOC before installing a wallbox in common parking",
  "Prefer a dedicated circuit sized by a licensed electrician for your charger rating (typically 3.3–7.4 kW AC for homes)",
  "Confirm sanctioned electrical load with TNPDCL / your building EB connection — upgrading load may need a formal application",
  "Use ISI-marked cables, RCBO/ELCB protection, and weather-safe outdoor enclosures",
  "Decide billing: individual meter vs society common meter with recharge rules",
  "Photograph the installation and keep the vendor invoice for insurance / warranty",
];

export const EV_CHENNAI_TIPS = [
  "Public DC fast charge is often priced roughly in the mid-teens to mid-twenties ₹/kWh depending on network and time — cheaper than petrol per km for most cars, but app tariffs change",
  "AC chargers at malls/work are slower (hours) — plan shopping or office dwell time",
  "Metro-adjacent and mall chargers are the densest in central and south Chennai; highway/exit chargers matter for ECR / GST trips",
  "Always verify live status in the operator app — map pins go stale",
];
