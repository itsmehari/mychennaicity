/** Guess public page language from the URL for header CTAs (not exhaustive). */
export function headerLangFromPathname(pathname: string): "en" | "ta" {
  const path = pathname.toLowerCase();
  if (path.includes("-tamil") || path.includes("lang=ta")) return "ta";
  return "en";
}