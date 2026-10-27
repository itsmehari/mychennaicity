import { and, eq, gt, isNotNull, isNull, lte, or } from "drizzle-orm";
import { jobPostings } from "@/db/schema/tables";

export type JobPublicOpenFields = {
  status: string;
  validThrough: Date | string | null;
};

function asDate(value: Date | string | null | undefined): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return value;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Hub, sitemap, search, and JobPosting pages — open and not past validThrough. */
export function isJobPubliclyOpen(
  job: JobPublicOpenFields,
  now: Date = new Date(),
): boolean {
  if (job.status !== "open") return false;
  const until = asDate(job.validThrough);
  if (!until) return true;
  return until.getTime() > now.getTime();
}

export function publiclyOpenJobSql(now: Date = new Date()) {
  return and(
    eq(jobPostings.status, "open"),
    or(isNull(jobPostings.validThrough), gt(jobPostings.validThrough, now)),
  );
}

/** Rows still marked open whose deadline has passed — candidates for close. */
export function staleOpenJobSql(now: Date = new Date()) {
  return and(
    eq(jobPostings.status, "open"),
    isNotNull(jobPostings.validThrough),
    lte(jobPostings.validThrough, now),
  );
}

export function jobStatusForDeadline(
  validThrough: Date | null,
  now: Date = new Date(),
): "open" | "closed" {
  if (!validThrough) return "open";
  return validThrough.getTime() > now.getTime() ? "open" : "closed";
}
