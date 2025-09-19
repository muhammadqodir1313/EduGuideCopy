import React from 'react';
import { Direction, University, AdmissionStats } from '../types';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

interface DirectionCardProps {
  direction: Direction;
  university: University;
  stats?: AdmissionStats;
  index: number;
}

const DirectionCard: React.FC<DirectionCardProps> = ({ direction, university, stats, index }) => {
  const getDemandColor = (level: string) => {
    switch (level) {
      case 'yuqori': return 'text-green-600 bg-green-100';
      case 'o\'rta': return 'text-yellow-600 bg-yellow-100';
      case 'past': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDemandText = (level: string) => {
    switch (level) {
      case 'yuqori': return 'Yuqori talab';
      case 'o\'rta': return 'O\'rta talab';
      case 'past': return 'Past talab';
      default: return 'Noma\'lum';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors truncate">
              {direction.nameUz}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <BuildingOfficeIcon className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-xs sm:text-sm truncate">{university.nameUz}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mb-3">{direction.facultyUz}</p>
          </div>
          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${getDemandColor(direction.demandLevel)}`}>
            {getDemandText(direction.demandLevel)}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {direction.descriptionUz}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <ClockIcon className="h-4 w-4 mr-1 sm:mr-2 text-blue-500 flex-shrink-0" />
            <span className="truncate">{direction.duration} yil</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <AcademicCapIcon className="h-4 w-4 mr-1 sm:mr-2 text-green-500 flex-shrink-0" />
            <span className="capitalize truncate">{direction.educationType}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <CurrencyDollarIcon className="h-4 w-4 mr-1 sm:mr-2 text-yellow-500 flex-shrink-0" />
            <span className="truncate">{(direction.averageSalary / 1000000).toFixed(1)}M so'm</span>
          </div>
          {direction.code && (
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <ChartBarIcon className="h-4 w-4 mr-1 sm:mr-2 text-purple-500 flex-shrink-0" />
              <span className="truncate">Kod: {direction.code}</span>
            </div>
          )}
        </div>

        {/* Admission Stats */}
        {stats && (stats.grantPlaces > 0 || stats.contractPlaces > 0 || stats.grantMinScore > 0 || stats.contractMinScore > 0) && (
          <div className="border-t pt-3 sm:pt-4">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">2024-yil qabul statistikasi</h4>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs">
              <div>
                <span className="text-gray-500">Grant o'rinlari:</span>
                <span className="ml-1 font-medium text-green-600">{stats.grantPlaces}</span>
              </div>
              <div>
                <span className="text-gray-500">Kontrakt o'rinlari:</span>
                <span className="ml-1 font-medium text-blue-600">{stats.contractPlaces}</span>
              </div>
              <div>
                <span className="text-gray-500">Grant ball:</span>
                <span className="ml-1 font-medium text-green-600">{stats.grantMinScore}</span>
              </div>
              <div>
                <span className="text-gray-500">Kontrakt ball:</span>
                <span className="ml-1 font-medium text-blue-600">{stats.contractMinScore}</span>
              </div>
            </div>
          </div>
        )}

        {/* Subjects */}
        <div className="mt-3 sm:mt-4">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Kirish fanlari</h4>
          <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-start">
            {direction.subjects.map((subject, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Career Paths */}
        <div className="mt-3 sm:mt-4">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Kasbiy yo'nalishlar</h4>
          <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-start">
            {direction.careerPathsUz.slice(0, 3).map((career, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-md"
              >
                {career}
              </span>
            ))}
            {direction.careerPathsUz.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md">
                +{direction.careerPathsUz.length - 3} ko'proq
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DirectionCard;