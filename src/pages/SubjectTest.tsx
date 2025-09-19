import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, ChevronLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { subjects } from '../data/subjects';
import { testQuestions } from '../data/testQuestions';
import { TestQuestion } from '../types';

const SubjectTest: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const subject = useMemo(() => subjects.find(s => s.id === id), [id]);
  const questions: TestQuestion[] = useMemo(
    () => testQuestions.filter(q => q.subjectId === id),
    [id]
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h1 className="text-2xl font-bold mb-2">Fan topilmadi</h1>
            <p className="text-gray-600 mb-4">So'ralgan fan mavjud emas.</p>
            <Link to="/subjects" className="text-blue-600 hover:underline">Fanlarga qaytish</Link>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h1 className="text-2xl font-bold mb-2">Savollar mavjud emas</h1>
            <p className="text-gray-600 mb-4">"{subject.nameUz}" fani uchun hozircha savollar kiritilmagan.</p>
            <Link to="/subjects" className="text-blue-600 hover:underline">Fanlarga qaytish</Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const onAnswer = (idx: number) => {
    const next = [...answers];
    next[currentQuestionIndex] = idx;
    setAnswers(next);
  };

  const onNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const onPrev = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const correctCount = useMemo(() => {
    return answers.reduce((acc, ans, i) => acc + (ans === questions[i]?.correctAnswer ? 1 : 0), 0);
  }, [answers, questions]);

  if (completed) {
    const percentage = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow p-8 text-center">
            <CheckCircleIcon className="h-14 w-14 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Natijalar</h1>
            <p className="text-gray-700 mb-4">Fan: {subject.nameUz}</p>
            <div className="text-3xl font-bold text-blue-600 mb-2">{correctCount} / {questions.length}</div>
            <div className="text-gray-600 mb-6">{percentage}%</div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setCompleted(false); setCurrentQuestionIndex(0); setAnswers([]); }} className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">Qayta ishlash</button>
              <Link to="/subjects" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700">Fanlarga qaytish</Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">{subject.nameUz} testi</h1>
          <p className="text-gray-600">Savol {currentQuestionIndex + 1} / {questions.length}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentQuestion.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">{currentQuestion.questionUz}</h2>
            <div className="space-y-3">
              {currentQuestion.optionsUz.map((opt, idx) => (
                <button key={idx} onClick={() => onAnswer(idx)} className={`w-full text-left p-3 rounded-lg border-2 transition ${answers[currentQuestionIndex] === idx ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between">
          <button onClick={onPrev} disabled={currentQuestionIndex === 0} className={`flex items-center px-5 py-2 rounded-lg ${currentQuestionIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 shadow'}`}>
            <ChevronLeftIcon className="h-5 w-5 mr-2" /> Oldingi
          </button>
          <button onClick={onNext} disabled={answers[currentQuestionIndex] === undefined} className={`flex items-center px-5 py-2 rounded-lg ${answers[currentQuestionIndex] === undefined ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow'}`}>
            {currentQuestionIndex === questions.length - 1 ? 'Yakunlash' : 'Keyingi'} <ChevronRightIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectTest;


