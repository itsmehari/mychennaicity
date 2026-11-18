import { desc, gte, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { whatsappJoinVerifications } from "@/db/schema/tables";
import {
  formatWhatsappJoinPhone,
  formatWhatsappJoinStamp,
  isWhatsappJoinSpamNumber,
  whatsappJoinIntentLabel,
  whatsappJoinNudgeEligible,
  whatsappJoinQueueHeadline,
  whatsappJoinWaMeUrl,
  type WhatsappJoinStatus,
} from "@/lib/whatsapp-join";
import { todaysWhatsappNudgeCount } from "@/lib/whatsapp-join-desk-db";
import {
  WA_NUDGE_DAILY_CAP,
  isWhatsappDeskDaytimeIst,
  whatsappApprovalHours,
} from "@/lib/whatsapp-community-flags";
import {
  WhatsappJoinQueueRow,
  type WhatsappJoinQueueRowData,
} from "@/app/admin/whatsapp-join-requests/queue-row";

/** First day the desk stopped seeing new forms on the Ready tab. */
export const WHATSAPP_JOIN_VISIBLE_FROM = new Date("2026-11-17T00:00:00+05:30");

export async function WhatsappJoinRecentList({ returnTo }: { returnTo: string }) {
  const db = getDb();
  const requestNo = sql<number>`(
    select count(*)::int
    from whatsapp_join_verifications as older
    where older.created_at < ${whatsappJoinVerifications.createdAt}
       or (
         older.created_at = ${whatsappJoinVerifications.createdAt}
         and older.id <= ${whatsappJoinVerifications.id}
       )
  )`.mapWith(Number);

  const rows = await db
    .select({
      id: whatsappJoinVerifications.id,
      displayName: whatsappJoinVerifications.displayName,
      phoneRaw: whatsappJoinVerifications.phoneRaw,
      phoneE164: whatsappJoinVerifications.phoneE164,
      phoneLast4: whatsappJoinVerifications.phoneLast4,
      locality: whatsappJoinVerifications.locality,
      intent: whatsappJoinVerifications.intent,
      intro: whatsappJoinVerifications.intro,
      status: whatsappJoinVerifications.status,
      source: whatsappJoinVerifications.source,
      ipHash: whatsappJoinVerifications.ipHash,
      userAgent: whatsappJoinVerifications.userAgent,
      notes: whatsappJoinVerifications.notes,
      createdAt: whatsappJoinVerifications.createdAt,
      updatedAt: whatsappJoinVerifications.updatedAt,
      approvedAt: whatsappJoinVerifications.approvedAt,
      approvedBy: whatsappJoinVerifications.approvedBy,
      lastContactedAt: whatsappJoinVerifications.lastContactedAt,
      requestNo,
    })
    .from(whatsappJoinVerifications)
    .where(gte(whatsappJoinVerifications.createdAt, WHATSAPP_JOIN_VISIBLE_FROM))
    .orderBy(desc(whatsappJoinVerifications.createdAt), desc(whatsappJoinVerifications.id));

  const nudgeToday = await todaysWhatsappNudgeCount();
  const hours = whatsappApprovalHours();
  const nudgesLeft = Math.max(0, WA_NUDGE_DAILY_CAP - nudgeToday);
  const daytime = isWhatsappDeskDaytimeIst();

  const view: WhatsappJoinQueueRowData[] = rows.map((row) => ({
    id: row.id,
    requestNo: Number(row.requestNo),
    stamp: formatWhatsappJoinStamp(row.createdAt),
    displayName: row.displayName,
    headline: whatsappJoinQueueHeadline(row.intent, row.intro),
    phoneDisplay: formatWhatsappJoinPhone(row.phoneE164),
    phoneLast4: row.phoneLast4,
    locality: row.locality,
    status: row.status as WhatsappJoinStatus,
    onSpamList: isWhatsappJoinSpamNumber(row.phoneE164),
    messageUrl:
      nudgesLeft > 0 &&
      whatsappJoinNudgeEligible({
        status: row.status,
        lastContactedAt: row.lastContactedAt,
        createdAt: row.createdAt,
        approvalHours: hours,
        daytime,
      })
        ? whatsappJoinWaMeUrl({
            displayName: row.displayName,
            status: row.status,
            phoneE164: row.phoneE164,
            locality: row.locality,
          })
        : null,
    returnTo,
    intentLabel: whatsappJoinIntentLabel(row.intent),
    intro: row.intro?.trim() ?? "",
    phoneRaw: row.phoneRaw,
    source: row.source?.trim() || "join-page",
    createdStamp: formatWhatsappJoinStamp(row.createdAt),
    updatedStamp: formatWhatsappJoinStamp(row.updatedAt),
    approved: row.approvedAt
      ? `${formatWhatsappJoinStamp(row.approvedAt)}${row.approvedBy ? ` by ${row.approvedBy}` : ""}`
      : "—",
    lastNudge: row.lastContactedAt ? formatWhatsappJoinStamp(row.lastContactedAt) : "—",
    notes: row.notes ?? "",
    ipHash: row.ipHash?.trim() ?? "",
    userAgent: row.userAgent?.trim() ?? "",
  }));

  return (
    <section className="space-y-2" aria-label="Requests since 17 November">
      <div>
        <h2 className="text-sm font-semibold">Requests since 17 Nov</h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Every form from 17 Nov, 18 Nov, and each form after that. Message, approve, decline,
          and spam stay on the row. {view.length} in this list.
        </p>
      </div>
      <ul className="space-y-2">
        {view.length === 0 ? (
          <li className="text-sm text-zinc-600">No requests since 17 Nov.</li>
        ) : (
          view.map((row) => <WhatsappJoinQueueRow key={row.id} row={row} />)
        )}
      </ul>
    </section>
  );
}
