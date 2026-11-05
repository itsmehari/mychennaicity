import { notFound } from "next/navigation";
import { examProgrammeModel } from "@/content/exams/exam-pages";
import { examProgrammeBySlug } from "@/content/exams/madras-university-nov-2026";
import { markdownResponse } from "@/lib/seo/content-markdown";
import { buildExamTimetableMarkdown } from "@/lib/seo/exam-timetable-markdown";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const programme = examProgrammeBySlug((await params).slug);
  if (!programme) notFound();
  const model = examProgrammeModel(programme);
  return markdownResponse(
    buildExamTimetableMarkdown({
      title: model.title,
      path: model.path,
      answer: model.answer,
      papers: model.papers,
    }),
  );
}
