import { listPublicEventsForChennaiHub } from "@/domains/events";
import { listOpenJobPostingsForChennaiHub } from "@/domains/jobs";
import { listPublishedArticlesForChennai } from "@/domains/news";
import { chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";
import {
  buildAeoChennaiMarkdown,
  type LlmsDigestItem,
} from "@/lib/seo/llms-txt";

export const dynamic = "force-dynamic";

/** Answer-first Markdown digest for Chennai news / jobs / events. */
export async function GET() {
  let news: LlmsDigestItem[] = [];
  let jobs: LlmsDigestItem[] = [];
  let events: LlmsDigestItem[] = [];

  try {
    const articles = await listPublishedArticlesForChennai(8);
    news = articles.map((a) => ({
      title: a.title,
      url: `/chennai-local-news/${a.slug}`,
      summary: a.summary ?? a.dek,
    }));
  } catch {
    news = [];
  }

  try {
    const rows = await listOpenJobPostingsForChennaiHub(8, 0);
    jobs = rows.map((r) => ({
      title: r.job.title,
      url: chennaiJobsDetailPath(r.job.slug),
      summary: r.employer.name ?? r.job.locationLabel,
    }));
  } catch {
    jobs = [];
  }

  try {
    const rows = await listPublicEventsForChennaiHub(8);
    events = rows.map((e) => ({
      title: e.title,
      url: `/chennai-local-events/${e.slug}`,
      summary: e.venueName ?? e.localityLabel,
    }));
  } catch {
    events = [];
  }

  return new Response(buildAeoChennaiMarkdown({ news, jobs, events }), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "X-Robots-Tag": "all",
    },
  });
}
