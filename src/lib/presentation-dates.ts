/** Reader-facing dates (IST) for “as of” / snapshot lines on dynamic pages. */
export function formatIndiaLongDate(d: Date = new Date()): string {
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}
