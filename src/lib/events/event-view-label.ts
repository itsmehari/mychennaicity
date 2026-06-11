export function formatReaderViewLabel(count: number): string | null {
  if (!Number.isFinite(count) || count < 1) return null;
  if (count === 1) return "1 reader viewed this";
  return `${count.toLocaleString("en-IN")} readers viewed this`;
}
