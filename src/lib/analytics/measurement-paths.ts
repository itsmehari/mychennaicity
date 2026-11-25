const INTERNAL_PREFIXES = ["/super-admin", "/admin", "/login"] as const;

/** Path prefixes that must not produce a Google Analytics page view. */
export function internalMeasurementPrefixes(): readonly string[] {
  return INTERNAL_PREFIXES;
}

/**
 * True for the super-admin desk and the old admin/login URLs.
 * Accepts a pathname or an absolute URL.
 */
export function isInternalMeasurementPath(value: string | null | undefined): boolean {
  if (!value) return false;
  let path = value.trim();
  if (!path) return false;
  try {
    if (path.includes("://")) path = new URL(path).pathname;
  } catch {
    return false;
  }
  path = path.split("?")[0]?.split("#")[0] || "/";
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return INTERNAL_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}
