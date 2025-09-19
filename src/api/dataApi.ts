import { universities } from '../data/universities';
import { directions } from '../data/directions';
import { admissionStats } from '../data/admissionStats';

// Universitetlar API
export const getUniversities = () => {
  return Promise.resolve(universities);
};

export const getUniversityById = (id: string) => {
  const university = universities.find(u => u.id === id);
  return Promise.resolve(university);
};

export const searchUniversities = (query: string) => {
  const filtered = universities.filter(u => 
    u.nameUz.toLowerCase().includes(query.toLowerCase()) ||
    u.location.toLowerCase().includes(query.toLowerCase())
  );
  return Promise.resolve(filtered);
};

// Yo'nalishlar API
export const getDirections = () => {
  return Promise.resolve(directions);
};

export const getDirectionById = (id: string) => {
  const direction = directions.find(d => d.id === id);
  return Promise.resolve(direction);
};

export const getDirectionsByUniversity = (universityId: string) => {
  const filtered = directions.filter(d => d.universityId === universityId);
  return Promise.resolve(filtered);
};

export const searchDirections = (query: string) => {
  const filtered = directions.filter(d => 
    d.nameUz.toLowerCase().includes(query.toLowerCase()) ||
    d.facultyUz.toLowerCase().includes(query.toLowerCase())
  );
  return Promise.resolve(filtered);
};

// Qabul statistikasi API
export const getAdmissionStats = () => {
  return Promise.resolve(admissionStats);
};

export const getAdmissionStatsByDirection = (directionId: string) => {
  const filtered = admissionStats.filter(s => s.directionId === directionId);
  return Promise.resolve(filtered);
};

export const getAdmissionStatsByYear = (year: number) => {
  const filtered = admissionStats.filter(s => s.year === year);
  return Promise.resolve(filtered);
};

// Birlashtirilgan ma'lumotlar
export const getDirectionWithStats = (directionId: string) => {
  const direction = directions.find(d => d.id === directionId);
  const stats = admissionStats.filter(s => s.directionId === directionId);
  const university = direction ? universities.find(u => u.id === direction.universityId) : null;
  
  return Promise.resolve({
    direction,
    university,
    stats
  });
};

export const getUniversityWithDirections = (universityId: string) => {
  const university = universities.find(u => u.id === universityId);
  const universityDirections = directions.filter(d => d.universityId === universityId);
  
  const directionsWithStats = universityDirections.map(direction => {
    const stats = admissionStats.filter(s => s.directionId === direction.id);
    return { ...direction, stats };
  });
  
  return Promise.resolve({
    university,
    directions: directionsWithStats
  });
};
