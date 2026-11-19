import { neon } from "@neondatabase/serverless";
import { getSiteUrl } from "@/lib/env";

export const dynamic = "force-dynamic";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function relatedJobs(): Promise<{ title: string; slug: string }[]> {
  const url = process.env.DATABASE_URL;
  if (!url) return [];
  try {
    const sql = neon(url);
    const rows = await sql`
      select jp.title, jp.slug
      from job_postings jp
      inner join cities c on c.id = jp.city_id
      where c.slug = 'chennai'
        and jp.status = 'open'
        and (jp.valid_through is null or jp.valid_through > now())
      order by jp.published_at desc nulls last
      limit 5
    `;
    return rows.map((row) => ({
      title: String(row.title ?? "Open role"),
      slug: String(row.slug ?? ""),
    }));
  } catch {
    return [];
  }
}

export async function GET() {
  const base = getSiteUrl();
  const related = await relatedJobs();
  const items = related
    .filter((job) => job.slug)
    .map(
      (job) =>
        `<li><a href="${escapeHtml(`${base}/chennai-jobs/${encodeURIComponent(job.slug)}`)}">${escapeHtml(job.title)}</a></li>`,
    )
    .join("");
  const html = `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<title>Vacancy closed · mychennaicity.in</title>
</head>
<body>
<main>
<h1>This vacancy has closed</h1>
<p>The listing is no longer open on MyChennaiCity. Browse current Chennai jobs instead.</p>
<p><a href="${base}/chennai-jobs">Jobs in Chennai</a></p>
${items ? `<h2>Open roles</h2><ul>${items}</ul>` : ""}
</main>
</body>
</html>`;
  return new Response(html, {
    status: 410,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex, follow",
      "cache-control": "no-store",
    },
  });
}
