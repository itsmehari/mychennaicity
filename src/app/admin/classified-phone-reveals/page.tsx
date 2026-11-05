import Link from "next/link";
import { setContactFollowed } from "@/app/admin/classifieds/actions";
import { DeskActionForm } from "@/components/super-admin/desk-action-form";
import {
  DeskDisclosure,
  DeskLookup,
  DeskNotice,
  DeskPager,
  DeskSegments,
} from "@/components/super-admin/desk-queue";
import { DeskPageHeader, deskGhostButton } from "@/components/super-admin/desk-ui";
import { loadContactDesk, type ContactDeskSegment } from "@/domains/classifieds/admin";
import { formatIndianMobile } from "@/lib/classifieds/phone-gate";
import { chennaiClassifiedDetailPath } from "@/lib/routes/chennai-classifieds";
import { formatDeskStamp } from "@/lib/super-admin/desk-format";
import { deskHref } from "@/lib/super-admin/desk-return";

export const dynamic = "force-dynamic";

const PATH = "/super-admin/classified-phone-reveals";
const SEGMENTS = [
  { id: "new", label: "New" },
  { id: "followed", label: "Followed up" },
  { id: "all", label: "All" },
] as const;

function parseSegment(raw: string | undefined): ContactDeskSegment {
  if (raw && SEGMENTS.some((item) => item.id === raw)) return raw as ContactDeskSegment;
  return "new";
}

function noticeText(code: string | undefined): string | null {
  if (code === "followed") return "Marked followed up.";
  if (code === "cleared") return "Cleared. It is back in New.";
  return null;
}

export default async function ClassifiedPhoneRevealsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string; notice?: string }>;
}) {
  const params = await searchParams;
  const segment = parseSegment(params.status);
  const q = (params.q ?? "").trim();
  let desk: Awaited<ReturnType<typeof loadContactDesk>>;
  try {
    desk = await loadContactDesk({ segment, q, pageRaw: params.page });
  } catch (err) {
    const message = err instanceof Error ? err.message : "db error";
    const missingColumn = /followed_up_at/i.test(message);
    return (
      <p className="p-4 text-sm text-red-700">
        Could not load contact requests.{" "}
        {missingColumn
          ? "Apply drizzle/0017_classified_reveal_followed_up.sql before using Followed up."
          : message}
      </p>
    );
  }
  const returnTo = deskHref(PATH, {
    status: segment,
    q: q || undefined,
    page: desk.page > 1 ? desk.page : undefined,
  });
  const rangeStart = desk.total === 0 ? 0 : (desk.page - 1) * 40 + 1;
  const rangeEnd = desk.total === 0 ? 0 : rangeStart + desk.rows.length - 1;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6">
      <DeskPageHeader
        title="Contact requests"
        lede="Name and mobile saved when someone asks for a hidden classified number. Followed up keeps the row, and moves it out of New."
        actions={
          <a href={`${PATH}/export`} className={deskGhostButton}>
            Export CSV
          </a>
        }
      />
      <DeskNotice notice={noticeText(params.notice)} error={null} />
      <DeskSegments
        items={SEGMENTS.map((item) => ({
          href: deskHref(PATH, { status: item.id, q: q || undefined }),
          label: item.label,
          count: desk.counts[item.id] ?? 0,
          active: item.id === segment,
        }))}
      />
      <DeskLookup
        action={PATH}
        status={segment}
        q={q}
        placeholder="Name, mobile, or ad"
        rangeLabel={`${rangeStart}–${rangeEnd} of ${desk.total}`}
      />
      <ul className="space-y-2">
        {desk.rows.length === 0 ? (
          <li className="text-sm text-zinc-600">No requests in this segment.</li>
        ) : (
          desk.rows.map((row) => (
            <DeskDisclosure
              key={row.id}
              summary={
                <span className="grid gap-1 sm:grid-cols-[8.5rem_8rem_minmax(0,1fr)] sm:items-center">
                  <span className="text-xs text-zinc-500">{formatDeskStamp(row.createdAt)}</span>
                  <span>
                    <span className="block font-medium">{row.name?.trim() || "No name"}</span>
                    <span className="font-mono text-xs">{formatIndianMobile(row.phone)}</span>
                  </span>
                  <span className="truncate text-zinc-700 dark:text-zinc-300">{row.title}</span>
                </span>
              }
              actions={
                <DeskActionForm action={setContactFollowed}>
                  <input type="hidden" name="id" value={row.id} />
                  <input type="hidden" name="clear" value={row.followedUpAt ? "true" : "false"} />
                  <input type="hidden" name="returnTo" value={returnTo} />
                  <button type="submit" className={deskGhostButton}>
                    {row.followedUpAt ? "Clear" : "Followed up"}
                  </button>
                </DeskActionForm>
              }
            >
              <p className="text-zinc-600 dark:text-zinc-300">
                <a className="underline" href={`tel:+91${row.phone}`}>
                  Call {formatIndianMobile(row.phone)}
                </a>
                {" · "}
                {row.followedUpAt ? `Followed up ${formatDeskStamp(row.followedUpAt)}. ` : "Not followed up. "}
                <Link className="underline" href={chennaiClassifiedDetailPath(row.slug)}>
                  {row.title}
                </Link>
              </p>
            </DeskDisclosure>
          ))
        )}
      </ul>
      <DeskPager
        page={desk.page}
        pageCount={desk.pageCount}
        prevHref={desk.page > 1 ? deskHref(PATH, { status: segment, q: q || undefined, page: desk.page - 1 }) : null}
        nextHref={
          desk.page < desk.pageCount
            ? deskHref(PATH, { status: segment, q: q || undefined, page: desk.page + 1 })
            : null
        }
      />
    </div>
  );
}
