export const TIRUVALLUR_AMMONIA_LEAK_SLUG =
  "tiruvallur-ammonia-leak-seafood-unit-seven-dead-2026";

export const TIRUVALLUR_AMMONIA_LEAK_H1 =
  "Tiruvallur Ammonia Leak: Seven Workers Die at Seafood Unit, Safety Compliance Comes Under Scrutiny";

export const TIRUVALLUR_AMMONIA_LEAK_SEO_TITLE =
  "Tiruvallur Ammonia Leak: 7 Dead at Seafood Unit Near Chennai — Safety Under Scrutiny";

export const TIRUVALLUR_AMMONIA_LEAK_META_DESCRIPTION =
  "Seven guest workers died and 40+ were hospitalised after an ammonia gas leak at a seafood export unit in Kannigaipair, Tiruvallur. What happened, why ammonia is used, and what safety compliance must change.";

export const TIRUVALLUR_AMMONIA_LEAK_HERO_IMAGE =
  "/images/articles/tiruvallur-ammonia-leak-2026-hero.jpeg";

export const TIRUVALLUR_AMMONIA_LEAK_SOURCE_URL =
  "https://www.newindianexpress.com/states/tamil-nadu/2026/Jun/21/seven-workers-die-in-ammonia-leak-at-seafood-unit-in-tiruvallur";

export const ammoniaLeakFactStrip = [
  "7 dead",
  "40+ hospitalised",
  "Kannigaipair, Tiruvallur",
  "Ammonia leak",
] as const;

export const ammoniaLeakTimeline = [
  {
    id: "leak-reported",
    label: "Leak reported",
    detail:
      "Ammonia gas leak reported from the seafood processing section on the unit's weekly holiday.",
  },
  {
    id: "workers-hospitalised",
    label: "Workers hospitalised",
    detail:
      "Affected workers rushed to nearby private hospitals with breathing difficulty and severe symptoms.",
  },
  {
    id: "critical-shifted",
    label: "Critical patients shifted",
    detail:
      "Nine critically affected persons shifted to Government Stanley Medical College Hospital, Chennai, in 108 ambulances.",
  },
  {
    id: "ndrf-deployed",
    label: "NDRF deployed",
    detail:
      "30-member CBRN response team from Arakkonam deployed with gas-detection devices and rescue gear.",
  },
  {
    id: "case-registered",
    label: "Case registered",
    detail:
      "Periyapalayam police registered a case; three-member committee formed to examine the incident.",
  },
] as const;

export const ammoniaRefrigerationFlow = [
  { id: "compressor", label: "Compressor", danger: true },
  { id: "condenser", label: "Condenser", danger: false },
  { id: "receiver", label: "Receiver", danger: true },
  { id: "evaporator", label: "Evaporator / Freezer Room", danger: true },
  { id: "return", label: "Return Line", danger: true },
] as const;

export const campusZones = [
  { id: "processing", label: "Processing Zone", risk: "high" as const },
  { id: "cold-storage", label: "Cold Storage Zone", risk: "high" as const },
  { id: "machinery", label: "Ammonia Machinery Room", risk: "high" as const },
  { id: "accommodation", label: "Worker Accommodation", risk: "high" as const },
  { id: "assembly", label: "Safe Assembly Point", risk: "safe" as const },
] as const;

export const complianceCards = [
  {
    id: "licences",
    title: "Licences & Approvals",
    items: [
      "Valid factory licence",
      "Approved building layout",
      "Pressure-vessel certification",
      "Fire safety clearance",
      "Electrical safety approvals",
    ],
  },
  {
    id: "refrigeration",
    title: "Refrigeration Safety",
    items: [
      "Compressor maintenance logs",
      "Pipeline integrity inspection",
      "Functional ammonia gas detectors",
      "Emergency shut-off valve accessibility",
      "Pressure relief valve records",
    ],
  },
  {
    id: "worker-protection",
    title: "Worker Protection",
    items: [
      "Safety training records",
      "PPE availability including respirators",
      "Safety Data Sheet for ammonia",
      "Multilingual evacuation maps",
      "Accommodation separated from hazardous zones",
    ],
  },
  {
    id: "emergency",
    title: "Emergency Readiness",
    items: [
      "Alarm audibility in work and accommodation areas",
      "Emergency ventilation test records",
      "Mock-drill frequency and attendance",
      "Clear emergency exits and assembly areas",
      "Night-time and holiday response plan",
    ],
  },
] as const;

export const accountabilityNodes = [
  { id: "dish", label: "DISH", full: "Directorate of Industrial Safety and Health" },
  { id: "fire", label: "Fire Services", full: "Fire and Rescue Services" },
  { id: "tnpcb", label: "TNPCB", full: "Tamil Nadu Pollution Control Board" },
  { id: "district", label: "District Administration", full: "District Administration" },
  { id: "labour", label: "Labour Department", full: "Labour Department" },
  { id: "local", label: "Local Body", full: "Local Body" },
  { id: "disaster", label: "Disaster Management", full: "Disaster Management" },
  { id: "export", label: "Export / Food Safety", full: "Export & Food Safety Regulators" },
] as const;

export const investigationTiles = [
  { id: "leak-source", label: "Leak Source" },
  { id: "maintenance", label: "Maintenance History" },
  { id: "alarm", label: "Alarm Function" },
  { id: "ventilation", label: "Ventilation" },
  { id: "evacuation", label: "Evacuation" },
  { id: "accommodation", label: "Accommodation Safety" },
] as const;

export const regionalRiskLocations = [
  { id: "ennore", label: "Ennore", x: 72, y: 28 },
  { id: "manali", label: "Manali", x: 68, y: 38 },
  { id: "gummidipoondi", label: "Gummidipoondi", x: 58, y: 18 },
  { id: "periyapalayam", label: "Periyapalayam", x: 52, y: 32 },
  { id: "tiruvallur", label: "Tiruvallur", x: 38, y: 42 },
  { id: "chennai", label: "Chennai", x: 62, y: 72 },
] as const;

export const immediateActions = [
  "Inspect all ammonia-based refrigeration facilities in Tiruvallur and Chennai belt immediately.",
  "Prioritise units where workers are housed inside the campus.",
  "Review facilities with old refrigeration systems or outsourced maintenance without accountability.",
  "Verify working ammonia detectors, emergency ventilation, and shut-off systems.",
  "Test alarm audibility in both work areas and accommodation blocks.",
  "Confirm pressure relief valves, PPE availability, and emergency exits.",
  "Review worker accommodation as a separate safety category.",
  "Ensure no sleeping quarters fall within a gas-leak risk envelope without warning.",
  "Conduct unannounced inspections with document checks, physical checks, and functional testing.",
  "Include night-time and holiday emergency readiness in every inspection.",
] as const;

export const officialChecklist = [
  "Valid factory licence and approved building layout.",
  "Approved refrigeration machinery-room layout.",
  "Pressure-vessel and receiver certification.",
  "Ammonia pipeline integrity inspection.",
  "Compressor maintenance logs.",
  "Functional ammonia gas detectors.",
  "Alarm audibility across work areas and accommodation.",
  "Emergency ventilation system test records.",
  "Emergency shut-off valve accessibility.",
  "Pressure relief valve inspection records.",
  "Fire and emergency access routes.",
  "Worker evacuation map in local and migrant-worker languages.",
  "Safety training records for all workers.",
  "Mock-drill frequency and attendance.",
  "PPE availability, including respirators where applicable.",
  "Safety Data Sheet availability for ammonia.",
  "First-aid and medical emergency linkage.",
  "Separation of worker accommodation from hazardous zones.",
  "Night-time and holiday emergency response plan.",
  "Record of previous leaks, odour complaints and repairs.",
] as const;

export const ammoniaLeakToc = [
  { id: "what-happened", label: "What happened at the facility" },
  { id: "why-ammonia", label: "Why ammonia is used in seafood processing" },
  { id: "worker-accommodation", label: "Worker accommodation safety question" },
  { id: "compliance-norms", label: "Compliance norms companies must follow" },
  { id: "officials-scrutiny", label: "Officials who must scrutinise facilities" },
  { id: "investigation", label: "What investigators must establish" },
  { id: "regional-pattern", label: "Industrial safety risks around Chennai" },
  { id: "human-cost", label: "The human cost behind export supply chains" },
  { id: "immediate-actions", label: "What must change immediately" },
  { id: "editorial-view", label: "Editorial view" },
  { id: "compliance-checklist", label: "Suggested compliance checklist for officials" },
  { id: "conclusion", label: "Conclusion" },
] as const;
