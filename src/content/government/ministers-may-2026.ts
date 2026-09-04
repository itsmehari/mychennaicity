/** TN Council of Ministers — May 2026 expanded roster (Lok Bhavan PR 40). */

export type MinisterHonorific = "Thiru" | "Dr" | "Selvi" | "Tmt";

export type MinisterFilterTag =
  | "chennai-urban"
  | "water-floods"
  | "health"
  | "transport"
  | "finance"
  | "law-order";

export type MinisterRow = {
  order: number;
  slug: string;
  honorific: MinisterHonorific;
  name: string;
  designation: string;
  ministryTitle: string;
  portfolios: string[];
  chennaiTags?: string[];
  chennaiRelevance?: string;
  filterTags?: MinisterFilterTag[];
  newsSlugs?: string[];
};

export const MINISTERS_MAY_2026: MinisterRow[] = [
  {
    order: 1,
    slug: "c-joseph-vijay",
    honorific: "Thiru",
    name: "C. Joseph Vijay",
    designation: "Honourable Chief Minister",
    ministryTitle: "Chief Minister",
    portfolios: [
      "Public, General Administration, Indian Administrative Service, Indian Police Service, Indian Forest Service, District Revenue Officers",
      "Police, Home, Special Programme Implementation, Special Initiatives, Poverty Alleviation and Rural Indebtedness",
      "Youth Welfare, Welfare of Children, Aged, Differently Abled Persons",
      "Municipal Administration, Urban and Water Supply",
    ],
    chennaiTags: ["GCC", "Home", "Urban water"],
    chennaiRelevance:
      "Greater Chennai Corporation-linked urban administration and urban water supply sit with the Chief Minister. Home and Police also report here — including law-and-order questions that surface in the capital.",
    filterTags: ["chennai-urban", "law-order"],
    newsSlugs: [
      "tamil-nadu-cabinet-portfolios-may-2026",
      "chennai-corporation-zones-current-15-proposed-20-map-explained",
    ],
  },
  {
    order: 2,
    slug: "n-anand",
    honorific: "Thiru",
    name: "N. Anand",
    designation: "Minister for Rural Development and Water Resources",
    ministryTitle: "Rural Development & Water Resources",
    portfolios: [
      "Rural Development, Panchayats and Panchayat Union",
      "Irrigation, Irrigation Projects including Small Irrigation",
    ],
    chennaiTags: ["WRD", "Floods"],
    chennaiRelevance:
      "Water Resources handles Adyar, Cooum and Buckingham Canal desilting and flood-season coordination that affects Chennai's suburbs and lake-linked corridors.",
    filterTags: ["water-floods"],
    newsSlugs: ["minister-n-anand-chennai-flood-preparedness-review-august-2026"],
  },
  {
    order: 3,
    slug: "aadhav-arjuna",
    honorific: "Thiru",
    name: "Aadhav Arjuna",
    designation: "Minister for Public Works and Sports Development",
    ministryTitle: "Public Works & Sports",
    portfolios: [
      "Public Works (Buildings, Highways and Minor Ports)",
      "Sports Development",
    ],
    chennaiTags: ["PWD", "Highways"],
    chennaiRelevance:
      "Public Works covers state highways, bridges and public buildings that Chennai commuters use daily — including arterial road works and monsoon-damaged stretches.",
    filterTags: ["chennai-urban"],
  },
  {
    order: 4,
    slug: "kg-arunraj",
    honorific: "Dr",
    name: "K.G. Arunraj",
    designation: "Minister for Health, Medical Education and Family Welfare",
    ministryTitle: "Health & Medical Education",
    portfolios: ["Health, Medical Education and Family Welfare"],
    chennaiTags: ["Govt hospitals"],
    chennaiRelevance:
      "Government hospital capacity, fever wards and medical college seats in Chennai fall under this portfolio when the state health department directs district action.",
    filterTags: ["health"],
    newsSlugs: [],
  },
  {
    order: 5,
    slug: "ka-sengottaiyan",
    honorific: "Thiru",
    name: "K.A. Sengottaiyan",
    designation: "Minister for Revenue and Disaster Management",
    ministryTitle: "Revenue & Disaster Management",
    portfolios: [
      "Revenue, District Revenue Establishment, Deputy Collectors",
      "Disaster Management, Boodhan, Gramadhan and Legislative Assembly",
    ],
    chennaiTags: ["Collectors", "Disaster"],
    chennaiRelevance:
      "Chennai district revenue and disaster-management coordination runs through the Revenue commissionerate structure this minister oversees.",
    filterTags: ["law-order", "water-floods"],
  },
  {
    order: 6,
    slug: "p-venkataramanan",
    honorific: "Thiru",
    name: "P. Venkataramanan",
    designation: "Minister for Food and Civil Supplies",
    ministryTitle: "Food & Civil Supplies",
    portfolios: ["Food and Civil Supplies, Consumer Protection and Price Control"],
    chennaiTags: ["PDS", "Ration"],
    chennaiRelevance:
      "Fair-price shops, essential commodity supply and consumer-price interventions in Chennai are tracked against this minister's department.",
    filterTags: ["chennai-urban"],
  },
  {
    order: 7,
    slug: "ctr-nirmal-kumar",
    honorific: "Thiru",
    name: "C.T.R. Nirmal Kumar",
    designation: "Minister for Energy Resources and Law",
    ministryTitle: "Energy & Law",
    portfolios: [
      "Electricity & Non-Conventional Energy Development",
      "Law, Courts, Prisons and Prevention of Corruption",
      "Governor, Elections and Passports",
    ],
    chennaiTags: ["TANGEDCO", "Electricity"],
    chennaiRelevance:
      "TANGEDCO supply, tariff policy and Chennai's power-cut complaints route through the Energy portfolio; Law covers courts and prisons in the capital.",
    filterTags: ["chennai-urban", "law-order"],
  },
  {
    order: 8,
    slug: "rajmohan",
    honorific: "Thiru",
    name: "Rajmohan",
    designation:
      "Minister for School Education, Tamil Development, Information and Publicity",
    ministryTitle: "School Education & Tamil Development",
    portfolios: [
      "School Education, Archaeology, Tamil Official Language and Tamil Culture",
      "Information & Publicity, Film Technology and Cinematograph Act",
      "Newsprint Control, Stationery and Printing, Government Press",
    ],
    chennaiTags: ["Schools", "Govt Press"],
    chennaiRelevance:
      "Government school policy, Tamil-language initiatives and state publicity machinery — including the Government Press in Chennai.",
    filterTags: ["chennai-urban"],
  },
  {
    order: 9,
    slug: "tk-prabhu",
    honorific: "Dr",
    name: "TK. Prabhu",
    designation: "Minister for Natural Resources",
    ministryTitle: "Natural Resources",
    portfolios: ["Minerals and Mines"],
    chennaiRelevance:
      "Mines and minerals policy sets the statewide frame for construction aggregate and coastal sand — Chennai building and infrastructure projects sit downstream of that policy. This page does not track individual quarry licences.",
  },
  {
    order: 10,
    slug: "s-keerthana",
    honorific: "Selvi",
    name: "S. Keerthana",
    designation: "Minister for Industries",
    ministryTitle: "Industries",
    portfolios: ["Industries, Investment Promotion"],
    chennaiTags: ["SIPCOT", "Investment"],
    chennaiRelevance:
      "Industrial expansion and investment MoUs — including data-centre and manufacturing announcements that cite Chennai corridors.",
    filterTags: ["finance"],
  },
  {
    order: 11,
    slug: "p-viswanathan",
    honorific: "Thiru",
    name: "P. Viswanathan",
    designation: "Minister for Higher Education",
    ministryTitle: "Higher Education",
    portfolios: [
      "Higher Education including Technical Education",
      "Electronics, Science and Technology",
    ],
    chennaiTags: ["Anna University", "Colleges"],
    chennaiRelevance:
      "State engineering and arts-science college policy, plus technical-education regulation affecting Chennai's large student population.",
    filterTags: ["chennai-urban"],
  },
  {
    order: 12,
    slug: "s-rajesh-kumar",
    honorific: "Thiru",
    name: "S. Rajesh Kumar",
    designation: "Minister for Tourism",
    ministryTitle: "Tourism",
    portfolios: ["Tourism and Tourism Development Corporation"],
    chennaiTags: ["TTDC"],
    chennaiRelevance:
      "Tamil Nadu Tourism Development Corporation programmes and state tourism promotion that include Chennai gateways and Mamallapuram corridors.",
  },
  {
    order: 13,
    slug: "am-shahjahan",
    honorific: "Thiru",
    name: "A.M. Shahjahan",
    designation: "Minister for Minorities Welfare",
    ministryTitle: "Minorities Welfare",
    portfolios: ["Minorities Welfare and Wakf Board"],
    chennaiRelevance:
      "Wakf Board administration and minorities-welfare schemes include institutions and properties inside Chennai city limits. Confirm board notices on official channels; this roster page is not a property record.",
  },
  {
    order: 14,
    slug: "vanni-arasu",
    honorific: "Thiru",
    name: "Vanni Arasu",
    designation: "Minister for Social Justice",
    ministryTitle: "Social Justice",
    portfolios: ["Adi Dravidar Welfare and Hill Tribes"],
    chennaiRelevance:
      "Adi Dravidar welfare hostels, scholarships, and related schemes operate in the capital as well as in the districts. Use official department counters for eligibility — this page is a ministry pointer only.",
  },
  {
    order: 15,
    slug: "a-vijay-tamilan-parthiban",
    honorific: "Thiru",
    name: "A. Vijay Tamilan Parthiban",
    designation: "Minister for Transport",
    ministryTitle: "Transport",
    portfolios: [
      "Motor Vehicle Acts — Administration",
      "Transport, Nationalised Transport and Motor Vehicles Act",
    ],
    chennaiTags: ["MTC", "Buses"],
    chennaiRelevance:
      "Metropolitan Transport Corporation (MTC) buses, motor-vehicle policy and nationalised transport routes in Chennai.",
    filterTags: ["transport"],
  },
  {
    order: 16,
    slug: "b-rajkumar",
    honorific: "Thiru",
    name: "B. Rajkumar",
    designation: "Minister for Housing and Urban Development",
    ministryTitle: "Housing & Urban Development",
    portfolios: [
      "Housing, Rural Housing, Town Planning Projects and Housing Development",
      "Accommodation Control, CMDA",
      "Tamil Nadu Urban Habitat Development Board",
      "Urban Planning and Urban Development",
    ],
    chennaiTags: ["CMDA", "TNUHDB"],
    chennaiRelevance:
      "Chennai Metropolitan Development Authority master-plan decisions, affordable-housing boards and urban planning approvals for the city.",
    filterTags: ["chennai-urban"],
    newsSlugs: ["chennai-corporation-zones-current-15-proposed-20-map-explained"],
  },
  {
    order: 17,
    slug: "v-sampath-kumar",
    honorific: "Thiru",
    name: "V. Sampath Kumar",
    designation: "Minister for Backward Classes Welfare",
    ministryTitle: "Backward Classes Welfare",
    portfolios: [
      "Backward Classes Welfare",
      "Most Backward Classes Welfare and De-notified Communities Welfare",
    ],
    chennaiRelevance:
      "Backward Classes welfare hostels and scholarship counters in Chennai are the city-facing end of this portfolio. Scheme rules live on official department pages, not on this roster card.",
  },
  {
    order: 18,
    slug: "m-vijay-balaji",
    honorific: "Thiru",
    name: "M. Vijay Balaji",
    designation: "Minister for Handlooms, Textiles and Khadi",
    ministryTitle: "Handlooms & Textiles",
    portfolios: ["Handlooms and Textiles, Khadi and Village Industries Board"],
    chennaiRelevance:
      "Handloom showrooms and Co-optex retail in Chennai are the city-visible face of textiles policy. Festival-season silk shopping on T. Nagar streets is consumer context — not a ministry circular.",
  },
  {
    order: 19,
    slug: "k-vignesh",
    honorific: "Thiru",
    name: "K. Vignesh",
    designation: "Minister for Prohibition and Excise",
    ministryTitle: "Prohibition & Excise",
    portfolios: ["Prohibition and Excise"],
    chennaiTags: ["TASMAC"],
    chennaiRelevance:
      "TASMAC retail shops and excise enforcement are everyday Chennai facts; hours, dry days, and brand lists change by official notice. Related reporting on this site covers consumer-facing TASMAC news when it is public.",
    newsSlugs: ["fssai-tasmac-11-liquor-brands-ban-revoked-enrica-august-2026"],
  },
  {
    order: 20,
    slug: "k-thennarasu",
    honorific: "Thiru",
    name: "K. Thennarasu",
    designation: "Minister for Non-Resident Tamils Welfare",
    ministryTitle: "Non-Resident Tamils Welfare",
    portfolios: ["Non-Resident Tamils Welfare, Refugees & evacuees"],
    chennaiRelevance:
      "NRI facilitation and overseas-Tamil welfare desks that residents use are concentrated in the capital. This page is not a visa or attestation counter — use the official NRT / consular channels named on government sites.",
  },
  {
    order: 21,
    slug: "j-mohamed-farvas",
    honorific: "Thiru",
    name: "J. Mohamed Farvas",
    designation: "Minister for Labour Welfare and Skill Development",
    ministryTitle: "Labour & Skill Development",
    portfolios: [
      "Labour Welfare, Population, Employment and Training, Census",
      "Weights and Measures",
      "Urban and Rural Employment and Bonded Labour Welfare",
    ],
    chennaiTags: ["Employment"],
    chennaiRelevance:
      "Employment exchanges, skill-training programmes and labour-welfare schemes that Chennai job-seekers encounter.",
  },
  {
    order: 22,
    slug: "v-gandhiraj",
    honorific: "Thiru",
    name: "V. Gandhiraj",
    designation: "Minister for Co-operation",
    ministryTitle: "Co-operation",
    portfolios: ["Co-operation"],
    chennaiRelevance:
      "Urban co-operative banks and fair-price / PDS-linked co-operative outlets in Chennai sit under co-operation policy. Branch-level disputes belong with the registrar and the bank — not with this roster card.",
  },
  {
    order: 23,
    slug: "jagadeshwari-k",
    honorific: "Tmt",
    name: "Jagadeshwari K",
    designation: "Minister for Social Welfare and Women Empowerment",
    ministryTitle: "Social Welfare & Women Empowerment",
    portfolios: [
      "Social Welfare including Women Welfare",
      "Orphanages and Correctional Administration and Beggar Homes",
      "Social Reforms & Nutritious Meal Programme",
    ],
    chennaiTags: ["Midday meal"],
    chennaiRelevance:
      "Nutritious meal (midday meal) programmes and women's welfare schemes that reach Chennai schools and social-service institutions.",
  },
  {
    order: 24,
    slug: "r-vinoth",
    honorific: "Thiru",
    name: "R. Vinoth",
    designation: "Minister for Agriculture — Farmers Welfare",
    ministryTitle: "Agriculture",
    portfolios: [
      "Agriculture, Agricultural Engineering, Agro Service Co-operatives",
      "Horticulture, Sugar, Sugarcane Excise, Sugarcane Development and Waste Land Development",
    ],
    chennaiRelevance:
      "Chennai eats what the hinterland grows — Koyambedu and other perishable markets are the city end of agriculture marketing. This ministry is not GCC’s market-licence desk; treat wholesale-price chatter as trade news, not a G.O.",
  },
  {
    order: 25,
    slug: "c-vijayalakshmi",
    honorific: "Tmt",
    name: "C. Vijayalakshmi",
    designation: "Minister for Milk and Dairy Development",
    ministryTitle: "Milk & Dairy Development",
    portfolios: ["Milk and Dairy Development"],
    chennaiTags: ["Aavin"],
    chennaiRelevance:
      "Aavin milk supply and dairy co-operative pricing affect Chennai households directly.",
  },
  {
    order: 26,
    slug: "d-sarathkumar",
    honorific: "Thiru",
    name: "D. Sarathkumar",
    designation: "Minister for Human Resources Management",
    ministryTitle: "Human Resources Management",
    portfolios: ["Human Resources Management & Ex-Servicemen Welfare"],
    chennaiRelevance:
      "State HR and secretariat staffing decisions are taken in Chennai. This is not a public vacancy board — live openings we list stay on the jobs hub, not on minister pages.",
  },
  {
    order: 27,
    slug: "ramesh",
    honorific: "Thiru",
    name: "Ramesh",
    designation: "Minister for Hindu Religious and Charitable Endowments",
    ministryTitle: "HR & CE",
    portfolios: ["Hindu Religious and Charitable Endowments"],
    chennaiTags: ["Temples"],
    chennaiRelevance:
      "Major Chennai temples under HR&CE administration — appointments, festivals and endowment governance.",
  },
  {
    order: 28,
    slug: "p-mathan-raja",
    honorific: "Thiru",
    name: "P. Mathan Raja",
    designation: "Minister for Micro, Small and Medium Enterprises",
    ministryTitle: "MSME",
    portfolios: ["Rural Industries including Cottage Industries, Small Industries"],
    chennaiRelevance:
      "Guindy and Ambattur industrial estates are the Chennai-facing MSME geography readers ask about. Estate-level licences and SIDCO notices stay on official industrial pages.",
  },
  {
    order: 29,
    slug: "n-marie-wilson",
    honorific: "Dr",
    name: "N. Marie Wilson",
    designation: "Minister for Finance, Planning and Development",
    ministryTitle: "Finance & Planning",
    portfolios: ["Finance, Pensions and Pensionary Benefits, Planning & Development"],
    chennaiTags: ["Budget"],
    chennaiRelevance:
      "State budget, pension policy and capital-allocation decisions that fund Chennai infrastructure and welfare lines.",
    filterTags: ["finance"],
    newsSlugs: ["tamil-nadu-fiscal-white-paper-2026-debt-revenue-deficit-analysis"],
  },
  {
    order: 30,
    slug: "a-srinath",
    honorific: "Thiru",
    name: "A. Srinath",
    designation: "Minister for Fisheries — Fishermen Welfare",
    ministryTitle: "Fisheries",
    portfolios: ["Fisheries, Fisheries Development Corporation"],
    chennaiTags: ["Coast"],
    chennaiRelevance:
      "Fishing harbour policy and fishermen welfare along Chennai's coast and Ennore corridor.",
  },
  {
    order: 31,
    slug: "s-kamali",
    honorific: "Tmt",
    name: "S. Kamali",
    designation: "Minister for Animal Husbandry",
    ministryTitle: "Animal Husbandry",
    portfolios: ["Animal Husbandry"],
    chennaiRelevance:
      "Veterinary services and livestock policy touch urban dairies and Aavin-adjacent supply into the city. This is not a pet-clinic directory — use GCC and department helplines for local animal-control questions.",
  },
  {
    order: 32,
    slug: "kumar-r",
    honorific: "Dr",
    name: "Kumar R",
    designation:
      "Minister for Artificial Intelligence, Information Technology and Digital Services",
    ministryTitle: "AI, IT & Digital Services",
    portfolios: ["Artificial Intelligence, Information Technology and Digital Services"],
    chennaiTags: ["e-Governance", "Namma Arasu"],
    chennaiRelevance:
      "State IT policy, e-governance chatbots and digital-service rollouts — including Chennai-facing citizen interfaces.",
    newsSlugs: ["namma-arasu-whatsapp-chatbot-tamil-nadu-2026"],
  },
  {
    order: 33,
    slug: "rv-ranjithkumar",
    honorific: "Thiru",
    name: "R.V. Ranjithkumar",
    designation: "Minister for Forests",
    ministryTitle: "Forests",
    portfolios: ["Forests"],
    chennaiRelevance:
      "Urban tree cover and Guindy National Park sit at the city edge of the forests portfolio. Felling, park rules, and sanctuary notices belong on official forest / GCC pages — this card does not map every avenue tree.",
  },
  {
    order: 34,
    slug: "d-logesh-tamilselvan",
    honorific: "Thiru",
    name: "D. Logesh Tamilselvan",
    designation: "Minister for Commercial Taxes and Registration",
    ministryTitle: "Commercial Taxes & Registration",
    portfolios: [
      "Commercial Taxes, Registration and Stamp Act",
      "Debt Relief including legislation on Money lending, Chits and Registration of Companies",
    ],
    chennaiTags: ["Registration"],
    chennaiRelevance:
      "Property registration, stamp duty and commercial-tax compliance for Chennai businesses and home buyers.",
  },
  {
    order: 35,
    slug: "vk-rajeev",
    honorific: "Dr",
    name: "V.K. Rajeev",
    designation: "Minister for Environment and Climate Change",
    ministryTitle: "Environment & Climate Change",
    portfolios: ["Environment, Pollution Control Board, Climate Change"],
    chennaiTags: ["TNPCB", "Pollution"],
    chennaiRelevance:
      "Tamil Nadu Pollution Control Board enforcement, air-quality action and climate-policy framing for industrial Chennai.",
    filterTags: ["chennai-urban"],
  },
];

export const MINISTER_SLUGS = MINISTERS_MAY_2026.map((m) => m.slug);

export function getMinister(slug: string): MinisterRow | undefined {
  return MINISTERS_MAY_2026.find((m) => m.slug === slug);
}

export function ministerDisplayName(m: MinisterRow): string {
  return `${m.honorific} ${m.name}`;
}

export const MINISTER_COUNT = MINISTERS_MAY_2026.length;

export const FILTER_CHIP_LABELS: Record<MinisterFilterTag, string> = {
  "chennai-urban": "Chennai urban",
  "water-floods": "Water & floods",
  health: "Health",
  transport: "Transport",
  finance: "Finance",
  "law-order": "Law & order",
};
