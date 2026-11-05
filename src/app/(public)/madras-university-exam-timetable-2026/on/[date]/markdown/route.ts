import { notFound } from "next/navigation";
import { examDateModel } from "@/content/exams/exam-pages";
import { EXAM_DATES, examDatePath } from "@/content/exams/madras-university-nov-2026";
import { markdownResponse } from "@/lib/seo/content-markdown";
import { buildExamTimetableMarkdown } from "@/lib/seo/exam-timetable-markdown";

type Props = { params: Promise<{ date: string }> };

export async function GET(_request: Request, { params }: Props) {
  const date = (await params).date;
  if (!EXAM_DATES.includes(date)) notFound();
  const model = examDateModel(date);
  return markdownResponse(
    buildExamTimetableMarkdown({
      title: model.title,
      path: examDatePath(date),
      answer: model.answer,
      papers: model.papers,
    }),
  );
}
