/** Opening prose of a classified body, for hub cards. Stops at the first list. */
export function classifiedCardBlurb(body: string, max = 168): string {
  const prose: string[] = [];
  for (const raw of body.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    if (/^[-*]\s+/.test(line)) break;
    prose.push(line);
  }
  const plain = prose
    .join(" ")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= max) return plain;
  const cut = plain.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const clipped = lastSpace > 80 ? cut.slice(0, lastSpace) : cut;
  return `${clipped.trimEnd()}…`;
}
