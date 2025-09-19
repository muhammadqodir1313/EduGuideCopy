import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  LightBulbIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import DirectionCard from '../components/DirectionCard';
import { directions } from '../data/directions';
import { universities } from '../data/universities';
import { admissionStats } from '../data/admissionStats';

const Home: React.FC = () => {
  const popularDirections = directions.slice(0, 3);

  const features = [
    {
      icon: AcademicCapIcon,
      title: 'Yo\'nalishlar bazasi',
      description: 'Barcha oliy ta\'lim yo\'nalishlari haqida to\'liq ma\'lumot'
    },
    {
      icon: ChartBarIcon,
      title: 'Qabul statistikasi',
      description: 'So\'nggi 3 yillik qabul ballari va kvotalari'
    },
    {
      icon: LightBulbIcon,
      title: 'Shaxsiy tavsiyalar',
      description: 'Sizning qiziqishlaringizga mos yo\'nalishlar'
    },
    {
      icon: UserGroupIcon,
      title: 'Kasbiy yo\'llar',
      description: 'Har bir yo\'nalish bo\'yicha kelajakdagi kasblar'
    }
  ];

  const stats = [
    { number: '500+', label: 'Yo\'nalishlar' },
    { number: '100+', label: 'Universitetlar' },
    { number: '10K+', label: 'Foydalanuvchilar' },
    { number: '95%', label: 'Mamnunlik darajasi' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
            >
              Kelajagingizni{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                to'g'ri yo'nalishda
              </span>{' '}
              boshlang!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              O'zbekiston abituriyentlari uchun oliy ta'lim yo'nalishlarini tanlashda yordam beruvchi platforma. 
              Sizga mos yo'nalishni toping va muvaffaqiyatli kelajak quring!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Link
                to="/test"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center text-sm sm:text-base"
              >
                Yo'nalish testini boshlash
                <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                to="/directions"
                className="border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
              >
                Yo'nalishlarni ko'rish
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Nima uchun EduGuide?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Bizning platformamiz sizga eng yaxshi ta'lim yo'nalishini tanlashda yordam beradi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center sm:text-left"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto sm:mx-0">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Directions */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Mashhur yo'nalishlar
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Eng ko'p qiziqish uyg'otayotgan va yuqori talabga ega bo'lgan yo'nalishlar
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {popularDirections.map((direction, index) => {
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

          <div className="text-center">
            <Link
              to="/directions"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base"
            >
              Barcha yo'nalishlarni ko'rish
              <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                EduGuide bilan nima qilishingiz mumkin?
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {[
                  'Shaxsiy qiziqishlaringizga mos yo\'nalishlarni toping',
                  'Universitetlar va yo\'nalishlar haqida batafsil ma\'lumot oling',
                  'Qabul statistikasi va o\'tish ballarini tahlil qiling',
                  'Kelajakdagi kasbiy imkoniyatlarni o\'rganing',
                  'Yo\'nalish tanlash testini o\'ting va tavsiyalar oling'
                                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students studying"
                className="rounded-xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Kelajagingizni bugun boshlang!
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            EduGuide bilan to'g'ri ta'lim yo'nalishini tanlab, muvaffaqiyatli karerangizni quring
          </p>
          <Link
            to="/test"
            className="inline-flex items-center bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base"
          >
            Bepul testni boshlash
            <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;