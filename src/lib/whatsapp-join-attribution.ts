/**
 * Extra join columns. Written with raw SQL so a missed 0019 apply does not 500
 * the public form. first_source is insert-only.
 */

import { sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { sanitizeWhatsappPartnerCode } from "@/content/whatsapp-community/partner-codes";

export type WhatsappJoinAttributionInput = {
  phoneE164: string;
  isInsert: boolean;
  source: string;
  placement: string | null;
  partnerCode: string | null;
  lang: "en" | "ta";
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  /** Absolute URL of the first page on this site. Insert-only. */
  firstSite: string | null;
  /** Path and query of the join page that posted the form. Insert-only. */
  firstPage: string | null;
};

function clip(raw: string | null | undefined, max = 80): string | null {
  const text = raw?.trim() ?? "";
  if (!text) return null;
  return text.slice(0, max);
}

export async function applyWhatsappJoinAttribution(
  input: WhatsappJoinAttributionInput,
): Promise<void> {
  const partner = sanitizeWhatsappPartnerCode(input.partnerCode);
  const placement = clip(input.placement);
  const lang = input.lang === "ta" ? "ta" : "en";
  const utmSource = clip(input.utmSource);
  const utmMedium = clip(input.utmMedium);
  const utmCampaign = clip(input.utmCampaign);
  const firstSource = clip(input.source);
  const firstSite = clip(input.firstSite, 240);
  const firstPage = clip(input.firstPage, 180);

  try {
    if (input.isInsert) {
      await getDb().execute(sql`
        UPDATE whatsapp_join_verifications
        SET
          placement = COALESCE(${placement}, placement),
          partner_code = COALESCE(${partner}, partner_code),
          lang = ${lang},
          utm_source = COALESCE(${utmSource}, utm_source),
          utm_medium = COALESCE(${utmMedium}, utm_medium),
          utm_campaign = COALESCE(${utmCampaign}, utm_campaign),
          first_source = COALESCE(first_source, ${firstSource}),
          first_site = COALESCE(first_site, ${firstSite}),
          first_page = COALESCE(first_page, ${firstPage}),
          verified_at = NOW()
        WHERE phone_e164 = ${input.phoneE164}
      `);
      return;
    }
    await getDb().execute(sql`
      UPDATE whatsapp_join_verifications
      SET
        placement = COALESCE(${placement}, placement),
        lang = ${lang},
        first_site = COALESCE(first_site, ${firstSite}),
        first_page = COALESCE(first_page, ${firstPage}),
        verified_at = NOW()
      WHERE phone_e164 = ${input.phoneE164}
    `);
  } catch {
    // Columns missing until 0019 is applied.
  }
}

export async function stampWhatsappJoinDeclinedAt(id: string): Promise<void> {
  try {
    await getDb().execute(sql`
      UPDATE whatsapp_join_verifications
      SET declined_at = NOW()
      WHERE id = ${id}::uuid
    `);
  } catch {
    // Column missing until 0019 is applied.
  }
}

export async function clearWhatsappJoinDeclinedAt(id: string): Promise<void> {
  try {
    await getDb().execute(sql`
      UPDATE whatsapp_join_verifications
      SET declined_at = NULL
      WHERE id = ${id}::uuid
    `);
  } catch {
    // Column missing until 0019 is applied.
  }
}

export type WhatsappJoinCardExtra = {
  placement: string;
  partner: string;
  lang: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  firstSource: string;
  firstSite: string;
  firstPage: string;
  verifiedAt: Date | null;
  declinedAt: Date | null;
};

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asDate(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "string" && value) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date;
  }
  return null;
}

function extraRows(raw: unknown): Record<string, unknown>[] {
  if (Array.isArray(raw)) return raw as Record<string, unknown>[];
  if (raw && typeof raw === "object" && Array.isArray((raw as { rows?: unknown }).rows)) {
    return (raw as { rows: Record<string, unknown>[] }).rows;
  }
  return [];
}

/** Desk card fields. Empty when 0019/0020 columns are not on this database yet. */
export async function loadWhatsappJoinCardExtras(
  ids: string[],
): Promise<Map<string, WhatsappJoinCardExtra>> {
  const map = new Map<string, WhatsappJoinCardExtra>();
  if (ids.length === 0) return map;
  try {
    const raw = await getDb().execute(sql`
      SELECT
        id::text AS id,
        placement,
        partner_code,
        lang,
        utm_source,
        utm_medium,
        utm_campaign,
        first_source,
        first_site,
        first_page,
        verified_at,
        declined_at
      FROM whatsapp_join_verifications
      WHERE id IN (${sql.join(
        ids.map((id) => sql`${id}::uuid`),
        sql`, `,
      )})
    `);
    for (const row of extraRows(raw)) {
      const id = asText(row.id);
      if (!id) continue;
      map.set(id, {
        placement: asText(row.placement),
        partner: asText(row.partner_code),
        lang: asText(row.lang),
        utmSource: asText(row.utm_source),
        utmMedium: asText(row.utm_medium),
        utmCampaign: asText(row.utm_campaign),
        firstSource: asText(row.first_source),
        firstSite: asText(row.first_site),
        firstPage: asText(row.first_page),
        verifiedAt: asDate(row.verified_at),
        declinedAt: asDate(row.declined_at),
      });
    }
  } catch {
    return map;
  }
  return map;
}
