import type { Metadata } from "next";
import { ExamTimetableScreen } from "@/components/exams/exam-timetable-screen";
import { examBscModel } from "@/content/exams/exam-pages";
import {
  EXAM_TIMETABLE_BSC_PATH,
  EXAM_TIMETABLE_HUB_PATH,
} from "@/content/exams/madras-university-nov-2026";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { buildExamTimetableJsonLd } from "@/lib/seo/exam-timetable-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const model = examBscModel();

export const metadata: Metadata = {
  title: model.title,
  description: model.description,
  alternates: { canonical: `${getSiteUrl()}${EXAM_TIMETABLE_BSC_PATH}` },
  openGraph: {
    title: fullSiteTitle(model.title),
    description: model.description,
    url: `${getSiteUrl()}${EXAM_TIMETABLE_BSC_PATH}`,
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

export default function MadrasUniversityBscTimetablePage() {
  const jsonLd = buildExamTimetableJsonLd({
    path: EXAM_TIMETABLE_BSC_PATH,
    title: model.title,
    description: model.description,
    crumbs: [
      { name: "November 2026 exam timetable", path: EXAM_TIMETABLE_HUB_PATH },
      { name: "B.Sc.", path: EXAM_TIMETABLE_BSC_PATH },
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
          { label: "B.Sc." },
        ]}
        title={model.title}
        description={model.description}
        answer={model.answer}
        papers={model.papers}
        pagePath={EXAM_TIMETABLE_BSC_PATH}
        engagementSlug="madras-university-bsc-nov-2026"
        faq={model.faq}
        programmes={model.programmes}
      />
    </>
  );
}
