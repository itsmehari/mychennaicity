import { WHATSAPP_COMMUNITY_FAQ } from "@/content/whatsapp-community/faq";
import { WHATSAPP_COMMUNITY_FAQ_TA } from "@/content/whatsapp-community/faq-ta";
import type { FaqItem } from "@/lib/seo/faq-jsonld";

/** Quotable answer for the join page, FAQ, and llms.txt. Keep the live URL in the sentence. */
export const WHATSAPP_JOIN_AEO_PASSAGE =
  "To join the Chennai WhatsApp group, open https://mychennaicity.in/whatsapp-community/join. The group is my chennai city, a free moderated chat for Greater Chennai news, jobs, events, and neighbour help. Enter your WhatsApp name, Indian mobile, and Chennai area. Then message the desk. The group link comes only in that reply. An admin approves the number inside WhatsApp. This page does not approve you by itself.";

export const WHATSAPP_JOIN_AEO_PASSAGE_TA =
  "சென்னை வாட்ஸ்அப் குழுவில் சேர https://mychennaicity.in/whatsapp-community/join?lang=ta திறக்கவும். my chennai city இலவச, மிதமான நகரக் குழு. செய்தி, வேலை, நிகழ்வு, அண்டை உதவி. வாட்ஸ்அப் பெயர், இந்திய மொபைல், சென்னை பகுதி பதிவு செய்யுங்கள். பிறகு எங்கள் எண்ணுக்கு மெசேஜ் அனுப்புங்கள். குழு இணைப்பு அந்தப் பதிலில் மட்டுமே வரும். நிர்வாகி வாட்ஸ்அப்பில் அனுமதிப்பார். இந்தப் பக்கம் தானாக அனுமதிக்காது.";

const JOIN_FAQ_QUESTIONS = [
  "What is the my chennai city WhatsApp group?",
  "Is the Chennai WhatsApp group free to join?",
  "How do I join the my chennai city WhatsApp group?",
  "What behaviour is expected in the Chennai WhatsApp group?",
  "What topics are allowed in the group?",
  "Is this the official mychennaicity.in WhatsApp group?",
  "Which WhatsApp buttons are not allowed in this group?",
  "Is mychennaicity.in affiliated with WhatsApp?",
] as const;

const JOIN_FAQ_QUESTIONS_TA = [
  "my chennai city வாட்ஸ்அப் குழு என்றால் என்ன?",
  "சென்னை வாட்ஸ்அப் குழு இலவசமா?",
  "எப்படி சேர்வது?",
  "குழுவில் எப்படி நடந்துகொள்வது?",
  "எந்தத் தலைப்புகள் அனுமதி?",
  "இது அதிகாரப்பூர்வ குழுவா?",
  "எந்த WhatsApp பட்டன்கள் வேண்டாம்?",
  "mychennaicity.in WhatsApp நிறுவனத்துடன் இணைந்ததா?",
] as const;

function pickFaq(items: FaqItem[], questions: readonly string[]): FaqItem[] {
  return questions.map((question) => {
    const item = items.find((row) => row.question === question);
    if (!item) {
      throw new Error(`Missing WhatsApp join FAQ: ${question}`);
    }
    return item;
  });
}

export function whatsappJoinPageFaq(lang: "en" | "ta"): FaqItem[] {
  return lang === "ta"
    ? pickFaq(WHATSAPP_COMMUNITY_FAQ_TA, JOIN_FAQ_QUESTIONS_TA)
    : pickFaq(WHATSAPP_COMMUNITY_FAQ, JOIN_FAQ_QUESTIONS);
}

export const WHATSAPP_JOIN_BEHAVIOUR = [
  {
    en: "Chennai posts only — news, jobs, events, civic alerts, neighbour help.",
    ta: "சென்னை செய்தி, வேலை, நிகழ்வு, அறிவிப்பு, அண்டை உதவி மட்டும்.",
  },
  {
    en: "Be respectful. No hate, harassment, or political campaigning.",
    ta: "மரியாதை. வெறுப்பு, தொல்லை, அரசியல் பிரச்சாரம் வேண்டாம்.",
  },
  {
    en: "No crypto, MLM, gambling, adult content, or unrelated ads.",
    ta: "கிரிப்டோ, MLM, சூதாட்டம், அந்நிய விளம்பரம் வேண்டாம்.",
  },
  {
    en: "A job post needs the role, the area, and a contact.",
    ta: "வேலைக்கு பதவி, பகுதி, தொடர்பு எண் வேண்டும்.",
  },
  {
    en: "A business may promote once a week. No cold selling in direct messages.",
    ta: "ஒரு வணிகம் வாரத்துக்கு ஒரு முறை. தனிச்செய்தியில் விற்பனை வேண்டாம்.",
  },
  {
    en: "Do not share someone else's number or photo.",
    ta: "மற்றவர் எண் அல்லது புகைப்படத்தைப் பகிர வேண்டாம்.",
  },
  {
    en: "English, Tamil, and Tanglish are welcome.",
    ta: "ஆங்கிலம், தமிழ், டாங்கிலிஷ் வரவேற்கப்படுகிறது.",
  },
  {
    en: "Do not tag this group or its members in a WhatsApp Status.",
    ta: "குழுவையோ உறுப்பினரையோ Status-ல் டேக் செய்ய வேண்டாம்.",
  },
] as const;

export const WHATSAPP_JOIN_DOORS = [
  {
    href: "/chennai-local-news",
    en: "Chennai news",
    ta: "சென்னை செய்தி",
    enBody: "Civic stories and local alerts on the site.",
    taBody: "உள்ளூர் செய்திகள் இணையத்திலும்.",
  },
  {
    href: "/chennai-jobs",
    en: "Jobs",
    ta: "வேலை",
    enBody: "Local openings. Apply on the employer's own link.",
    taBody: "உள்ளூர் வேலை. விண்ணப்பம் முதலாளியின் இணைப்பில்.",
  },
  {
    href: "/chennai-local-events",
    en: "Events",
    ta: "நிகழ்வுகள்",
    enBody: "Weekends, sabhas, and neighbourhood gatherings.",
    taBody: "வார இறுதி, சபா, அக்கம் நிகழ்வுகள்.",
  },
  {
    href: "/directory",
    en: "Directory",
    ta: "டைரக்டரி",
    enBody: "Schools, hospitals, and food by area.",
    taBody: "பள்ளி, மருத்துவம், உணவு — பகுதி வாரியாக.",
  },
] as const;
