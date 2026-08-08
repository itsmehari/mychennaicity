import { listOpenJobPostingsForChennaiHub } from "@/domains/jobs";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH, chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";

export const dynamic = "force-dynamic";

/** RSS 2.0 — open Chennai job postings (title + short description). */
export async function GET() {
  const base = getSiteUrl();
  let items: Awaited<ReturnType<typeof listOpenJobPostingsForChennaiHub>> = [];
  try {
    items = await listOpenJobPostingsForChennaiHub(40, 0);
  } catch {
    items = [];
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>mychennaicity.in — Jobs in Chennai</title>
    <link>${base}${CHENNAI_JOBS_HUB_PATH}</link>
    <description>Open job listings in Chennai — apply on the employer’s own page.</description>
    <language>en-in</language>
    ${items
      .map((r) => {
        const link = `${base}${chennaiJobsDetailPath(r.job.slug)}`;
        const pub = (
          r.job.publishedAt ??
          r.job.updatedAt ??
          r.job.createdAt
        ).toUTCString();
        const desc = escapeXml(
          [r.employer.name, r.job.locationLabel, r.job.employmentType]
            .filter(Boolean)
            .join(" · ") || r.job.title,
        );
        return `
    <item>
      <title>${escapeXml(r.job.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pub}</pubDate>
      <description>${desc}</description>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
    },
  });
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
