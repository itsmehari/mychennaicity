/** Canonical public path for Chennai classified ads. */
export const CHENNAI_CLASSIFIEDS_HUB_PATH = "/chennai-classifieds";

export function chennaiClassifiedDetailPath(slug: string): string {
  return `${CHENNAI_CLASSIFIEDS_HUB_PATH}/${encodeURIComponent(slug)}`;
}
