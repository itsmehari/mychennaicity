export type AssessmentDomainId =
  | "governance"
  | "measurement"
  | "segregation"
  | "wet"
  | "dry"
  | "sanitary"
  | "vendor"
  | "documentation";

export type AssessmentQuestion = {
  id: string;
  domain: AssessmentDomainId;
  /** Scoring domain group for the five-band result. */
  scoreDomain:
    | "Governance"
    | "Segregation and infrastructure"
    | "Processing and authorised handover"
    | "Documentation and reporting"
    | "Training, safety and monitoring";
  question: string;
  guidance?: string;
};

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "g1",
    domain: "governance",
    scoreDomain: "Governance",
    question:
      "Has the organisation formally assessed whether it qualifies as a Bulk Waste Generator?",
  },
  {
    id: "g2",
    domain: "governance",
    scoreDomain: "Governance",
    question: "Has a responsible senior officer been appointed?",
  },
  {
    id: "g3",
    domain: "governance",
    scoreDomain: "Governance",
    question: "Is there a written waste-management policy?",
  },
  {
    id: "g4",
    domain: "governance",
    scoreDomain: "Governance",
    question: "Are roles assigned across departments?",
  },
  {
    id: "g5",
    domain: "governance",
    scoreDomain: "Governance",
    question: "Is waste compliance reviewed by management?",
  },
  {
    id: "g6",
    domain: "governance",
    scoreDomain: "Governance",
    question: "Is there a corrective-action process?",
  },
  {
    id: "g7",
    domain: "governance",
    scoreDomain: "Governance",
    question:
      "Is there a budget for waste-management infrastructure and services?",
  },
  {
    id: "m1",
    domain: "measurement",
    scoreDomain: "Documentation and reporting",
    question: "Has a seven-day or longer waste audit been completed?",
  },
  {
    id: "m2",
    domain: "measurement",
    scoreDomain: "Documentation and reporting",
    question: "Is waste weighed regularly?",
  },
  {
    id: "m3",
    domain: "measurement",
    scoreDomain: "Documentation and reporting",
    question: "Are quantities recorded by waste stream?",
  },
  {
    id: "m4",
    domain: "measurement",
    scoreDomain: "Documentation and reporting",
    question: "Are seasonal and event-related variations recorded?",
  },
  {
    id: "m5",
    domain: "measurement",
    scoreDomain: "Documentation and reporting",
    question: "Is the organisation’s daily average known?",
  },
  {
    id: "s1",
    domain: "segregation",
    scoreDomain: "Segregation and infrastructure",
    question:
      "Are wet, dry, sanitary and special-care waste separated?",
  },
  {
    id: "s2",
    domain: "segregation",
    scoreDomain: "Segregation and infrastructure",
    question: "Are bins placed at all generation points?",
  },
  {
    id: "s3",
    domain: "segregation",
    scoreDomain: "Segregation and infrastructure",
    question: "Are signs understandable to users?",
  },
  {
    id: "s4",
    domain: "segregation",
    scoreDomain: "Segregation and infrastructure",
    question: "Is contamination checked daily?",
  },
  {
    id: "s5",
    domain: "segregation",
    scoreDomain: "Segregation and infrastructure",
    question:
      "Is segregated waste kept separate during internal collection?",
  },
  {
    id: "s6",
    domain: "segregation",
    scoreDomain: "Segregation and infrastructure",
    question: "Is the central storage area properly organised?",
  },
  {
    id: "w1",
    domain: "wet",
    scoreDomain: "Processing and authorised handover",
    question: "Is wet-waste quantity known?",
  },
  {
    id: "w2",
    domain: "wet",
    scoreDomain: "Processing and authorised handover",
    question: "Is on-site processing feasibility documented?",
  },
  {
    id: "w3",
    domain: "wet",
    scoreDomain: "Processing and authorised handover",
    question: "Is installed equipment correctly sized?",
  },
  {
    id: "w4",
    domain: "wet",
    scoreDomain: "Processing and authorised handover",
    question: "Are input, output and reject quantities recorded?",
  },
  {
    id: "w5",
    domain: "wet",
    scoreDomain: "Processing and authorised handover",
    question: "Is there a downtime contingency?",
  },
  {
    id: "w6",
    domain: "wet",
    scoreDomain: "Processing and authorised handover",
    question: "Are odour, pest and leachate controlled?",
  },
  {
    id: "d1",
    domain: "dry",
    scoreDomain: "Processing and authorised handover",
    question: "Is dry waste kept clean and dry?",
  },
  {
    id: "d2",
    domain: "dry",
    scoreDomain: "Segregation and infrastructure",
    question:
      "Are recyclable and non-recyclable fractions identified?",
  },
  {
    id: "d3",
    domain: "dry",
    scoreDomain: "Processing and authorised handover",
    question:
      "Is the recycler or collector authorised for the relevant category?",
  },
  {
    id: "d4",
    domain: "dry",
    scoreDomain: "Processing and authorised handover",
    question: "Is the final destination known?",
  },
  {
    id: "d5",
    domain: "dry",
    scoreDomain: "Documentation and reporting",
    question: "Are weighment slips and receipts retained?",
  },
  {
    id: "sc1",
    domain: "sanitary",
    scoreDomain: "Segregation and infrastructure",
    question:
      "Is sanitary waste securely wrapped and separately stored?",
  },
  {
    id: "sc2",
    domain: "sanitary",
    scoreDomain: "Segregation and infrastructure",
    question: "Is special-care waste separately identified?",
  },
  {
    id: "sc3",
    domain: "sanitary",
    scoreDomain: "Training, safety and monitoring",
    question: "Are workers trained in safe handling?",
  },
  {
    id: "sc4",
    domain: "sanitary",
    scoreDomain: "Processing and authorised handover",
    question: "Is an authorised collection route available?",
  },
  {
    id: "sc5",
    domain: "sanitary",
    scoreDomain: "Documentation and reporting",
    question: "Are incidents and breakages documented?",
  },
  {
    id: "v1",
    domain: "vendor",
    scoreDomain: "Processing and authorised handover",
    question: "Are vendor documents current?",
  },
  {
    id: "v2",
    domain: "vendor",
    scoreDomain: "Processing and authorised handover",
    question: "Does the authorisation scope match the waste handled?",
  },
  {
    id: "v3",
    domain: "vendor",
    scoreDomain: "Documentation and reporting",
    question: "Are subcontractors disclosed?",
  },
  {
    id: "v4",
    domain: "vendor",
    scoreDomain: "Processing and authorised handover",
    question: "Is proof of processing or recycling obtained?",
  },
  {
    id: "v5",
    domain: "vendor",
    scoreDomain: "Training, safety and monitoring",
    question: "Are vendor performance issues reviewed?",
  },
  {
    id: "doc1",
    domain: "documentation",
    scoreDomain: "Documentation and reporting",
    question: "Are registration records available?",
  },
  {
    id: "doc2",
    domain: "documentation",
    scoreDomain: "Training, safety and monitoring",
    question: "Are staff-training records maintained?",
  },
  {
    id: "doc3",
    domain: "documentation",
    scoreDomain: "Documentation and reporting",
    question: "Are daily collection logs maintained?",
  },
  {
    id: "doc4",
    domain: "documentation",
    scoreDomain: "Documentation and reporting",
    question: "Are photographs and inspection records retained?",
  },
  {
    id: "doc5",
    domain: "documentation",
    scoreDomain: "Documentation and reporting",
    question:
      "Are annual or periodic reports prepared where applicable?",
  },
  {
    id: "doc6",
    domain: "documentation",
    scoreDomain: "Training, safety and monitoring",
    question: "Are PPE and worker-safety measures documented?",
  },
  {
    id: "doc7",
    domain: "documentation",
    scoreDomain: "Training, safety and monitoring",
    question: "Is there a grievance and escalation process?",
  },
];

export const SCORE_DOMAINS = [
  "Governance",
  "Segregation and infrastructure",
  "Processing and authorised handover",
  "Documentation and reporting",
  "Training, safety and monitoring",
] as const;
