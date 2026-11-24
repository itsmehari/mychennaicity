import {
  FREE_POST_HUB_PATH,
  type FreePostFaq,
  type FreePostKind,
  freePostGuide,
} from "@/content/free-posting";
import { getSiteUrl } from "@/lib/env";

function pageUrl(path: string): string {
  return `${getSiteUrl()}${path}`;
}

export function freePostWebPageJsonLd(input: {
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: pageUrl(input.path),
    inLanguage: "en-IN",
    about: {
      "@type": "Place",
      name: "Chennai",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
    isPartOf: {
      "@type": "WebSite",
      name: "mychennaicity.in",
      url: getSiteUrl(),
    },
  };
}

export function freePostHowToJsonLd(input: {
  path: string;
  name: string;
  description: string;
  steps: readonly { name: string; text: string }[];
}) {
  const url = pageUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    inLanguage: "en-IN",
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${url}#step-${index + 1}`,
    })),
  };
}

export function freePostFaqJsonLd(faqs: readonly FreePostFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function freePostGuideHowTo(kind: FreePostKind) {
  const guide = freePostGuide(kind);
  return freePostHowToJsonLd({
    path: guide.path,
    name: guide.h1,
    description: guide.lede,
    steps: [
      {
        name: "Open the page",
        text: `Open this MyChennaiCity page for ${guide.navLabel.toLowerCase()} in Chennai.`,
      },
      {
        name: "Send a WhatsApp message",
        text: `${guide.sendLine} There is no public form.`,
      },
      {
        name: "MyChennaiCity publishes it",
        text: "The desk checks the message and publishes the listing on mychennaicity.in.",
      },
    ],
  });
}

export function freePostJsonLdScript(data: unknown) {
  return JSON.stringify(data);
}
