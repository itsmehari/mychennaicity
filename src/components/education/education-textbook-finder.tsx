import Link from "next/link";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { AeoAnswerBlock } from "@/components/seo/aeo-answer-block";
import type { HubAeoContent } from "@/content/aeo/hub-answers";
import { EDUCATION_FINE_PRINT_EXTRA } from "@/content/education/disclaimers";
import { getHseGroup } from "@/content/education/hse-groups";
import {
  HSE_TEXTBOOK_GUIDE_FOOTER,
  TEXTBOOK_PORTAL_NOTE,
  type HseTextbook,
  type HseTextbookFinder,
} from "@/content/education/hse-textbooks";
import {
  EDUCATION_HUB_PATH,
  EDUCATION_M2_PATH,
  EDUCATION_TEXTBOOKS_PATH,
  educationGroupPath,
  educationTextbookPath,
  type EducationLocale,
} from "@/content/education/paths";

function BookRow({ book, locale }: { book: HseTextbook; locale: EducationLocale }) {
  const title = locale === "ta" ? book.titleTa : book.titleEn;
  const portalLabel =
    locale === "ta" ? "அலுவல் தளத்தில் உறுதி செய்யுங்கள்" : "Verify on official portal";
  const openLabel = locale === "ta" ? "அலுவல் PDF" : "Official PDF";
  const groupsLabel = locale === "ta" ? "தேவைப்படும் குழுக்கள்" : "Groups that need this book";

  return (
    <li className="not-prose rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-sm font-bold text-[var(--foreground)]">{title}</p>
      <p className="mt-1 text-xs text-[var(--muted)]">
        Class {book.classLevel}
        {book.volume ? ` · ${book.volume}` : ""} · last checked {book.lastChecked}
      </p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {groupsLabel}:{" "}
        {book.usedByGroupCodes.map((code, i) => (
          <span key={code}>
            {i > 0 ? ", " : ""}
            <Link href={educationGroupPath(code, locale)}>{code}</Link>
          </span>
        ))}
      </p>
      <p className="mt-3">
        {book.officialPdfUrl ? (
          <a
            className="text-sm font-semibold text-[var(--accent)]"
            href={book.officialPdfUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {openLabel}
          </a>
        ) : (
          <a
            className="text-sm font-semibold text-[var(--accent)]"
            href={book.officialIndexUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {portalLabel}
          </a>
        )}
      </p>
    </li>
  );
}

export function EducationTextbookFinder({
  finder,
  books,
  locale = "en",
  title,
  dek,
  paragraphs,
  seoTitle,
}: {
  finder?: HseTextbookFinder;
  books: readonly HseTextbook[];
  locale?: EducationLocale;
  title?: string;
  dek?: string;
  paragraphs?: string[];
  seoTitle?: string;
}) {
  const heading = title ?? finder?.title ?? "";
  const lead = dek ?? finder?.dek ?? "";
  const body = paragraphs ?? finder?.paragraphs ?? [];
  const slug = finder?.slug;
  const showToggle = slug === "class-11" || slug === "class-12" || !slug;

  return (
    <ReachGuideShell
      crumbs={[
        { label: locale === "ta" ? "முகப்பு" : "Home", href: "/" },
        {
          label: locale === "ta" ? "மேல்நிலை" : "TN Plus Two",
          href: locale === "ta" ? "/guides/tn-plus-two-tamil" : EDUCATION_HUB_PATH,
        },
        {
          label: locale === "ta" ? "பாடநூல்கள்" : "Textbooks",
          href:
            locale === "ta"
              ? "/guides/tn-plus-two-tamil/textbooks"
              : EDUCATION_TEXTBOOKS_PATH,
        },
        { label: heading },
      ]}
      eyebrow={locale === "ta" ? "பள்ளி கல்வி · பாடநூல்" : "School books · Textbooks"}
      title={heading}
      dek={lead}
      related={[
        { href: EDUCATION_TEXTBOOKS_PATH, label: locale === "ta" ? "பட்டியல்" : "Catalogue" },
        { href: EDUCATION_M2_PATH, label: locale === "ta" ? "PDF வழி" : "How to download" },
        { href: EDUCATION_HUB_PATH, label: locale === "ta" ? "குழுக்கள்" : "Groups" },
      ]}
    >
      {showToggle ? (
        <BilingualToggle
          enHref={slug ? educationTextbookPath(slug) : EDUCATION_TEXTBOOKS_PATH}
          taHref={
            slug === "class-11" || slug === "class-12"
              ? educationTextbookPath(slug, "ta")
              : "/guides/tn-plus-two-tamil/textbooks"
          }
          current={locale}
        />
      ) : null}
      <GuideDisclaimer kind="education" />
      <PageAdSlot shape="rectangle" placement="tn_plus_two" />
      {body.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
      {finder ? <p>{HSE_TEXTBOOK_GUIDE_FOOTER}</p> : null}
      <p>
        <strong>{locale === "ta" ? "அலுவல் குறிப்பு." : "Official source."}</strong>{" "}
        {TEXTBOOK_PORTAL_NOTE}
      </p>
      <h2>{locale === "ta" ? "தொகுதிகள்" : "Volumes"}</h2>
      <ul className="not-prose list-none space-y-3 p-0">
        {books.map((book) => (
          <BookRow key={book.id} book={book} locale={locale} />
        ))}
      </ul>
      <h2>{locale === "ta" ? "தொடர்புடைய குழுக்கள்" : "Related groups"}</h2>
      <ul>
        {[...new Set(books.flatMap((b) => b.usedByGroupCodes))].map((code) => {
          const group = getHseGroup(code);
          return (
            <li key={code}>
              <Link href={educationGroupPath(code, locale)}>
                {code}
                {group ? ` — ${locale === "ta" ? group.nameTa : group.nameEn}` : ""}
              </Link>
            </li>
          );
        })}
      </ul>
      {seoTitle ? <p className="sr-only">{seoTitle}</p> : null}
      <p>
        {locale === "ta" ? "பதிவிறக்க முறை: " : "Download how-to: "}
        <Link href={locale === "ta" ? "/plus-two-textbooks-pdf-tamil" : EDUCATION_M2_PATH}>
          {locale === "ta" ? "அலுவல் PDF வழிகாட்டி" : "Plus Two textbooks PDF"}
        </Link>
        . {locale === "ta" ? "ஆங்கிலம் மற்றும் தமிழ் கோப்புகள் வேறு." : ""}
      </p>
      <GuideFinePrint extra={EDUCATION_FINE_PRINT_EXTRA} />
    </ReachGuideShell>
  );
}

export function EducationTextbooksHub({
  locale = "en",
  title,
  dek,
  paragraphs,
  aeo,
}: {
  locale?: EducationLocale;
  title: string;
  dek: string;
  paragraphs: string[];
  aeo?: HubAeoContent;
}) {
  const finders = [
    { slug: "class-11" as const, label: locale === "ta" ? "பதினொன்றாம் வகுப்பு" : "Class XI" },
    { slug: "class-12" as const, label: locale === "ta" ? "பன்னிரண்டாம் வகுப்பு" : "Class XII" },
    { slug: "physics" as const, label: locale === "ta" ? "இயற்பியல்" : "Physics" },
    { slug: "chemistry" as const, label: locale === "ta" ? "வேதியியல்" : "Chemistry" },
    { slug: "mathematics" as const, label: locale === "ta" ? "கணிதம்" : "Mathematics" },
    { slug: "biology" as const, label: locale === "ta" ? "உயிரியல்" : "Biology" },
    { slug: "commerce" as const, label: locale === "ta" ? "வணிகப் பாடங்கள்" : "Commerce subjects" },
    { slug: "computer" as const, label: locale === "ta" ? "கணினி" : "Computer" },
  ];

  return (
    <ReachGuideShell
      crumbs={[
        { label: locale === "ta" ? "முகப்பு" : "Home", href: "/" },
        {
          label: locale === "ta" ? "மேல்நிலை" : "TN Plus Two",
          href: locale === "ta" ? "/guides/tn-plus-two-tamil" : EDUCATION_HUB_PATH,
        },
        { label: locale === "ta" ? "பாடநூல்கள்" : "Textbooks" },
      ]}
      eyebrow={locale === "ta" ? "பள்ளி கல்வி · பட்டியல்" : "School books · Catalogue"}
      title={title}
      dek={dek}
      related={[
        { href: EDUCATION_M2_PATH, label: locale === "ta" ? "PDF வழி" : "How to download PDFs" },
        { href: EDUCATION_HUB_PATH, label: locale === "ta" ? "குழுக்கள்" : "Group guide" },
      ]}
    >
      <BilingualToggle
        enHref={EDUCATION_TEXTBOOKS_PATH}
        taHref="/guides/tn-plus-two-tamil/textbooks"
        current={locale}
      />
      <GuideDisclaimer kind="education" />
      <PageAdSlot shape="rectangle" placement="tn_plus_two" />
      {aeo ? (
        <div className="not-prose my-8">
          <AeoAnswerBlock content={aeo} />
        </div>
      ) : null}
      {paragraphs.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
      <p>
        <strong>{locale === "ta" ? "அலுவல் குறிப்பு." : "Official source."}</strong>{" "}
        {TEXTBOOK_PORTAL_NOTE}
      </p>
      <h2>{locale === "ta" ? "தேடல் பக்கங்கள்" : "Finders"}</h2>
      <ul>
        {finders.map((f) => (
          <li key={f.slug}>
            <Link href={educationTextbookPath(f.slug, locale)}>{f.label}</Link>
          </li>
        ))}
      </ul>
      <GuideFinePrint extra={EDUCATION_FINE_PRINT_EXTRA} />
    </ReachGuideShell>
  );
}
