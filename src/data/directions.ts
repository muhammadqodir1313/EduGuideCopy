import { Direction } from '../types';
import raw from '../database/uz.json';
import overrides from '../database/overrides.json';

const sourceUniversities: any[] = (raw as any)?.pageProps?.dehydratedState?.queries?.[0]?.state?.data?.data ?? [];

let autoId = 1;
export const directions: Direction[] = sourceUniversities.flatMap((u: any) => {
  const universityId = String(u.id);
  const universitySlug: string = (u.slug || String(u.id));
  const facultyUz = u.title || 'Fakultet';
  const defaultDuration = 4;
  const defaultLanguage: Direction['language'] = 'uz';
  const defaultEducationType: Direction['educationType'] = 'kunduzgi';
  const averageSalary = 8000000;
  const demandLevel: Direction['demandLevel'] = 'yuqori';

  const courses: any[] = Array.isArray(u.course_details) ? u.course_details : [];
  return courses.map((c: any) => {
    const id = String(autoId++);
    const nameUz = (c.direction_name || "Yo'nalish").trim();
    const descriptionUz = `${u.name} yo'nalishi: ${nameUz}`;
    const subjects = ['Matematika', 'Ingliz tili'];
    const careerPathsUz = ['Mutaxassis', 'Muhandis', 'Tahlilchi'];

    // Apply overrides if available
    const uniOverrides = (overrides as any)[universitySlug] || {};
    const dirOverride = uniOverrides[nameUz] || {};

    const code: string = dirOverride.code ?? '';
    const duration: number = dirOverride.duration ?? defaultDuration;
    const language: Direction['language'] = dirOverride.language ?? defaultLanguage;
    const educationType: Direction['educationType'] = dirOverride.educationType ?? defaultEducationType;

    const direction: Direction = {
      id,
      name: nameUz,
      nameUz,
      code,
      faculty: facultyUz,
      facultyUz,
      universityId,
      duration,
      language,
      educationType,
      description: descriptionUz,
      descriptionUz,
      subjects,
      careerPaths: careerPathsUz,
      careerPathsUz,
      averageSalary,
      demandLevel
    };
    return direction;
  });
});