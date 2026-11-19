export type JobAvailabilityInput = {
  status: string;
  validThrough: Date | string | null;
  publishedAt: Date | string | null;
};

/** Open page, 410 for a vacancy that was public, or ordinary 404. */
export function classifyJobAvailability(
  job: JobAvailabilityInput | null,
  now = new Date(),
): "open" | "gone" | "missing" {
  if (!job) return "missing";
  const until = job.validThrough ? new Date(job.validThrough) : null;
  const untilOk = !until || until.getTime() > now.getTime();
  if (job.status === "open" && untilOk) return "open";
  if (job.status === "closed" || job.publishedAt) return "gone";
  return "missing";
}
