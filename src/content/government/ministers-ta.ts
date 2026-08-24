/** Tamil copy for TN Council of Ministers desk — keyed by minister slug. */

export type MinisterTamilCopy = {
  designation: string;
  ministryTitle: string;
  portfolios: string[];
  chennaiRelevance?: string;
};

export const MINISTERS_TA: Record<string, MinisterTamilCopy> = {
  "c-joseph-vijay": {
    designation: "மாண்புமிகு முதலமைச்சர்",
    ministryTitle: "முதலமைச்சர்",
    portfolios: [
      "பொது நிர்வாகம், IAS, IPS, IFS, மாவட்ட வருவாய் அலுவலர்கள்",
      "காவல்துறை, உள்துறை, சிறப்புத் திட்டங்கள், சிறப்பு முன்முயற்சிகள், poverty alleviation",
      "இளைஞர் நலம், குழந்தைகள்/முதியோர்/மாற்றுத்திறனாளிகள் நலம்",
      "நகராட்சி நிர்வாகம், நகர்ப்புறம் மற்றும் குடிநீர்",
    ],
    chennaiRelevance:
      "சென்னை மாநகராட்சி தொடர்பான நகராட்சி நிர்வாகமும் நகர்ப்புற குடிநீரும் முதலமைச்சர் பொறுப்பில் உள்ளன. உள்துறை/காவல்துறையும் இங்கே.",
  },
  "n-anand": {
    designation: " ஊரக வளர்ச்சி மற்றும் நீர் வளங்கள் அமைச்சர்",
    ministryTitle: "ஊரக வளர்ச்சி & நீர் வளங்கள்",
    portfolios: ["ஊரக வளர்ச்சி, பஞ்சாயத்துகள்", "பாசனம் மற்றும் சிறு பாசனத் திட்டங்கள்"],
    chennaiRelevance:
      "அடையாறு, கூவம், பக்கிங்கம் கanal desilting — சென்னை புறநகர்ப்புற வெள்ளம் தொடர்பான WRD நடவடிக்கைகள்.",
  },
  "aadhav-arjuna": {
    designation: "பொதுப்பணி மற்றும் விளையாட்டு வளர்ச்சி அமைச்சர்",
    ministryTitle: "பொதுப்பணி & விளையாட்டு",
    portfolios: ["பொதுப்பணி (கட்டிடங்கள், நெடுஞ்சாலைகள், சிறு துறைமுகங்கள்)", "விளையாட்டு வளர்ச்சி"],
    chennaiRelevance: "மாநில நெடுஞ்சாலைகள், பாலங்கள் — சென்னை போக்குவரத்து.",
  },
  "kg-arunraj": {
    designation: "சுகாதாரம், மருத்துவக் கல்வி மற்றும் குடும்ப நல அமைச்சர்",
    ministryTitle: "சுகாதாரம் & மருத்துவக் கல்வி",
    portfolios: ["சுகாதாரம், மருத்துவக் கல்வி, குடும்ப நலம்"],
    chennaiRelevance: "அரசு மருத்துவமனைகள், fever wards — சென்னை.",
  },
  "ka-sengottaiyan": {
    designation: "வருவாய் மற்றும் பேரிடர் மேலாண்மை அமைச்சர்",
    ministryTitle: "வருவாய் & பேரிடர் மேலாண்மை",
    portfolios: ["வருவாய், மாவட்ட வருவாய் நிர்வாகம்", "பேரிடர் மேலாண்மை, சட்டமன்றம்"],
    chennaiRelevance: "சென்னை மாவட்ட வருவாய்/பேரிடர் ஒருங்கிணைப்பு.",
  },
  "p-venkataramanan": {
    designation: "உணவு மற்றும் பொது வ distribución அமைச்சர்",
    ministryTitle: "உணவு & பொது வ distribución",
    portfolios: ["உணவு, நுகர்வோர் பாதுகாப்பு, விலைக் கட்டுப்பாடு"],
    chennaiRelevance: "பDS கடைகள், அத்தியாவசியப் பொருட்கள் — சென்னை.",
  },
  "ctr-nirmal-kumar": {
    designation: "ஆற்றல் வளங்கள் மற்றும் சட்ட அமைச்சர்",
    ministryTitle: "ஆற்றல் & சட்டம்",
    portfolios: ["மின்சாரம் & புதிய ஆற்றல்", "சட்டம், நீதிமன்றங்கள், தேர்தல்"],
    chennaiRelevance: "TANGEDCO, மின்தடை — சென்னை.",
  },
  "rajmohan": {
    designation: "பள்ளிக் கல்வி, தமிழ் வளர்ச்சி, தகவல் அமைச்சர்",
    ministryTitle: "பள்ளிக் கல்வி & தமிழ்",
    portfolios: ["பள்ளிக் கல்வி, தமிழ்", "தகவல் & விளம்பரம், அரசு அச்சகம்"],
    chennaiRelevance: "அரசுப் பள்ளிகள், தமிழ் மொழி — சென்னை.",
  },
  "tk-prabhu": {
    designation: "இயற்கை வளங்கள் அமைச்சர்",
    ministryTitle: "இயற்கை வளங்கள்",
    portfolios: ["கனிமம் மற்றும் mines"],
  },
  "s-keerthana": {
    designation: "தொழில்துறை அமைச்சர்",
    ministryTitle: "தொழில்துறை",
    portfolios: ["தொழில்துறை, முதலீட்டு ஊக்குவிப்பு"],
    chennaiRelevance: "முதலீட்டு MoU — சென்னை தொழில்துறை.",
  },
  "p-viswanathan": {
    designation: " உயர் கல்வி அமைச்சர்",
    ministryTitle: "உயர் கல்வி",
    portfolios: ["உயர் கல்வி, தொTechnical", "Electronics, Science & Technology"],
    chennaiRelevance: "Anna University ecosystem — சென்னை.",
  },
  "s-rajesh-kumar": {
    designation: "சுற்றுலா அமைச்சர்",
    ministryTitle: "சுற்றுலா",
    portfolios: ["சுற்றுலா, TTDC"],
  },
  "am-shahjahan": {
    designation: "சிறுபான்மையினர் நல அமைச்சர்",
    ministryTitle: "சிறுபான்மையினர் நலம்",
    portfolios: ["சிறுபான்மையினர் நலம், Wakf"],
  },
  "vanni-arasu": {
    designation: "சமூக நீதி அமைச்சர்",
    ministryTitle: "சமூக நீதி",
    portfolios: ["அdal Dravidar welfare, மலைவாழ் tribes"],
  },
  "a-vijay-tamilan-parthiban": {
    designation: "போக்குவரத்து அமைச்சர்",
    ministryTitle: "போக்குவரத்து",
    portfolios: ["Motor Vehicles", "MTC, nationalised transport"],
    chennaiRelevance: "MTC பேருந்துகள் — சென்னை.",
  },
  "b-rajkumar": {
    designation: "வீட்டுவசதி மற்றும் நகர்ப்புற Development அமைச்சர்",
    ministryTitle: "வீட்டுவசதி & நகர்ப்புற Development",
    portfolios: ["CMDA", "TNUHDB", "Urban planning"],
    chennaiRelevance: "CMDA master plan — சென்னை.",
  },
  "v-sampath-kumar": {
    designation: "பின்தங்கிய வகுப்பினர் நல அமைச்சர்",
    ministryTitle: "பின்தங்கிய வகுப்பினர் நலம்",
    portfolios: ["BC/MBC/De-notified communities welfare"],
  },
  "m-vijay-balaji": {
    designation: "கைத்தறி, textile அமைச்சர்",
    ministryTitle: "கைத்தறி & Textile",
    portfolios: ["Handlooms, Khadi"],
  },
  "k-vignesh": {
    designation: "தbid prohibition & excise அமைச்சர்",
    ministryTitle: "Prohibition & Excise",
    portfolios: ["Prohibition and Excise", "TASMAC"],
  },
  "k-thennarasu": {
    designation: "வெளிநாட்டு தமிழர் நல அமைச்சர்",
    ministryTitle: "வெளிநாட்டு தமிழர் நலம்",
    portfolios: ["NRT welfare, refugees"],
  },
  "j-mohamed-farvas": {
    designation: "தொ labour & skill development அமைச்சர்",
    ministryTitle: "Labour & Skill",
    portfolios: ["Employment, census, bonded labour"],
    chennaiRelevance: "வேலைவாய்ப்பு — சென்னை.",
  },
  "v-gandhiraj": {
    designation: "கoopération அமைச்சர்",
    ministryTitle: "Co-operation",
    portfolios: ["Co-operation"],
  },
  "jagadeshwari-k": {
    designation: "சமூக நலம் & பெண்கள் empowerment அமைச்சர்",
    ministryTitle: "Social Welfare & Women",
    portfolios: ["Women welfare", "Nutritious meal programme"],
    chennaiRelevance: "Nutritious meal — சென்னை பள்ளிகள்.",
  },
  "r-vinoth": {
    designation: "வ agriculture அமைச்சர்",
    ministryTitle: "Agriculture",
    portfolios: ["Agriculture, horticulture, sugar"],
  },
  "c-vijayalakshmi": {
    designation: "பால் & dairy development அமைச்சர்",
    ministryTitle: "Dairy",
    portfolios: ["Milk and Dairy Development"],
    chennaiRelevance: "Aavin — சென்னை.",
  },
  "d-sarathkumar": {
    designation: "Human resources management அமைச்சர்",
    ministryTitle: "HRM",
    portfolios: ["HRM, ex-servicemen welfare"],
  },
  ramesh: {
    designation: "Hindu religious & charitable endowments அமைச்சர்",
    ministryTitle: "HR & CE",
    portfolios: ["Temple administration"],
    chennaiRelevance: "சென்னை கோயில்கள் — HR&CE.",
  },
  "p-mathan-raja": {
    designation: "MSME அமைச்சர்",
    ministryTitle: "MSME",
    portfolios: ["Small industries, cottage industries"],
  },
  "n-marie-wilson": {
    designation: "ந finance, planning & development அமைச்சர்",
    ministryTitle: "Finance & Planning",
    portfolios: ["Finance, pensions, planning"],
    chennaiRelevance: "மாநில பட்ஜெட் — சென்னை projects.",
  },
  "a-srinath": {
    designation: "Fisheries அமைச்சர்",
    ministryTitle: "Fisheries",
    portfolios: ["Fisheries, FDC"],
    chennaiRelevance: "சென்னை coast fishermen.",
  },
  "s-kamali": {
    designation: "Animal husbandry அமைச்சர்",
    ministryTitle: "Animal Husbandry",
    portfolios: ["Animal Husbandry"],
  },
  "kumar-r": {
    designation: "AI, IT & digital services அமைச்சர்",
    ministryTitle: "AI & IT",
    portfolios: ["AI, IT, digital services"],
    chennaiRelevance: "Namma Arasu chatbot, e-governance.",
  },
  "rv-ranjithkumar": {
    designation: "Forests அமைச்சர்",
    ministryTitle: "Forests",
    portfolios: ["Forests"],
  },
  "d-logesh-tamilselvan": {
    designation: "Commercial taxes & registration அமைச்சர்",
    ministryTitle: "Commercial Taxes",
    portfolios: ["Registration, stamp act, commercial taxes"],
    chennaiRelevance: "Property registration — சென்னை.",
  },
  "vk-rajeev": {
    designation: "Environment & climate change அமைச்சர்",
    ministryTitle: "Environment",
    portfolios: ["Environment, TNPCB, climate change"],
    chennaiRelevance: "TNPCB, air quality — Chennai.",
  },
};

export function getMinisterTamil(slug: string): MinisterTamilCopy | undefined {
  return MINISTERS_TA[slug];
}
