import { listIndexableJobLandings, listJobsForSitemap } from "@/domains/jobs";
import { getSiteUrl } from "@/lib/env";
import {
  ADVERTISE_JOBS_PATH,
  ADVERTISE_JOBS_TAMIL_PATH,
} from "@/lib/routes/advertise-listings";
import {
  CHENNAI_JOBS_HUB_PATH,
  CHENNAI_JOBS_LOOKING_PATH,
  chennaiJobsDetailPath,
} from "@/lib/routes/chennai-jobs";

export const dynamic = "force-dynamic";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc: string, lastModified: Date): string {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastModified.toISOString()}</lastmod>
  </url>`;
}

/** Open job URLs plus indexable area and category slices. No drafts, filters, or expired rows. */
export async function GET() {
  const base = getSiteUrl();
  const now = new Date();
  let jobs: { slug: string; lastModified: Date }[] = [];
  let landings: { path: string; lastModified: Date }[] = [];
  try {
    [jobs, landings] = await Promise.all([
      listJobsForSitemap(),
      listIndexableJobLandings(now),
    ]);
  } catch (error) {
    console.warn("[jobs-sitemap]", error);
  }
  const fixed = [
    CHENNAI_JOBS_HUB_PATH,
    CHENNAI_JOBS_LOOKING_PATH,
    ADVERTISE_JOBS_PATH,
    ADVERTISE_JOBS_TAMIL_PATH,
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${fixed.map((path) => urlEntry(`${base}${path}`, now)).join("\n")}
${jobs
  .map((job) => urlEntry(`${base}${chennaiJobsDetailPath(job.slug)}`, job.lastModified))
  .join("\n")}
${landings
  .map((landing) => urlEntry(`${base}${landing.path}`, landing.lastModified))
  .join("\n")}
</urlset>`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate",
    },
  });
}
