import { revalidatePath } from "next/cache";

/** Bust both crawler sitemaps after any publish/seed that changes public URLs. */
export function revalidateSitemapSurfaces(): void {
  revalidatePath("/sitemap.xml");
  revalidatePath("/news-sitemap.xml");
}
