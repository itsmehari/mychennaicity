import Link from "next/link";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { whatsappJoinVerifications } from "@/db/schema/tables";
import { withWhatsappGroupShareUtms } from "@/lib/whatsapp-community";
import {
  formatWhatsappJoinPhone,
  formatWhatsappJoinStamp,
  isWhatsappJoinSpamNumber,
  whatsappJoinIntentLabel,
  whatsappJoinQueueHeadline,
  whatsappJoinWaMeUrl,
  type WhatsappJoinStatus,
} from "@/lib/whatsapp-join";
import { trackedWhatsappCommunityInvite } from "@/lib/whatsapp-server";
import { WhatsappJoinQueueRow, type WhatsappJoinQueueRowData } from "./queue-row";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

const SEGMENTS = [
  { id: "submitted", label: "Ready" },
  { id: "approved", label: "Approved" },
  { id: "declined", label: "Declined" },
  { id: "spam", label: "Spam" },
  { id: "all", label: "All" },
] as const;

type Segment = (typeof SEGMENTS)[number]["id"];

function parseSegment(raw: string | undefined): Segment {
  if (raw && SEGMENTS.some((segment) => segment.id === raw)) return raw as Segment;
  return "submitted";
}

function parsePage(raw: string | undefined): number {
  const page = Number(raw);
  if (!Number.isInteger(page) || page < 1) return 1;
  return page;
}

function likeTerm(raw: string): string {
  return `%${raw.replace(/[%_]/g, "").slice(0, 80)}%`;
}

function queueHref(status: Segment, q: string, page: number): string {
  const params = new URLSearchParams();
  params.set("status", status);
  if (q) params.set("q", q);
  if (page > 1) params.set("page", String(page));
  return `/super-admin/whatsapp-join-requests?${params.toString()}`;
}

function blank(value: string | null | undefined): string {
  const text = value?.trim() ?? "";
  return text || "—";
}

export default async function WhatsappJoinRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const segment = parseSegment(params.status);
  const q = (params.q ?? "").trim();
  const digits = q.replace(/\D/g, "");

  try {
    const db = getDb();
    const countRows = await db
      .select({
        status: whatsappJoinVerifications.status,
        n: sql<number>`count(*)::int`,
      })
      .from(whatsappJoinVerifications)
      .groupBy(whatsappJoinVerifications.status);

    const counts: Record<string, number> = { all: 0 };
    for (const row of countRows) {
      counts[row.status] = Number(row.n);
      counts.all += Number(row.n);
    }

    const filters = [];
    if (segment !== "all") {
      filters.push(eq(whatsappJoinVerifications.status, segment));
    }
    if (q) {
      const parts = [
        ilike(whatsappJoinVerifications.displayName, likeTerm(q)),
        ilike(whatsappJoinVerifications.locality, likeTerm(q)),
        ilike(whatsappJoinVerifications.phoneRaw, likeTerm(q)),
      ];
      if (digits) {
        parts.push(ilike(whatsappJoinVerifications.phoneE164, likeTerm(digits)));
        if (digits.length >= 4) {
          parts.push(eq(whatsappJoinVerifications.phoneLast4, digits.slice(-4)));
        }
      }
      const search = or(...parts);
      if (search) filters.push(search);
    }
    const where = filters.length ? and(...filters) : undefined;

    const [{ total: totalRaw } = { total: 0 }] = await db
      .select({ total: sql<number>`count(*)::int` })
      .from(whatsappJoinVerifications)
      .where(where);
    const total = Number(totalRaw);
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const page = Math.min(parsePage(params.page), pageCount);

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
      .where(where)
      .orderBy(desc(whatsappJoinVerifications.updatedAt), desc(whatsappJoinVerifications.createdAt))
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE);

    const nudgeInvite = trackedWhatsappCommunityInvite("admin-nudge", "admin");
    const shareExample = withWhatsappGroupShareUtms("/chennai-local-news");
    const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
    const rangeEnd = total === 0 ? 0 : rangeStart + rows.length - 1;

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
      canMessage: Boolean(
        whatsappJoinWaMeUrl({
          displayName: row.displayName,
          status: row.status,
          phoneE164: row.phoneE164,
          inviteForNudge: nudgeInvite,
        }),
      ),
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
      ipHash: blank(row.ipHash) === "—" ? "" : (row.ipHash ?? ""),
      userAgent: row.userAgent?.trim() ?? "",
    }));

    return (
      <div className="mx-auto w-full max-w-7xl space-y-4 px-4 py-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="text-lg font-semibold">WhatsApp join requests</h1>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="/super-admin/whatsapp-join-requests/export" className="underline">
              Export CSV
            </a>
            <a href="/whatsapp-community/join" className="underline">
              Public form
            </a>
          </div>
        </div>
        <p className="max-w-3xl text-xs text-zinc-600 dark:text-zinc-400">
          Match the last 4 digits with WhatsApp&apos;s pending requests, approve
          there, then mark the row here. The number is the order the request was
          first saved. Open a row for the phone as typed, source, approval, last
          nudge, and a note. Message opens WhatsApp for Ready and Approved rows.
          Share site links inside the group with{" "}
          <span className="break-all">{shareExample}</span>
        </p>
        <nav className="flex flex-wrap gap-2 text-sm">
          {SEGMENTS.map((item) => {
            const active = item.id === segment;
            return (
              <Link
                key={item.id}
                href={queueHref(item.id, q, 1)}
                className={
                  active
                    ? "rounded-full bg-zinc-900 px-3 py-1 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "rounded-full border border-zinc-300 px-3 py-1 dark:border-zinc-700"
                }
              >
                {item.label} ({counts[item.id] ?? 0})
              </Link>
            );
          })}
        </nav>
        <form className="flex flex-wrap items-center gap-2" action="/super-admin/whatsapp-join-requests">
          <input type="hidden" name="status" value={segment} />
          <input
            name="q"
            defaultValue={q}
            placeholder="Name, area, number, or last 4"
            className="min-w-64 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Lookup
          </button>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            {rangeStart}–{rangeEnd} of {total}
          </p>
        </form>
        <ul className="space-y-2">
          {view.length === 0 ? (
            <li className="text-sm text-zinc-600">No rows in this segment.</li>
          ) : (
            view.map((row) => <WhatsappJoinQueueRow key={row.id} row={row} />)
          )}
        </ul>
        {pageCount > 1 ? (
          <nav className="flex flex-wrap items-center gap-3 text-sm">
            {page > 1 ? (
              <Link href={queueHref(segment, q, page - 1)} className="underline">
                Previous
              </Link>
            ) : (
              <span className="text-zinc-400">Previous</span>
            )}
            <span>
              Page {page} of {pageCount}
            </span>
            {page < pageCount ? (
              <Link href={queueHref(segment, q, page + 1)} className="underline">
                Next
              </Link>
            ) : (
              <span className="text-zinc-400">Next</span>
            )}
          </nav>
        ) : null}
      </div>
    );
  } catch (err) {
    return (
      <p className="text-sm text-red-700">
        Could not load join requests. Apply{" "}
        <code>drizzle/0013_whatsapp_join_verifications.sql</code> before using this
        queue. {err instanceof Error ? err.message : "Database error."}
      </p>
    );
  }
}
