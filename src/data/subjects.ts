export interface Subject {
  id: string;
  name: string;
  nameUz: string;
  code: string;
  category: 'matematika' | 'tabiiy' | 'ijtimoiy' | 'til' | 'ijodiy';
  description: string;
  descriptionUz: string;
  maxScore: number;
  duration: number; // daqiqada
  questionsCount: number;
  topics: string[];
  topicsUz: string[];
}

export const subjects: Subject[] = [
  {
    id: "1",
    name: "Mathematics",
    nameUz: "Matematika",
    code: "MATH",
    category: "matematika",
    description: "Mathematics is the science of numbers, quantities, and shapes.",
    descriptionUz: "Matematika sonlar, miqdorlar va shakllar fanidir.",
    maxScore: 30,
    duration: 180,
    questionsCount: 30,
    topics: [
      "Algebra",
      "Geometry", 
      "Trigonometry",
      "Calculus",
      "Statistics"
    ],
    topicsUz: [
      "Algebra",
      "Geometriya",
      "Trigonometriya", 
      "Kalkulyus",
      "Statistika"
    ]
  },
  {
    id: "2",
    name: "Physics",
    nameUz: "Fizika",
    code: "PHYS",
    category: "tabiiy",
    description: "Physics is the study of matter, energy, and their interactions.",
    descriptionUz: "Fizika materiya, energiya va ularning o'zaro ta'siri haqidagi fandidir.",
    maxScore: 30,
    duration: 180,
    questionsCount: 30,
    topics: [
      "Mechanics",
      "Thermodynamics",
      "Electromagnetism",
      "Optics",
      "Modern Physics"
    ],
    topicsUz: [
      "Mexanika",
      "Termodinamika",
      "Elektromagnetizm",
      "Optika",
      "Zamonaviy fizika"
    ]
  },
  {
    id: "3",
    name: "Chemistry",
    nameUz: "Kimyo",
    code: "CHEM",
    category: "tabiiy",
    description: "Chemistry is the study of substances and their transformations.",
    descriptionUz: "Kimyo moddalar va ularning o'zgarishlari haqidagi fandidir.",
    maxScore: 30,
    duration: 180,
    questionsCount: 30,
    topics: [
      "General Chemistry",
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Physical Chemistry",
      "Analytical Chemistry"
    ],
    topicsUz: [
      "Umumiy kimyo",
      "Organik kimyo",
      "Anorganik kimyo",
      "Fizik kimyo",
      "Analitik kimyo"
    ]
  },
  {
    id: "4",
    name: "Biology",
    nameUz: "Biologiya",
    code: "BIO",
    category: "tabiiy",
    description: "Biology is the study of living organisms and their interactions.",
    descriptionUz: "Biologiya tirik organizmlar va ularning o'zaro ta'siri haqidagi fandidir.",
    maxScore: 30,
    duration: 180,
    questionsCount: 30,
    topics: [
      "Cell Biology",
      "Genetics",
      "Ecology",
      "Evolution",
      "Human Biology"
    ],
    topicsUz: [
      "Hujayra biologiyasi",
      "Genetika",
      "Ekologiya",
      "Evolutsiya",
      "Inson biologiyasi"
    ]
  },
  {
    id: "5",
    name: "History",
    nameUz: "Tarix",
    code: "HIST",
    category: "ijtimoiy",
    description: "History is the study of past events and their impact on society.",
    descriptionUz: "Tarix o'tmishdagi voqealar va ularning jamiyatga ta'siri haqidagi fandidir.",
    maxScore: 30,
    duration: 180,
    questionsCount: 30,
    topics: [
      "Ancient History",
      "Medieval History",
      "Modern History",
      "World History",
      "Uzbekistan History"
    ],
    topicsUz: [
      "Qadimiy tarix",
      "O'rta asrlar tarixi",
      "Zamonaviy tarix",
      "Jahon tarixi",
      "O'zbekiston tarixi"
    ]
  },
  {
    id: "6",
    name: "Geography",
    nameUz: "Geografiya",
    code: "GEO",
    category: "ijtimoiy",
    description: "Geography is the study of Earth's landscapes and environments.",
    descriptionUz: "Geografiya Yer landshaftlari va muhitlari haqidagi fandidir.",
    maxScore: 30,
    duration: 180,
    questionsCount: 30,
    topics: [
      "Physical Geography",
      "Human Geography",
      "Economic Geography",
      "Political Geography",
      "Regional Geography"
    ],
    topicsUz: [
      "Fizik geografiya",
      "Iqtisodiy geografiya",
      "Iqtisodiy geografiya",
      "Siyosiy geografiya",
      "Mintaqaviy geografiya"
    ]
  },
  {
    id: "7",
    name: "English Language",
    nameUz: "Ingliz tili",
    code: "ENG",
    category: "til",
    description: "English language proficiency test for academic purposes.",
    descriptionUz: "Akademik maqsadlar uchun ingliz tili bilimini o'lchash.",
    maxScore: 30,
    duration: 180,
    questionsCount: 30,
    topics: [
      "Grammar",
      "Vocabulary",
      "Reading Comprehension",
      "Listening",
      "Writing"
    ],
    topicsUz: [
      "Grammatika",
      "Lug'at",
      "O'qish tushunchasi",
      "Tinglash",
      "Yozish"
    ]
  },
  {
    id: "8",
    name: "Russian Language",
    nameUz: "Rus tili",
    code: "RUS",
    category: "til",
    description: "Russian language proficiency test for academic purposes.",
    descriptionUz: "Akademik maqsadlar uchun rus tili bilimini o'lchash.",
    maxScore: 30,
    duration: 180,
    questionsCount: 30,
    topics: [
      "Grammar",
      "Vocabulary",
      "Reading Comprehension",
      "Listening",
      "Writing"
    ],
    topicsUz: [
      "Grammatika",
      "Lug'at",
      "O'qish tushunchasi",
      "Tinglash",
      "Yozish"
    ]
  },
  {
    id: "9",
    name: "Uzbek Language",
    nameUz: "O'zbek tili",
    code: "UZB",
    category: "til",
    description: "Uzbek language proficiency test for academic purposes.",
    descriptionUz: "Akademik maqsadlar uchun o'zbek tili bilimini o'lchash.",
    maxScore: 30,
    duration: 180,
    questionsCount: 30,
    topics: [
      "Grammar",
      "Vocabulary",
      "Literature",
      "Reading Comprehension",
      "Writing"
    ],
    topicsUz: [
      "Grammatika",
      "Lug'at",
      "Adabiyot",
      "O'qish tushunchasi",
      "Yozish"
    ]
  },
  {
    id: "10",
    name: "Literature",
    nameUz: "Adabiyot",
    code: "LIT",
    category: "ijtimoiy",
    description: "Literature is the study of written works and their artistic value.",
    descriptionUz: "Adabiyot yozma asarlar va ularning badiiy qimmati haqidagi fandidir.",
    maxScore: 30,
    duration: 180,
    questionsCount: 30,
    topics: [
      "Uzbek Literature",
      "World Literature",
      "Poetry",
      "Prose",
      "Drama"
    ],
    topicsUz: [
      "O'zbek adabiyoti",
      "Jahon adabiyoti",
      "She'riyat",
      "Nasr",
      "Drama"
    ]
  }
];

// Fanlar bo'yicha yo'nalishlar
export const subjectDirectionMapping: { [key: string]: string[] } = {
  "1": ["60610100", "60610200", "60610300", "60310100", "60910100"], // Matematika
  "2": ["60610100", "60610200", "60610300", "60910100"], // Fizika
  "3": ["60910100"], // Kimyo
  "4": ["60910100"], // Biologiya
  "5": ["60310100", "60230100"], // Tarix
  "6": ["60230100"], // Geografiya
  "7": ["60610100", "60610200", "60610300", "60310100", "60230100"], // Ingliz tili
  "8": ["60610100", "60610200", "60610300", "60310100", "60230100"], // Rus tili
  "9": ["60310100", "60230100"], // O'zbek tili
  "10": ["60230100"] // Adabiyot
};

// Yo'nalish bo'yicha kerakli fanlar
export const directionSubjectMapping: { [key: string]: string[] } = {
  "60610100": ["1", "2"], // Kompyuter injiniringi
  "60610200": ["1", "2"], // Axborot xavfsizligi
  "60610300": ["1", "2"], // Dasturiy injiniring
  "60310100": ["1","7"], // Iqtisodiyot
  "60910100": [ "3", "4"], // Tibbiyot
  "60230100": ["1", "7"] // Xalqaro munosabatlar
};
