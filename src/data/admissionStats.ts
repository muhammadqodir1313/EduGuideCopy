import { AdmissionStats } from '../types';
import { directions } from './directions';
import raw from '../database/uz.json';
import overrides from '../database/overrides.json';

type RawUni = any;
type RawCourse = any;

const sourceUniversities: RawUni[] = (raw as any)?.pageProps?.dehydratedState?.queries?.[0]?.state?.data?.data ?? [];

const normalize = (s: string | null | undefined): string => (s || '').replace(/\s+/g, ' ').trim();

const uniById = new Map<string, RawUni>(
	sourceUniversities.map((u: RawUni) => [String(u.id), u])
);

// Build admission stats for 2024 using counts when available, otherwise default to 0
export const admissionStats: AdmissionStats[] = directions.map((dir) => {
	const uni = uniById.get(dir.universityId);
	const courses: RawCourse[] = Array.isArray(uni?.course_details) ? uni!.course_details : [];
	const matched = courses.find((c) => normalize(c.direction_name) === normalize(dir.nameUz));

	const uniSlug: string = (uni?.slug || String(uni?.id));
	const dirOverride = ((overrides as any)[uniSlug] || {})[dir.nameUz] || {};

	const grantPlaces = Number(dirOverride.grantPlaces ?? matched?.grant_count ?? 0) || 0;
	const contractPlaces = Number(dirOverride.contractPlaces ?? matched?.contract_count ?? 0) || 0;

	return {
		directionId: dir.id,
		year: 2024,
		grantPlaces,
		contractPlaces,
		grantMinScore: Number(dirOverride.grantMinScore ?? 0) || 0,
		contractMinScore: Number(dirOverride.contractMinScore ?? 0) || 0,
		applicants: Number(dirOverride.applicants ?? 0) || 0,
		competition: Number(dirOverride.competition ?? 0) || 0,
	};
});