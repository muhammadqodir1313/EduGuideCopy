import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRightIcon, 
  ChevronLeftIcon,
  CheckCircleIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { testQuestions } from '../data/testQuestions';
import { TestResult } from '../types';

const CareerTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    // Simple scoring algorithm
    const categoryScores: { [key: string]: number } = {
      'texnik': 0,
      'ijtimoiy': 0,
      'tabiiy': 0,
      'ijodiy': 0,
      'biznes': 0
    };

    answers.forEach((answer) => {
      if (answer === 0) categoryScores['texnik'] += 2;
      else if (answer === 1) categoryScores['ijtimoiy'] += 2;
      else if (answer === 2) categoryScores['tabiiy'] += 2;
      else if (answer === 3) categoryScores['ijodiy'] += 2;
      else if (answer === 4) categoryScores['biznes'] += 2;
    });

    const results: TestResult[] = Object.entries(categoryScores)
      .map(([category, score]) => ({
        category,
        score,
        recommendations: getRecommendations(category, score)
      }))
      .sort((a, b) => b.score - a.score);

    setTestResults(results);
    setShowResults(true);
  };

  const getRecommendations = (category: string, score: number): string[] => {
    const categoryDirections: { [key: string]: string[] } = {
      'texnik': ['Kompyuter injiniringi', 'Axborot xavfsizligi', 'Dasturiy injiniring'],
      'ijtimoiy': ['Xalqaro munosabatlar', 'Psixologiya', 'Ijtimoiy ish'],
      'tabiiy': ['Tibbiyot', 'Biologiya', 'Kimyo'],
      'ijodiy': ['Dizayn', 'Arxitektura', 'San\'atshunoslik'],
      'biznes': ['Iqtisodiyot', 'Menejment', 'Marketing']
    };

    // Score asosida tavsiyalar sonini boshqarish
    const baseRecommendations = categoryDirections[category] || [];
    if (score >= 8) {
      return baseRecommendations;
    } else if (score >= 6) {
      return baseRecommendations.slice(0, 2);
    } else {
      return baseRecommendations.slice(0, 1);
    }
  };

  const getCategoryName = (category: string): string => {
    const names: { [key: string]: string } = {
      'texnik': 'Texnik yo\'nalishlar',
      'ijtimoiy': 'Ijtimoiy yo\'nalishlar',
      'tabiiy': 'Tabiiy fanlar',
      'ijodiy': 'Ijodiy yo\'nalishlar',
      'biznes': 'Biznes yo\'nalishlar'
    };
    return names[category] || category;
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setTestResults([]);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Test yakunlandi!
              </h1>
              <p className="text-gray-600">
                Sizning natijalaringiz va tavsiyalar
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {testResults.map((result, index) => (
                <motion.div
                  key={result.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {getCategoryName(result.category)}
                    </h3>
                    <div className="text-2xl font-bold text-blue-600">
                      {result.score} ball
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${(result.score / 10) * 100}%` }}
                    />
                  </div>

                  {result.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Tavsiya etilgan yo'nalishlar:</h4>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {result.recommendations.map((rec, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                          >
                            {rec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="text-center space-y-4">
              <div className="bg-blue-50 rounded-lg p-6">
                <LightBulbIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Sizning eng mos yo'nalishingiz
                </h3>
                <p className="text-blue-600 font-medium text-xl">
                  {getCategoryName(testResults[0]?.category)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={restartTest}
                  className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Testni qayta o'tish
                </button>
                <button
                  onClick={() => window.location.href = '/directions'}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Yo'nalishlarni ko'rish
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Yo'nalish tanlash testi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sizning qiziqishlaringiz va qobiliyatlaringizga mos yo'nalishlarni aniqlash uchun testni o'ting
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Savol {currentQuestion + 1} / {testQuestions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentQuestion + 1) / testQuestions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / testQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {testQuestions[currentQuestion]?.questionUz}
            </h2>

            <div className="space-y-4">
              {testQuestions[currentQuestion]?.optionsUz.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQuestion] === index
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      answers[currentQuestion] === index
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQuestion] === index && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className={`flex items-center px-6 py-3 rounded-lg transition-all ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            Oldingi
          </button>

          <button
            onClick={nextQuestion}
            disabled={answers[currentQuestion] === undefined}
            className={`flex items-center px-6 py-3 rounded-lg transition-all ${
              answers[currentQuestion] === undefined
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md'
            }`}
          >
            {currentQuestion === testQuestions.length - 1 ? 'Yakunlash' : 'Keyingi'}
            <ChevronRightIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerTest;