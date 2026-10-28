/** Paid listing for Visu Iyer. Wording is taken from his visiting card. */

export const VISU_IYER_PROFILE_PATH = "/business-profile/visu-iyer-kolathur";

export const VISU_IYER_PHONE_E164 = "+919629612501";
export const VISU_IYER_PHONE_DISPLAY = "+91 96296 12501";
export const VISU_IYER_PHONE_TEL = `tel:${VISU_IYER_PHONE_E164}`;

const WHATSAPP_TEXT = "வணக்கம் விசு ஐயர். பூஜை குறித்து பேச வேண்டும்.";

export const VISU_IYER_WHATSAPP_HREF = `https://wa.me/919629612501?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

export const VISU_IYER_PORTRAIT_FRONT =
  "/images/business-profile/visu-iyer-kolathur/portrait-front.jpg";
export const VISU_IYER_PORTRAIT_BACK =
  "/images/business-profile/visu-iyer-kolathur/portrait-back.jpg";
export const VISU_IYER_OG_IMAGE =
  "/images/business-profile/visu-iyer-kolathur/og.jpg";

export const VISU_IYER_LISTING_PRICE = "₹365";

export const VISU_IYER_POOJAS = [
  { ta: "சுப முகூர்த்தம்", en: "Auspicious muhurtham" },
  { ta: "திருமணம்", en: "Marriage" },
  { ta: "கிரஹப்பிரவேசம்", en: "Griha pravesam" },
  {
    ta: "கணபதி, லக்ஷ்மி, குபேர, நவகிரகம், துர்கா ஹோமங்கள்",
    en: "Ganapati, Lakshmi, Kubera, Navagraha, and Durga homams",
  },
  { ta: "இதர பூஜைகள் அனைத்தும்", en: "All other poojas" },
] as const;
