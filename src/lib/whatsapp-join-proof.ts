import { unstable_cache } from "next/cache";
import { listPublishedArticlesForChennai } from "@/domains/news/queries";
import { listOpenJobPostingsForChennaiHub } from "@/domains/jobs/queries";
import { listPublicEventsForChennaiHub } from "@/domains/events/queries";
import { chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";
import { sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { WA_SOCIAL_PROOF_MIN_ROWS } from "@/lib/whatsapp-community-flags";

export type WhatsappProofLink = { label: string; href: string };

export type WhatsappProofStripData = {
  news: WhatsappProofLink | null;
  job: WhatsappProofLink | null;
  event: WhatsappProofLink | null;
};

export type WhatsappSocialProof = {
  requestedThisWeek: number;
  localities: string[];
};

const PROOF_QUERY_TIMEOUT_MS = 2500;

function withQueryTimeout<T>(promise: Promise<T>, ms = PROOF_QUERY_TIMEOUT_MS): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error("wa-proof-timeout")), ms);
    }),
  ]);
}

async function loadProofStripUncached(): Promise<WhatsappProofStripData | null> {
  try {
    const [newsRows, jobRows, eventRows] = await withQueryTimeout(Promise.all([
      listPublishedArticlesForChennai(1),
      listOpenJobPostingsForChennaiHub(1),
      listPublicEventsForChennaiHub(1),
    ]));
    const news = newsRows[0];
    const job = jobRows[0]?.job;
    const event = eventRows[0];
    return {
      news: news
        ? { label: news.title, href: `/chennai-local-news/${news.slug}` }
        : null,
      job: job
        ? { label: job.title, href: chennaiJobsDetailPath(job.slug) }
        : null,
      event: event
        ? { label: event.title, href: `/chennai-local-events/${event.slug}` }
        : null,
    };
  } catch {
    return null;
  }
}

export const loadWhatsappProofStrip = unstable_cache(
  loadProofStripUncached,
  ["wa-proof-strip"],
  { revalidate: 3600 },
);

async function loadSocialProofUncached(): Promise<WhatsappSocialProof | null> {
  try {
    const db = getDb();
    const countRaw = await withQueryTimeout(db.execute(sql`
      SELECT COUNT(*)::int AS n
      FROM whatsapp_join_verifications
      WHERE created_at >= NOW() - INTERVAL '7 days'
        AND status IN ('submitted', 'approved')
    `));
    const countList = Array.isArray(countRaw)
      ? countRaw
      : ((countRaw as { rows?: { n?: number }[] }).rows ?? []);
    const requestedThisWeek = Number(countList[0]?.n ?? 0);
    if (requestedThisWeek < WA_SOCIAL_PROOF_MIN_ROWS) return null;

    const localitiesRaw = await withQueryTimeout(db.execute(sql`
      SELECT locality, COUNT(*)::int AS n
      FROM whatsapp_join_verifications
      WHERE created_at >= NOW() - INTERVAL '30 days'
        AND locality IS NOT NULL
        AND locality <> ''
      GROUP BY locality
      HAVING COUNT(*) >= ${WA_SOCIAL_PROOF_MIN_ROWS}
      ORDER BY n DESC
      LIMIT 6
    `));
    const localityList = Array.isArray(localitiesRaw)
      ? localitiesRaw
      : ((localitiesRaw as { rows?: { locality?: string }[] }).rows ?? []);
    const names = localityList
      .map((row) => String((row as { locality?: string }).locality ?? ""))
      .filter(Boolean);
    return { requestedThisWeek, localities: names };
  } catch {
    return null;
  }
}

export const loadWhatsappSocialProof = unstable_cache(
  loadSocialProofUncached,
  ["wa-social-proof"],
  { revalidate: 3600 },
);
