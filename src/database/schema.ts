// Database schema va tuzilishi

export interface DatabaseSchema {
  universities: UniversityTable;
  directions: DirectionTable;
  admissionStats: AdmissionStatsTable;
  subjects: SubjectTable;
  testQuestions: TestQuestionTable;
  users: UserTable;
  testResults: TestResultTable;
  applications: ApplicationTable;
}

// Universitetlar jadvali
export interface UniversityTable {
  id: string;
  name: string;
  nameUz: string;
  nameRu?: string;
  location: string;
  type: 'davlat' | 'xususiy' | 'xalqaro';
  established: number;
  website: string;
  image: string;
  rating: number;
  studentsCount: number;
  description?: string;
  descriptionUz?: string;
  address?: string;
  phone?: string;
  email?: string;
  rector?: string;
  faculties?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Yo'nalishlar jadvali
export interface DirectionTable {
  id: string;
  name: string;
  nameUz: string;
  nameRu?: string;
  code: string;
  faculty: string;
  facultyUz: string;
  facultyRu?: string;
  universityId: string;
  duration: number;
  language: 'uz' | 'ru' | 'en';
  educationType: 'kunduzgi' | 'kechki' | 'sirtqi';
  description: string;
  descriptionUz: string;
  descriptionRu?: string;
  subjects: string[]; // Subject ID lar
  careerPaths: string[];
  careerPathsUz: string[];
  careerPathsRu?: string[];
  averageSalary: number;
  demandLevel: 'yuqori' | 'orta' | 'past';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Qabul statistikasi jadvali
export interface AdmissionStatsTable {
  id: string;
  directionId: string;
  year: number;
  grantPlaces: number;
  contractPlaces: number;
  grantMinScore: number;
  contractMinScore: number;
  applicants: number;
  competition: number;
  grantPassRate?: number;
  contractPassRate?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Fanlar jadvali
export interface SubjectTable {
  id: string;
  name: string;
  nameUz: string;
  nameRu?: string;
  code: string;
  category: 'matematika' | 'tabiiy' | 'ijtimoiy' | 'til' | 'ijodiy';
  description: string;
  descriptionUz: string;
  descriptionRu?: string;
  maxScore: number;
  duration: number; // daqiqada
  questionsCount: number;
  topics: string[];
  topicsUz: string[];
  topicsRu?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Test savollari jadvali
export interface TestQuestionTable {
  id: string;
  subjectId: string;
  question: string;
  questionUz: string;
  questionRu?: string;
  options: string[];
  optionsUz: string[];
  optionsRu?: string[];
  correctAnswer: number;
  explanation?: string;
  explanationUz?: string;
  explanationRu?: string;
  difficulty: 'oson' | 'orta' | 'qiyin';
  topic?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Foydalanuvchilar jadvali
export interface UserTable {
  id: string;
  username: string;
  email: string;
  password: string; // hashlangan
  firstName: string;
  lastName: string;
  phone?: string;
  birthDate?: Date;
  region?: string;
  school?: string;
  graduationYear?: number;
  role: 'student' | 'admin' | 'moderator';
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Test natijalari jadvali
export interface TestResultTable {
  id: string;
  userId: string;
  testType: 'career' | 'subject' | 'practice';
  subjectId?: string;
  questions: string[]; // Question ID lar
  answers: number[];
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  maxScore: number;
  percentage: number;
  duration: number; // daqiqada
  completedAt: Date;
  createdAt: Date;
}

// Ariza berish jadvali
export interface ApplicationTable {
  id: string;
  userId: string;
  directionId: string;
  universityId: string;
  applicationYear: number;
  educationType: 'grant' | 'contract';
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'waitlisted';
  documents: string[]; // Document URL lar
  testScores: { [subjectId: string]: number };
  totalScore: number;
  priority: number; // 1, 2, 3...
  notes?: string;
  submittedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Indexes va relationships
export interface DatabaseIndexes {
  universities: {
    primary: ['id'];
    unique: ['website'];
    index: ['location', 'type', 'rating'];
  };
  directions: {
    primary: ['id'];
    unique: ['code'];
    index: ['universityId', 'faculty', 'demandLevel', 'isActive'];
  };
  admissionStats: {
    primary: ['id'];
    unique: ['directionId', 'year'];
    index: ['year', 'grantMinScore', 'contractMinScore'];
  };
  subjects: {
    primary: ['id'];
    unique: ['code'];
    index: ['category', 'isActive'];
  };
  testQuestions: {
    primary: ['id'];
    index: ['subjectId', 'difficulty', 'topic', 'isActive'];
  };
  users: {
    primary: ['id'];
    unique: ['username', 'email'];
    index: ['role', 'isActive', 'region'];
  };
  testResults: {
    primary: ['id'];
    index: ['userId', 'testType', 'subjectId', 'completedAt'];
  };
  applications: {
    primary: ['id'];
    unique: ['userId', 'directionId', 'applicationYear'];
    index: ['status', 'applicationYear', 'totalScore', 'priority'];
  };
}

// Foreign key relationships
export interface DatabaseRelationships {
  directions: {
    universityId: 'universities.id';
  };
  admissionStats: {
    directionId: 'directions.id';
  };
  testQuestions: {
    subjectId: 'subjects.id';
  };
  testResults: {
    userId: 'users.id';
    subjectId: 'subjects.id';
  };
  applications: {
    userId: 'users.id';
    directionId: 'directions.id';
    universityId: 'universities.id';
  };
}
