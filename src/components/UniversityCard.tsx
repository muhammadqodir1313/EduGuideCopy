import React from 'react';
import { University } from '../types';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  CalendarIcon, 
  UserGroupIcon,
  StarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface UniversityCardProps {
  university: University;
  index: number;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university, index }) => {
  const getTypeColor = (type: string) => {
    return type === 'davlat' ? 'text-green-600 bg-green-100' : 'text-blue-600 bg-blue-100';
  };

  const getTypeText = (type: string) => {
    return type === 'davlat' ? 'Davlat' : 'Nodavlat';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={university.image}
          alt={university.nameUz}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors truncate">
              {university.nameUz}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-xs sm:text-sm truncate">{university.location}</span>
            </div>
          </div>
          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${getTypeColor(university.type)}`}>
            {getTypeText(university.type)}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-center sm:justify-start mb-3 sm:mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(university.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-xs sm:text-sm text-gray-600">{university.rating}</span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-2 sm:gap-3 mb-4">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-1 sm:mr-2 text-blue-500 flex-shrink-0" />
            <span className="truncate">Tashkil etilgan: {university.established}-yil</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <UserGroupIcon className="h-4 w-4 mr-1 sm:mr-2 text-green-500 flex-shrink-0" />
            <span className="truncate">Talabalar soni: {university.studentsCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <GlobeAltIcon className="h-4 w-4 mr-1 sm:mr-2 text-purple-500 flex-shrink-0" />
            <a 
              href={university.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors truncate"
            >
              Rasmiy sayt
            </a>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-sm sm:text-base">
          Batafsil ma'lumot
        </button>
      </div>
    </motion.div>
  );
};

export default UniversityCard;