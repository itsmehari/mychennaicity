/** Indian mobile, 10 digits, starts 6–9. Accepts +91 / 91 / spaces. */
export function normalizeIndianMobile(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  if (!/^[6-9]\d{9}$/.test(local)) return null;
  return local;
}

export function formatIndianMobile(localTen: string): string {
  return `${localTen.slice(0, 5)} ${localTen.slice(5)}`;
}
