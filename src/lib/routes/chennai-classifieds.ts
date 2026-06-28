import type { ClassifiedCategoryId } from "@/lib/classifieds/categories";

/** Canonical public path for Chennai classified ads. */
export const CHENNAI_CLASSIFIEDS_HUB_PATH = "/chennai-classifieds";

export function chennaiClassifiedDetailPath(slug: string): string {
  return `${CHENNAI_CLASSIFIEDS_HUB_PATH}/${encodeURIComponent(slug)}`;
}

export function chennaiClassifiedsHubPath(options?: {
  category?: ClassifiedCategoryId | null;
  page?: number;
}): string {
  const params = new URLSearchParams();
  if (options?.category) params.set("category", options.category);
  if (options?.page && options.page > 1) {
    params.set("page", String(options.page));
  }
  const qs = params.toString();
  return qs ? `${CHENNAI_CLASSIFIEDS_HUB_PATH}?${qs}` : CHENNAI_CLASSIFIEDS_HUB_PATH;
}
