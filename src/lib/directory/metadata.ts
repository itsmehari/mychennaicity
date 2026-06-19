export type DirectoryEntryMetadata = {
  summary?: string;
  dek?: string;
  reportBody?: string;
  analysisBody?: string;
  heroImageUrl?: string;
  areaHubSlug?: string;
};

export function parseDirectoryEntryMetadata(
  raw: string | null | undefined,
): DirectoryEntryMetadata {
  if (!raw?.trim()) return {};
  try {
    const parsed = JSON.parse(raw) as DirectoryEntryMetadata;
    return typeof parsed === "object" && parsed != null ? parsed : {};
  } catch {
    return {};
  }
}

export function serializeDirectoryEntryMetadata(
  meta: DirectoryEntryMetadata,
): string {
  return JSON.stringify(meta);
}

export function directoryEntryBody(meta: DirectoryEntryMetadata): string {
  const report = meta.reportBody?.trim() ?? "";
  const analysis = meta.analysisBody?.trim() ?? "";
  if (report && analysis) return `${report}\n\n---\n\n${analysis}`;
  return report || analysis;
}
