import { QueryBuilder } from "drizzle-orm/pg-core";
import { desc, gte } from "drizzle-orm";
import { describe, expect, it } from "vitest";
import { whatsappJoinCurrent, whatsappJoinRequestNo } from "@/lib/whatsapp-join-request-no";

describe("whatsapp join request number", () => {
  it("counts earlier rows on the outer alias, not the inner copy", () => {
    const qb = new QueryBuilder();
    const query = qb
      .select({ requestNo: whatsappJoinRequestNo })
      .from(whatsappJoinCurrent)
      .where(gte(whatsappJoinCurrent.createdAt, new Date("2026-11-17T00:00:00+05:30")))
      .orderBy(desc(whatsappJoinCurrent.createdAt), desc(whatsappJoinCurrent.id));
    const sqlText = query.toSQL().sql;

    expect(sqlText).toContain('"current_join"."created_at"');
    expect(sqlText).toContain('"current_join"."id"');
    expect(sqlText).toContain("whatsapp_join_verifications as older");
    expect(sqlText).not.toMatch(/older\.created_at < older\.created_at/);
  });
});