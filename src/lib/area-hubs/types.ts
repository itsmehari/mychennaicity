export type AreaHubFactRow = {
  label: string;
  value: string;
};

export type AreaHubLocalityCard = {
  id: string;
  name: string;
  zone: string;
  description: string;
  tags: string[];
};

export type AreaHubGuideLink = {
  label: string;
  href: string;
  hint: string;
  external?: boolean;
};

export type AreaHubFaqItem = {
  question: string;
  answer: string;
};

export type AreaHubPartnerLink = {
  label: string;
  href: string;
  description: string;
};

export type RichAreaHubContent = {
  slug: string;
  /** Overrides zone.blurb for metadata when set. */
  metaDescription: string;
  heroDek: string;
  /** Short chips under the hero. */
  statChips: { label: string; value: string }[];
  /** Anchor nav labels → section ids. */
  sectionNav: { id: string; label: string }[];
  aboutParagraphs: string[];
  corridorFacts: AreaHubFactRow[];
  localityCards: AreaHubLocalityCard[];
  commuteRows: AreaHubFactRow[];
  civicWatchlist: string[];
  practicalGuides: AreaHubGuideLink[];
  partnerLinks: AreaHubPartnerLink[];
  faq: AreaHubFaqItem[];
};
