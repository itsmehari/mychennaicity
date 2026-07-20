import type { DataProvenance } from "@/lib/civic-geo/provenance";

export type CivicIssueType =
  | "garbage"
  | "pothole"
  | "streetlight"
  | "stormwater-drain"
  | "mosquito"
  | "stray-cattle"
  | "public-toilet"
  | "encroachment"
  | "park"
  | "property-tax"
  | "trade-licence"
  | "birth-certificate"
  | "building-complaint"
  | "flooding"
  | "sewage"
  | "water-supply";

export type CivicIssueGuide = {
  id: CivicIssueType;
  label: string;
  primaryAuthority: string;
  gccDepartment: string | null;
  zoneWardInvolvement: string;
  otherAgency: string | null;
  complaintMethod: string;
  documentsRequired: string[];
  escalationPath: string[];
  provenance: DataProvenance;
};

const baseProv: DataProvenance = {
  source: "MyChennaiCity editorial civic routing guide v1",
  sourceDate: "2026-03-28",
  geographyVersion: "gcc-15",
  verificationStatus: "reported",
  methodology:
    "Compiled from GCC department structure and commonly cited Tamil Nadu civic jurisdiction rules. Verify against latest GCC circulars.",
  confidence: "medium",
};

export const CIVIC_ISSUE_GUIDES: CivicIssueGuide[] = [
  {
    id: "garbage",
    label: "Garbage / solid waste",
    primaryAuthority: "Greater Chennai Corporation",
    gccDepartment: "Solid Waste Management",
    zoneWardInvolvement: "Ward sanitary inspector and zone SWM team",
    otherAgency: null,
    complaintMethod:
      "GCC online civic services, MyGCC app, or dial 1913 with ward number.",
    documentsRequired: ["Photo of dump site", "Landmark or GPS pin"],
    escalationPath: [
      "Ward sanitary inspector",
      "Assistant engineer (SWM), zone office",
      "Deputy commissioner (zone)",
    ],
    provenance: baseProv,
  },
  {
    id: "pothole",
    label: "Pothole / road damage",
    primaryAuthority: "Greater Chennai Corporation (GCC roads) or Highways (state roads)",
    gccDepartment: "Engineering — Roads",
    zoneWardInvolvement: "Zone AE/EE for GCC-maintained roads",
    otherAgency: "Highways Department for state highways; Metro for metro-adjacent works",
    complaintMethod:
      "GCC online services for corporation roads; identify road ownership first.",
    documentsRequired: ["Photo", "Street name", "Ward number"],
    escalationPath: ["Ward engineer", "Zone AE roads", "Regional deputy commissioner"],
    provenance: baseProv,
  },
  {
    id: "streetlight",
    label: "Streetlight",
    primaryAuthority: "Greater Chennai Corporation",
    gccDepartment: "Electrical — Street lights",
    zoneWardInvolvement: "Zone electrical wing",
    otherAgency: "Tangedco for supply faults at feeder level",
    complaintMethod: "GCC 1913 / online civic services with pole number if visible.",
    documentsRequired: ["Location photo", "Landmark"],
    escalationPath: ["Ward office", "Zone electrical AE", "Corporation electrical HQ"],
    provenance: baseProv,
  },
  {
    id: "stormwater-drain",
    label: "Stormwater drain",
    primaryAuthority: "Greater Chennai Corporation",
    gccDepartment: "Storm Water Drains (SWD)",
    zoneWardInvolvement: "Zone SWD division",
    otherAgency: null,
    complaintMethod: "GCC online services with ward and street.",
    documentsRequired: ["Photo/video of blockage", "Street name"],
    escalationPath: ["Ward engineer", "Zone SWD AE", "Chief engineer (SWD)"],
    provenance: baseProv,
  },
  {
    id: "mosquito",
    label: "Mosquito / vector control",
    primaryAuthority: "Greater Chennai Corporation",
    gccDepartment: "Health — Vector control",
    zoneWardInvolvement: "Ward health team / malaria inspector",
    otherAgency: null,
    complaintMethod: "1913 or GCC health complaint channel with breeding source location.",
    documentsRequired: ["Photo of stagnant water source if safe to capture"],
    escalationPath: ["Ward health inspector", "Zone health officer", "City health officer"],
    provenance: baseProv,
  },
  {
    id: "stray-cattle",
    label: "Stray cattle",
    primaryAuthority: "Greater Chennai Corporation",
    gccDepartment: "Health / Veterinary",
    zoneWardInvolvement: "Zone cattle catching squad",
    otherAgency: "Police for traffic hazard on highways",
    complaintMethod: "GCC 1913 with exact location.",
    documentsRequired: ["Location pin", "Photo if safe"],
    escalationPath: ["Ward office", "Zone health officer", "Corporation veterinary wing"],
    provenance: baseProv,
  },
  {
    id: "public-toilet",
    label: "Public toilet",
    primaryAuthority: "Greater Chennai Corporation",
    gccDepartment: "Public health / toilet maintenance contractor",
    zoneWardInvolvement: "Zone public toilet O&M",
    otherAgency: null,
    complaintMethod: "GCC online services; note toilet ID if displayed.",
    documentsRequired: ["Photo", "Toilet location"],
    escalationPath: ["Contractor helpline on signage", "Zone health AE", "Corporation health"],
    provenance: baseProv,
  },
  {
    id: "encroachment",
    label: "Encroachment",
    primaryAuthority: "Greater Chennai Corporation",
    gccDepartment: "Town Planning / Revenue",
    zoneWardInvolvement: "Zone TP/Revenue",
    otherAgency: "Police for obstruction of public way when urgent",
    complaintMethod: "GCC encroachment complaint with ward and survey details if known.",
    documentsRequired: ["Photos", "Address", "Duration of encroachment note"],
    escalationPath: ["Ward revenue inspector", "Zone TP officer", "Zonal commissioner"],
    provenance: baseProv,
  },
  {
    id: "park",
    label: "Park / playground",
    primaryAuthority: "Greater Chennai Corporation",
    gccDepartment: "Parks / Horticulture",
    zoneWardInvolvement: "Zone parks division",
    otherAgency: null,
    complaintMethod: "GCC online services with park name.",
    documentsRequired: ["Photo", "Park name board if visible"],
    escalationPath: ["Park in-charge", "Zone horticulture AE", "Deputy commissioner"],
    provenance: baseProv,
  },
  {
    id: "property-tax",
    label: "Property tax",
    primaryAuthority: "Greater Chennai Corporation",
    gccDepartment: "Revenue / Assessment",
    zoneWardInvolvement: "Zone revenue office",
    otherAgency: null,
    complaintMethod: "GCC property tax portal or zone revenue counter.",
    documentsRequired: ["Assessment number", "Ownership proof for disputes"],
    escalationPath: ["Ward assessor", "Zone revenue officer", "Assessment appellate authority"],
    provenance: baseProv,
  },
  {
    id: "trade-licence",
    label: "Trade licence",
    primaryAuthority: "Greater Chennai Corporation",
    gccDepartment: "Licence / Health",
    zoneWardInvolvement: "Zone licence section",
    otherAgency: null,
    complaintMethod: "GCC trade licence portal or zone office.",
    documentsRequired: ["Application form", "Premises proof", "ID"],
    escalationPath: ["Ward licence inspector", "Zone health officer", "Licence appellate"],
    provenance: baseProv,
  },
  {
    id: "birth-certificate",
    label: "Birth certificate",
    primaryAuthority: "Greater Chennai Corporation",
    gccDepartment: "Birth & Death Registration",
    zoneWardInvolvement: "Zone registrar office",
    otherAgency: null,
    complaintMethod: "GCC birth/death registration portal or zone counter.",
    documentsRequired: ["Hospital discharge summary or registration form", "Parent ID"],
    escalationPath: ["Zone registrar", "Corporation B&D registration unit"],
    provenance: baseProv,
  },
  {
    id: "building-complaint",
    label: "Building complaint / unauthorized construction",
    primaryAuthority: "Greater Chennai Corporation",
    gccDepartment: "Town Planning / Building licence",
    zoneWardInvolvement: "Zone TP enforcement",
    otherAgency: null,
    complaintMethod: "GCC building/TP complaint with site address.",
    documentsRequired: ["Photos", "Site address", "Ward number"],
    escalationPath: ["Ward TP inspector", "Zone TP officer", "Building licence appellate"],
    provenance: baseProv,
  },
  {
    id: "flooding",
    label: "Flooding / waterlogging",
    primaryAuthority: "Greater Chennai Corporation (local drains) + CMWSSB (sewer overflow)",
    gccDepartment: "SWD + Engineering",
    zoneWardInvolvement: "Zone SWD emergency cell during monsoon",
    otherAgency: "CMWSSB for sewer manholes; Tangedco for substation flooding",
    complaintMethod:
      "GCC 1913 for street flooding; CMWSSB helpline for sewage backup — do not file only with GCC for sewer-only issues.",
    documentsRequired: ["Photo/video", "Street name", "Duration"],
    escalationPath: ["Ward engineer", "Zone monsoon cell", "Corporation SWD control room"],
    provenance: baseProv,
  },
  {
    id: "sewage",
    label: "Sewage / manhole",
    primaryAuthority: "Chennai Metropolitan Water Supply and Sewerage Board (CMWSSB)",
    gccDepartment: null,
    zoneWardInvolvement: "GCC only if storm drain mix-up — clarify with CMWSSB first",
    otherAgency: "CMWSSB (Metro Water)",
    complaintMethod: "CMWSSB complaint helpline / online — not GCC-only for sewer network.",
    documentsRequired: ["Manhole location", "Photo"],
    escalationPath: ["Area engineer CMWSSB", "Division engineer", "Managing director grievance"],
    provenance: baseProv,
  },
  {
    id: "water-supply",
    label: "Water supply",
    primaryAuthority: "Chennai Metropolitan Water Supply and Sewerage Board (CMWSSB)",
    gccDepartment: null,
    zoneWardInvolvement: "N/A for piped supply complaints",
    otherAgency: "CMWSSB; Tangedco if borewell motor supply issue on private line",
    complaintMethod: "CMWSSB customer care with service connection number.",
    documentsRequired: ["Service connection number", "Address"],
    escalationPath: ["Area office", "Division engineer", "Consumer grievance cell"],
    provenance: baseProv,
  },
];
