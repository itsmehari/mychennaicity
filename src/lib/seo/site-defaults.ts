import { getSiteUrl } from "@/lib/env";

/** Path to App Router default OG image (see `app/opengraph-image.tsx`). */
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

export function defaultOgImageAbsoluteUrl(): string {
  return new URL(DEFAULT_OG_IMAGE_PATH, getSiteUrl()).toString();
}

/** Optional comma-separated profile URLs for Organization JSON-LD (`sameAs`). */
export function orgSameAsUrls(): string[] {
  const raw = process.env.NEXT_PUBLIC_ORG_SAME_AS?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Optional `PostalAddress` fields for Organization JSON-LD when you have a
 * public office (GBP / NAP alignment). Set any subset via env; locality is required to emit.
 */
export function orgPostalAddressJsonLd(): Record<string, string> | null {
  const locality = process.env.NEXT_PUBLIC_ORG_ADDRESS_LOCALITY?.trim();
  if (!locality) return null;
  const out: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: locality,
  };
  const street = process.env.NEXT_PUBLIC_ORG_STREET_ADDRESS?.trim();
  const region = process.env.NEXT_PUBLIC_ORG_ADDRESS_REGION?.trim();
  const postal = process.env.NEXT_PUBLIC_ORG_POSTAL_CODE?.trim();
  const country = process.env.NEXT_PUBLIC_ORG_ADDRESS_COUNTRY?.trim() ?? "IN";
  if (street) out.streetAddress = street;
  if (region) out.addressRegion = region;
  if (postal) out.postalCode = postal;
  out.addressCountry = country;
  return out;
}
