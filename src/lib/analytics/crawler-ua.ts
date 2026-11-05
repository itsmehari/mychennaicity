/** Crawlers and link-preview bots. In-app browsers (Chrome, Safari, WhatsApp WebView) are not matched. */
const CRAWLER_UA =
  /googlebot|bingbot|yandexbot|baiduspider|duckduckbot|applebot|amazonbot|bytespider|petalbot|semrushbot|ahrefsbot|dotbot|mj12bot|gptbot|claudebot|chatgpt-user|anthropic-ai|ccbot|facebookexternalhit|facebot|twitterbot|linkedinbot|slackbot|discordbot|telegrambot|whatsapp(?!\/\d)|preview|headlesschrome|lighthouse|pagespeed|pingdom|uptimerobot|statuscake|site24x7|monitis/i;

export function isCrawlerUserAgent(ua: string | null | undefined): boolean {
  if (!ua) return false;
  return CRAWLER_UA.test(ua);
}
