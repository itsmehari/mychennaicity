export type DocumentDef = {
  id: string;
  name: string;
};

export const DOCUMENT_ITEMS: DocumentDef[] = [
  { id: "bwg-reg", name: "BWG registration" },
  { id: "org-details", name: "Property and organisation details" },
  { id: "floor-area", name: "Floor-area evidence" },
  { id: "water", name: "Water-consumption records" },
  { id: "waste-audit", name: "Waste-audit records" },
  { id: "weighment", name: "Daily weighment records" },
  { id: "appointment", name: "Internal appointment order" },
  { id: "policy", name: "Waste-management policy" },
  { id: "sops", name: "SOPs" },
  { id: "training", name: "Training attendance" },
  { id: "photos", name: "Photographs of segregation facilities" },
  { id: "wet-logs", name: "Wet-waste processing logs" },
  { id: "maint", name: "Equipment maintenance logs" },
  { id: "vendor-docs", name: "Authorised vendor documents" },
  { id: "receipts", name: "Collection receipts" },
  { id: "weighbridge", name: "Weighbridge slips" },
  { id: "recycling-certs", name: "Recycling or processing certificates" },
  { id: "complaints", name: "Complaints and corrective actions" },
  { id: "inspections", name: "Inspection reports" },
  { id: "penalties", name: "Penalty notices" },
  { id: "appeals", name: "Appeal records" },
  { id: "annual", name: "Annual returns" },
  { id: "mgmt-minutes", name: "Management-review minutes" },
];
