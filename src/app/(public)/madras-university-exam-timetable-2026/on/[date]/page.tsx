import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamTimetableScreen } from "@/components/exams/exam-timetable-screen";
import { examDateModel } from "@/content/exams/exam-pages";
import {
  EXAM_DATES,
  EXAM_TIMETABLE_HUB_PATH,
  examDatePath,
} from "@/content/exams/madras-university-nov-2026";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { buildExamTimetableJsonLd } from "@/lib/seo/exam-timetable-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ date: string }> };

export function generateStaticParams() {
  return EXAM_DATES.map((date) => ({ date }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const date = (await params).date;
  if (!EXAM_DATES.includes(date)) return {};
  const model = examDateModel(date);
  const path = examDatePath(date);
  const url = `${getSiteUrl()}${path}`;
  return {
    title: model.title,
    description: model.description,
    alternates: { canonical: url },
    openGraph: {
      title: fullSiteTitle(model.title),
      description: model.description,
      url,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSiteTitle(model.title),
      description: model.description,
      images: ["/twitter-image"],
    },
    other: { ...CHENNAI_GEO_META },
  };
}

export default async function MadrasUniversityExamDatePage({ params }: Props) {
  const date = (await params).date;
  if (!EXAM_DATES.includes(date)) notFound();
  const model = examDateModel(date);
  const path = examDatePath(date);
  const jsonLd = buildExamTimetableJsonLd({
    path,
    title: model.title,
    description: model.description,
    crumbs: [
      { name: "November 2026 exam timetable", path: EXAM_TIMETABLE_HUB_PATH },
      { name: model.title, path },
    ],
    faq: model.faq,
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ExamTimetableScreen
        crumbs={[
          { label: "Home", href: "/" },
          { label: "November 2026 exam timetable", href: EXAM_TIMETABLE_HUB_PATH },
          { label: model.title },
        ]}
        title={model.title}
        description={model.description}
        answer={model.answer}
        papers={model.papers}
        pagePath={path}
        engagementSlug={date}
        faq={model.faq}
      />
    </>
  );
}
