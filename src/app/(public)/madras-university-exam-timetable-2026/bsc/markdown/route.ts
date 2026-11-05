import { examBscModel } from "@/content/exams/exam-pages";
import { EXAM_TIMETABLE_BSC_PATH } from "@/content/exams/madras-university-nov-2026";
import { markdownResponse } from "@/lib/seo/content-markdown";
import { buildExamTimetableMarkdown } from "@/lib/seo/exam-timetable-markdown";

export function GET() {
  const model = examBscModel();
  return markdownResponse(
    buildExamTimetableMarkdown({
      title: model.title,
      path: EXAM_TIMETABLE_BSC_PATH,
      answer: model.answer,
      papers: model.papers,
    }),
  );
}
