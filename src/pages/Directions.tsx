import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import DirectionCard from '../components/DirectionCard';
import { directions } from '../data/directions';
import { universities } from '../data/universities';
import { admissionStats } from '../data/admissionStats';

const Directions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedDemand, setSelectedDemand] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDirections = useMemo(() => {
    return directions.filter(direction => {
      const matchesSearch = direction.nameUz.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           direction.facultyUz.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUniversity = !selectedUniversity || direction.universityId === selectedUniversity;
      const matchesDemand = !selectedDemand || direction.demandLevel === selectedDemand;
      const matchesDuration = !selectedDuration || direction.duration.toString() === selectedDuration;

      return matchesSearch && matchesUniversity && matchesDemand && matchesDuration;
    });
  }, [searchTerm, selectedUniversity, selectedDemand, selectedDuration]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedUniversity('');
    setSelectedDemand('');
    setSelectedDuration('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Yo'nalishlar
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            O'zbekiston oliy ta'lim muassasalarining barcha yo'nalishlari haqida to'liq ma'lumot
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-6">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Yo'nalish yoki fakultet nomi bo'yicha qidiring..."
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
            {(selectedUniversity || selectedDemand || selectedDuration) && (
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
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Universitet
                </label>
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Barcha universitetlar</option>
                  {universities.map(university => (
                    <option key={university.id} value={university.id}>
                      {university.nameUz}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Talab darajasi
                </label>
                <select
                  value={selectedDemand}
                  onChange={(e) => setSelectedDemand(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Barcha darajalar</option>
                  <option value="yuqori">Yuqori talab</option>
                  <option value="o'rta">O'rta talab</option>
                  <option value="past">Past talab</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Ta'lim muddati
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Barcha muddatlar</option>
                  <option value="4">4 yil</option>
                  <option value="5">5 yil</option>
                  <option value="6">6 yil</option>
                </select>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-gray-600">
            <span className="font-semibold">{filteredDirections.length}</span> ta yo'nalish topildi
          </p>
        </div>

        {/* Directions Grid */}
        {filteredDirections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDirections.map((direction, index) => {
              const university = universities.find(u => u.id === direction.universityId)!;
              const stats = admissionStats.find(s => s.directionId === direction.id && s.year === 2024);
              return (
                <DirectionCard
                  key={direction.id}
                  direction={direction}
                  university={university}
                  stats={stats}
                  index={index}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MagnifyingGlassIcon className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Hech qanday yo'nalish topilmadi
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

export default Directions;