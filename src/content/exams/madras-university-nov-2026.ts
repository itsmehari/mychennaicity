import raw from "./madras-university-nov-2026.json";

export const EXAM_TIMETABLE_HUB_PATH = "/madras-university-exam-timetable-2026";
export const EXAM_TIMETABLE_BSC_PATH = `${EXAM_TIMETABLE_HUB_PATH}/bsc`;

export const EXAM_SOURCE_PDF =
  "https://egovernance.unom.ac.in/internal/timetable/BScBCA.PDF";
export const EXAM_SOURCE_INDEX =
  "https://egovernance.unom.ac.in/internal/timetable/tt.html";

export type ExamSession = "FN" | "AN";
export type ExamDegree = "bsc" | "bca" | "common";
export type ExamSection = "language" | "english" | "core" | "elective" | "allied" | "other";

export type ExamPaper = {
  date: string;
  session: ExamSession;
  subject: string;
  code: string;
  codes: string[];
  programmeSlug: string | null;
  programmeName: string | null;
  programmeCode: string | null;
  batch: string | null;
  semester: number | null;
  section: ExamSection;
  degree: ExamDegree;
  page: number;
  flagged: boolean;
};

export type ExamProgramme = {
  slug: string;
  name: string;
  degree: "bsc" | "bca";
  batches: string[];
};

type RawFile = {
  university: string;
  examination: string;
  sessions: Record<ExamSession, string>;
  sourcePdf: string;
  sourceIndex: string;
  papers: ExamPaper[];
  programmes: ExamProgramme[];
  dates: string[];
  flagged: { page: number; subject: string; date: string }[];
};

const data = raw as RawFile;

const DISPLAY_NAME: Record<string, string> = {
  bca: "B.C.A. (Bachelor of Computer Applications)",
  "electronics-with-artificial-inteligence": "Electronics with Artificial Intelligence",
  "home-science-interior-design-and-d-cor": "Home Science — Interior Design and Decor",
};

const SMALL_WORDS = new Set(["and", "with", "for", "of"]);

export function examProgrammeName(programme: Pick<ExamProgramme, "slug" | "name">): string {
  const fixed = DISPLAY_NAME[programme.slug];
  if (fixed) return fixed;
  return programme.name
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      const plain = word.replace(/[^a-z&,-]/g, "");
      if (index > 0 && SMALL_WORDS.has(plain)) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ")
    .replace(/\s+-\s+/g, " — ");
}

export const EXAM_UNIVERSITY = data.university;
export const EXAM_SESSION_LABEL = data.sessions;
export const EXAM_PAPERS: ExamPaper[] = data.papers;
export const EXAM_PROGRAMMES: ExamProgramme[] = data.programmes;
export const EXAM_DATES: string[] = data.dates;
export const EXAM_FLAGGED = data.flagged;

const byCode = new Map<string, ExamPaper[]>();
for (const paper of EXAM_PAPERS) {
  for (const code of paper.codes) {
    const list = byCode.get(code) ?? [];
    list.push(paper);
    byCode.set(code, list);
  }
}

export function examProgrammePath(slug: string): string {
  return `${EXAM_TIMETABLE_HUB_PATH}/${slug}`;
}

export function examDatePath(isoDate: string): string {
  return `${EXAM_TIMETABLE_HUB_PATH}/on/${isoDate}`;
}

export function examMarkdownPath(path: string): string {
  return `${path}/markdown`;
}

export function examProgrammeBySlug(slug: string): ExamProgramme | null {
  return EXAM_PROGRAMMES.find((item) => item.slug === slug) ?? null;
}

export function examPapersForProgramme(slug: string): ExamPaper[] {
  return EXAM_PAPERS.filter((paper) => paper.programmeSlug === slug);
}

export function examPapersOnDate(isoDate: string): ExamPaper[] {
  return EXAM_PAPERS.filter((paper) => paper.date === isoDate);
}

export function examPapersByCode(code: string): ExamPaper[] {
  const key = code.trim().toUpperCase();
  return byCode.get(key) ?? [];
}

export function examPapersMatching(query: string, papers: ExamPaper[] = EXAM_PAPERS): ExamPaper[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];
  return papers.filter((paper) =>
    `${paper.subject} ${paper.code} ${paper.codes.join(" ")} ${paper.programmeName ?? ""}`
      .toLowerCase()
      .includes(needle),
  );
}

export function examBscProgrammes(): ExamProgramme[] {
  return EXAM_PROGRAMMES.filter((item) => item.degree === "bsc");
}

export function examCommonPapers(): ExamPaper[] {
  return EXAM_PAPERS.filter((paper) => paper.degree === "common");
}

export function examDateRange(papers: ExamPaper[]): { first: string; last: string } | null {
  if (!papers.length) return null;
  const dates = papers.map((paper) => paper.date).sort();
  return { first: dates[0]!, last: dates[dates.length - 1]! };
}

export function formatExamDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(Date.UTC(year, month - 1, day, 6, 30)));
}

export function formatExamSession(session: ExamSession): string {
  const when = session === "FN" ? "Forenoon" : "Afternoon";
  return `${when} (${EXAM_SESSION_LABEL[session]})`;
}

export function examSectionLabel(section: ExamSection): string {
  switch (section) {
    case "language":
      return "Language";
    case "english":
      return "English";
    case "core":
      return "Core";
    case "elective":
      return "Elective";
    case "allied":
      return "Allied";
    default:
      return "Paper";
  }
}

export function examDegreeLabel(degree: ExamDegree): string {
  if (degree === "bca") return "B.C.A.";
  if (degree === "bsc") return "B.Sc.";
  return "B.Sc. / B.C.A.";
}

export type ExamSitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: "weekly";
};

export function examSitemapEntries(): ExamSitemapEntry[] {
  const pages: ExamSitemapEntry[] = [
    { path: EXAM_TIMETABLE_HUB_PATH, priority: 0.9, changeFrequency: "weekly" },
    { path: EXAM_TIMETABLE_BSC_PATH, priority: 0.8, changeFrequency: "weekly" },
  ];
  for (const programme of EXAM_PROGRAMMES) {
    if (programme.slug === "bsc") continue;
    pages.push({
      path: examProgrammePath(programme.slug),
      priority: programme.slug === "bca" ? 0.8 : 0.7,
      changeFrequency: "weekly",
    });
  }
  for (const date of EXAM_DATES) {
    pages.push({
      path: examDatePath(date),
      priority: 0.6,
      changeFrequency: "weekly",
    });
  }
  return pages;
}

export function examPaperAnswer(paper: ExamPaper): string {
  const code = paper.code || "the paper code is not readable on the PDF";
  const course = paper.programmeName
    ? `${examDegreeLabel(paper.degree)} ${examProgrammeName({ slug: paper.programmeSlug ?? "", name: paper.programmeName })}`
    : examSectionLabel(paper.section);
  const batch = paper.batch ? `, admission batch ${paper.batch}` : "";
  const semester = paper.semester ? `, semester ${paper.semester}` : "";
  return `${paper.subject} (${code}) is on ${formatExamDate(paper.date)}, ${formatExamSession(paper.session)}. It is listed under ${course}${batch}${semester}. Source page ${paper.page} of the University of Madras B.Sc. / B.C.A. November 2026 timetable.`;
}
