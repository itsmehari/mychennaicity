/** IST calendar date as `YYYY-MM-DD` (for daily snapshot keys). */
export function getIstCalendarDate(d: Date = new Date()): string {
  return d.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

/** Previous IST calendar date from an ISO `YYYY-MM-DD` string. */
export function previousIstCalendarDate(isoDate: string): string {
  const [y, m, day] = isoDate.split("-").map(Number);
  const utc = new Date(Date.UTC(y, m - 1, day));
  utc.setUTCDate(utc.getUTCDate() - 1);
  return utc.toISOString().slice(0, 10);
}
