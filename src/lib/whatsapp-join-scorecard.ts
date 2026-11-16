import { sql } from "drizzle-orm";
import { getDb } from "@/db/client";

export type WhatsappJoinScorecard = {
  verified30d: number;
  approved30d: number;
  declined30d: number;
  approvalRate: number | null;
  medianHours: number | null;
  byFirstSource: { key: string; count: number }[];
  byPartner: { key: string; count: number }[];
  submittedNow: number;
  waitlistNow: number;
  approved7d: number;
};

const empty: WhatsappJoinScorecard = {
  verified30d: 0,
  approved30d: 0,
  declined30d: 0,
  approvalRate: null,
  medianHours: null,
  byFirstSource: [],
  byPartner: [],
  submittedNow: 0,
  waitlistNow: 0,
  approved7d: 0,
};

function executeRows<T>(raw: unknown): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (raw && typeof raw === "object" && Array.isArray((raw as { rows?: unknown }).rows)) {
    return (raw as { rows: T[] }).rows;
  }
  return [];
}

export async function loadWhatsappJoinScorecard(): Promise<WhatsappJoinScorecard> {
  try {
    const db = getDb();
    const countRows = executeRows<Record<string, unknown>>(
      await db.execute(sql`
        SELECT
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days')::int AS verified_30d,
          COUNT(*) FILTER (
            WHERE status = 'approved' AND approved_at >= NOW() - INTERVAL '30 days'
          )::int AS approved_30d,
          COUNT(*) FILTER (
            WHERE status IN ('declined', 'spam')
              AND updated_at >= NOW() - INTERVAL '30 days'
          )::int AS declined_30d,
          COUNT(*) FILTER (WHERE status = 'submitted')::int AS submitted_now,
          COUNT(*) FILTER (
            WHERE status = 'approved' AND approved_at >= NOW() - INTERVAL '7 days'
          )::int AS approved_7d
        FROM whatsapp_join_verifications
      `),
    );
    const row = countRows[0];
    const verified30d = Number(row?.verified_30d ?? 0);
    const approved30d = Number(row?.approved_30d ?? 0);
    const declined30d = Number(row?.declined_30d ?? 0);
    const submittedNow = Number(row?.submitted_now ?? 0);
    let waitlistNow = 0;
    const approved7d = Number(row?.approved_7d ?? 0);
    try {
      const waitRows = executeRows<Record<string, unknown>>(
        await db.execute(sql`
          SELECT COUNT(*)::int AS n
          FROM whatsapp_join_verifications
          WHERE status::text = 'waitlist'
        `),
      );
      waitlistNow = Number(waitRows[0]?.n ?? 0);
    } catch {
      waitlistNow = 0;
    }

    let medianHours: number | null = null;
    try {
      const medianRows = executeRows<{ median_hours?: number | string | null }>(
        await db.execute(sql`
          SELECT percentile_cont(0.5) WITHIN GROUP (
            ORDER BY EXTRACT(EPOCH FROM (approved_at - COALESCE(verified_at, created_at))) / 3600.0
          ) AS median_hours
          FROM whatsapp_join_verifications
          WHERE status = 'approved'
            AND approved_at IS NOT NULL
            AND approved_at >= NOW() - INTERVAL '30 days'
        `),
      );
      if (medianRows[0]?.median_hours != null) {
        medianHours = Number(medianRows[0].median_hours);
      }
    } catch {
      medianHours = null;
    }

    const asKeyRows = (raw: unknown): { key: string; count: number }[] =>
      executeRows<{ key?: string; count?: number }>(raw).map((item) => ({
        key: String(item.key ?? "(none)"),
        count: Number(item.count ?? 0),
      }));

    let sources: { key: string; count: number }[] = [];
    let partners: { key: string; count: number }[] = [];
    try {
      sources = asKeyRows(
        await db.execute(sql`
          SELECT COALESCE(first_source, source, '(none)') AS key, COUNT(*)::int AS count
          FROM whatsapp_join_verifications
          WHERE status = 'approved' AND approved_at >= NOW() - INTERVAL '30 days'
          GROUP BY 1
          ORDER BY count DESC
          LIMIT 8
        `),
      );
      partners = asKeyRows(
        await db.execute(sql`
          SELECT COALESCE(partner_code, '(none)') AS key, COUNT(*)::int AS count
          FROM whatsapp_join_verifications
          WHERE status = 'approved' AND approved_at >= NOW() - INTERVAL '30 days'
          GROUP BY 1
          ORDER BY count DESC
          LIMIT 8
        `),
      );
    } catch {
      sources = [];
      partners = [];
    }

    const denom = approved30d + declined30d;
    return {
      verified30d,
      approved30d,
      declined30d,
      approvalRate: denom > 0 ? Math.round((approved30d / denom) * 100) : null,
      medianHours,
      byFirstSource: sources,
      byPartner: partners,
      submittedNow,
      waitlistNow,
      approved7d,
    };
  } catch {
    return empty;
  }
}
