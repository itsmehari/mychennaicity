import Link from "next/link";
import { setClassifiedStatus, toggleClassifiedFeatured } from "@/app/admin/classifieds/actions";
import { DeskActionForm } from "@/components/super-admin/desk-action-form";
import {
  DeskDisclosure,
  DeskLookup,
  DeskNotice,
  DeskPager,
  DeskSegments,
} from "@/components/super-admin/desk-queue";
import { DeskPageHeader, deskGhostButton, statusPill } from "@/components/super-admin/desk-ui";
import { loadClassifiedDesk, type ClassifiedDeskSegment } from "@/domains/classifieds/admin";
import { chennaiClassifiedDetailPath } from "@/lib/routes/chennai-classifieds";
import { formatDeskStamp } from "@/lib/super-admin/desk-format";
import { deskHref } from "@/lib/super-admin/desk-return";

export const dynamic = "force-dynamic";

const PATH = "/super-admin/classifieds";
const SEGMENTS = [
  { id: "open", label: "Open" },
  { id: "draft", label: "Drafts" },
  { id: "closed", label: "Closed" },
  { id: "all", label: "All" },
] as const;

function parseSegment(raw: string | undefined): ClassifiedDeskSegment {
  if (raw && SEGMENTS.some((item) => item.id === raw)) return raw as ClassifiedDeskSegment;
  return "open";
}

function noticeText(code: string | undefined): string | null {
  if (code === "open") return "Published. The public classifieds hub can show it.";
  if (code === "draft") return "Moved to drafts. It is off the public hub.";
  if (code === "closed") return "Closed. The public page 404s.";
  if (code === "featured") return "Featured.";
  if (code === "unfeatured") return "Removed from featured.";
  return null;
}

export default async function AdminClassifiedsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string; notice?: string }>;
}) {
  const params = await searchParams;
  const segment = parseSegment(params.status);
  const q = (params.q ?? "").trim();
  let desk: Awaited<ReturnType<typeof loadClassifiedDesk>>;
  try {
    desk = await loadClassifiedDesk({ segment, q, pageRaw: params.page });
  } catch (err) {
    return (
      <p className="p-4 text-sm text-red-700">
        Could not load classifieds: {err instanceof Error ? err.message : "db error"}
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
        title="Classifieds"
        lede="Publish, unpublish, or close an ad. Closing removes it from the public hub. Gated numbers stay hidden here too — enquiries are on Contact requests. Do not invent a phone."
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
        placeholder="Title, area, name, phone, or slug"
        rangeLabel={`${rangeStart}–${rangeEnd} of ${desk.total}`}
      />
      <ul className="space-y-2">
        {desk.rows.length === 0 ? (
          <li className="text-sm text-zinc-600">No classifieds in this segment.</li>
        ) : (
          desk.rows.map((row) => (
            <DeskDisclosure
              key={row.id}
              summary={
                <span className="grid gap-1 sm:grid-cols-[minmax(0,1.4fr)_8rem_7rem_6rem] sm:items-center">
                  <span className="min-w-0">
                    <span className="block font-medium">{row.title}</span>
                    <span className="block truncate text-xs text-zinc-500">
                      {[row.category, row.locationLabel, row.posterName].filter(Boolean).join(" · ") ||
                        row.slug}
                    </span>
                  </span>
                  <span className="text-xs text-zinc-600">{row.locationLabel || "—"}</span>
                  <span className="text-xs text-zinc-500">{formatDeskStamp(row.updatedAt)}</span>
                  <span className={statusPill(row.status)}>
                    {row.status}
                    {row.featured ? " · featured" : ""}
                    {row.contactPhoneGated ? " · gated" : ""}
                  </span>
                </span>
              }
              actions={
                <>
                  {row.status !== "open" ? (
                    <DeskActionForm action={setClassifiedStatus}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="status" value="open" />
                      <input type="hidden" name="returnTo" value={returnTo} />
                      <button type="submit" className={deskGhostButton}>
                        Publish
                      </button>
                    </DeskActionForm>
                  ) : (
                    <DeskActionForm action={setClassifiedStatus}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="status" value="draft" />
                      <input type="hidden" name="returnTo" value={returnTo} />
                      <button type="submit" className={deskGhostButton}>
                        Unpublish
                      </button>
                    </DeskActionForm>
                  )}
                  {row.status !== "closed" ? (
                    <DeskActionForm action={setClassifiedStatus}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="status" value="closed" />
                      <input type="hidden" name="returnTo" value={returnTo} />
                      <button type="submit" className={deskGhostButton}>
                        Close
                      </button>
                    </DeskActionForm>
                  ) : null}
                  <DeskActionForm action={toggleClassifiedFeatured}>
                    <input type="hidden" name="id" value={row.id} />
                    <input type="hidden" name="featured" value={row.featured ? "true" : "false"} />
                    <input type="hidden" name="returnTo" value={returnTo} />
                    <button type="submit" className={deskGhostButton}>
                      {row.featured ? "Unfeature" : "Feature"}
                    </button>
                  </DeskActionForm>
                  {row.status === "open" ? (
                    <Link href={chennaiClassifiedDetailPath(row.slug)} className={deskGhostButton} target="_blank">
                      View
                    </Link>
                  ) : null}
                </>
              }
            >
              <p className="max-h-48 overflow-auto whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
                {row.body.trim() || "No body."}
              </p>
              <p className="mt-2 text-zinc-500">
                {row.slug}
                {row.expiresAt ? ` · expires ${formatDeskStamp(row.expiresAt)}` : ""}
                {row.contactPhone && !row.contactPhoneGated ? ` · ${row.contactPhone}` : ""}
                {row.contactPhoneGated ? " · number stays behind the enquiry form" : ""}
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
