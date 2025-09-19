import { universities } from '../data/universities';
import { directions } from '../data/directions';
import { admissionStats } from '../data/admissionStats';
import { subjects } from '../data/subjects';
import { testQuestions } from '../data/testQuestions';

// LocalStorage based database service
export class DatabaseService {
  private static instance: DatabaseService;
  private storage: Storage;

  private constructor() {
    this.storage = localStorage;
    this.initializeData();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Ma'lumotlarni ishga tushirish
  private initializeData(): void {
    if (!this.storage.getItem('universities')) {
      this.storage.setItem('universities', JSON.stringify(universities));
    }
    if (!this.storage.getItem('directions')) {
      this.storage.setItem('directions', JSON.stringify(directions));
    }
    if (!this.storage.getItem('admissionStats')) {
      this.storage.setItem('admissionStats', JSON.stringify(admissionStats));
    }
    if (!this.storage.getItem('subjects')) {
      this.storage.setItem('subjects', JSON.stringify(subjects));
    }
    if (!this.storage.getItem('testQuestions')) {
      this.storage.setItem('testQuestions', JSON.stringify(testQuestions));
    }
  }

  // Universitetlar
  async getUniversities(): Promise<any[]> {
    const data = this.storage.getItem('universities');
    return data ? JSON.parse(data) : [];
  }

  async getUniversityById(id: string): Promise<any | null> {
    const universities = await this.getUniversities();
    return universities.find(u => u.id === id) || null;
  }

  async searchUniversities(query: string): Promise<any[]> {
    const universities = await this.getUniversities();
    return universities.filter(u => 
      u.nameUz.toLowerCase().includes(query.toLowerCase()) ||
      u.location.toLowerCase().includes(query.toLowerCase())
    );
  }

  async addUniversity(university: any): Promise<void> {
    const universities = await this.getUniversities();
    universities.push({ ...university, id: this.generateId() });
    this.storage.setItem('universities', JSON.stringify(universities));
  }

  async updateUniversity(id: string, updates: any): Promise<void> {
    const universities = await this.getUniversities();
    const index = universities.findIndex(u => u.id === id);
    if (index !== -1) {
      universities[index] = { ...universities[index], ...updates };
      this.storage.setItem('universities', JSON.stringify(universities));
    }
  }

  async deleteUniversity(id: string): Promise<void> {
    const universities = await this.getUniversities();
    const filtered = universities.filter(u => u.id !== id);
    this.storage.setItem('universities', JSON.stringify(filtered));
  }

  // Yo'nalishlar
  async getDirections(): Promise<any[]> {
    const data = this.storage.getItem('directions');
    return data ? JSON.parse(data) : [];
  }

  async getDirectionById(id: string): Promise<any | null> {
    const directions = await this.getDirections();
    return directions.find(d => d.id === id) || null;
  }

  async getDirectionsByUniversity(universityId: string): Promise<any[]> {
    const directions = await this.getDirections();
    return directions.filter(d => d.universityId === universityId);
  }

  async searchDirections(query: string): Promise<any[]> {
    const directions = await this.getDirections();
    return directions.filter(d => 
      d.nameUz.toLowerCase().includes(query.toLowerCase()) ||
      d.facultyUz.toLowerCase().includes(query.toLowerCase())
    );
  }

  async addDirection(direction: any): Promise<void> {
    const directions = await this.getDirections();
    directions.push({ ...direction, id: this.generateId() });
    this.storage.setItem('directions', JSON.stringify(directions));
  }

  async updateDirection(id: string, updates: any): Promise<void> {
    const directions = await this.getDirections();
    const index = directions.findIndex(d => d.id === id);
    if (index !== -1) {
      directions[index] = { ...directions[index], ...updates };
      this.storage.setItem('directions', JSON.stringify(directions));
    }
  }

  async deleteDirection(id: string): Promise<void> {
    const directions = await this.getDirections();
    const filtered = directions.filter(d => d.id !== id);
    this.storage.setItem('directions', JSON.stringify(filtered));
  }

  // Qabul statistikasi
  async getAdmissionStats(): Promise<any[]> {
    const data = this.storage.getItem('admissionStats');
    return data ? JSON.parse(data) : [];
  }

  async getAdmissionStatsByDirection(directionId: string): Promise<any[]> {
    const stats = await this.getAdmissionStats();
    return stats.filter(s => s.directionId === directionId);
  }

  async getAdmissionStatsByYear(year: number): Promise<any[]> {
    const stats = await this.getAdmissionStats();
    return stats.filter(s => s.year === year);
  }

  async addAdmissionStats(stats: any): Promise<void> {
    const allStats = await this.getAdmissionStats();
    allStats.push({ ...stats, id: this.generateId() });
    this.storage.setItem('admissionStats', JSON.stringify(allStats));
  }

  async updateAdmissionStats(id: string, updates: any): Promise<void> {
    const stats = await this.getAdmissionStats();
    const index = stats.findIndex(s => s.id === id);
    if (index !== -1) {
      stats[index] = { ...stats[index], ...updates };
      this.storage.setItem('admissionStats', JSON.stringify(stats));
    }
  }

  async deleteAdmissionStats(id: string): Promise<void> {
    const stats = await this.getAdmissionStats();
    const filtered = stats.filter(s => s.id !== id);
    this.storage.setItem('admissionStats', JSON.stringify(filtered));
  }

  // Fanlar
  async getSubjects(): Promise<any[]> {
    const data = this.storage.getItem('subjects');
    return data ? JSON.parse(data) : [];
  }

  async getSubjectById(id: string): Promise<any | null> {
    const subjects = await this.getSubjects();
    return subjects.find(s => s.id === id) || null;
  }

  async getSubjectsByCategory(category: string): Promise<any[]> {
    const subjects = await this.getSubjects();
    return subjects.filter(s => s.category === category);
  }

  async searchSubjects(query: string): Promise<any[]> {
    const subjects = await this.getSubjects();
    return subjects.filter(s => 
      s.nameUz.toLowerCase().includes(query.toLowerCase()) ||
      s.code.toLowerCase().includes(query.toLowerCase())
    );
  }

  async addSubject(subject: any): Promise<void> {
    const subjects = await this.getSubjects();
    subjects.push({ ...subject, id: this.generateId() });
    this.storage.setItem('subjects', JSON.stringify(subjects));
  }

  async updateSubject(id: string, updates: any): Promise<void> {
    const subjects = await this.getSubjects();
    const index = subjects.findIndex(s => s.id === id);
    if (index !== -1) {
      subjects[index] = { ...subjects[index], ...updates };
      this.storage.setItem('subjects', JSON.stringify(subjects));
    }
  }

  async deleteSubject(id: string): Promise<void> {
    const subjects = await this.getSubjects();
    const filtered = subjects.filter(s => s.id !== id);
    this.storage.setItem('subjects', JSON.stringify(filtered));
  }

  // Test savollari
  async getTestQuestions(): Promise<any[]> {
    const data = this.storage.getItem('testQuestions');
    return data ? JSON.parse(data) : [];
  }

  async getTestQuestionsBySubject(subjectId: string): Promise<any[]> {
    const questions = await this.getTestQuestions();
    return questions.filter(q => q.subjectId === subjectId);
  }

  async getTestQuestionsByDifficulty(difficulty: string): Promise<any[]> {
    const questions = await this.getTestQuestions();
    return questions.filter(q => q.difficulty === difficulty);
  }

  async addTestQuestion(question: any): Promise<void> {
    const questions = await this.getTestQuestions();
    questions.push({ ...question, id: this.generateId() });
    this.storage.setItem('testQuestions', JSON.stringify(questions));
  }

  async updateTestQuestion(id: string, updates: any): Promise<void> {
    const questions = await this.getTestQuestions();
    const index = questions.findIndex(q => q.id === id);
    if (index !== -1) {
      questions[index] = { ...questions[index], ...updates };
      this.storage.setItem('testQuestions', JSON.stringify(questions));
    }
  }

  async deleteTestQuestion(id: string): Promise<void> {
    const questions = await this.getTestQuestions();
    const filtered = questions.filter(q => q.id !== id);
    this.storage.setItem('testQuestions', JSON.stringify(filtered));
  }

  // Birlashtirilgan ma'lumotlar
  async getDirectionWithStats(directionId: string): Promise<any> {
    const direction = await this.getDirectionById(directionId);
    const stats = await this.getAdmissionStatsByDirection(directionId);
    const university = direction ? await this.getUniversityById(direction.universityId) : null;
    
    return {
      direction,
      university,
      stats
    };
  }

  async getUniversityWithDirections(universityId: string): Promise<any> {
    const university = await this.getUniversityById(universityId);
    const universityDirections = await this.getDirectionsByUniversity(universityId);
    
    const directionsWithStats = await Promise.all(
      universityDirections.map(async (direction) => {
        const stats = await this.getAdmissionStatsByDirection(direction.id);
        return { ...direction, stats };
      })
    );
    
    return {
      university,
      directions: directionsWithStats
    };
  }

  // Utility functions
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Database backup va restore
  async backupDatabase(): Promise<string> {
    const backup = {
      universities: await this.getUniversities(),
      directions: await this.getDirections(),
      admissionStats: await this.getAdmissionStats(),
      subjects: await this.getSubjects(),
      testQuestions: await this.getTestQuestions(),
      timestamp: new Date().toISOString()
    };
    return JSON.stringify(backup);
  }

  async restoreDatabase(backupData: string): Promise<void> {
    try {
      const backup = JSON.parse(backupData);
      this.storage.setItem('universities', JSON.stringify(backup.universities));
      this.storage.setItem('directions', JSON.stringify(backup.directions));
      this.storage.setItem('admissionStats', JSON.stringify(backup.admissionStats));
      this.storage.setItem('subjects', JSON.stringify(backup.subjects));
      this.storage.setItem('testQuestions', JSON.stringify(backup.testQuestions));
    } catch (error) {
      throw new Error('Invalid backup data');
    }
  }

  // Database tozalash
  async clearDatabase(): Promise<void> {
    this.storage.removeItem('universities');
    this.storage.removeItem('directions');
    this.storage.removeItem('admissionStats');
    this.storage.removeItem('subjects');
    this.storage.removeItem('testQuestions');
    this.initializeData();
  }
}

// Singleton instance
export const db = DatabaseService.getInstance();
