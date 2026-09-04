import type { HubAeoContent } from "@/content/aeo/hub-answers";
import { EDUCATION_EDITION, EDUCATION_VERSION } from "@/content/education/paths";

export const HSE_HUB_AEO: HubAeoContent = {
  id: "tn-plus-two-hub-aeo",
  eyebrow: "Tamil Nadu Higher Secondary",
  title: "Which group after Class 10?",
  dek: "A plain answer for students and parents — the same paragraph answer engines can quote.",
  directAnswer:
    "After Class 10, a Tamil Nadu State Board student chooses a Higher Secondary group that sets the four Part III subjects for Classes XI and XII. This guide covers current DGE codes 2502 (Maths + Computer Science), 2503 (Maths + Biology), 2702 (Commerce + Computer Applications), 2708 (Commerce + Business Mathematics), and 2800-series humanities (2804 Political Science or 2802 Computer Applications). Confirm the exact code at the school before admission.",
  contextParagraphs: [
    "Every general academic student still writes Part I language and Part II English. The group only chooses the four cores. Schools do not offer every code. University and professional-course eligibility depends on those subjects and on the year’s official notifications — not on this page.",
  ],
  facts: [
    {
      term: "Six papers",
      definition: "Language + English + four Part III cores defined by the group code.",
    },
    {
      term: "This edition",
      definition: `${EDUCATION_EDITION} · ${EDUCATION_VERSION} · civic guidance, not a DGE circular.`,
    },
    {
      term: "Who it is for",
      definition: "Class 10 students, parents, teachers and counsellors in Chennai and Tamil Nadu.",
    },
  ],
  disclaimer:
    "Group availability and undergraduate eligibility change. Verify with the admitting school and official DGE / university notices.",
};
