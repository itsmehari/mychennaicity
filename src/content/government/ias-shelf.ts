/**
 * IAS leadership shelf copy — news cluster, not a live cadre database.
 * Do not invent org-charts or Person JSON-LD.
 */

export const IAS_SHELF_LEDE_EN = `Ministers in the Tamil Nadu Council of Ministers set policy. Indian Administrative Service officers execute that policy through Government Orders, collectorates, and secretariat departments. This page is a dated cluster of mychennaicity.in reporting on IAS reshuffles — collectors, secretaries, and targeted two-officer swaps — not a live cadre list, not an organisation chart, and not an official Personnel and Administrative Reforms (P&AR) download.

When a G.O. names an officer to a chair, we summarise what the order says and how it touches Chennai readers (collectors, disaster-management roles, archives, revenue). We do not scrape the Secretariat. We do not claim the roster is complete between editions. If an officer has moved since the article date, treat the story as historical reporting and verify on official portals.`;

export const IAS_SHELF_HOWTO_EN = `How to read a Government Order without treating this site as the gazette: look for the G.O. type (Ms. or Rt.), the number, the department, and the date. A typical posting order names the officer, the post they leave, and the post they take. Print and PDF scans on official Tamil Nadu government sites remain the source of record.

What we will not do: we will not maintain an automated IAS org-chart, we will not invent missing G.O. numbers, and we will not treat WhatsApp forwards of “transfer lists” as orders. If the public G.O. portal is delayed or missing a scan, we say so in the related news desk rather than filling the gap with rumours.

Chennai readers usually care when a collector, a disaster-management chair, or a revenue/archives posting changes how files move in the capital. Use the articles below as a paper trail, then confirm the scan. For the political roster (who holds which ministry), return to the Council of Ministers hub — that is a different desk.`;

export const IAS_SHELF_LEDE_TA = `தமிழ்நாடு அமைச்சரவை கொள்கையை முடிவு செய்கிறது. இந்திய ஆட்சிப் பணி (IAS) அலுவலர்கள் அரசாணைகள், மாவட்ட ஆட்சியர் அலுவலகங்கள், செயலகத் துறைகள் வழியாக அதை நடைமுறைப்படுத்துகிறார்கள். இந்தப் பக்கம் mychennaicity.in இன் IAS மாற்ற அறிக்கைகளின் தேதியிட்ட தொகுப்பு — மாவட்ட ஆட்சியர்கள், செயலாளர்கள், இரண்டு அலுவலர் பரிமாற்றங்கள். நேரடி கேடர் பட்டியல் அல்ல; அமைப்பு விளக்கப்படம் அல்ல; P&AR இன் அதிகாரப்பூர்வ பதிவிறக்கம் அல்ல.

ஒரு அரசாணை ஒரு அலுவலரை பதவியில் அமர்த்தும்போது, ஆணை என்ன சொல்கிறது, சென்னை வாசகருக்கு எப்படி தொடுகிறது என்பதைச் சுருக்கி எழுதுகிறோம். செயலகத்தை தானியங்கி முறையில் எடுக்கமாட்டோம். பதிப்புகளுக்கு இடையே பட்டியல் முழுமை என்று உரிமை கோரமாட்டோம். கட்டுரை தேதிக்குப் பிறகு அலுவலர் மாறியிருந்தால், அதை வரலாற்று அறிக்கையாகப் பார்த்து அதிகாரப்பூர்வ தளங்களில் சரிபார்க்கவும்.`;

export const IAS_SHELF_HOWTO_TA = `இந்த தளத்தை அரசிதழாகக் கருதாமல் அரசாணையைப் படிப்பது: G.O. வகை (Ms. அல்லது Rt.), எண், துறை, தேதி. பொதுவான பதவி ஆணை அலுவலர் பெயர், விட்டுச் செல்லும் பதவி, ஏற்கும் பதவி ஆகியவற்றைக் குறிக்கும். தமிழ்நாடு அரசு தளங்களில் உள்ள அச்சு/PDF தான் ஆவணம்.

நாம் செய்யாதவை: தானியங்கி IAS அமைப்பு விளக்கப்படம் இல்லை; காணாமல் போன G.O. எண்களை உருவாக்கமாட்டோம்; வாட்ஸ்அப் “மாற்றுப் பட்டியல்” முன்னனுப்பல்களை ஆணையாக ஏற்கமாட்டோம். பொது G.O. தளம் தாமதமானால், வதந்தியால் இடைவெளியை நிரப்பாமல் செய்தி மேசையில் அதைச் சொல்கிறோம்.

சென்னை வாசகருக்கு மாவட்ட ஆட்சியர், பேரிடர் மேலாண்மை, வருவாய்/ஆவணக் காப்பகப் பதவிகள் தலைநகரில் கோப்புகள் எப்படி நகர்கின்றன என்பதை மாற்றும். கீழேயுள்ள கட்டுரைகளை தடயமாகப் பயன்படுத்தி, ஸ்கேனை உறுதிப்படுத்தவும். அமைச்சர் பட்டியலுக்கு அமைச்சரவை மேசைக்குத் திரும்பவும் — அது வேறு desk.`;

export type IasArticleTamil = {
  slug: string;
  titleTa: string;
  summaryTa: string;
};

export const IAS_ARTICLE_LINKS_TA: IasArticleTamil[] = [
  {
    slug: "tamil-nadu-ias-reshuffle-collectors-may-2026",
    titleTa: "தமிழ்நாடு IAS மாற்றம் — மாவட்ட ஆட்சியர்கள் (மே 2026)",
    summaryTa: "புதிய அரசுக்குப் பிறகு மாவட்ட ஆட்சியர் மற்றும் செயலாளர் மறுசீரமைப்பு குறித்த அறிக்கை.",
  },
  {
    slug: "yet-another-tamil-nadu-ias-reshuffle-july-2026",
    titleTa: "மேலும் ஒரு தமிழ்நாடு IAS மாற்றம் (ஜூலை 2026)",
    summaryTa: "ஆண்டின் நடுப்பகுதியில் மூத்த தலைமை மாற்றங்கள் — ஆங்கில அறிக்கை.",
  },
  {
    slug: "tamil-nadu-ias-prakash-malarvizhi-archives-revenue-swap-august-2026",
    titleTa: "IAS பரிமாற்றம் — பிரகாஷ் ↔ மலர்விழி (ஆவணக்காப்பகம் / வருவாய்)",
    summaryTa: "G.O. (Rt.) எண் 2892 கீழ் இரண்டு அலுவலர் பரிமாற்றம் — ஆங்கில அறிக்கை.",
  },
  {
    slug: "tamil-nadu-government-order-portal-outdated-missing-gos-transparency-july-2026",
    titleTa: "தமிழ்நாடு G.O. தளம் — காணாமல் போன ஆணைகள்",
    summaryTa: "அரசாணைகளை ஆன்லைனில் தேடுவது குறித்த பொதுநல மேசை — ஆங்கில அறிக்கை.",
  },
];
