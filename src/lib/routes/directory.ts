/** Canonical public path for the Chennai directory hub. */
export const DIRECTORY_HUB_PATH = "/directory";

export function directoryDetailPath(
  type: string,
  slug: string,
): string {
  return `${DIRECTORY_HUB_PATH}/${encodeURIComponent(type)}/${encodeURIComponent(slug)}`;
}
