import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 sm:col-span-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">E</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold">EduGuide</span>
            </div>
            <p className="text-sm sm:text-base text-gray-300 mb-4 max-w-md mx-auto sm:mx-0">
              O'zbekiston abituriyentlari uchun oliy ta'lim yo'nalishlarini tanlashda yordam beruvchi platforma. 
              Kelajagingizni to'g'ri yo'nalishda boshlang!
            </p>
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297L3.182 17.635l1.044-1.944c-.8-.875-1.297-2.026-1.297-3.323 0-2.734 2.215-4.949 4.949-4.949s4.949 2.215 4.949 4.949-2.215 4.949-4.949 4.949z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Telegram</span>
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Tezkor havolalar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/directions" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">
                  Yo'nalishlar
                </Link>
              </li>
              <li>
                <Link to="/universities" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">
                  Universitetlar
                </Link>
              </li>
              <li>
                <Link to="/test" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">
                  Yo'nalish testi
                </Link>
              </li>
              <li>
                <Link to="/statistics" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">
                  Statistika
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Aloqa</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li>Email: info@eduguide.uz</li>
              <li>Telefon: +998 90 123 45 67</li>
              <li>Manzil: Toshkent, O'zbekiston</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-300">
          <p className="text-sm sm:text-base">&copy; 2025 EduGuide. Barcha huquqlar himoyalangan.</p>
          <p className="mt-2 text-xs sm:text-sm">
            Loyiha muallifi: Muhammadqodir | O'zbekiston yoshlariga yo'nalish tanlashda yordam berish maqsadida yaratilgan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;