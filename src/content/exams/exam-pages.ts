import {
  EXAM_DATES,
  EXAM_PAPERS,
  EXAM_PROGRAMMES,
  EXAM_SESSION_LABEL,
  EXAM_SOURCE_PDF,
  EXAM_TIMETABLE_BSC_PATH,
  EXAM_TIMETABLE_HUB_PATH,
  examBscProgrammes,
  examCommonPapers,
  examDateRange,
  examDegreeLabel,
  examPaperAnswer,
  examPapersByCode,
  examPapersForProgramme,
  examPapersOnDate,
  examProgrammeName,
  examProgrammePath,
  formatExamDate,
  type ExamPaper,
  type ExamProgramme,
} from "@/content/exams/madras-university-nov-2026";
import type { FaqItem } from "@/lib/seo/faq-jsonld";

const EXAMPLE = examPapersByCode("343C5A")[0];

function rangeSentence(papers: ExamPaper[]): string {
  const range = examDateRange(papers);
  if (!range) return "The dates are listed below.";
  if (range.first === range.last) return `The listed papers are on ${formatExamDate(range.first)}.`;
  return `The listed papers run from ${formatExamDate(range.first)} to ${formatExamDate(range.last)}.`;
}

export function examHubModel() {
  const title = "University of Madras November 2026 exam timetable";
  const description =
    "Find a University of Madras B.Sc. or B.C.A. November 2026 exam date, paper code, and forenoon or afternoon session without scrolling the 28-page PDF.";
  const example = EXAMPLE
    ? ` For example, ${EXAMPLE.code} ${EXAMPLE.subject} is on ${formatExamDate(EXAMPLE.date)}, ${EXAMPLE.session === "FN" ? "forenoon" : "afternoon"}.`
    : "";
  const answer = `${rangeSentence(EXAM_PAPERS)} Forenoon papers are ${EXAM_SESSION_LABEL.FN} and afternoon papers are ${EXAM_SESSION_LABEL.AN}. Search a paper code or open your course page.${example} The official PDF remains the source if a row needs a correction.`;
  const faq: FaqItem[] = [
    {
      question: "When are the University of Madras B.Sc. and B.C.A. November 2026 exams?",
      answer,
    },
    {
      question: "What are the forenoon and afternoon exam timings?",
      answer: `Forenoon (FN) is ${EXAM_SESSION_LABEL.FN}. Afternoon (AN) is ${EXAM_SESSION_LABEL.AN}.`,
    },
    {
      question: "How do I find my paper code?",
      answer:
        "Type the code, such as 343C5A, into the search on this page. You can also open your course page and filter by admission batch and semester. Codes with a slash are the same sitting for more than one course.",
    },
    {
      question: "Where is the official University of Madras timetable?",
      answer: `The university file is ${EXAM_SOURCE_PDF}. This page is a convenience copy for students. Follow the PDF if anything differs.`,
    },
  ];
  const dateCounts = EXAM_DATES.map((iso) => ({
    iso,
    count: EXAM_PAPERS.filter((paper) => paper.date === iso).length,
  }));
  return { title, description, answer, faq, dateCounts, papers: EXAM_PAPERS, programmes: EXAM_PROGRAMMES };
}

export function examBscModel() {
  const papers = examCommonPapers();
  const programmes = examBscProgrammes();
  const title = "University of Madras B.Sc. November 2026 exam timetable";
  const description =
    "B.Sc. course pages for the University of Madras November 2026 exams, plus the language and English papers shared across courses.";
  const answer = `University of Madras B.Sc. November 2026 papers are on the course pages linked below. Language and English papers are shared across courses. ${rangeSentence(papers)} Forenoon is ${EXAM_SESSION_LABEL.FN} and afternoon is ${EXAM_SESSION_LABEL.AN}. B.C.A. has its own page.`;
  const faq: FaqItem[] = [
    {
      question: "Where is the Madras University B.Sc. November 2026 timetable?",
      answer,
    },
    {
      question: "Which B.Sc. courses are in this timetable?",
      answer: programmes.map((item) => examProgrammeName(item)).join(", ") + ".",
    },
  ];
  return { title, description, answer, faq, papers, programmes };
}

export function examProgrammeModel(programme: ExamProgramme) {
  const papers = examPapersForProgramme(programme.slug);
  const name = examProgrammeName(programme);
  const degree = examDegreeLabel(programme.degree);
  const courseLabel = programme.slug === "bca" ? name : `${degree} ${name}`;
  const title = `University of Madras ${courseLabel} November 2026 exam timetable`;
  const description = `${courseLabel} exam dates, paper codes, and forenoon or afternoon sessions for the University of Madras November 2026 timetable. Batches: ${programme.batches.join(", ")}.`;
  const answer = `${courseLabel} at the University of Madras: ${rangeSentence(papers)} Admission batches on this timetable: ${programme.batches.join(" and ")}. Forenoon is ${EXAM_SESSION_LABEL.FN} and afternoon is ${EXAM_SESSION_LABEL.AN}. Language papers for B.Sc. sit on the B.Sc. overview.`;
  const faq: FaqItem[] = [
    {
      question: `When are the University of Madras ${courseLabel} November 2026 exams?`,
      answer,
    },
    {
      question: `Which admission batches are covered for ${name}?`,
      answer: `This timetable marks ${programme.batches.join(" and ")}. Use the batch filter so a 2022–23 paper is not read as a 2023–24 paper.`,
    },
  ];
  return { title, description, answer, faq, papers, path: examProgrammePath(programme.slug) };
}

export function examDateModel(isoDate: string) {
  const papers = examPapersOnDate(isoDate);
  const label = formatExamDate(isoDate);
  const fn = papers.filter((paper) => paper.session === "FN").length;
  const an = papers.filter((paper) => paper.session === "AN").length;
  const title = `University of Madras exams on ${label}`;
  const description = `B.Sc. and B.C.A. papers scheduled on ${label} in the University of Madras November 2026 timetable, with codes and forenoon or afternoon session.`;
  const answer = `On ${label}, the University of Madras B.Sc. / B.C.A. timetable lists ${fn} forenoon paper${fn === 1 ? "" : "s"} (${EXAM_SESSION_LABEL.FN}) and ${an} afternoon paper${an === 1 ? "" : "s"} (${EXAM_SESSION_LABEL.AN}).`;
  const sample = papers[0] ? ` ${examPaperAnswer(papers[0])}` : "";
  const faq: FaqItem[] = [
    {
      question: `Which University of Madras exams are on ${label}?`,
      answer: answer + sample,
    },
  ];
  return { title, description, answer, faq, papers };
}

export function examHubCrumbs() {
  return [
    { label: "Home", href: "/" },
    { label: "November 2026 exam timetable" },
  ];
}

export const examHubPath = EXAM_TIMETABLE_HUB_PATH;
export const examBscPath = EXAM_TIMETABLE_BSC_PATH;
