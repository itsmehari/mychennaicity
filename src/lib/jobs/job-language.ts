const TAMIL_SUFFIX = "-tamil";
const TAMIL_LETTER = /[\u0B80-\u0BFF]/;

const HR_RECRUITER_EN = "hr-recruiter-10-vacancies-sembakkam-chennai";
const HR_RECRUITER_TA = "எச்ஆர்-ரெக்ரூட்டர்-10-காலியிடம்-செம்பாக்கம்-சென்னை";
const AC_TECHNICIAN_EN = "ac-technician-helper-50-vacancies-madipakkam-chennai";
const AC_TECHNICIAN_TA =
  "ஏசி-டெக்னீஷன்-ஹெல்பர்-50-காலியிடம்-மடிப்பாக்கம்-சென்னை";
const HELLO_PM_EN = "project-manager-hello-employment-ambattur-chennai";
const HELLO_PM_TA = "project-manager-hello-employment-ambattur-chennai-tamil";

/** English slug → stored Tamil slug. Non-ASCII slugs are stored percent-encoded. */
const TAMIL_SLUG_BY_ENGLISH: Record<string, string> = {
  [HR_RECRUITER_EN]: encodeURIComponent(HR_RECRUITER_TA),
  [AC_TECHNICIAN_EN]: encodeURIComponent(AC_TECHNICIAN_TA),
  [HELLO_PM_EN]: HELLO_PM_TA,
};

const ENGLISH_SLUG_BY_TAMIL: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(TAMIL_SLUG_BY_ENGLISH).map(([en, ta]) => [ta, en]),
  ),
  [HR_RECRUITER_TA]: HR_RECRUITER_EN,
  [AC_TECHNICIAN_TA]: AC_TECHNICIAN_EN,
  [HELLO_PM_TA]: HELLO_PM_EN,
};

function decodedSlug(slug: string): string {
  try {
    return /%[0-9A-Fa-f]{2}/.test(slug) ? decodeURIComponent(slug) : slug;
  } catch {
    return slug;
  }
}

/**
 * Page params arrive percent-encoded (`getDynamicParam` encodes them).
 * `generateMetadata` receives the decoded Tamil string from `interpolatedParams`.
 * Stored Tamil slugs are the encoded form, so a lookup has to try both.
 */
export function jobSlugLookupCandidates(slug: string): string[] {
  const candidates = [slug];
  const decoded = decodedSlug(slug);
  if (decoded !== slug) candidates.push(decoded);
  if (/[^\u0000-\u007F]/.test(decoded)) {
    const encoded = encodeURIComponent(decoded);
    if (!candidates.includes(encoded)) candidates.push(encoded);
  }
  return candidates;
}

export function isTamilJobSlug(slug: string): boolean {
  const decoded = decodedSlug(slug);
  return (
    slug.endsWith(TAMIL_SUFFIX) ||
    TAMIL_LETTER.test(decoded) ||
    slug in ENGLISH_SLUG_BY_TAMIL ||
    decoded in ENGLISH_SLUG_BY_TAMIL
  );
}

export function jobEnglishSlug(slug: string): string {
  if (slug in ENGLISH_SLUG_BY_TAMIL) return ENGLISH_SLUG_BY_TAMIL[slug];
  const decoded = decodedSlug(slug);
  if (decoded in ENGLISH_SLUG_BY_TAMIL) return ENGLISH_SLUG_BY_TAMIL[decoded];
  return slug.endsWith(TAMIL_SUFFIX)
    ? slug.slice(0, -TAMIL_SUFFIX.length)
    : slug;
}

export function jobTamilSlug(slug: string): string {
  const en = jobEnglishSlug(slug);
  if (en in TAMIL_SLUG_BY_ENGLISH) return TAMIL_SLUG_BY_ENGLISH[en];
  return `${en}${TAMIL_SUFFIX}`;
}

export function jobInLanguage(slug: string): "ta-IN" | "en-IN" {
  return isTamilJobSlug(slug) ? "ta-IN" : "en-IN";
}

/** Sitemap hreflang for a bilingual pair. Omitted when the twin slug is not live. */
export function bilingualJobSitemapLanguages(
  slug: string,
  knownSlugs: ReadonlySet<string>,
  absolutePath: (slug: string) => string,
): Record<string, string> | undefined {
  const en = jobEnglishSlug(slug);
  const ta = jobTamilSlug(slug);
  if (en === ta || !knownSlugs.has(en) || !knownSlugs.has(ta)) return undefined;
  return {
    en: absolutePath(en),
    ta: absolutePath(ta),
    "x-default": absolutePath(en),
  };
}
