import { EXAM_SESSION_LABEL } from "@/content/exams/madras-university-nov-2026";
import { getSiteUrl } from "@/lib/env";

export function ExamTimetableFinder({
  pagePath,
  initialQuery = "",
}: {
  pagePath: string;
  initialQuery?: string;
}) {
  const shareUrl = `${getSiteUrl()}${
    initialQuery ? `${pagePath}?paper=${encodeURIComponent(initialQuery)}` : pagePath
  }`;

  return (
    <section className="exam-find" aria-label="Find your exam">
      <h2>Find your exam date</h2>
      <p>Search a paper code or subject. Example: 343C5A or Evolutionary Biology.</p>
      <form action={pagePath} method="get">
        <label htmlFor="exam-query">
          Paper code or subject
          <input id="exam-query" name="paper" defaultValue={initialQuery} placeholder="e.g. 343C5A" />
        </label>
        <button type="submit">Find</button>
      </form>
      <p>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`University of Madras November 2026 timetable: ${shareUrl}`)}`}
        >
          Share on WhatsApp
        </a>
      </p>
      <p className="exam-note">Forenoon {EXAM_SESSION_LABEL.FN}. Afternoon {EXAM_SESSION_LABEL.AN}.</p>
    </section>
  );
}
