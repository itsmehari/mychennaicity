import Link from "next/link";
import { GuideFinePrint } from "@/components/compulsive/guide-trust-blocks";
import { ExamNextSteps } from "@/components/exams/exam-next-steps";
import { ExamTimetableFinder } from "@/components/exams/exam-timetable-finder";
import { ContentEngagementScope } from "@/components/analytics/content-engagement-scope";
import { PageBreadcrumbs, interiorMainClassName } from "@/components/site/interior-chrome";
import {
  EXAM_SOURCE_INDEX,
  EXAM_SOURCE_PDF,
  EXAM_TIMETABLE_HUB_PATH,
  examDatePath,
  examDegreeLabel,
  examMarkdownPath,
  examProgrammeName,
  examProgrammePath,
  examSectionLabel,
  formatExamDate,
  formatExamSession,
  type ExamPaper,
  type ExamProgramme,
} from "@/content/exams/madras-university-nov-2026";
import type { FaqItem } from "@/lib/seo/faq-jsonld";

type Crumb = { label: string; href?: string };

export function ExamTimetableScreen({
  crumbs,
  title,
  description,
  answer,
  papers,
  papersNote,
  pagePath,
  engagementSlug,
  initialQuery,
  faq,
  programmes,
  dates,
  showProgrammeColumn = true,
}: {
  crumbs: Crumb[];
  title: string;
  description: string;
  answer: string;
  papers: ExamPaper[];
  papersNote?: string;
  pagePath: string;
  engagementSlug: string;
  initialQuery?: string;
  faq: FaqItem[];
  programmes?: ExamProgramme[];
  dates?: { iso: string; count: number }[];
  showProgrammeColumn?: boolean;
}) {
  return (
    <ContentEngagementScope kind="guide" slug={engagementSlug}>
      <div className={interiorMainClassName}>
        <PageBreadcrumbs items={crumbs} />
        <header className="mt-6 max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            University of Madras · November 2026
          </p>
          <h1 className="type-display mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {title}
          </h1>
          <p className="type-lede mt-3 text-base leading-relaxed text-[var(--muted)]">{description}</p>
        </header>

        <section className="mt-6 max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4" aria-label="Answer">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">In short</p>
          <p className="mt-2 text-base leading-relaxed text-[var(--foreground)]" data-speakable="exam-answer">
            {answer}
          </p>
          <p className="mt-3 text-sm">
            <a href={EXAM_SOURCE_PDF} className="font-semibold text-[var(--accent)]">
              Official timetable PDF
            </a>
            {" · "}
            <a href={EXAM_SOURCE_INDEX} className="font-semibold text-[var(--accent)]">
              University timetable index
            </a>
            {" · "}
            <Link href={examMarkdownPath(pagePath)} className="font-semibold text-[var(--accent)]">
              Plain-text version
            </Link>
          </p>
        </section>

        <ExamTimetableFinder pagePath={pagePath} initialQuery={initialQuery} />
        {papersNote ? <p className="exam-note">{papersNote}</p> : null}

        <ExamNextSteps />

        {papers.length > 0 ? (
          <section className="mt-10" aria-labelledby="exam-all-heading">
            <h2 id="exam-all-heading" className="text-xl font-bold text-[var(--foreground)]">
              Papers on this page
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {papers.length} {papers.length === 1 ? "row" : "rows"} from the official PDF. A blank code means that cell was not readable. Do not guess it.
            </p>
            <ol className="exam-sheet">
              {papers.map((paper, index) => {
                const course = paper.programmeSlug
                  ? `${examDegreeLabel(paper.degree)} ${examProgrammeName({
                      slug: paper.programmeSlug,
                      name: paper.programmeName ?? paper.programmeSlug,
                    })}`
                  : examSectionLabel(paper.section);
                return (
                  <li key={`${paper.page}-${paper.code}-${paper.subject}-${paper.session}-${index}`}>
                    <strong>{paper.subject}</strong>
                    {" — "}
                    {paper.code || "code not readable, check the official PDF"}
                    {". "}
                    {formatExamDate(paper.date)}, {formatExamSession(paper.session)}
                    {". "}
                    <small>
                      {showProgrammeColumn ? `${course}. ` : ""}
                      {paper.batch ? `Batch ${paper.batch}. ` : ""}
                      {paper.semester ? `Semester ${paper.semester}. ` : ""}
                      {examSectionLabel(paper.section)}. PDF page {paper.page}.
                    </small>
                  </li>
                );
              })}
            </ol>
          </section>
        ) : null}

        {programmes && programmes.length > 0 ? (
          <section className="mt-10" aria-labelledby="exam-courses-heading">
            <h2 id="exam-courses-heading" className="text-xl font-bold text-[var(--foreground)]">
              Course pages
            </h2>
            <ul className="mt-3 columns-1 gap-x-8 sm:columns-2">
              {programmes.map((programme) => (
                <li key={programme.slug} className="mb-2 break-inside-avoid">
                  <Link href={examProgrammePath(programme.slug)} className="text-[var(--accent)]">
                    {examDegreeLabel(programme.degree)} {examProgrammeName(programme)}
                  </Link>
                  <span className="text-sm text-[var(--muted)]"> · {programme.batches.join(", ")}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {dates && dates.length > 0 ? (
          <section className="mt-10" aria-labelledby="exam-dates-heading">
            <h2 id="exam-dates-heading" className="text-xl font-bold text-[var(--foreground)]">
              Exams by date
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {dates.map((date) => (
                <li key={date.iso}>
                  <Link
                    href={examDatePath(date.iso)}
                    className="inline-flex rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--foreground)]"
                  >
                    {formatExamDate(date.iso)} · {date.count}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section id="exam-faq" className="mt-10 max-w-3xl" aria-labelledby="exam-faq-heading">
          <h2 id="exam-faq-heading" className="text-xl font-bold text-[var(--foreground)]">
            Questions students ask
          </h2>
          <dl className="mt-4 space-y-4">
            {faq.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-[var(--foreground)]">{item.question}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-10 max-w-3xl space-y-4">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            <strong className="text-[var(--foreground)]">Disclaimer:</strong> This is a student lookup of the University of Madras
            B.Sc. / B.C.A. November 2026 timetable, published as civic journalism on mychennaicity.in. It is not a university
            notification. If a row here and the official PDF disagree, follow the PDF and any later university correction.
          </p>
          <GuideFinePrint extra="Paper codes, dates, and sessions were read from the official PDF. One allied paper, Financial Accounting I on 10 December 2026 (forenoon), has a code cell that did not print clearly and is left blank." />
          <p className="text-sm">
            <Link href={EXAM_TIMETABLE_HUB_PATH} className="font-semibold text-[var(--accent)]">
              All B.Sc. and B.C.A. papers
            </Link>
          </p>
        </div>
      </div>
    </ContentEngagementScope>
  );
}
