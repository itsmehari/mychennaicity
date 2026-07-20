import {
  ACTION_ITEMS,
  type ActionPhase,
} from "@/content/guides/bwg-readiness-2026/action-plan";
import {
  ASSESSMENT_QUESTIONS,
  SCORE_DOMAINS,
  type AssessmentQuestion,
} from "@/content/guides/bwg-readiness-2026/assessment-questions";
import { DOCUMENT_ITEMS } from "@/content/guides/bwg-readiness-2026/documents";

export const BWG_STORAGE_KEY = "mcc-bwg-readiness-2026-v1";

export type AssessmentOption = "full" | "partial" | "no" | "na";

export type AssessmentAnswer = {
  questionId: string;
  answer: AssessmentOption;
  note?: string;
};

export type ActionStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "blocked";

export type ActionItemState = {
  id: string;
  status: ActionStatus;
  owner?: string;
  dueDate?: string;
  note?: string;
};

export type DocumentStatus =
  | "available"
  | "missing"
  | "expired"
  | "not-applicable";

export type DocumentItemState = {
  id: string;
  status: DocumentStatus;
  owner?: string;
  renewalDate?: string;
  note?: string;
};

export type MatrixRowState = {
  id: string;
  person: string;
  department: string;
  evidence: string;
};

export type AuditDay = {
  date: string;
  wet: number;
  dryRecyclable: number;
  dryNonRecyclable: number;
  sanitary: number;
  specialCare: number;
  other: number;
};

export type VendorStatus =
  | "verified"
  | "partially-verified"
  | "documents-expired"
  | "scope-mismatch"
  | "final-destination-unknown"
  | "no-supporting-records"
  | "";

export type TrainingModuleState = {
  id: string;
  completed: boolean;
  date?: string;
  note?: string;
};

export type BwgPersistedState = {
  version: 1;
  eligibility: {
    orgType: string;
    floorArea: string;
    waterLitres: string;
    wasteKg: string;
    occupants: string;
  };
  matrix: MatrixRowState[];
  auditUnit: "kg" | "tonnes";
  auditDays: AuditDay[];
  segregationChecks: Record<string, boolean>;
  wetPlantChecks: Record<string, boolean>;
  wetTreeAnswers: Record<string, string>;
  vendorFields: Record<string, string>;
  vendorStatus: VendorStatus;
  regulatedWaste: string[];
  documents: DocumentItemState[];
  training: TrainingModuleState[];
  journeyNotes: Record<string, { person: string; note: string }>;
  metricsTargets: Record<string, string>;
  actionItems: ActionItemState[];
  answers: AssessmentAnswer[];
  activeStage: string;
};

export const MATRIX_FUNCTIONS = [
  { id: "reg-reg", label: "Regulatory registration", frequency: "Annual/as required" },
  { id: "seg-check", label: "Daily segregation checks", frequency: "Daily" },
  { id: "weigh", label: "Waste weighing", frequency: "Daily" },
  { id: "vendor-ver", label: "Vendor verification", frequency: "Quarterly" },
  { id: "training", label: "Training", frequency: "Monthly/quarterly" },
  { id: "mgmt-review", label: "Management review", frequency: "Monthly" },
  { id: "incident", label: "Incident reporting", frequency: "As required" },
  { id: "annual", label: "Annual reporting", frequency: "Annual" },
] as const;

export const TRAINING_MODULES = [
  { id: "mgmt", audience: "Management", topics: "Legal responsibility, resource allocation, risk review, escalation, vendor governance" },
  { id: "hk", audience: "Housekeeping staff", topics: "Four-stream segregation, safe handling, bag/bin protocol, contamination reporting, PPE, incident reporting" },
  { id: "kitchen", audience: "Kitchen and canteen", topics: "Food-waste separation, oil/liquid exclusion, packaging separation, wet-waste contamination control" },
  { id: "users", audience: "Employees, students, residents or guests", topics: "What goes into each bin, prohibited items, reducing waste, avoiding contamination" },
  { id: "security", audience: "Security and loading-bay", topics: "Vendor verification, vehicle entry, collection log, weight/receipt confirmation, preventing unauthorised removal" },
] as const;

export const JOURNEY_STAGES = [
  {
    id: "generation",
    label: "Generation",
    control: "Identify all generation points and assign stream bins at source.",
    failure: "Unmapped points dump into mixed bags.",
    corrective: "Walk the premises and map every canteen, floor, ward and block.",
  },
  {
    id: "segregation",
    label: "Segregation",
    control: "Four-stream separation with labels users understand.",
    failure: "Correct bins but remixed during pickup.",
    corrective: "Supervise internal collection and refuse remixed loads.",
  },
  {
    id: "internal",
    label: "Internal collection",
    control: "Separate trolleys/bags; no cross-contamination.",
    failure: "One trolley for all streams.",
    corrective: "Colour-code routes and train housekeeping.",
  },
  {
    id: "weighing",
    label: "Weighing",
    control: "Daily weighment by stream before handover.",
    failure: "Estimates from bin counts only.",
    corrective: "Install a scale and log kg by stream.",
  },
  {
    id: "storage",
    label: "Temporary storage",
    control: "Separate bays, pest/odour control, restricted access.",
    failure: "Leaking wet waste and open sanitary waste.",
    corrective: "Upgrade storage and enforce PPE + wrapping.",
  },
  {
    id: "processing",
    label: "Processing or handover",
    control: "On-site wet processing or authorised EBWG route; authorised dry/sanitary collectors.",
    failure: "Idle composting machine or unknown destination.",
    corrective: "Document capacity, downtime plan and authorisations.",
  },
  {
    id: "transport",
    label: "Transportation",
    control: "Authorised vehicle; streams not remixed.",
    failure: "Vendor mixes all streams in one vehicle.",
    corrective: "Verify vehicle and refuse mixed collection.",
  },
  {
    id: "facility",
    label: "Final facility",
    control: "Know receiving facility and processing method.",
    failure: "Invoice only; destination unknown.",
    corrective: "Obtain facility details and recovery evidence.",
  },
  {
    id: "evidence",
    label: "Evidence",
    control: "Receipts, weigh slips, certificates retained.",
    failure: "No paper trail for inspections.",
    corrective: "Central document folder with renewal dates.",
  },
] as const;

export function defaultState(): BwgPersistedState {
  return {
    version: 1,
    eligibility: {
      orgType: "",
      floorArea: "",
      waterLitres: "",
      wasteKg: "",
      occupants: "",
    },
    matrix: MATRIX_FUNCTIONS.map((f) => ({
      id: f.id,
      person: "",
      department: "",
      evidence: "",
    })),
    auditUnit: "kg",
    auditDays: Array.from({ length: 7 }, () => ({
      date: "",
      wet: 0,
      dryRecyclable: 0,
      dryNonRecyclable: 0,
      sanitary: 0,
      specialCare: 0,
      other: 0,
    })),
    segregationChecks: {},
    wetPlantChecks: {},
    wetTreeAnswers: {},
    vendorFields: {},
    vendorStatus: "",
    regulatedWaste: [],
    documents: DOCUMENT_ITEMS.map((d) => ({
      id: d.id,
      status: "missing" as DocumentStatus,
    })),
    training: TRAINING_MODULES.map((t) => ({
      id: t.id,
      completed: false,
    })),
    journeyNotes: {},
    metricsTargets: {},
    actionItems: ACTION_ITEMS.map((a) => ({
      id: a.id,
      status: "not-started" as ActionStatus,
    })),
    answers: [],
    activeStage: "know",
  };
}

export function loadBwgState(): BwgPersistedState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(BWG_STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<BwgPersistedState>;
    const base = defaultState();
    return {
      ...base,
      ...parsed,
      version: 1,
      eligibility: { ...base.eligibility, ...parsed.eligibility },
      matrix: mergeById(base.matrix, parsed.matrix),
      auditDays:
        parsed.auditDays?.length === 7 ? parsed.auditDays : base.auditDays,
      segregationChecks: {
        ...base.segregationChecks,
        ...parsed.segregationChecks,
      },
      wetPlantChecks: { ...base.wetPlantChecks, ...parsed.wetPlantChecks },
      wetTreeAnswers: { ...base.wetTreeAnswers, ...parsed.wetTreeAnswers },
      vendorFields: { ...base.vendorFields, ...parsed.vendorFields },
      documents: mergeById(base.documents, parsed.documents),
      training: mergeById(base.training, parsed.training),
      journeyNotes: { ...base.journeyNotes, ...parsed.journeyNotes },
      metricsTargets: { ...base.metricsTargets, ...parsed.metricsTargets },
      actionItems: mergeById(base.actionItems, parsed.actionItems),
      answers: parsed.answers ?? [],
    };
  } catch {
    return defaultState();
  }
}

function mergeById<T extends { id: string }>(
  base: T[],
  incoming: T[] | undefined,
): T[] {
  if (!incoming?.length) return base;
  const map = new Map(incoming.map((x) => [x.id, x]));
  return base.map((b) => ({ ...b, ...map.get(b.id) }));
}

export function saveBwgState(state: BwgPersistedState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BWG_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode */
  }
}

export function clearBwgState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(BWG_STORAGE_KEY);
}

const OPTION_POINTS: Record<AssessmentOption, number | null> = {
  full: 2,
  partial: 1,
  no: 0,
  na: null,
};

export type DomainScore = {
  domain: (typeof SCORE_DOMAINS)[number];
  earned: number;
  possible: number;
  percent: number | null;
};

export type AssessmentScoreResult = {
  overallPercent: number | null;
  answered: number;
  applicable: number;
  band: "advanced" | "moderate" | "low" | "immediate" | "incomplete";
  bandLabel: string;
  bandCopy: string;
  domains: DomainScore[];
  strengths: AssessmentQuestion[];
  gaps: AssessmentQuestion[];
};

export function scoreAssessment(
  answers: AssessmentAnswer[],
): AssessmentScoreResult {
  const byId = new Map(answers.map((a) => [a.questionId, a]));
  let earned = 0;
  let possible = 0;
  let answered = 0;

  const domainAcc = new Map<
    string,
    { earned: number; possible: number }
  >();
  for (const d of SCORE_DOMAINS) {
    domainAcc.set(d, { earned: 0, possible: 0 });
  }

  const strengths: AssessmentQuestion[] = [];
  const gaps: AssessmentQuestion[] = [];

  for (const q of ASSESSMENT_QUESTIONS) {
    const a = byId.get(q.id);
    if (!a) continue;
    answered += 1;
    const pts = OPTION_POINTS[a.answer];
    if (pts === null) continue;
    possible += 2;
    earned += pts;
    const acc = domainAcc.get(q.scoreDomain)!;
    acc.possible += 2;
    acc.earned += pts;
    if (a.answer === "full") strengths.push(q);
    if (a.answer === "no") gaps.push(q);
  }

  const overallPercent =
    possible === 0 ? null : Math.round((earned / possible) * 100);

  let band: AssessmentScoreResult["band"] = "incomplete";
  let bandLabel = "Complete the assessment";
  let bandCopy =
    "Answer the applicable questions to generate a readiness indicator.";

  if (overallPercent != null) {
    if (overallPercent >= 85) {
      band = "advanced";
      bandLabel = "Advanced readiness";
      bandCopy =
        "Core systems are in place. Focus on evidence quality, periodic verification and continuous improvement.";
    } else if (overallPercent >= 65) {
      band = "moderate";
      bandLabel = "Moderate readiness";
      bandCopy =
        "Several systems exist, but documented gaps remain. Complete corrective actions before inspection or enforcement risk increases.";
    } else if (overallPercent >= 40) {
      band = "low";
      bandLabel = "Low readiness";
      bandCopy =
        "The organisation has partial practices but lacks an integrated compliance system.";
    } else {
      band = "immediate";
      bandLabel = "Immediate action required";
      bandCopy =
        "Major operational and documentation gaps exist. Senior management intervention is required.";
    }
  }

  const domains: DomainScore[] = SCORE_DOMAINS.map((domain) => {
    const acc = domainAcc.get(domain)!;
    return {
      domain,
      earned: acc.earned,
      possible: acc.possible,
      percent:
        acc.possible === 0
          ? null
          : Math.round((acc.earned / acc.possible) * 100),
    };
  });

  return {
    overallPercent,
    answered,
    applicable: possible / 2,
    band,
    bandLabel,
    bandCopy,
    domains,
    strengths: strengths.slice(0, 5),
    gaps: gaps.slice(0, 5),
  };
}

export type EligibilityResult =
  | "likely"
  | "possibly"
  | "below"
  | "insufficient";

export function evaluateEligibility(input: {
  floorArea: string;
  waterLitres: string;
  wasteKg: string;
}): { result: EligibilityResult; reasons: string[] } {
  const area = parseFloat(input.floorArea);
  const water = parseFloat(input.waterLitres);
  const waste = parseFloat(input.wasteKg);
  const hasArea = Number.isFinite(area) && input.floorArea.trim() !== "";
  const hasWater = Number.isFinite(water) && input.waterLitres.trim() !== "";
  const hasWaste = Number.isFinite(waste) && input.wasteKg.trim() !== "";

  if (!hasArea && !hasWater && !hasWaste) {
    return {
      result: "insufficient",
      reasons: ["Enter at least one of floor area, water use or daily waste."],
    };
  }

  const reasons: string[] = [];
  let hit = false;
  let near = false;

  if (hasArea) {
    if (area >= 20000) {
      hit = true;
      reasons.push("Floor area meets or exceeds 20,000 m².");
    } else if (area >= 15000) {
      near = true;
      reasons.push("Floor area is approaching the 20,000 m² threshold.");
    }
  }
  if (hasWater) {
    if (water >= 40000) {
      hit = true;
      reasons.push("Water consumption meets or exceeds 40,000 L/day.");
    } else if (water >= 30000) {
      near = true;
      reasons.push("Water use is approaching the 40,000 L/day threshold.");
    }
  }
  if (hasWaste) {
    if (waste >= 100) {
      hit = true;
      reasons.push("Waste generation meets or exceeds 100 kg/day.");
    } else if (waste >= 75) {
      near = true;
      reasons.push("Waste generation is approaching the 100 kg/day threshold.");
    }
  }

  if (hit) return { result: "likely", reasons };
  if (near) {
    return {
      result: "possibly",
      reasons: [
        ...reasons,
        "Verification against the applicable Rules and local directions is still required.",
      ],
    };
  }
  return {
    result: "below",
    reasons: [
      "Entered figures are currently below the stated thresholds. Re-check if area, water or waste were underestimated.",
    ],
  };
}

export function trackBwgEvent(name: string): void {
  if (typeof window === "undefined") return;
  try {
    const gtag = (
      window as Window & { gtag?: (...args: unknown[]) => void }
    ).gtag;
    gtag?.("event", name, { event_category: "bwg_readiness" });
  } catch {
    /* ignore */
  }
}

export type { ActionPhase, AssessmentQuestion };
