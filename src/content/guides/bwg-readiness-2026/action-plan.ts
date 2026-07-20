export type ActionPhase =
  | "Days 1–5: Establish responsibility"
  | "Days 6–10: Measure"
  | "Days 11–15: Build the segregation system"
  | "Days 16–20: Verify processing and vendors"
  | "Days 21–25: Train and test"
  | "Days 26–30: Document and review";

export type ActionDef = {
  id: string;
  title: string;
  phase: ActionPhase;
};

export const ACTION_ITEMS: ActionDef[] = [
  {
    id: "a1",
    phase: "Days 1–5: Establish responsibility",
    title: "Appoint nodal officer",
  },
  {
    id: "a2",
    phase: "Days 1–5: Establish responsibility",
    title: "Confirm possible BWG status",
  },
  {
    id: "a3",
    phase: "Days 1–5: Establish responsibility",
    title: "Collect legal and property details",
  },
  {
    id: "a4",
    phase: "Days 1–5: Establish responsibility",
    title: "Identify all waste-generation points",
  },
  {
    id: "a5",
    phase: "Days 6–10: Measure",
    title: "Conduct waste audit",
  },
  {
    id: "a6",
    phase: "Days 6–10: Measure",
    title: "Record floor area",
  },
  {
    id: "a7",
    phase: "Days 6–10: Measure",
    title: "Compile water-consumption data",
  },
  {
    id: "a8",
    phase: "Days 6–10: Measure",
    title: "Identify regulated waste streams",
  },
  {
    id: "a9",
    phase: "Days 11–15: Build the segregation system",
    title: "Procure or relabel bins",
  },
  {
    id: "a10",
    phase: "Days 11–15: Build the segregation system",
    title: "Correct collection routes",
  },
  {
    id: "a11",
    phase: "Days 11–15: Build the segregation system",
    title: "Improve storage area",
  },
  {
    id: "a12",
    phase: "Days 11–15: Build the segregation system",
    title: "Issue SOPs",
  },
  {
    id: "a13",
    phase: "Days 16–20: Verify processing and vendors",
    title: "Assess wet-waste solution",
  },
  {
    id: "a14",
    phase: "Days 16–20: Verify processing and vendors",
    title: "Verify recyclers",
  },
  {
    id: "a15",
    phase: "Days 16–20: Verify processing and vendors",
    title: "Document sanitary and special-care route",
  },
  {
    id: "a16",
    phase: "Days 16–20: Verify processing and vendors",
    title: "Check final destination",
  },
  {
    id: "a17",
    phase: "Days 21–25: Train and test",
    title: "Train departments",
  },
  {
    id: "a18",
    phase: "Days 21–25: Train and test",
    title: "Conduct contamination inspection",
  },
  {
    id: "a19",
    phase: "Days 21–25: Train and test",
    title: "Simulate missed collection or equipment failure",
  },
  {
    id: "a20",
    phase: "Days 21–25: Train and test",
    title: "Correct gaps",
  },
  {
    id: "a21",
    phase: "Days 26–30: Document and review",
    title: "Complete registration steps",
  },
  {
    id: "a22",
    phase: "Days 26–30: Document and review",
    title: "Compile evidence",
  },
  {
    id: "a23",
    phase: "Days 26–30: Document and review",
    title: "Conduct management review",
  },
  {
    id: "a24",
    phase: "Days 26–30: Document and review",
    title: "Approve corrective-action calendar",
  },
];
