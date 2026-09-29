import {
  COMPULSIVE_AI_FINE_PRINT,
  COMPULSIVE_CIVIC_DISCLAIMER,
  COMPULSIVE_CULTURE_DISCLAIMER,
  COMPULSIVE_EDUCATION_DISCLAIMER,
  COMPULSIVE_MONEY_DISCLAIMER,
} from "@/content/compulsive/disclaimers";

type Kind = "money" | "civic" | "culture" | "education";

const BODY: Record<Kind, string> = {
  money: COMPULSIVE_MONEY_DISCLAIMER,
  civic: COMPULSIVE_CIVIC_DISCLAIMER,
  culture: COMPULSIVE_CULTURE_DISCLAIMER,
  education: COMPULSIVE_EDUCATION_DISCLAIMER,
};

export function GuideDisclaimer({
  kind,
  extra,
}: {
  kind: Kind;
  extra?: string;
}) {
  return (
    <p className="text-sm leading-relaxed text-[var(--muted)]">
      <strong className="text-[var(--foreground)]">Disclaimer:</strong> {BODY[kind]}
      {extra ? ` ${extra}` : null}
    </p>
  );
}

export function GuideFinePrint({ extra }: { extra?: string }) {
  return (
    <>
      <h2 className="text-base font-bold text-[var(--foreground)]">Fine print</h2>
      <p className="text-sm leading-relaxed text-[var(--muted)]">
        {COMPULSIVE_AI_FINE_PRINT}
        {extra ? ` ${extra}` : null}
      </p>
    </>
  );
}
