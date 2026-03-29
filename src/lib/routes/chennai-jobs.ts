/** Canonical public path for the Chennai jobs hub (keyword-aligned URL). */
export const CHENNAI_JOBS_HUB_PATH = "/chennai-jobs";

/** Legacy path; permanent redirect to {@link CHENNAI_JOBS_HUB_PATH} in `next.config.ts`. */
export const CHENNAI_JOBS_LEGACY_HUB_PATH = "/jobs";

export function chennaiJobsDetailPath(slug: string): string {
  return `${CHENNAI_JOBS_HUB_PATH}/${encodeURIComponent(slug)}`;
}
