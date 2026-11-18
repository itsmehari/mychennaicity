import { sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { whatsappJoinVerifications } from "@/db/schema/tables";

/**
 * Outer alias so the serial subquery can see this row.
 * The inner FROM is the same table. Without a different name, Postgres
 * binds created_at and id to the inner row and every serial becomes the
 * full row count.
 */
export const whatsappJoinCurrent = alias(whatsappJoinVerifications, "current_join");

/** 1 for the earliest saved request, then 2, 3, … in save order. */
export const whatsappJoinRequestNo = sql<number>`(
  select count(*)::int
  from whatsapp_join_verifications as older
  where older.created_at < ${whatsappJoinCurrent.createdAt}
     or (
       older.created_at = ${whatsappJoinCurrent.createdAt}
       and older.id <= ${whatsappJoinCurrent.id}
     )
)`.mapWith(Number);
