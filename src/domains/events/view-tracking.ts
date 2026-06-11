import { count, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { eventPageViewers } from "@/db/schema/tables";

export async function getEventUniqueReaderViewCount(
  eventId: string,
): Promise<number> {
  const db = getDb();
  const [row] = await db
    .select({ total: count() })
    .from(eventPageViewers)
    .where(eq(eventPageViewers.eventId, eventId));
  return Number(row?.total ?? 0);
}

export async function recordEventReaderView(
  eventId: string,
  visitorId: string,
): Promise<{ uniqueViews: number; recorded: boolean }> {
  const db = getDb();
  const inserted = await db
    .insert(eventPageViewers)
    .values({ eventId, visitorId })
    .onConflictDoNothing({
      target: [eventPageViewers.eventId, eventPageViewers.visitorId],
    })
    .returning({ id: eventPageViewers.id });

  const uniqueViews = await getEventUniqueReaderViewCount(eventId);
  return { uniqueViews, recorded: inserted.length > 0 };
}
