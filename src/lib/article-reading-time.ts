const WORDS_PER_MINUTE = 220;

export function estimateReadingTimeMinutes(text: string): number {
  const words = text
    .replace(/[#*_`[\]()>-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
