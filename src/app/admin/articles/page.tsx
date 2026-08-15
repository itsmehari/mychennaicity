import Link from "next/link";
import { auth } from "@/auth";
import {
  setArticleStatus,
  toggleArticleFeatured,
} from "@/app/admin/articles/actions";
import { listAdminArticlesForChennai } from "@/domains/news";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const session = await auth();
  if (!session?.user) {
    return (
      <p className="text-sm">
        <Link href="/api/auth/signin" className="underline">
          Sign in
        </Link>{" "}
        to manage articles.
      </p>
    );
  }

  let rows: Awaited<ReturnType<typeof listAdminArticlesForChennai>> = [];
  try {
    rows = await listAdminArticlesForChennai(80);
  } catch (err) {
    return (
      <p className="text-sm text-red-700">
        Could not load articles: {err instanceof Error ? err.message : "db error"}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="text-lg font-semibold">Articles</h1>
        <Link href="/admin" className="text-sm underline">
          Admin home
        </Link>
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        Phase A: publish / unpublish / feature. New stories still use seed
        scripts until a full editor ships.
      </p>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-900">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Featured</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="max-w-md px-3 py-2">
                  <p className="font-medium">{row.title}</p>
                  <p className="text-xs text-zinc-500">{row.slug}</p>
                </td>
                <td className="px-3 py-2">{row.status}</td>
                <td className="px-3 py-2">{row.featured ? "yes" : "—"}</td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-2">
                    {row.status !== "published" ? (
                      <form action={setArticleStatus}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="status" value="published" />
                        <button type="submit" className="underline">
                          Publish
                        </button>
                      </form>
                    ) : (
                      <form action={setArticleStatus}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="status" value="draft" />
                        <button type="submit" className="underline">
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
                      <button type="submit" className="underline">
                        {row.featured ? "Unfeature" : "Feature"}
                      </button>
                    </form>
                    {row.status === "published" ? (
                      <Link
                        href={`/chennai-local-news/${row.slug}`}
                        className="underline"
                        target="_blank"
                      >
                        View
                      </Link>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
