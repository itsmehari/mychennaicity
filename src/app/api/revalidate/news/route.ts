import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Bust news article + home bulletin caches after DB seeds or hero updates.
 * POST /api/revalidate/news?secret=…&slug=optional-article-slug
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.REVALIDATE_SECRET?.trim();
  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug")?.trim();

  revalidateTag("news-home-bulletin", "max");
  revalidateTag("news-article", "max");
  if (slug) {
    revalidateTag(`news-article:${slug}`, "max");
    revalidatePath(`/chennai-local-news/${slug}`);
  }
  revalidatePath("/chennai-local-news");
  revalidatePath("/");

  return NextResponse.json({ ok: true, slug: slug ?? null });
}
