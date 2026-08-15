import { compulsivePath } from "@/content/compulsive/index";

export const AUTO_FARE_PATH = compulsivePath("auto-fare");

/** Last gazetted TN meter (Aug 2013) — still the legal baseline until a new GO. */
export const AUTO_FARE_OFFICIAL_2013 = {
  flagInr: 25,
  flagKm: 1.8,
  extraPerKm: 12,
  label: "Official 2013 meter",
};

/** Consumer-side proposal at the 9 Jul 2026 tripartite (TNIE / DT Next). */
export const AUTO_FARE_CONSUMER_2026 = {
  flagInr: 50,
  flagKm: 2,
  extraPerKm: 27.5,
  nightAfterHour: 23,
  nightMultiplier: 1.5,
  label: "Passenger groups (Jul 2026)",
};

/** Union-side proposal at the same meeting. */
export const AUTO_FARE_UNION_2026 = {
  flagInr: 60,
  flagKm: 1.5,
  extraPerKm: 30,
  nightAfterHour: 23,
  nightMultiplier: 2,
  label: "Driver unions (Jul 2026)",
};

export const AUTO_FARE_CONTEXT = {
  lastRevision: "25 August 2013",
  meeting: "9 July 2026 tripartite, Chennai — Transport Minister A. Vijay Tamilan Parthiban",
  status:
    "State Transport Authority forwarded a revision report to the Home Department (IANS / press, early August 2026). No new gazetted fare was in the sources we reviewed as of 15 August 2026.",
  fleet: "~3.46 lakh registered autos in Tamil Nadu (press)",
};

export function autoFareInr(
  km: number,
  spec: { flagInr: number; flagKm: number; extraPerKm: number },
  nightMultiplier = 1,
): number {
  const distance = Math.max(0, km);
  const extraKm = Math.max(0, distance - spec.flagKm);
  const base = spec.flagInr + extraKm * spec.extraPerKm;
  return Math.round(base * nightMultiplier);
}

export const AUTO_FARE_FAQ = [
  {
    q: "What is the legal Chennai auto fare today?",
    a: "Until a new government order is notified, the 2013 meter (₹25 for 1.8 km, then ₹12/km) is the last official structure. Street quotes are almost always higher. This card compares official vs proposed numbers — it is not a new tariff.",
  },
  {
    q: "Did fares already go up in 2026?",
    a: "A revision meeting happened on 9 July 2026. Unions and passenger groups did not agree. A report went to the Home Department. We have not seen a notified new meter as of 15 August 2026.",
  },
  {
    q: "What about Rapido / Namma Yatri / Uber Auto?",
    a: "App fares are platform prices, not the Transport Department meter. Compare the app quote with these three columns before you hop in.",
  },
];
