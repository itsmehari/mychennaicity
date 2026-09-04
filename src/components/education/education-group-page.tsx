import Link from "next/link";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
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
import {
  EDUCATION_CHOOSE_PATH,
  EDUCATION_COMPARE_PATH,
  EDUCATION_HUB_PATH,
  EDUCATION_STRUCTURE_PATH,
  educationGroupPath,
} from "@/content/education/paths";
import { EDUCATION_FINE_PRINT_EXTRA } from "@/content/education/disclaimers";

const RELATED = [
  { href: EDUCATION_HUB_PATH, label: "All five preferred groups" },
  { href: EDUCATION_COMPARE_PATH, label: "Compare groups" },
  { href: EDUCATION_CHOOSE_PATH, label: "How to choose" },
  { href: EDUCATION_STRUCTURE_PATH, label: "HSE structure (six papers)" },
];

export function EducationGroupPage({ group }: { group: HseGroup }) {
  const papers = hseExamList(group);
  const siblings = siblingGroups(group.code);

  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides", href: EDUCATION_HUB_PATH },
        { label: `Group ${group.code}` },
      ]}
      eyebrow={`Education desk · ${streamLabel(group.stream)} · ${group.code}`}
      title={`${group.code} — ${group.nameEn}`}
      dek={group.dek}
      related={RELATED}
    >
      <GuideDisclaimer kind="education" />
      <PageAdSlot shape="rectangle" placement="tn_plus_two" />

      <p>
        <strong>Best suited for:</strong> {group.bestSuited}
      </p>

      <h2>Four Part III cores</h2>
      <ul>
        {group.cores.map((s) => (
          <li key={s.en}>{s.en}</li>
        ))}
      </ul>

      <h2>Six examination papers</h2>
      <ol>
        {papers.map((s) => (
          <li key={s.en}>{s.en}</li>
        ))}
      </ol>

      <h2>Who should choose this group?</h2>
      <ul>
        {group.whoFor.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Skills this group asks for</h2>
      <ul>
        {group.skills.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Higher-education options</h2>
      <ul>
        {group.higherEd.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {group.professional.length > 0 ? (
        <>
          <h2>Professional qualifications</h2>
          <ul>
            {group.professional.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}

      <h2>Career directions</h2>
      <ul>
        {group.careers.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Advantages</h2>
      <ul>
        {group.advantages.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Things to consider</h2>
      <ul>
        {group.cautions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Other groups in this guide</h2>
      <ul>
        {siblings.map((g) => (
          <li key={g.code}>
            <Link href={educationGroupPath(g.code)}>
              {g.code} — {g.nameEn}
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
