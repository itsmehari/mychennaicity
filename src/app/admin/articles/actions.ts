"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb } from "@/db/client";
import { articles } from "@/db/schema/tables";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Sign in required");
  }
}

export async function setArticleStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as
    | "draft"
    | "published"
    | "archived";
  if (!id || !["draft", "published", "archived"].includes(status)) return;
  const db = getDb();
  await db
    .update(articles)
    .set({
      status,
      publishedAt:
        status === "published" ? new Date() : undefined,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id));
  revalidatePath("/admin/articles");
  revalidatePath("/chennai-local-news");
  revalidatePath("/");
}

export async function toggleArticleFeatured(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const featured = String(formData.get("featured") ?? "") === "true";
  if (!id) return;
  const db = getDb();
  await db
    .update(articles)
    .set({ featured: !featured, updatedAt: new Date() })
    .where(eq(articles.id, id));
  revalidatePath("/admin/articles");
  revalidatePath("/");
}
