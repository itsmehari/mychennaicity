import Link from "next/link";
import { setEventStatus, toggleEventFeatured } from "@/app/admin/events/actions";
import { DeskActionForm } from "@/components/super-admin/desk-action-form";
import {
  DeskDisclosure,
  DeskLookup,
  DeskNotice,
  DeskPager,
  DeskSegments,
} from "@/components/super-admin/desk-queue";
import { DeskPageHeader, deskGhostButton, statusPill } from "@/components/super-admin/desk-ui";
import { loadEventDesk, type EventDeskSegment } from "@/domains/events/admin";
import { formatDeskStamp } from "@/lib/super-admin/desk-format";
import { deskHref } from "@/lib/super-admin/desk-return";

export const dynamic = "force-dynamic";

const PATH = "/super-admin/events";
const SEGMENTS = [
  { id: "draft", label: "Drafts" },
  { id: "scheduled", label: "Scheduled" },
  { id: "cancelled", label: "Cancelled" },
  { id: "completed", label: "Completed" },
  { id: "all", label: "All" },
] as const;

function parseSegment(raw: string | undefined): EventDeskSegment {
  if (raw && SEGMENTS.some((item) => item.id === raw)) return raw as EventDeskSegment;
  return "draft";
}

function noticeText(code: string | undefined): string | null {
  if (code === "scheduled") return "Scheduled. It can show on the public events hub.";
  if (code === "draft") return "Moved back to drafts.";
  if (code === "cancelled") return "Marked cancelled.";
  if (code === "completed") return "Marked completed.";
  if (code === "featured") return "Featured.";
  if (code === "unfeatured") return "Removed from featured.";
  return null;
}

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string; notice?: string; error?: string }>;
}) {
  const params = await searchParams;
  const segment = parseSegment(params.status);
  const q = (params.q ?? "").trim();
  let desk: Awaited<ReturnType<typeof loadEventDesk>>;
  try {
    desk = await loadEventDesk({ segment, q, pageRaw: params.page });
  } catch (err) {
    return (
      <p className="p-4 text-sm text-red-700">
        Could not load events: {err instanceof Error ? err.message : "db error"}
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
        title="Event listings"
        lede="Drafts from the public submit form land here. Schedule a row to put it on the events hub. Cancelling or completing takes it off that hub. This does not edit the description."
      />
      <DeskNotice notice={noticeText(params.notice)} error={params.error === "save" ? "Could not save." : null} />
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
        placeholder="Title, venue, area, or slug"
        rangeLabel={`${rangeStart}–${rangeEnd} of ${desk.total}`}
      />
      <ul className="space-y-2">
        {desk.rows.length === 0 ? (
          <li className="text-sm text-zinc-600">No events in this segment.</li>
        ) : (
          desk.rows.map((row) => (
            <DeskDisclosure
              key={row.id}
              summary={
                <span className="grid gap-1 sm:grid-cols-[7.5rem_minmax(0,1.4fr)_9rem_6rem] sm:items-center">
                  <span className="text-xs text-zinc-600">{formatDeskStamp(row.startsAt)}</span>
                  <span className="min-w-0">
                    <span className="block font-medium">{row.title}</span>
                    <span className="block truncate text-xs text-zinc-500">
                      {[row.venueName, row.localityLabel].filter(Boolean).join(" · ") || row.slug}
                    </span>
                  </span>
                  <span className="text-xs text-zinc-600">{row.localityLabel || "—"}</span>
                  <span className={statusPill(row.status)}>
                    {row.status}
                    {row.featured ? " · featured" : ""}
                  </span>
                </span>
              }
              actions={
                <>
                  {row.status !== "scheduled" ? (
                    <DeskActionForm action={setEventStatus}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="status" value="scheduled" />
                      <input type="hidden" name="returnTo" value={returnTo} />
                      <button type="submit" className={deskGhostButton}>
                        Schedule
                      </button>
                    </DeskActionForm>
                  ) : (
                    <DeskActionForm action={setEventStatus}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="status" value="draft" />
                      <input type="hidden" name="returnTo" value={returnTo} />
                      <button type="submit" className={deskGhostButton}>
                        Unschedule
                      </button>
                    </DeskActionForm>
                  )}
                  {row.status !== "cancelled" ? (
                    <DeskActionForm action={setEventStatus}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="status" value="cancelled" />
                      <input type="hidden" name="returnTo" value={returnTo} />
                      <button type="submit" className={deskGhostButton}>
                        Cancel
                      </button>
                    </DeskActionForm>
                  ) : null}
                  {row.status !== "completed" ? (
                    <DeskActionForm action={setEventStatus}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="status" value="completed" />
                      <input type="hidden" name="returnTo" value={returnTo} />
                      <button type="submit" className={deskGhostButton}>
                        Done
                      </button>
                    </DeskActionForm>
                  ) : null}
                  <DeskActionForm action={toggleEventFeatured}>
                    <input type="hidden" name="id" value={row.id} />
                    <input type="hidden" name="featured" value={row.featured ? "true" : "false"} />
                    <input type="hidden" name="returnTo" value={returnTo} />
                    <button type="submit" className={deskGhostButton}>
                      {row.featured ? "Unfeature" : "Feature"}
                    </button>
                  </DeskActionForm>
                  {row.status === "scheduled" ? (
                    <Link
                      href={`/chennai-local-events/${row.slug}`}
                      className={deskGhostButton}
                      target="_blank"
                    >
                      View
                    </Link>
                  ) : null}
                </>
              }
            >
              <p className="max-h-48 overflow-auto whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
                {row.description?.trim() || "No description."}
              </p>
              <p className="mt-2 text-zinc-500">
                {row.slug}
                {row.endsAt ? ` · ends ${formatDeskStamp(row.endsAt)}` : ""}
                {` · updated ${formatDeskStamp(row.updatedAt)}`}
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
