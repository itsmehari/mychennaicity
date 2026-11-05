import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamTimetableScreen } from "@/components/exams/exam-timetable-screen";
import { examProgrammeModel } from "@/content/exams/exam-pages";
import {
  EXAM_PROGRAMMES,
  EXAM_TIMETABLE_HUB_PATH,
  examProgrammeBySlug,
  examProgrammeName,
} from "@/content/exams/madras-university-nov-2026";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { buildExamTimetableJsonLd } from "@/lib/seo/exam-timetable-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return EXAM_PROGRAMMES.filter((item) => item.slug !== "bsc").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const programme = examProgrammeBySlug((await params).slug);
  if (!programme) return {};
  const model = examProgrammeModel(programme);
  const url = `${getSiteUrl()}${model.path}`;
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

export default async function MadrasUniversityProgrammeTimetablePage({ params }: Props) {
  const programme = examProgrammeBySlug((await params).slug);
  if (!programme) notFound();
  const model = examProgrammeModel(programme);
  const jsonLd = buildExamTimetableJsonLd({
    path: model.path,
    title: model.title,
    description: model.description,
    crumbs: [
      { name: "November 2026 exam timetable", path: EXAM_TIMETABLE_HUB_PATH },
      { name: model.title, path: model.path },
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
          { label: examProgrammeName(programme) },
        ]}
        title={model.title}
        description={model.description}
        answer={model.answer}
        papers={model.papers}
        pagePath={model.path}
        engagementSlug={programme.slug}
        faq={model.faq}
        showProgrammeColumn={false}
      />
    </>
  );
}
