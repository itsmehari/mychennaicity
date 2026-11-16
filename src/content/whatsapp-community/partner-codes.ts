/**
 * Partner codes are issued by an admin in this file. Unknown codes are ignored
 * on save. The public partners page only displays issued rows.
 */

export type WhatsappPartnerCode = {
  code: string;
  organisation: string;
  lang?: "en" | "ta" | "both";
};

export const WHATSAPP_PARTNER_CODES: WhatsappPartnerCode[] = [
  // Issued examples stay empty until the owner adds a real RWA / college.
];

const byCode = new Map(
  WHATSAPP_PARTNER_CODES.map((row) => [row.code.trim().toLowerCase(), row]),
);

export function findWhatsappPartnerCode(raw: string | null | undefined): WhatsappPartnerCode | null {
  const code = raw?.trim().toLowerCase() ?? "";
  if (!code) return null;
  return byCode.get(code) ?? null;
}

export function sanitizeWhatsappPartnerCode(raw: string | null | undefined): string | null {
  const found = findWhatsappPartnerCode(raw);
  return found ? found.code : null;
}
