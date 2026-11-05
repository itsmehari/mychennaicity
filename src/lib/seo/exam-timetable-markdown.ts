import {
  EXAM_SOURCE_PDF,
  EXAM_UNIVERSITY,
  examSectionLabel,
  formatExamDate,
  formatExamSession,
  type ExamPaper,
} from "@/content/exams/madras-university-nov-2026";
import { getSiteUrl } from "@/lib/env";

export function buildExamTimetableMarkdown(input: {
  title: string;
  path: string;
  answer: string;
  papers: ExamPaper[];
}): string {
  const origin = getSiteUrl().replace(/\/$/, "");
  const lines = [
    `# ${input.title}`,
    "",
    `Canonical: ${origin}${input.path}`,
    `Plain text: ${origin}${input.path}/markdown`,
    `Official PDF: ${EXAM_SOURCE_PDF}`,
    "",
    input.answer,
    "",
    `This is a convenience view published by mychennaicity.in. ${EXAM_UNIVERSITY} is the source. If a row disagrees with the official PDF, follow the PDF.`,
    "",
    "## Papers",
    "",
  ];
  for (const paper of input.papers) {
    const code = paper.code || "code not readable on the PDF";
    const course = paper.programmeName ?? examSectionLabel(paper.section);
    lines.push(
      `- ${formatExamDate(paper.date)}, ${formatExamSession(paper.session)}: ${paper.subject} (${code}). ${course}${paper.batch ? `, batch ${paper.batch}` : ""}${paper.semester ? `, semester ${paper.semester}` : ""}. PDF page ${paper.page}.`,
    );
  }
  lines.push(
    "",
    "After the exam lookup, students can open Chennai jobs at " +
      `${origin}/chennai-jobs and rooms at ${origin}/chennai-classifieds?category=flatmates-roommates. ` +
      `The WhatsApp community join form is ${origin}/whatsapp-community/join?src=exam-timetable. Joining is optional.`,
  );
  return lines.join("\n");
}
