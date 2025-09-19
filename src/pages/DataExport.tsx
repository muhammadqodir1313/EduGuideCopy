import React from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentArrowDownIcon, 
  TableCellsIcon,
  DocumentTextIcon,
  ArchiveBoxIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { 
  downloadUniversities, 
  downloadDirections, 
  downloadCompleteDataset 
} from '../utils/dataExport';

const DataExport: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Ma'lumotlarni yuklab olish
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            EduGuide platformasidagi barcha ma'lumotlarni JSON yoki CSV formatida yuklab oling
          </p>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-8"
        >
          <div className="flex items-start">
            <InformationCircleIcon className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Ma'lumotlar haqida
              </h3>
              <p className="text-sm sm:text-base text-blue-800">
                Bu ma'lumotlar namuna sifatida yaratilgan va O'zbekistondagi haqiqiy universitetlar va yo'nalishlar asosida tuzilgan. 
                Haqiqiy ma'lumotlar uchun O'zTA yoki universitetlar rasmiy saytlariga murojaat qiling.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Download Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Complete Dataset */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <ArchiveBoxIcon className="h-8 w-8 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">To'liq ma'lumotlar</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Barcha universitetlar, yo'nalishlar va qabul statistikasi
            </p>
            <button
              onClick={downloadCompleteDataset}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium text-sm"
            >
              <DocumentArrowDownIcon className="h-4 w-4 inline mr-2" />
              JSON formatda yuklab olish
            </button>
          </motion.div>

          {/* Universities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Universitetlar</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Barcha universitetlar haqida ma'lumot
            </p>
            <div className="space-y-2">
              <button
                onClick={downloadUniversities}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                <DocumentArrowDownIcon className="h-4 w-4 inline mr-2" />
                JSON & CSV
              </button>
            </div>
          </motion.div>

          {/* Directions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <TableCellsIcon className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Yo'nalishlar</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Barcha ta'lim yo'nalishlari
            </p>
            <div className="space-y-2">
              <button
                onClick={downloadDirections}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
              >
                <DocumentArrowDownIcon className="h-4 w-4 inline mr-2" />
                JSON & CSV
              </button>
            </div>
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ma'lumotlar statistikasi</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-gray-600">Universitet</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">6</div>
              <div className="text-sm text-gray-600">Yo'nalish</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">Statistika</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">Format</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataExport;
