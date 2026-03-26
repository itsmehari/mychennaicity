import type { ReactNode } from "react";

type HomeSectionFrameProps = {
  children: ReactNode;
  /** Anchor id for in-page links (e.g. #areas). */
  id?: string;
  className?: string;
};

/**
 * Primary vertical rhythm for the home page: a clear rule + padding so stacked
 * modules do not visually bleed together.
 */
export function HomeSectionFrame({
  children,
  id,
  className = "",
}: HomeSectionFrameProps) {
  return (
    <div
      id={id}
      className={`scroll-mt-28 border-t border-[var(--home-section-border)] pt-12 sm:pt-16 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

type HomeSectionInnerRuleProps = {
  children: ReactNode;
  className?: string;
};

/** Lighter separator inside a single `HomeSectionFrame` (e.g. jobs → events). */
export function HomeSectionInnerRule({
  children,
  className = "",
}: HomeSectionInnerRuleProps) {
  return (
    <div
      className={`border-t border-[color-mix(in_srgb,var(--home-section-border)_75%,transparent)] pt-12 sm:pt-16 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
