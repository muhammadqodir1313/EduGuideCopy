import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import UniversityCard from '../components/UniversityCard';
import { universities } from '../data/universities';

const Universities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const locations = [...new Set(universities.map(u => u.location))];

  const filteredUniversities = useMemo(() => {
    return universities.filter(university => {
      const matchesSearch = university.nameUz.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           university.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || university.type === selectedType;
      const matchesLocation = !selectedLocation || university.location === selectedLocation;

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [searchTerm, selectedType, selectedLocation]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedLocation('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Universitetlar
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            O'zbekiston oliy ta'lim muassasalari haqida to'liq ma'lumot
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-6">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Universitet nomi yoki shahar bo'yicha qidiring..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base"
            >
              <FunnelIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              Filtrlar
            </button>
            {(selectedType || selectedLocation) && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm"
              >
                Filtrlarni tozalash
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Universitet turi
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Barcha turlar</option>
                  <option value="davlat">Davlat</option>
                  <option value="nodavlat">Nodavlat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Shahar
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Barcha shaharlar</option>
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-gray-600">
            <span className="font-semibold">{filteredUniversities.length}</span> ta universitet topildi
          </p>
        </div>

        {/* Universities Grid */}
        {filteredUniversities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredUniversities.map((university, index) => (
              <UniversityCard
                key={university.id}
                university={university}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MagnifyingGlassIcon className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Hech qanday universitet topilmadi
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 px-4">
              Qidiruv shartlaringizni o'zgartiring yoki filtrlarni tozalang
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Universities;