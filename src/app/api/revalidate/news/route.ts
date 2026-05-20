import { NextRequest, NextResponse } from "next/server";
import { revalidateNewsSurfaces } from "@/lib/revalidate-news-surfaces";

/**
 * Bust cached HTML for home + news hub (and optional article) after DB seeds or publish.
 * POST /api/revalidate/news?secret=…&slug=optional-article-slug
 *
 * Listing queries read Neon on every request; this route refreshes any stale full-page cache at the edge.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.REVALIDATE_SECRET?.trim();
  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug")?.trim();
  revalidateNewsSurfaces(slug || undefined);

  return NextResponse.json({ ok: true, slug: slug ?? null });
}
