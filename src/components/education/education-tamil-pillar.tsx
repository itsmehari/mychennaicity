import Link from "next/link";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { EDUCATION_FINE_PRINT_EXTRA } from "@/content/education/disclaimers";
import { HSE_COMMON_FAQ_TA } from "@/content/education/hse-tamil";
import {
  EDUCATION_HUB_TA_PATH,
  educationClusterPath,
} from "@/content/education/paths";

export function EducationTamilPillar({
  enPath,
  taPath,
  title,
  dek,
  crumb,
  paragraphs,
  links,
}: {
  enPath: string;
  taPath: string;
  title: string;
  dek: string;
  crumb: string;
  paragraphs: string[];
  links?: { href: string; label: string }[];
}) {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "முகப்பு", href: "/" },
        { label: "மேல்நிலை", href: EDUCATION_HUB_TA_PATH },
        { label: crumb },
      ]}
      eyebrow="கல்வி மேடை"
      title={title}
      dek={dek}
      related={[
        { href: EDUCATION_HUB_TA_PATH, label: "குழு மேடை" },
        { href: educationClusterPath("textbooks", "ta"), label: "பாடநூல்கள்" },
      ]}
    >
      <BilingualToggle enHref={enPath} taHref={taPath} current="ta" />
      <GuideDisclaimer kind="education" />
      <PageAdSlot shape="rectangle" placement="tn_plus_two" />
      {paragraphs.map((p) => (
        <p key={p.slice(0, 32)}>{p}</p>
      ))}
      {links && links.length > 0 ? (
        <>
          <h2>தொடரவும்</h2>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <h2>அடிக்கடி கேள்விகள்</h2>
      {HSE_COMMON_FAQ_TA.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint extra={EDUCATION_FINE_PRINT_EXTRA} />
    </ReachGuideShell>
  );
}
