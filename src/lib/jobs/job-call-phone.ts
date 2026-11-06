import { normalizeIndianMobile } from "@/lib/classifieds/phone-gate";

/** Employer / poster mobile from apply URL (tel: or wa.me). */
export function extractEmployerPhoneFromApplyUrl(
  applicationUrl: string | null | undefined,
): string | null {
  const url = applicationUrl?.trim();
  if (!url) return null;

  const tel = url.match(/^tel:\+?(?:91)?(\d{10})\b/i);
  if (tel) return normalizeIndianMobile(tel[1]);

  const wa = url.match(/(?:wa\.me|api\.whatsapp\.com\/send\?phone=)\/?(?:91)?(\d{10})\b/i);
  if (wa) return normalizeIndianMobile(wa[1]);

  return null;
}

/** Seeker contact mobile from stored fields. */
export function extractSeekerContactPhone(post: {
  contactPhone: string | null;
  contactWhatsApp: string | null;
}): string | null {
  const wa = post.contactWhatsApp?.trim();
  if (wa) {
    const fromWa = extractEmployerPhoneFromApplyUrl(
      wa.includes("wa.me") ? wa : `https://wa.me/91${wa.replace(/\D/g, "").replace(/^91/, "")}`,
    );
    if (fromWa) return fromWa;
  }
  const tel = post.contactPhone?.trim();
  if (!tel) return null;
  const digits = tel.replace(/\D/g, "");
  const local =
    digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  return normalizeIndianMobile(local);
}

export function employerCallTelHref(localTen: string): string {
  return `tel:+91${localTen}`;
}
