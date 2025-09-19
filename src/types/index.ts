export interface University {
  id: string;
  name: string;
  nameUz: string;
  location: string;
  type: 'davlat' | 'nodavlat';
  established: number;
  website: string;
  image: string;
  rating: number;
  studentsCount: number;
}

export interface Direction {
  id: string;
  name: string;
  nameUz: string;
  code: string;
  faculty: string;
  facultyUz: string;
  universityId: string;
  duration: number;
  language: 'uz' | 'ru' | 'en';
  educationType: 'kunduzgi' | 'sirtqi' | 'kechki';
  description: string;
  descriptionUz: string;
  subjects: string[];
  careerPaths: string[];
  careerPathsUz: string[];
  averageSalary: number;
  demandLevel: 'yuqori' | 'orta' | 'past';
}

export interface AdmissionStats {
  directionId: string;
  year: number;
  grantPlaces: number;
  contractPlaces: number;
  grantMinScore: number;
  contractMinScore: number;
  applicants: number;
  competition: number;
}

export interface TestQuestion {
  id: string;
  question: string;
  questionUz: string;
  options: string[];
  optionsUz: string[];
  category: 'texnik' | 'ijtimoiy' | 'tabiiy' | 'ijodiy' | 'biznes';
}

export interface TestResult {
  category: string;
  score: number;
  recommendations: string[];
}

export interface Subject {
  id: string;
  name: string;
  nameUz: string;
  code: string;
  category: 'matematika' | 'tabiiy' | 'ijtimoiy' | 'til' | 'ijodiy';
  description: string;
  descriptionUz: string;
  maxScore: number;
  duration: number;
  questionsCount: number;
  topics: string[];
  topicsUz: string[];
}

export interface TestQuestion {
  id: string;
  subjectId: string;
  question: string;
  questionUz: string;
  options: string[];
  optionsUz: string[];
  correctAnswer: number;
  explanation?: string;
  explanationUz?: string;
  difficulty: 'oson' | 'orta' | 'qiyin';
  topic?: string;
}