import { revalidatePath } from "next/cache";

/** Bust crawler sitemaps after any publish/seed that changes public URLs. */
export function revalidateSitemapSurfaces(): void {
  revalidatePath("/sitemap.xml");
  revalidatePath("/news-sitemap.xml");
  revalidatePath("/sitemap-recent.xml");
}
