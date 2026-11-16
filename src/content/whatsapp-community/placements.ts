import registry from "../../../config/whatsapp/placements.json";

export type WhatsappPlacementPageType = keyof typeof registry;

export type WhatsappPlacementCopy = {
  title: string;
  body: string;
};

export type WhatsappPlacement = {
  slot: string;
  variant: "strip" | "inline" | "compact" | "card";
  linkType: "request" | "learn";
  priority: number;
  en: WhatsappPlacementCopy;
  ta: WhatsappPlacementCopy;
};

export function placementFor(
  pageType: WhatsappPlacementPageType,
  slot: string,
): WhatsappPlacement | null {
  const list = (registry as Record<string, WhatsappPlacement[]>)[pageType] ?? [];
  return list.find((row) => row.slot === slot) ?? null;
}

export function interpolateLocality(text: string, locality?: string): string {
  if (!locality) return text.replace("{locality}", "Chennai");
  return text.replace("{locality}", locality);
}
