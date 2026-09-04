import type { HseGroup } from "@/content/education/hse-groups";

export type CompareLevel = "high" | "medium" | "low" | "none" | "optional" | "strong" | "limited" | "possible";

export type CompareRow = {
  factor: string;
  values: Record<string, string>;
};

/** Short labels for the five-preference matrix (2804 used as Humanities column). */
export const COMPARE_CODES = ["2502", "2503", "2702", "2708", "2804"] as const;

export const HSE_COMPARE_ROWS: CompareRow[] = [
  {
    factor: "Mathematics intensity",
    values: {
      "2502": "High",
      "2503": "High",
      "2702": "Low–medium",
      "2708": "High (Business Maths)",
      "2804": "Low / varies",
    },
  },
  {
    factor: "Biology",
    values: {
      "2502": "No",
      "2503": "Yes",
      "2702": "No",
      "2708": "No",
      "2804": "No",
    },
  },
  {
    factor: "Computing paper",
    values: {
      "2502": "Computer Science",
      "2503": "No",
      "2702": "Computer Applications",
      "2708": "No",
      "2804": "No (see 2802)",
    },
  },
  {
    factor: "Accounting",
    values: {
      "2502": "No",
      "2503": "No",
      "2702": "High",
      "2708": "High",
      "2804": "No",
    },
  },
  {
    factor: "Engineering route",
    values: {
      "2502": "Strong",
      "2503": "Strong",
      "2702": "Limited",
      "2708": "Limited",
      "2804": "Limited",
    },
  },
  {
    factor: "Medical / life-science route",
    values: {
      "2502": "Not the usual Biology route",
      "2503": "Strong",
      "2702": "No",
      "2708": "No",
      "2804": "No",
    },
  },
  {
    factor: "CA / finance route",
    values: {
      "2502": "Possible later",
      "2503": "Possible later",
      "2702": "Strong",
      "2708": "Very strong",
      "2804": "Possible later",
    },
  },
  {
    factor: "IT / software route",
    values: {
      "2502": "Very strong",
      "2503": "Possible",
      "2702": "Moderate (business IT)",
      "2708": "Possible",
      "2804": "Depends (2802 has Comp. Apps)",
    },
  },
  {
    factor: "Law",
    values: {
      "2502": "Possible after a degree",
      "2503": "Possible after a degree",
      "2702": "Possible after a degree",
      "2708": "Possible after a degree",
      "2804": "Strong foundation",
    },
  },
  {
    factor: "Civil-services subject foundation",
    values: {
      "2502": "Moderate",
      "2503": "Moderate",
      "2702": "Moderate",
      "2708": "Moderate",
      "2804": "Strong",
    },
  },
  {
    factor: "Typical workload",
    values: {
      "2502": "High",
      "2503": "Very high",
      "2702": "Medium",
      "2708": "High",
      "2804": "Medium (reading-heavy)",
    },
  },
];

export const COMPARE_COLUMN_LABELS: Record<string, string> = {
  "2502": "2502 CS",
  "2503": "2503 Bio",
  "2702": "2702 CA",
  "2708": "2708 B.Maths",
  "2804": "2804 Hum.",
};

export function compareNoteForHumanities(): string {
  return "Humanities column uses 2804 (Political Science). Group 2802 swaps Political Science for Computer Applications — see that group page.";
}

export function streamLabel(stream: HseGroup["stream"]): string {
  if (stream === "science") return "Science";
  if (stream === "commerce") return "Commerce";
  return "Humanities";
}
