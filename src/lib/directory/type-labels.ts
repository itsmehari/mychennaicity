export const DIRECTORY_ENTRY_TYPES = [
  "bank",
  "school",
  "hospital",
  "park",
  "restaurant",
  "atm",
  "it_company",
  "it_park",
  "government_office",
  "industry",
] as const;

export type DirectoryEntryType = (typeof DIRECTORY_ENTRY_TYPES)[number];

const TYPE_LABELS: Record<DirectoryEntryType, string> = {
  bank: "Bank",
  school: "School",
  hospital: "Hospital",
  park: "Park",
  restaurant: "Food & catering",
  atm: "ATM",
  it_company: "IT company",
  it_park: "IT park",
  government_office: "Government office",
  industry: "Industry",
};

export function isDirectoryEntryType(value: string): value is DirectoryEntryType {
  return (DIRECTORY_ENTRY_TYPES as readonly string[]).includes(value);
}

export function directoryTypeLabel(type: DirectoryEntryType): string {
  return TYPE_LABELS[type];
}
