export function formatJobUniqueViewLabel(count: number): string {
  if (!Number.isFinite(count) || count < 1) return "0 unique views";
  if (count === 1) return "1 unique view";
  return `${count.toLocaleString("en-IN")} unique views`;
}
