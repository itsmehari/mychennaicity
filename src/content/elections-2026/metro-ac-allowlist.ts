/**
 * Chennai metro+ assembly constituencies for the election map.
 * AC numbers match Tamil Nadu ECI numbering (2021 delimitation geometry).
 *
 * Core: Chennai district. Suburban: Kancheepuram seats in the immediate ring.
 */

export type MetroConstituencyGroup = "core" | "suburban";

export type MetroConstituencyDef = {
  acNo: number;
  group: MetroConstituencyGroup;
};

/** Ordered for display (roughly north → south, then ring). */
export const METRO_PLUS_CONSTITUENCIES: readonly MetroConstituencyDef[] = [
  { acNo: 17, group: "core" },
  { acNo: 18, group: "core" },
  { acNo: 12, group: "core" },
  { acNo: 11, group: "core" },
  { acNo: 14, group: "core" },
  { acNo: 15, group: "core" },
  { acNo: 13, group: "core" },
  { acNo: 16, group: "core" },
  { acNo: 21, group: "core" },
  { acNo: 22, group: "core" },
  { acNo: 19, group: "core" },
  { acNo: 20, group: "core" },
  { acNo: 23, group: "core" },
  { acNo: 24, group: "core" },
  { acNo: 25, group: "core" },
  { acNo: 26, group: "core" },
  { acNo: 28, group: "suburban" },
  { acNo: 27, group: "suburban" },
  { acNo: 30, group: "suburban" },
  { acNo: 31, group: "suburban" },
  { acNo: 29, group: "suburban" },
  { acNo: 32, group: "suburban" },
] as const;

export const METRO_PLUS_AC_SET: ReadonlySet<number> = new Set(
  METRO_PLUS_CONSTITUENCIES.map((c) => c.acNo),
);

const GROUP_BY_AC = new Map<number, MetroConstituencyGroup>(
  METRO_PLUS_CONSTITUENCIES.map((c) => [c.acNo, c.group]),
);

export function groupForAc(acNo: number): MetroConstituencyGroup | undefined {
  return GROUP_BY_AC.get(acNo);
}
