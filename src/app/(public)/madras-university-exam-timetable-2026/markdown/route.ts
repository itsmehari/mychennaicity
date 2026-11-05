import { examHubModel } from "@/content/exams/exam-pages";
import { EXAM_TIMETABLE_HUB_PATH } from "@/content/exams/madras-university-nov-2026";
import { buildExamTimetableMarkdown } from "@/lib/seo/exam-timetable-markdown";
import { markdownResponse } from "@/lib/seo/content-markdown";

export function GET() {
  const model = examHubModel();
  return markdownResponse(
    buildExamTimetableMarkdown({
      title: model.title,
      path: EXAM_TIMETABLE_HUB_PATH,
      answer: model.answer,
      papers: model.papers,
    }),
  );
}
