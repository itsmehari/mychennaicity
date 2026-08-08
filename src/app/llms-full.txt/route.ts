import { listPublicEventsForChennaiHub } from "@/domains/events";
import { listOpenJobPostingsForChennaiHub } from "@/domains/jobs";
import { listPublishedArticlesForChennai } from "@/domains/news";
import { chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";
import {
  buildLlmsFullMarkdown,
  type LlmsDigestItem,
} from "@/lib/seo/llms-txt";

export const dynamic = "force-dynamic";

export async function GET() {
  let news: LlmsDigestItem[] = [];
  let jobs: LlmsDigestItem[] = [];
  let events: LlmsDigestItem[] = [];

  try {
    const articles = await listPublishedArticlesForChennai(15);
    news = articles.map((a) => ({
      title: a.title,
      url: `/chennai-local-news/${a.slug}`,
      summary: a.summary ?? a.dek,
      date: (a.publishedAt ?? a.createdAt)?.toISOString?.() ?? null,
    }));
  } catch {
    news = [];
  }

  try {
    const rows = await listOpenJobPostingsForChennaiHub(12, 0);
    jobs = rows.map((r) => ({
      title: r.job.title,
      url: chennaiJobsDetailPath(r.job.slug),
      summary: r.employer.name
        ? `${r.employer.name}${r.job.locationLabel ? ` · ${r.job.locationLabel}` : ""}`
        : r.job.locationLabel,
      date: r.job.updatedAt?.toISOString?.() ?? r.job.createdAt?.toISOString?.() ?? null,
    }));
  } catch {
    jobs = [];
  }

  try {
    const rows = await listPublicEventsForChennaiHub(12);
    events = rows.map((e) => ({
      title: e.title,
      url: `/chennai-local-events/${e.slug}`,
      summary: e.venueName ?? e.localityLabel,
      date: e.startsAt?.toISOString?.() ?? null,
    }));
  } catch {
    events = [];
  }

  const body = buildLlmsFullMarkdown({ news, jobs, events });
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "X-Robots-Tag": "all",
    },
  });
}
