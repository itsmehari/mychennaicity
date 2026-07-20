import type { DataProvenance } from "@/lib/civic-geo/provenance";

export type AreaSabhaMeeting = {
  id: string;
  wardNo: number;
  zoneLabel: string;
  meetingDate: string;
  agenda: string;
  venue: string;
  minutesUrl: string | null;
  resolutions: string[];
  attendanceNote: string | null;
  projectsProposed: string[];
  projectsApproved: string[];
  implementationStatus: string;
  provenance: DataProvenance;
};

/** Add rows only after meeting notices or minutes are verified. */
export const AREA_SABHA_MEETINGS: AreaSabhaMeeting[] = [];
