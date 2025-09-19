import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  UserGroupIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { admissionStats } from '../data/admissionStats';
import { directions } from '../data/directions';
import { universities } from '../data/universities';

const Statistics: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedDirection, setSelectedDirection] = useState('');

  const years = [...new Set(admissionStats.map(stat => stat.year))].sort((a, b) => b - a);
  
  const filteredStats = admissionStats.filter(stat => 
    stat.year === selectedYear && 
    (!selectedDirection || stat.directionId === selectedDirection)
  );

  const totalStats = {
    totalGrant: filteredStats.reduce((sum, stat) => sum + stat.grantPlaces, 0),
    totalContract: filteredStats.reduce((sum, stat) => sum + stat.contractPlaces, 0),
    totalApplicants: filteredStats.reduce((sum, stat) => sum + stat.applicants, 0),
    avgCompetition: filteredStats.length > 0 
      ? filteredStats.reduce((sum, stat) => sum + stat.competition, 0) / filteredStats.length 
      : 0
  };

  const getDirectionName = (directionId: string) => {
    const direction = directions.find(d => d.id === directionId);
    return direction ? direction.nameUz : 'Noma\'lum';
  };

  const getUniversityName = (directionId: string) => {
    const direction = directions.find(d => d.id === directionId);
    if (!direction) return 'Noma\'lum';
    const university = universities.find(u => u.id === direction.universityId);
    return university ? university.nameUz : 'Noma\'lum';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Qabul statistikasi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            O'zbekiston oliy ta'lim muassasalarining qabul statistikasi va tahlili
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yil
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}-yil
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yo'nalish
              </label>
              <select
                value={selectedDirection}
                onChange={(e) => setSelectedDirection(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Barcha yo'nalishlar</option>
                {directions.map(direction => (
                  <option key={direction.id} value={direction.id}>
                    {direction.nameUz}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-center sm:justify-start">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <AcademicCapIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4 text-center sm:text-left">
                <p className="text-sm text-gray-600">Grant o'rinlari</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalGrant}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-center sm:justify-start">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4 text-center sm:text-left">
                <p className="text-sm text-gray-600">Kontrakt o'rinlari</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalContract}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-center sm:justify-start">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4 text-center sm:text-left">
                <p className="text-sm text-gray-600">Jami abituriyentlar</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalApplicants}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-center sm:justify-start">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ArrowTrendingUpIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4 text-center sm:text-left">
                <p className="text-sm text-gray-600">O'rtacha raqobat</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.avgCompetition.toFixed(1)}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Statistics Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Batafsil statistika - {selectedYear}-yil
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yo'nalish
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Universitet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kontrakt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grant ball
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kontrakt ball
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Abituriyentlar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Raqobat
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStats.map((stat, index) => (
                  <motion.tr
                    key={`${stat.directionId}-${stat.year}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getDirectionName(stat.directionId)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {getUniversityName(stat.directionId)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {stat.grantPlaces}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {stat.contractPlaces}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stat.grantMinScore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stat.contractMinScore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stat.applicants}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        stat.competition >= 4 
                          ? 'bg-red-100 text-red-800' 
                          : stat.competition >= 3 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {stat.competition}:1
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStats.length === 0 && (
            <div className="text-center py-12">
              <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ma'lumot topilmadi
              </h3>
              <p className="text-gray-600">
                Tanlangan filtrlar bo'yicha statistika mavjud emas
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;