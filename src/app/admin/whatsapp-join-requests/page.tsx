import Link from "next/link";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb } from "@/db/client";
import { whatsappJoinVerifications } from "@/db/schema/tables";
import { withWhatsappGroupShareUtms } from "@/lib/whatsapp-community";
import { isWhatsappJoinSpamNumber, whatsappJoinWaMeUrl } from "@/lib/whatsapp-join";
import { trackedWhatsappCommunityInvite } from "@/lib/whatsapp-server";
import { setWhatsappJoinStatus } from "./actions";
import { WhatsappJoinMessageButton } from "./message-button";

export const dynamic = "force-dynamic";

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

function likeTerm(raw: string): string {
  return `%${raw.replace(/[%_]/g, "").slice(0, 80)}%`;
}

function nudgedLabel(date: Date | null): string | null {
  if (!date) return null;
  const minutes = Math.round((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return "nudged just now";
  if (minutes < 60) return `nudged ${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `nudged ${hours} hr ago`;
  const days = Math.round(hours / 24);
  if (days < 14) return `nudged ${days} days ago`;
  return `nudged ${new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)}`;
}

export default async function WhatsappJoinRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    return (
      <p className="text-sm">
        <Link href="/api/auth/signin" className="underline">
          Sign in
        </Link>{" "}
        to look up WhatsApp join requests.
      </p>
    );
  }

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

    const rows = await db
      .select()
      .from(whatsappJoinVerifications)
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(desc(whatsappJoinVerifications.updatedAt))
      .limit(200);

    const nudgeInvite = trackedWhatsappCommunityInvite("admin-nudge", "admin");
    const shareExample = withWhatsappGroupShareUtms("/chennai-local-news");

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="text-lg font-semibold">WhatsApp join requests</h1>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="/admin/whatsapp-join-requests/export" className="underline">
              CSV
            </a>
            <Link href="/admin" className="underline">
              Admin home
            </Link>
          </div>
        </div>
        <p className="max-w-3xl text-xs text-zinc-600 dark:text-zinc-400">
          Match the last 4 digits with WhatsApp&apos;s pending requests, approve
          there, then mark the row here. Message opens WhatsApp for Ready and
          Approved rows. Share site links inside the group with{" "}
          <span className="break-all">{shareExample}</span>
        </p>
        <nav className="flex flex-wrap gap-2 text-sm">
          {SEGMENTS.map((item) => {
            const href = `/admin/whatsapp-join-requests?status=${item.id}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
            const active = item.id === segment;
            return (
              <Link
                key={item.id}
                href={href}
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
        <form className="flex flex-wrap gap-2" action="/admin/whatsapp-join-requests">
          <input type="hidden" name="status" value={segment} />
          <input
            name="q"
            defaultValue={q}
            placeholder="Name, area, number, or last 4"
            className="min-w-64 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          <button type="submit" className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900">
            Search
          </button>
        </form>
        <ul className="space-y-3">
          {rows.length === 0 ? (
            <li className="text-sm text-zinc-600">No rows in this segment.</li>
          ) : (
            rows.map((row) => {
              const onSpamList = isWhatsappJoinSpamNumber(row.phoneE164);
              const canMessage = Boolean(
                whatsappJoinWaMeUrl({
                  displayName: row.displayName,
                  status: row.status,
                  phoneE164: row.phoneE164,
                  inviteForNudge: nudgeInvite,
                }),
              );
              const nudged = nudgedLabel(row.lastContactedAt);
              return (
                <li
                  key={row.id}
                  className="rounded-lg border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium">
                      {row.displayName}{" "}
                      <span className="font-normal text-zinc-500">· {row.locality}</span>
                    </p>
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      {row.status === "submitted" ? "Ready" : row.status}
                      {onSpamList ? " · spam list" : ""}
                    </p>
                  </div>
                  <p className="mt-1 font-mono text-xs">
                    +{row.phoneE164} · last 4 {row.phoneLast4}
                    {nudged ? <span className="ml-2 font-sans text-zinc-600">{nudged}</span> : null}
                  </p>
                  <p className="mt-1 text-xs text-zinc-600">
                    {row.intent} · {row.source ?? "join-page"}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["approved", "declined", "spam"] as const).map((status) => (
                      <form key={status} action={setWhatsappJoinStatus}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="status" value={status} />
                        <button type="submit" className="rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700">
                          {status === "approved" ? "Approve" : status === "declined" ? "Decline" : "Spam"}
                        </button>
                      </form>
                    ))}
                    {canMessage ? <WhatsappJoinMessageButton id={row.id} /> : null}
                  </div>
                  <details className="mt-2 text-xs text-zinc-600">
                    <summary>Row detail</summary>
                    <p className="mt-1">Last nudge: {row.lastContactedAt ? row.lastContactedAt.toISOString() : "—"}</p>
                    <p>Approved: {row.approvedAt ? `${row.approvedAt.toISOString()} by ${row.approvedBy ?? ""}` : "—"}</p>
                    <p>Intro: {row.intro || "—"}</p>
                    <p>Updated: {row.updatedAt.toISOString()}</p>
                  </details>
                </li>
              );
            })
          )}
        </ul>
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
