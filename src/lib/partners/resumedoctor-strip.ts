export const RESUMEDOCTOR_BASE_URL = "https://www.resumedoctor.in/";
export const RESUMEDOCTOR_TRY_URL = "https://www.resumedoctor.in/try";

const UTM_SOURCE = "mychennaicity";
const UTM_MEDIUM = "job-detail";
const UTM_CAMPAIGN = "resumedoctor_strip";

export type ResumeDoctorStripAudience = "employer-job" | "job-seeker";

export type ResumeDoctorStripLayout = "full" | "compact";

export type ResumeDoctorStripVariant = {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
  ctaLabel: string;
  secondaryCtaLabel?: string;
  secondaryCtaPath?: string;
  layout: ResumeDoctorStripLayout;
  /** Shown on the WhatsApp-link variant only. */
  linkPreview?: string;
  badge?: string;
};

export const RESUMEDOCTOR_STRIP_VARIANTS: readonly ResumeDoctorStripVariant[] = [
  {
    id: "before-apply",
    eyebrow: "Before you apply",
    headline: "Don't send a bad photo of your resume",
    body: "Make a neat resume in 5 minutes. Download PDF or Word. Or send a link the recruiter can open on their phone.",
    ctaLabel: "Make my resume — ₹49",
    secondaryCtaLabel: "Try free first",
    secondaryCtaPath: "/try",
    layout: "full",
    badge: "Works on Naukri & WhatsApp",
  },
  {
    id: "whatsapp-link",
    eyebrow: "Better than a PDF",
    headline: "Send one link in WhatsApp",
    body: "Your resume link always shows the latest version. Change your resume once — no need to send “final-final-v2.pdf” again.",
    ctaLabel: "Get my resume link",
    secondaryCtaLabel: "How it works",
    secondaryCtaPath: "/",
    layout: "full",
    linkPreview: "resumedoctor.in/r/your-name",
  },
  {
    id: "first-job",
    eyebrow: "First job?",
    headline: "No work experience? Your resume can still look good",
    body: "Pick a simple template. Add your school, skills, and any training. Stuck on what to write? AI can help you fill it in.",
    ctaLabel: "Start my resume",
    layout: "full",
    badge: "₹49 one time",
  },
  {
    id: "job-seeker",
    eyebrow: "For job seekers",
    headline: "A good resume gets more calls back",
    body: "When someone asks “send your CV”, don't send a messy file. Send a clean PDF or a link they can open on their phone.",
    ctaLabel: "Make my resume",
    secondaryCtaLabel: "Free preview · no card needed",
    secondaryCtaPath: "/try",
    layout: "full",
  },
  {
    id: "compact",
    eyebrow: "Resume tip",
    headline: "Need a resume for this job?",
    body: "Clean templates, PDF + link, from ₹49.",
    ctaLabel: "Make resume",
    layout: "compact",
  },
] as const;

type WeightedId = { id: string; weight: number };

const EMPLOYER_JOB_WEIGHTS: readonly WeightedId[] = [
  { id: "before-apply", weight: 4 },
  { id: "first-job", weight: 3 },
  { id: "compact", weight: 2 },
];

const EMPLOYER_JOB_WHATSAPP_WEIGHTS: readonly WeightedId[] = [
  { id: "whatsapp-link", weight: 5 },
  { id: "before-apply", weight: 3 },
  { id: "first-job", weight: 2 },
  { id: "compact", weight: 1 },
];

const VARIANT_BY_ID = new Map(
  RESUMEDOCTOR_STRIP_VARIANTS.map((v) => [v.id, v]),
);

export function buildResumeDoctorStripUrl(
  variantId: string,
  path = "/",
): string {
  const base = path === "/" ? RESUMEDOCTOR_BASE_URL : RESUMEDOCTOR_TRY_URL;
  const u = new URL(base);
  u.searchParams.set("utm_source", UTM_SOURCE);
  u.searchParams.set("utm_medium", UTM_MEDIUM);
  u.searchParams.set("utm_campaign", UTM_CAMPAIGN);
  u.searchParams.set("utm_content", variantId);
  return u.toString();
}

function pickWeightedRandom(weights: readonly WeightedId[]): string {
  const total = weights.reduce((sum, w) => sum + w.weight, 0);
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  let roll = buf[0]! % total;
  for (const entry of weights) {
    if (roll < entry.weight) return entry.id;
    roll -= entry.weight;
  }
  return weights[weights.length - 1]!.id;
}

export function selectResumeDoctorStripVariant(options: {
  audience: ResumeDoctorStripAudience;
  isWhatsAppApply?: boolean;
}): ResumeDoctorStripVariant {
  if (options.audience === "job-seeker") {
    return VARIANT_BY_ID.get("job-seeker")!;
  }

  const weights = options.isWhatsAppApply
    ? EMPLOYER_JOB_WHATSAPP_WEIGHTS
    : EMPLOYER_JOB_WEIGHTS;
  const id = pickWeightedRandom(weights);
  return VARIANT_BY_ID.get(id) ?? RESUMEDOCTOR_STRIP_VARIANTS[0]!;
}
