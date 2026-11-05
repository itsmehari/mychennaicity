"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { articles } from "@/db/schema/tables";
import { revalidateNewsSurfaces } from "@/lib/revalidate-news-surfaces";
import { requireSuperAdmin } from "@/lib/super-admin/require";
import { withDeskFlag } from "@/lib/super-admin/desk-return";

const PATH = "/super-admin/articles";

export async function setArticleStatus(formData: FormData) {
  await requireSuperAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as
    | "draft"
    | "published"
    | "archived";
  if (!id || !["draft", "published", "archived"].includes(status)) {
    throw new Error("Could not update that article.");
  }
  const db = getDb();
  const updated = await db
    .update(articles)
    .set({
      status,
      publishedAt:
        status === "published" ? new Date() : undefined,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id))
    .returning({ id: articles.id, slug: articles.slug });
  if (!updated.length) throw new Error("That article is no longer in the list.");
  revalidateNewsSurfaces(updated[0].slug);
  revalidatePath(PATH);
  redirect(withDeskFlag(PATH, String(formData.get("returnTo") ?? ""), "notice", status));
}

export async function toggleArticleFeatured(formData: FormData) {
  await requireSuperAdmin();
  const id = String(formData.get("id") ?? "");
  const featured = String(formData.get("featured") ?? "") === "true";
  if (!id) throw new Error("Could not update that article.");
  const db = getDb();
  const updated = await db
    .update(articles)
    .set({ featured: !featured, updatedAt: new Date() })
    .where(eq(articles.id, id))
    .returning({ id: articles.id, slug: articles.slug });
  if (!updated.length) throw new Error("That article is no longer in the list.");
  revalidateNewsSurfaces(updated[0].slug);
  revalidatePath(PATH);
  redirect(
    withDeskFlag(PATH, String(formData.get("returnTo") ?? ""), "notice", featured ? "unfeatured" : "featured"),
  );
}
