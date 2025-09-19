import { University } from '../types';
import raw from '../database/uz.json';

const toAbsoluteUrl = (url: string | null | undefined): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
};

const deriveLocation = (map: string | null | undefined, address: string | null | undefined): string => {
  if (map && !map.startsWith('http')) return map;
  if (address) {
    const parts = address.split(',').map(p => p.trim());
    const guess = parts.find(p => /(Toshkent|Samarqand|Farg'ona|Andijon|Namangan|Buxoro|Xorazm|Qarshi|Nukus|Jizzax|Sirdaryo|Navoiy)/i.test(p));
    return guess || parts[0] || 'Toshkent';
  }
  return 'Toshkent';
};

const currentYear = new Date().getFullYear();

// Extract universities from imported JSON
const sourceUniversities: any[] = (raw as any)?.pageProps?.dehydratedState?.queries?.[0]?.state?.data?.data ?? [];

export const universities: University[] = sourceUniversities.map((u: any): University => {
  const years = Number(u.experience_years_count || 0);
  const established = years > 0 ? currentYear - years : currentYear;
  const website = toAbsoluteUrl(u.site);
  const image = u.logo || u.image || '';
  const type = (u.type === 'private' ? 'nodavlat' : 'davlat') as University['type'];
  const location = deriveLocation(u.map, u.address);

  return {
    id: String(u.id),
    name: u.name || u.title || 'Universitet',
    nameUz: u.name || u.title || 'Universitet',
    location,
    type,
    established,
    website,
    image,
    rating: 4.5,
    studentsCount: Number(u.students_count || 0)
  };
});