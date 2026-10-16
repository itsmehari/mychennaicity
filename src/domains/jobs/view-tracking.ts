import { count, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { jobPageViewers } from "@/db/schema/tables";

export async function getJobUniqueViewCount(jobId: string): Promise<number> {
  const db = getDb();
  const [row] = await db
    .select({ total: count() })
    .from(jobPageViewers)
    .where(eq(jobPageViewers.jobId, jobId));
  return Number(row?.total ?? 0);
}

export async function recordJobPageView(
  jobId: string,
  visitorId: string,
): Promise<{ uniqueViews: number; recorded: boolean }> {
  const db = getDb();
  const inserted = await db
    .insert(jobPageViewers)
    .values({ jobId, visitorId })
    .onConflictDoNothing({
      target: [jobPageViewers.jobId, jobPageViewers.visitorId],
    })
    .returning({ id: jobPageViewers.id });

  const uniqueViews = await getJobUniqueViewCount(jobId);
  return { uniqueViews, recorded: inserted.length > 0 };
}
