import { universities } from '../data/universities';
import { directions } from '../data/directions';
import { admissionStats } from '../data/admissionStats';

// JSON fayl sifatida yuklab olish
export const downloadAsJSON = (data: any, filename: string) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// CSV fayl sifatida yuklab olish
export const downloadAsCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Agar qiymat string bo'lsa va vergul yoki qo'shtirnoq bo'lsa, uni qo'shtirnoq bilan o'rab olamiz
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Barcha ma'lumotlarni yuklab olish
export const downloadAllData = () => {
  // Universitetlar
  downloadAsJSON(universities, 'universities');
  downloadAsCSV(universities, 'universities');
  
  // Yo'nalishlar
  downloadAsJSON(directions, 'directions');
  downloadAsCSV(directions, 'directions');
  
  // Qabul statistikasi
  downloadAsJSON(admissionStats, 'admission-stats');
  downloadAsCSV(admissionStats, 'admission-stats');
};

// Alohida ma'lumotlarni yuklab olish
export const downloadUniversities = () => {
  downloadAsJSON(universities, 'universities');
  downloadAsCSV(universities, 'universities');
};

export const downloadDirections = () => {
  downloadAsJSON(directions, 'directions');
  downloadAsCSV(directions, 'directions');
};

export const downloadAdmissionStats = () => {
  downloadAsJSON(admissionStats, 'admission-stats');
  downloadAsCSV(admissionStats, 'admission-stats');
};

// Birlashtirilgan ma'lumotlarni yuklab olish
export const downloadCompleteDataset = () => {
  const completeData = {
    universities,
    directions,
    admissionStats,
    metadata: {
      totalUniversities: universities.length,
      totalDirections: directions.length,
      totalStats: admissionStats.length,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    }
  };
  
  downloadAsJSON(completeData, 'eduguide-complete-dataset');
};
