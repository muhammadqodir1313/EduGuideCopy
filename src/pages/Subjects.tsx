import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  AcademicCapIcon,
  CalculatorIcon,
  BeakerIcon,
  GlobeAltIcon,
  BookOpenIcon,
  ChartBarIcon,
  ClockIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { db } from '../database/databaseService';
import { subjects, Subject } from '../data/subjects';

const Subjects: React.FC = () => {
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    filterSubjects();
  }, [allSubjects, searchQuery, selectedCategory]);

  const loadSubjects = async () => {
    try {
      const subjectsData = await db.getSubjects();
      setAllSubjects(subjectsData);
    } catch (error) {
      console.error('Error loading subjects:', error);
      setAllSubjects(subjects);
    } finally {
      setLoading(false);
    }
  };

  const filterSubjects = () => {
    let filtered = allSubjects;

    // Kategoriya bo'yicha filtrlash
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(subject => subject.category === selectedCategory);
    }

    // Qidiruv bo'yicha filtrlash
    if (searchQuery) {
      filtered = filtered.filter(subject =>
        subject.nameUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.descriptionUz.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSubjects(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'matematika':
        return <CalculatorIcon className="h-6 w-6 text-blue-600" />;
      case 'tabiiy':
        return <BeakerIcon className="h-6 w-6 text-green-600" />;
      case 'ijtimoiy':
        return <GlobeAltIcon className="h-6 w-6 text-purple-600" />;
      case 'til':
        return <BookOpenIcon className="h-6 w-6 text-orange-600" />;
      case 'ijodiy':
        return <AcademicCapIcon className="h-6 w-6 text-pink-600" />;
      default:
        return <AcademicCapIcon className="h-6 w-6 text-gray-600" />;
    }
  };

  const getCategoryName = (category: string): string => {
    switch (category) {
      case 'matematika':
        return 'Matematika';
      case 'tabiiy':
        return 'Tabiiy fanlar';
      case 'ijtimoiy':
        return 'Ijtimoiy fanlar';
      case 'til':
        return 'Tillar';
      case 'ijodiy':
        return 'Ijodiy fanlar';
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'matematika':
        return 'bg-blue-100 text-blue-800';
      case 'tabiiy':
        return 'bg-green-100 text-green-800';
      case 'ijtimoiy':
        return 'bg-purple-100 text-purple-800';
      case 'til':
        return 'bg-orange-100 text-orange-800';
      case 'ijodiy':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [
    { id: 'all', name: 'Barcha fanlar', count: allSubjects.length },
    { id: 'matematika', name: 'Matematika', count: allSubjects.filter(s => s.category === 'matematika').length },
    { id: 'tabiiy', name: 'Tabiiy fanlar', count: allSubjects.filter(s => s.category === 'tabiiy').length },
    { id: 'ijtimoiy', name: 'Ijtimoiy fanlar', count: allSubjects.filter(s => s.category === 'ijtimoiy').length },
    { id: 'til', name: 'Tillar', count: allSubjects.filter(s => s.category === 'til').length },
    { id: 'ijodiy', name: 'Ijodiy fanlar', count: allSubjects.filter(s => s.category === 'ijodiy').length }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Fanlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Kirish fanlari
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            O'zbekiston oliy ta'lim muassasalariga kirish uchun kerakli fanlar va ular haqida ma'lumot
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Fan nomi yoki kodi bo'yicha qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                Filtrlarni tozalash
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm sm:text-base text-gray-600">
            {filteredSubjects.length} ta fan topildi
          </p>
        </div>

        {/* Subjects Grid */}
        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredSubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-2">
                        {getCategoryIcon(subject.category)}
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 ml-3 group-hover:text-blue-600 transition-colors truncate">
                          {subject.nameUz}
                        </h3>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <span className="text-sm font-medium">{subject.code}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${getCategoryColor(subject.category)}`}>
                      {getCategoryName(subject.category)}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {subject.descriptionUz}
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <ChartBarIcon className="h-4 w-4 mr-1 sm:mr-2 text-blue-500 flex-shrink-0" />
                      <span className="truncate">Maksimal ball: {subject.maxScore}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <ClockIcon className="h-4 w-4 mr-1 sm:mr-2 text-green-500 flex-shrink-0" />
                      <span className="truncate">{subject.duration} daqiqa</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <QuestionMarkCircleIcon className="h-4 w-4 mr-1 sm:mr-2 text-purple-500 flex-shrink-0" />
                      <span className="truncate">{subject.questionsCount} savol</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <AcademicCapIcon className="h-4 w-4 mr-1 sm:mr-2 text-orange-500 flex-shrink-0" />
                      <span className="truncate">{subject.topicsUz.length} mavzu</span>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Asosiy mavzular</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {subject.topicsUz.slice(0, 3).map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {topic}
                        </span>
                      ))}
                      {subject.topicsUz.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                          +{subject.topicsUz.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link to={`/subjects/${subject.id}`} className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-sm sm:text-base">
                    Testni boshlash
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MagnifyingGlassIcon className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Hech qanday fan topilmadi
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

export default Subjects;
