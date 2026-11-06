import { and, desc, eq, ilike, isNotNull, isNull, or, sql, type SQL } from "drizzle-orm";
import { getDb } from "@/db/client";
import {
  jobPhoneReveals,
  jobPostings,
  jobSeekerPhoneReveals,
  jobSeekerPosts,
} from "@/db/schema/tables";
import { DESK_PAGE_SIZE, deskLikeTerm, deskPage } from "@/lib/super-admin/desk-return";

export type JobCallDeskSegment = "new" | "followed" | "all";
export type JobCallSource = "job" | "job_seeker";

export type JobCallDeskRow = {
  id: string;
  source: JobCallSource;
  phone: string;
  createdAt: Date;
  followedUpAt: Date | null;
  title: string;
  slug: string;
};

async function loadJobRows(
  segment: JobCallDeskSegment,
  q: string,
): Promise<JobCallDeskRow[]> {
  const db = getDb();
  const filters: SQL[] = [];
  if (segment === "new") filters.push(isNull(jobPhoneReveals.followedUpAt));
  if (segment === "followed") filters.push(isNotNull(jobPhoneReveals.followedUpAt));
  const term = q.trim();
  if (term) {
    const like = deskLikeTerm(term);
    const digits = term.replace(/\D/g, "");
    const parts = [
      ilike(jobPhoneReveals.enquirerPhone, like),
      ilike(jobPostings.title, like),
      ilike(jobPostings.slug, like),
    ];
    if (digits) parts.push(ilike(jobPhoneReveals.enquirerPhone, deskLikeTerm(digits)));
    const search = or(...parts);
    if (search) filters.push(search);
  }
  const where = filters.length ? and(...filters) : undefined;
  const rows = await db
    .select({
      id: jobPhoneReveals.id,
      phone: jobPhoneReveals.enquirerPhone,
      createdAt: jobPhoneReveals.createdAt,
      followedUpAt: jobPhoneReveals.followedUpAt,
      title: jobPostings.title,
      slug: jobPostings.slug,
    })
    .from(jobPhoneReveals)
    .innerJoin(jobPostings, eq(jobPostings.id, jobPhoneReveals.jobId))
    .where(where)
    .orderBy(desc(jobPhoneReveals.createdAt))
    .limit(500);
  return rows.map((r) => ({ ...r, source: "job" as const }));
}

async function loadSeekerRows(
  segment: JobCallDeskSegment,
  q: string,
): Promise<JobCallDeskRow[]> {
  const db = getDb();
  const filters: SQL[] = [];
  if (segment === "new") filters.push(isNull(jobSeekerPhoneReveals.followedUpAt));
  if (segment === "followed") filters.push(isNotNull(jobSeekerPhoneReveals.followedUpAt));
  const term = q.trim();
  if (term) {
    const like = deskLikeTerm(term);
    const digits = term.replace(/\D/g, "");
    const parts = [
      ilike(jobSeekerPhoneReveals.enquirerPhone, like),
      ilike(jobSeekerPosts.title, like),
      ilike(jobSeekerPosts.slug, like),
    ];
    if (digits) parts.push(ilike(jobSeekerPhoneReveals.enquirerPhone, deskLikeTerm(digits)));
    const search = or(...parts);
    if (search) filters.push(search);
  }
  const where = filters.length ? and(...filters) : undefined;
  const rows = await db
    .select({
      id: jobSeekerPhoneReveals.id,
      phone: jobSeekerPhoneReveals.enquirerPhone,
      createdAt: jobSeekerPhoneReveals.createdAt,
      followedUpAt: jobSeekerPhoneReveals.followedUpAt,
      title: jobSeekerPosts.title,
      slug: jobSeekerPosts.slug,
    })
    .from(jobSeekerPhoneReveals)
    .innerJoin(
      jobSeekerPosts,
      eq(jobSeekerPosts.id, jobSeekerPhoneReveals.jobSeekerPostId),
    )
    .where(where)
    .orderBy(desc(jobSeekerPhoneReveals.createdAt))
    .limit(500);
  return rows.map((r) => ({ ...r, source: "job_seeker" as const }));
}

export async function loadJobCallDesk(input: {
  segment: JobCallDeskSegment;
  q: string;
  pageRaw?: string;
}): Promise<{
  rows: JobCallDeskRow[];
  total: number;
  counts: Record<string, number>;
  page: number;
  pageCount: number;
}> {
  const db = getDb();
  let jobFresh = 0;
  let jobFollowed = 0;
  let seekFresh = 0;
  let seekFollowed = 0;
  try {
    const [{ fresh: jf } = { fresh: 0 }] = await db
      .select({ fresh: sql<number>`count(*)::int` })
      .from(jobPhoneReveals)
      .where(isNull(jobPhoneReveals.followedUpAt));
    const [{ followed: jfo } = { followed: 0 }] = await db
      .select({ followed: sql<number>`count(*)::int` })
      .from(jobPhoneReveals)
      .where(isNotNull(jobPhoneReveals.followedUpAt));
    const [{ fresh: sf } = { fresh: 0 }] = await db
      .select({ fresh: sql<number>`count(*)::int` })
      .from(jobSeekerPhoneReveals)
      .where(isNull(jobSeekerPhoneReveals.followedUpAt));
    const [{ followed: sfo } = { followed: 0 }] = await db
      .select({ followed: sql<number>`count(*)::int` })
      .from(jobSeekerPhoneReveals)
      .where(isNotNull(jobSeekerPhoneReveals.followedUpAt));
    jobFresh = Number(jf);
    jobFollowed = Number(jfo);
    seekFresh = Number(sf);
    seekFollowed = Number(sfo);
  } catch {
    return { rows: [], total: 0, counts: { new: 0, followed: 0, all: 0 }, page: 1, pageCount: 1 };
  }

  const counts = {
    new: jobFresh + seekFresh,
    followed: jobFollowed + seekFollowed,
    all: jobFresh + jobFollowed + seekFresh + seekFollowed,
  };

  const merged = (
    await Promise.all([
      loadJobRows(input.segment, input.q),
      loadSeekerRows(input.segment, input.q),
    ])
  )
    .flat()
    .sort((a, b) => +b.createdAt - +a.createdAt);

  const total = merged.length;
  const pageCount = Math.max(1, Math.ceil(total / DESK_PAGE_SIZE));
  const page = deskPage(input.pageRaw, pageCount);
  const rows = merged.slice((page - 1) * DESK_PAGE_SIZE, page * DESK_PAGE_SIZE);

  return { rows, total, counts, page, pageCount };
}
