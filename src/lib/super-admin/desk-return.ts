/** Only this desk page may be the post-save redirect. */
export function safeDeskReturn(pathname: string, raw: string): string {
  const text = raw.trim();
  if (
    !text.startsWith("/") ||
    text.startsWith("//") ||
    text.includes("\\") ||
    text.includes("://")
  ) {
    return pathname;
  }
  try {
    const url = new URL(text, "https://mychennaicity.in");
    if (url.origin !== "https://mychennaicity.in") return pathname;
    if (url.pathname !== pathname) return pathname;
    return `${url.pathname}${url.search}`;
  } catch {
    return pathname;
  }
}

export function withDeskFlag(
  pathname: string,
  returnTo: string,
  key: "notice" | "error",
  value: string,
): string {
  const url = new URL(safeDeskReturn(pathname, returnTo), "https://mychennaicity.in");
  url.searchParams.delete("notice");
  url.searchParams.delete("error");
  url.searchParams.set(key, value.slice(0, 40));
  return `${url.pathname}${url.search}`;
}

export function deskHref(
  pathname: string,
  params: Record<string, string | number | undefined>,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export const DESK_PAGE_SIZE = 40;

export function deskLikeTerm(raw: string): string {
  return `%${raw.replace(/[%_]/g, "").slice(0, 80)}%`;
}

export function deskPage(raw: string | undefined, pageCount: number): number {
  const page = Number(raw);
  const n = Number.isInteger(page) && page >= 1 ? page : 1;
  return Math.min(n, Math.max(1, pageCount));
}
