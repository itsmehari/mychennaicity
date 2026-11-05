import Link from "next/link";
import { setArticleStatus, toggleArticleFeatured } from "@/app/admin/articles/actions";
import { DeskActionForm } from "@/components/super-admin/desk-action-form";
import {
  DeskDisclosure,
  DeskLookup,
  DeskNotice,
  DeskPager,
  DeskSegments,
} from "@/components/super-admin/desk-queue";
import { DeskPageHeader, deskGhostButton, statusPill } from "@/components/super-admin/desk-ui";
import { loadArticleDesk, type ArticleDeskSegment } from "@/domains/news/admin-desk";
import { formatDeskStamp } from "@/lib/super-admin/desk-format";
import { deskHref } from "@/lib/super-admin/desk-return";

export const dynamic = "force-dynamic";

const PATH = "/super-admin/articles";
const SEGMENTS = [
  { id: "published", label: "Published" },
  { id: "draft", label: "Drafts" },
  { id: "archived", label: "Archived" },
  { id: "all", label: "All" },
] as const;

function parseSegment(raw: string | undefined): ArticleDeskSegment {
  if (raw && SEGMENTS.some((item) => item.id === raw)) return raw as ArticleDeskSegment;
  return "published";
}

function noticeText(code: string | undefined): string | null {
  if (code === "published") return "Published.";
  if (code === "draft") return "Unpublished. It is off the news hub.";
  if (code === "archived") return "Archived.";
  if (code === "featured") return "Featured on the home page.";
  if (code === "unfeatured") return "Removed from featured.";
  return null;
}

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string; notice?: string }>;
}) {
  const params = await searchParams;
  const segment = parseSegment(params.status);
  const q = (params.q ?? "").trim();
  let desk: Awaited<ReturnType<typeof loadArticleDesk>>;
  try {
    desk = await loadArticleDesk({ segment, q, pageRaw: params.page });
  } catch (err) {
    return (
      <p className="p-4 text-sm text-red-700">
        Could not load articles: {err instanceof Error ? err.message : "db error"}
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
        title="Articles"
        lede="Find a story, then publish, unpublish, archive, or feature it. New stories still use seed scripts. This desk does not edit the body."
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
        placeholder="Title, slug, summary, or category"
        rangeLabel={`${rangeStart}–${rangeEnd} of ${desk.total}`}
      />
      <ul className="space-y-2">
        {desk.rows.length === 0 ? (
          <li className="text-sm text-zinc-600">No articles in this segment.</li>
        ) : (
          desk.rows.map((row) => (
            <DeskDisclosure
              key={row.id}
              summary={
                <span className="grid gap-1 sm:grid-cols-[minmax(0,1.6fr)_7rem_6.5rem] sm:items-center">
                  <span className="min-w-0">
                    <span className="block font-medium">{row.title}</span>
                    <span className="block truncate text-xs text-zinc-500">
                      {[row.category, row.slug].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                  <span className="text-xs text-zinc-500">
                    {formatDeskStamp(row.publishedAt ?? row.updatedAt)}
                  </span>
                  <span className={statusPill(row.status)}>
                    {row.status}
                    {row.featured ? " · featured" : ""}
                  </span>
                </span>
              }
              actions={
                <>
                  {row.status !== "published" ? (
                    <DeskActionForm action={setArticleStatus}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="status" value="published" />
                      <input type="hidden" name="returnTo" value={returnTo} />
                      <button type="submit" className={deskGhostButton}>
                        Publish
                      </button>
                    </DeskActionForm>
                  ) : (
                    <DeskActionForm action={setArticleStatus}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="status" value="draft" />
                      <input type="hidden" name="returnTo" value={returnTo} />
                      <button type="submit" className={deskGhostButton}>
                        Unpublish
                      </button>
                    </DeskActionForm>
                  )}
                  {row.status !== "archived" ? (
                    <DeskActionForm action={setArticleStatus}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="status" value="archived" />
                      <input type="hidden" name="returnTo" value={returnTo} />
                      <button type="submit" className={deskGhostButton}>
                        Archive
                      </button>
                    </DeskActionForm>
                  ) : null}
                  <DeskActionForm action={toggleArticleFeatured}>
                    <input type="hidden" name="id" value={row.id} />
                    <input type="hidden" name="featured" value={row.featured ? "true" : "false"} />
                    <input type="hidden" name="returnTo" value={returnTo} />
                    <button type="submit" className={deskGhostButton}>
                      {row.featured ? "Unfeature" : "Feature"}
                    </button>
                  </DeskActionForm>
                  {row.status === "published" ? (
                    <Link
                      href={`/chennai-local-news/${row.slug}`}
                      className={deskGhostButton}
                      target="_blank"
                    >
                      View
                    </Link>
                  ) : null}
                </>
              }
            >
              <p className="whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
                {row.summary?.trim() || "No summary."}
              </p>
              <p className="mt-2 text-zinc-500">
                {row.sourceName ? `${row.sourceName} · ` : ""}
                updated {formatDeskStamp(row.updatedAt)}
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
