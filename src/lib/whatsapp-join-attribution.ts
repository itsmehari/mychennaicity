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
