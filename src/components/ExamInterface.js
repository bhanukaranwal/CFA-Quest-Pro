import React, { useState, useEffect, useContext } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock, FaFlag } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import questionsData from '../data/questions.json';
import topicsData from '../data/topics.json';

function ExamInterface({ reviewQuestions = null, reviewTitle = "Review Session" }) {
  // FIX: Added 'examHistory' to the context import
  const { addExamResult, examHistory } = useContext(AppContext);

  // State for exam configuration
  const [level, setLevel] = useState('Level I');
  const [topic, setTopic] = useState('All');
  const [subtopic, setSubtopic] = useState('All');
  const [numQuestions, setNumQuestions] = useState(10);
  const [availableSubtopics, setAvailableSubtopics] = useState([]);
  
  // State for active exam session
  const [examQuestions, setExamQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [examStarted, setExamStarted] = useState(false);

  // Update available subtopics when a main topic is selected
  useEffect(() => {
    if (topic === 'All') {
      setAvailableSubtopics([]);
      setSubtopic('All');
    } else {
      const selectedTopic = topicsData.find(t => t.name === topic);
      setAvailableSubtopics(selectedTopic ? selectedTopic.subtopics : []);
      setSubtopic('All');
    }
  }, [topic]);

  // Timer logic
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
    let questions;
    if (reviewQuestions) {
      questions = reviewQuestions;
    } else {
      questions = questionsData
        .filter(q => 
          (level === 'All' || q.level === level) && 
          (topic === 'All' || q.topic === topic) &&
          (subtopic === 'All' || q.subtopic === subtopic)
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, numQuestions);
    }
    
    setExamQuestions(questions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setTimeLeft(questions.length * 90);
    setExamStarted(true);
  };

  const handleAnswerSelect = (questionId, selectedOption) => {
    setUserAnswers(prev => ({ 
      ...prev, 
      [questionId]: { ...prev[questionId], answer: selectedOption }
    }));
  };

  const handleConfidenceSelect = (questionId, confidence) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], confidence }
    }));
  };

  const handleMarkForReview = (questionId) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], markedForReview: !prev[questionId]?.markedForReview }
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleShowResults();
    }
  };
  
  const handleShowResults = () => {
    const score = examQuestions.reduce((acc, q) => {
      return userAnswers[q.id]?.answer === q.correctAnswer ? acc + 1 : acc;
    }, 0);
    
    const result = {
      score,
      total: examQuestions.length,
      percentage: (score / examQuestions.length) * 100,
      topic: reviewQuestions ? reviewTitle : topic,
      level: reviewQuestions ? "" : level,
      answeredQuestions: examQuestions.map(q => ({
        ...q,
        userAnswer: userAnswers[q.id]?.answer || "Not Answered",
        isCorrect: userAnswers[q.id]?.answer === q.correctAnswer,
        confidence: userAnswers[q.id]?.confidence || 'Not Set',
        markedForReview: userAnswers[q.id]?.markedForReview || false,
      }))
    };
    
    addExamResult(result);
    setShowResults(true);
    setExamStarted(false);
  };

  if (!examStarted) {
    if (showResults) {
      const { score, total, percentage, answeredQuestions } = examHistory[examHistory.length - 1];
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto max-w-4xl p-6 sm:p-8 mt-10">
          <div className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-4 text-center">Exam Results</h2>
            <div className="text-center mb-8 p-6 bg-background dark:bg-dark-background rounded-lg">
              <p className="text-xl text-text-secondary dark:text-dark-text-secondary">Your Score</p>
              <p className={`text-5xl font-extrabold ${percentage >= 70 ? 'text-success' : 'text-danger'}`}>{percentage.toFixed(1)}%</p>
              <p className="text-text-secondary dark:text-dark-text-secondary mt-2">({score} out of {total} correct)</p>
            </div>
            <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Mistake Review</h3>
            <div className="space-y-6">
              {answeredQuestions.filter(q => !q.isCorrect).map(q => (
                <div key={q.id} className="p-4 rounded-lg border-l-4 border-danger bg-red-50 dark:bg-opacity-10">
                  <p className="font-semibold text-text-primary dark:text-dark-text-primary">{q.question}</p>
                  <p className="mt-2 font-medium flex items-center text-red-800 dark:text-danger"><FaTimesCircle className="mr-2" />Your answer: {q.userAnswer}</p>
                  <p className="mt-1 font-medium text-green-800 dark:text-success flex items-center"><FaCheckCircle className="mr-2" />Correct answer: {q.correctAnswer}</p>
                  <p className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary italic bg-gray-100 dark:bg-dark-surface p-2 rounded">{q.explanation}</p>
                </div>
              ))}
            </div>
            <button onClick={() => { setShowResults(false); setExamStarted(false); }} className="w-full mt-8 bg-primary dark:bg-dark-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-hover dark:hover:bg-dark-primary-hover transition duration-300">
              Back to Exam Setup
            </button>
          </div>
        </motion.div>
      );
    }

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
                {topicsData.map(t => <option key={t.name}>{t.name}</option>)}
              </select>
            </div>
            {availableSubtopics.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">Sub-Topic:</label>
                <select onChange={(e) => setSubtopic(e.target.value)} value={subtopic} className="w-full border-gray-300 dark:border-gray-600 bg-background dark:bg-dark-background p-3 rounded-lg shadow-sm focus:ring-accent focus:border-accent">
                  <option>All</option>
                  {availableSubtopics.map(st => <option key={st}>{st}</option>)}
                </select>
              </div>
            )}
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

  const currentQuestion = examQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / examQuestions.length) * 100;

  return (
    <div className="container mx-auto max-w-4xl p-6 sm:p-8 mt-10">
      <div className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">Question {currentQuestionIndex + 1} <span className="text-text-secondary dark:text-dark-text-secondary font-normal">of {examQuestions.length}</span></h2>
            <div className="flex items-center text-lg font-semibold text-danger">
              <FaClock className="mr-2" />
              <span>{Math.floor(timeLeft / 60)}:{('0' + timeLeft % 60).slice(-2)}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <motion.div 
              className="bg-accent h-2.5 rounded-full" 
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg font-semibold text-text-primary dark:text-dark-text-primary my-6 leading-relaxed">{currentQuestion.question}</p>
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                  className={`block w-full text-left p-4 rounded-lg border-2 transition duration-200 ${userAnswers[currentQuestion.id]?.answer === option ? 'bg-teal-100 dark:bg-teal-900 border-accent font-semibold' : 'bg-background dark:bg-dark-background hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Confidence:</span>
            {['Low', 'Medium', 'High'].map(level => (
              <button 
                key={level}
                onClick={() => handleConfidenceSelect(currentQuestion.id, level)}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${userAnswers[currentQuestion.id]?.confidence === level ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-text-secondary dark:text-dark-text-secondary'}`}
              >
                {level}
              </button>
            ))}
          </div>
          <button onClick={() => handleMarkForReview(currentQuestion.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${userAnswers[currentQuestion.id]?.markedForReview ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 'text-text-secondary dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            <FaFlag className={userAnswers[currentQuestion.id]?.markedForReview ? 'text-yellow-500' : ''} />
            <span>Mark for Review</span>
          </button>
        </div>

        <div className="flex justify-end mt-8">
          <button onClick={handleNextQuestion} className="bg-primary dark:bg-dark-primary text-white font-bold py-2 px-10 rounded-lg hover:bg-primary-hover dark:hover:bg-dark-primary-hover transition duration-300 shadow-md">
            {currentQuestionIndex < examQuestions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamInterface;
