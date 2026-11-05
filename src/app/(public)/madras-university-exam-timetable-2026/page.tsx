import type { Metadata } from "next";
import { ExamTimetableScreen } from "@/components/exams/exam-timetable-screen";
import { examHubModel } from "@/content/exams/exam-pages";
import { EXAM_TIMETABLE_HUB_PATH, examPapersMatching } from "@/content/exams/madras-university-nov-2026";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { buildExamTimetableJsonLd } from "@/lib/seo/exam-timetable-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const model = examHubModel();

export const metadata: Metadata = {
  title: model.title,
  description: model.description,
  alternates: { canonical: `${getSiteUrl()}${EXAM_TIMETABLE_HUB_PATH}` },
  openGraph: {
    title: fullSiteTitle(model.title),
    description: model.description,
    url: `${getSiteUrl()}${EXAM_TIMETABLE_HUB_PATH}`,
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

type Props = { searchParams: Promise<{ paper?: string }> };

export default async function MadrasUniversityExamTimetablePage({ searchParams }: Props) {
  const query = (await searchParams).paper?.slice(0, 80).trim() ?? "";
  const matched = query.length >= 2 ? examPapersMatching(query) : [];
  const matches = matched.slice(0, 40);
  const papersNote =
    query.length === 1
      ? "Type at least two characters of the paper code or subject."
      : query.length >= 2
        ? matched.length === 0
          ? `No paper matches “${query}”. Check the code against the official PDF, or open your course page.`
          : matched.length > matches.length
            ? `Showing the first ${matches.length} of ${matched.length} papers that match “${query}”. Open the course page for the full set.`
            : `${matched.length} paper${matched.length === 1 ? "" : "s"} match “${query}”.`
        : "Search a paper code or subject, or open your course or a date. Those pages list the papers. The plain-text version lists every row.";
  const jsonLd = buildExamTimetableJsonLd({
    path: EXAM_TIMETABLE_HUB_PATH,
    title: model.title,
    description: model.description,
    crumbs: [{ name: "November 2026 exam timetable", path: EXAM_TIMETABLE_HUB_PATH }],
    faq: model.faq,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ExamTimetableScreen
        crumbs={[
          { label: "Home", href: "/" },
          { label: "November 2026 exam timetable" },
        ]}
        title={model.title}
        description={model.description}
        answer={model.answer}
        papers={matches}
        papersNote={papersNote}
        pagePath={EXAM_TIMETABLE_HUB_PATH}
        engagementSlug="madras-university-exam-timetable-2026"
        initialQuery={query}
        faq={model.faq}
        programmes={model.programmes}
        dates={model.dateCounts}
      />
    </>
  );
}
