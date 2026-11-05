import Link from "next/link";
import {
  setArticleStatus,
  toggleArticleFeatured,
} from "@/app/admin/articles/actions";
import {
  DeskPageHeader,
  DeskTable,
  deskGhostButton,
  statusPill,
} from "@/components/super-admin/desk-ui";
import { listAdminArticlesForChennai } from "@/domains/news";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {

  let rows: Awaited<ReturnType<typeof listAdminArticlesForChennai>> = [];
  try {
    rows = await listAdminArticlesForChennai(80);
  } catch (err) {
    return (
      <p className="p-4 text-sm text-red-700">
        Could not load articles: {err instanceof Error ? err.message : "db error"}
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6">
      <DeskPageHeader
        title="Articles"
        lede="Publish, unpublish, or feature a story. New stories still use seed scripts until a full editor ships."
      />
      <DeskTable>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-950">
            <tr>
              <th className="px-3 py-2 font-medium">Title</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Featured</th>
              <th className="px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-zinc-500">
                  No articles in this list.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="max-w-md px-3 py-2">
                    <p className="font-medium">{row.title}</p>
                    <p className="text-xs text-zinc-500">{row.slug}</p>
                  </td>
                  <td className="px-3 py-2">
                    <span className={statusPill(row.status)}>{row.status}</span>
                  </td>
                  <td className="px-3 py-2">{row.featured ? "Yes" : "—"}</td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-2">
                      {row.status !== "published" ? (
                        <form action={setArticleStatus}>
                          <input type="hidden" name="id" value={row.id} />
                          <input type="hidden" name="status" value="published" />
                          <button type="submit" className={deskGhostButton}>
                            Publish
                          </button>
                        </form>
                      ) : (
                        <form action={setArticleStatus}>
                          <input type="hidden" name="id" value={row.id} />
                          <input type="hidden" name="status" value="draft" />
                          <button type="submit" className={deskGhostButton}>
                            Unpublish
                          </button>
                        </form>
                      )}
                      <form action={toggleArticleFeatured}>
                        <input type="hidden" name="id" value={row.id} />
                        <input
                          type="hidden"
                          name="featured"
                          value={row.featured ? "true" : "false"}
                        />
                        <button type="submit" className={deskGhostButton}>
                          {row.featured ? "Unfeature" : "Feature"}
                        </button>
                      </form>
                      {row.status === "published" ? (
                        <Link
                          href={`/chennai-local-news/${row.slug}`}
                          className={deskGhostButton}
                          target="_blank"
                        >
                          View
                        </Link>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </DeskTable>
    </div>
  );
}
