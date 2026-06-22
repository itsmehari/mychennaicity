/** Canonical public path for the Chennai jobs hub (keyword-aligned URL). */
export const CHENNAI_JOBS_HUB_PATH = "/chennai-jobs";

/** Hub tab: people looking for work in Chennai. */
export const CHENNAI_JOBS_LOOKING_PATH = "/chennai-jobs/looking-for-work";

/** Legacy path; permanent redirect to {@link CHENNAI_JOBS_HUB_PATH} in `next.config.ts`. */
export const CHENNAI_JOBS_LEGACY_HUB_PATH = "/jobs";

export function chennaiJobsDetailPath(slug: string): string {
  return `${CHENNAI_JOBS_HUB_PATH}/${encodeURIComponent(slug)}`;
}

export function chennaiJobSeekerDetailPath(slug: string): string {
  return `${CHENNAI_JOBS_LOOKING_PATH}/${encodeURIComponent(slug)}`;
}
