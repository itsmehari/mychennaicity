import Link from "next/link";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  HSE_GROUPS,
  hseExamList,
  siblingGroups,
  type HseGroup,
} from "@/content/education/hse-groups";
import { streamLabel } from "@/content/education/hse-compare";
import { textbooksForGroup } from "@/content/education/hse-textbooks";
import type { HseGroupTa } from "@/content/education/hse-tamil";
import {
  EDUCATION_AFTER_12TH_PATH,
  EDUCATION_CHOOSE_PATH,
  EDUCATION_COMPARE_PATH,
  EDUCATION_HUB_PATH,
  EDUCATION_STRUCTURE_PATH,
  EDUCATION_TEXTBOOKS_PATH,
  educationGroupPath,
  type EducationLocale,
} from "@/content/education/paths";
import { EDUCATION_FINE_PRINT_EXTRA } from "@/content/education/disclaimers";

const RELATED = [
  { href: EDUCATION_HUB_PATH, label: "All five preferred groups" },
  { href: EDUCATION_COMPARE_PATH, label: "Compare groups" },
  { href: EDUCATION_CHOOSE_PATH, label: "How to choose" },
  { href: EDUCATION_STRUCTURE_PATH, label: "HSE structure (six papers)" },
];

const PATHWAY_BY_STREAM: Record<HseGroup["stream"], { href: string; label: string }[]> = {
  science: [
    { href: "/guides/tn-plus-two/engineering", label: "Engineering / TNEA" },
    { href: "/guides/tn-plus-two/medicine", label: "Medicine / NEET" },
    { href: "/guides/tn-plus-two/it-degrees", label: "IT degrees" },
  ],
  commerce: [
    { href: "/guides/tn-plus-two/ca-finance", label: "CA / finance" },
    { href: "/guides/tn-plus-two/it-degrees", label: "IT degrees" },
  ],
  humanities: [
    { href: "/guides/tn-plus-two/law-civil-services", label: "Law / civil services" },
    { href: EDUCATION_AFTER_12TH_PATH, label: "After 12th map" },
  ],
};

export function EducationGroupPage({
  group,
  locale = "en",
  ta,
}: {
  group: HseGroup;
  locale?: EducationLocale;
  ta?: HseGroupTa;
}) {
  const papers = hseExamList(group);
  const siblings = siblingGroups(group.code);
  const books = textbooksForGroup(group.code);
  const isTa = locale === "ta";
  const dek = isTa && ta ? ta.dek : group.dek;
  const whoFor = isTa && ta ? ta.whoFor : group.whoFor;
  const skills = isTa && ta ? ta.skills : group.skills;
  const higherEd = isTa && ta ? ta.higherEd : group.higherEd;
  const professional = isTa && ta ? ta.professional : group.professional;
  const careers = isTa && ta ? ta.careers : group.careers;
  const advantages = isTa && ta ? ta.advantages : group.advantages;
  const cautions = isTa && ta ? ta.cautions : group.cautions;

  return (
    <ReachGuideShell
      crumbs={[
        { label: isTa ? "முகப்பு" : "Home", href: "/" },
        {
          label: isTa ? "மேல்நிலை" : "Guides",
          href: isTa ? "/guides/tn-plus-two-tamil" : EDUCATION_HUB_PATH,
        },
        { label: `Group ${group.code}` },
      ]}
      eyebrow={`Education desk · ${streamLabel(group.stream)} · ${group.code}`}
      title={`${group.code} — ${isTa ? group.nameTa : group.nameEn}`}
      dek={dek}
      related={RELATED}
    >
      <BilingualToggle
        enHref={educationGroupPath(group.code)}
        taHref={educationGroupPath(group.code, "ta")}
        current={locale}
      />
      <GuideDisclaimer kind="education" />
      <PageAdSlot shape="rectangle" placement="tn_plus_two" />

      <p>
        <strong>{isTa ? "பொருத்தம்:" : "Best suited for:"}</strong>{" "}
        {isTa ? group.bestSuitedTa : group.bestSuited}
      </p>

      <h2>{isTa ? "நான்கு பகுதி III பாடங்கள்" : "Four Part III cores"}</h2>
      <ul>
        {group.cores.map((s) => (
          <li key={s.en}>{isTa ? s.ta : s.en}</li>
        ))}
      </ul>

      <h2>{isTa ? "ஆறு தேர்வுகள்" : "Six examination papers"}</h2>
      <ol>
        {papers.map((s) => (
          <li key={s.en}>{isTa ? s.ta : s.en}</li>
        ))}
      </ol>

      <h2>{isTa ? "யாருக்கு?" : "Who should choose this group?"}</h2>
      <ul>
        {group.whoFor.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{isTa ? "தேவையான திறன்கள்" : "Skills this group asks for"}</h2>
      <ul>
        {group.skills.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{isTa ? "உயர்கல்வி" : "Higher-education options"}</h2>
      <ul>
        {group.higherEd.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {group.professional.length > 0 ? (
        <>
          <h2>{isTa ? "தொழில் தகுதிகள்" : "Professional qualifications"}</h2>
          <ul>
            {group.professional.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}

      <h2>{isTa ? "பணித் திசைகள்" : "Career directions"}</h2>
      <ul>
        {group.careers.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{isTa ? "நன்மைகள்" : "Advantages"}</h2>
      <ul>
        {group.advantages.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{isTa ? "கவனிக்க வேண்டியவை" : "Things to consider"}</h2>
      <ul>
        {group.cautions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{isTa ? "பாடநூல் தேடல்" : "Matching textbook finders"}</h2>
      <ul>
        {books.slice(0, 8).map((book) => (
          <li key={book.id}>{isTa ? book.titleTa : book.titleEn}</li>
        ))}
      </ul>
      <p>
        <Link href={EDUCATION_TEXTBOOKS_PATH}>
          {isTa ? "அலுவல் பாடநூல் பட்டியல்" : "Official textbook catalogue"}
        </Link>
      </p>

      <h2>{isTa ? "பன்னிரண்டாம் வகுப்புக்குப் பிறகு" : "After Class 12"}</h2>
      <ul>
        {PATHWAY_BY_STREAM[group.stream].map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <h2>{isTa ? "இந்த வழிகாட்டியில் பிற குழுக்கள்" : "Other groups in this guide"}</h2>
      <ul>
        {siblings.map((g) => (
          <li key={g.code}>
            <Link href={educationGroupPath(g.code, locale)}>
              {g.code} — {isTa ? g.nameTa : g.nameEn}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        Full matrix: <Link href={EDUCATION_COMPARE_PATH}>compare all five preferences</Link>.
        Decision steps: <Link href={EDUCATION_CHOOSE_PATH}>how to choose</Link>.
      </p>
      <p>
        {HSE_GROUPS.length} combinations are documented on this desk. Confirm the live code
        on the school admission form — not every campus offers every group.
      </p>

      <GuideFinePrint extra={EDUCATION_FINE_PRINT_EXTRA} />
    </ReachGuideShell>
  );
}
