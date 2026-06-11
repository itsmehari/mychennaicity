/** Split blocks that start with ## / ### but contain more lines (tables, lists). */
export function expandMultilineHeadingBlocks(blocks: string[]): string[] {
  const out: string[] = [];
  for (const block of blocks) {
    const normalized = block.replace(/\r\n/g, "\n");
    const lines = normalized.split("\n");
    const first = lines[0]?.trim() ?? "";
    const isH2 = first.startsWith("## ") && !first.startsWith("### ");
    const isH3 = first.startsWith("### ");
    if ((isH2 || isH3) && lines.length > 1) {
      out.push(first);
      const rest = lines.slice(1).join("\n").trim();
      if (rest) out.push(rest);
    } else {
      out.push(block);
    }
  }
  return out;
}
