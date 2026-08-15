import { NextRequest, NextResponse } from "next/server";
import { revalidateSitemapSurfaces } from "@/lib/revalidate-sitemap-surfaces";

/**
 * Bust cached sitemap.xml, news-sitemap.xml, and sitemap-recent.xml after bulk publishes or seeds.
 * POST /api/revalidate/sitemap?secret=…
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.REVALIDATE_SECRET?.trim();
  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  revalidateSitemapSurfaces();

  return NextResponse.json({
    ok: true,
    paths: ["/sitemap.xml", "/news-sitemap.xml", "/sitemap-recent.xml"],
  });
}
