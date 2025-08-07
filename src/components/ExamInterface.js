import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import questionsData from '../data/questions.json';

function ExamInterface() {
  const [level, setLevel] = useState('Level I');
  const [topic, setTopic] = useState('All');
  const [numQuestions, setNumQuestions] = useState(10);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    let timer;
    if (examStarted && timeLeft > 0 && !showResults) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && examStarted) {
      handleShowResults();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, examStarted, showResults]);

  const startExam = () => {
    const questions = questionsData
      .filter(q => (level === 'All' || q.level === level) && (topic === 'All' || q.topic === topic))
      .sort(() => 0.5 - Math.random()) // Shuffle questions
      .slice(0, numQuestions);
    
    setFilteredQuestions(questions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setTimeLeft(questions.length * 90); // 1.5 minutes per question
    setExamStarted(true);
  };

  const handleAnswerSelect = (questionId, selectedOption) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleShowResults();
    }
  };
  
  const handleShowResults = () => {
      setShowResults(true);
      setExamStarted(false);
  }

  const calculateScore = () => {
    return filteredQuestions.reduce((score, q) => {
      return userAnswers[q.id] === q.correctAnswer ? score + 1 : score;
    }, 0);
  };

  if (!examStarted && !showResults) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto max-w-2xl p-6 sm:p-8 mt-10">
        <div className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2 text-center">Configure Your Practice Exam</h2>
          <p className="text-center text-text-secondary dark:text-dark-text-secondary mb-8">Customize your session to focus on what matters most.</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">CFA Level:</label>
              <select onChange={(e) => setLevel(e.target.value)} value={level} className="w-full border-gray-300 dark:border-gray-600 bg-background dark:bg-dark-background p-3 rounded-lg shadow-sm focus:ring-accent focus:border-accent">
                <option>Level I</option>
                <option>Level II</option>
                <option>Level III</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">Topic:</label>
              <select onChange={(e) => setTopic(e.target.value)} value={topic} className="w-full border-gray-300 dark:border-gray-600 bg-background dark:bg-dark-background p-3 rounded-lg shadow-sm focus:ring-accent focus:border-accent">
                <option>All</option>
                <option>Ethics</option>
                <option>Quantitative Methods</option>
                <option>Economics</option>
                <option>Financial Statement Analysis</option>
                <option>Equity Investments</option>
                <option>Fixed Income</option>
                <option>Derivatives</option>
                <option>Alternative Investments</option>
                <option>Portfolio Management</option>
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">Number of Questions: {numQuestions}</label>
              <input type="range" min="5" max="50" step="5" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-accent" />
            </div>
          </div>
          <button onClick={startExam} className="w-full mt-8 bg-accent dark:bg-dark-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-hover dark:hover:bg-dark-accent-hover transition duration-300 transform hover:scale-105 shadow-md">
            Start Exam
          </button>
        </div>
      </motion.div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / filteredQuestions.length * 100);
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto max-w-4xl p-6 sm:p-8 mt-10">
        <div className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-4 text-center">Exam Results</h2>
          <div className="text-center mb-8 p-6 bg-background dark:bg-dark-background rounded-lg">
            <p className="text-xl text-text-secondary dark:text-dark-text-secondary">Your Score</p>
            <p className={`text-5xl font-extrabold ${percentage >= 70 ? 'text-success' : 'text-danger'}`}>{percentage.toFixed(1)}%</p>
            <p className="text-text-secondary dark:text-dark-text-secondary mt-2">({score} out of {filteredQuestions.length} correct)</p>
          </div>
          <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Mistake Review</h3>
          <div className="space-y-6">
            {filteredQuestions.map(q => {
              const userAnswer = userAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              if (isCorrect) return null; // Only show incorrect answers
              return (
                <div key={q.id} className="p-4 rounded-lg border-l-4 border-danger bg-red-50 dark:bg-opacity-10">
                  <p className="font-semibold text-text-primary dark:text-dark-text-primary">{q.question}</p>
                  <p className="mt-2 font-medium flex items-center text-red-800 dark:text-danger">
                    <FaTimesCircle className="mr-2" />
                    Your answer: {userAnswer || "Not Answered"}
                  </p>
                  <p className="mt-1 font-medium text-green-800 dark:text-success flex items-center"><FaCheckCircle className="mr-2" />Correct answer: {q.correctAnswer}</p>
                  <p className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary italic bg-gray-100 dark:bg-dark-surface p-2 rounded">{q.explanation}</p>
                </div>
              );
            })}
          </div>
          <button onClick={() => { setShowResults(false); setExamStarted(false); }} className="w-full mt-8 bg-primary dark:bg-dark-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-hover dark:hover:bg-dark-primary-hover transition duration-300">
            Take Another Exam
          </button>
        </div>
      </motion.div>
    );
  }
  
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;

  return (
    <div className="container mx-auto max-w-4xl p-6 sm:p-8 mt-10">
      <div className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">Question {currentQuestionIndex + 1} <span className="text-text-secondary dark:text-dark-text-secondary font-normal">of {filteredQuestions.length}</span></h2>
            <div className="flex items-center text-lg font-semibold text-danger">
              <FaClock className="mr-2" />
              <span>{Math.floor(timeLeft / 60)}:{('0' + timeLeft % 60).slice(-2)}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <motion.div 
              className="bg-accent h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
              initial={{ width: `${(currentQuestionIndex / filteredQuestions.length) * 100}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg font-semibold text-text-primary dark:text-dark-text-primary my-6 leading-relaxed">{currentQuestion.question}</p>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                  className={`block w-full text-left p-4 rounded-lg border-2 transition duration-200 text-text-primary dark:text-dark-text-primary ${userAnswers[currentQuestion.id] === option ? 'bg-teal-100 dark:bg-teal-900 border-accent dark:border-dark-accent font-semibold' : 'bg-background dark:bg-dark-background hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end mt-8">
          <button onClick={handleNextQuestion} className="bg-primary dark:bg-dark-primary text-white font-bold py-2 px-10 rounded-lg hover:bg-primary-hover dark:hover:bg-dark-primary-hover transition duration-300 shadow-md">
            {currentQuestionIndex < filteredQuestions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamInterface;
