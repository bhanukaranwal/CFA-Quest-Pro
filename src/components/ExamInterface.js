import React, { useState, useEffect, useContext } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock, FaFlag, FaStickyNote, FaCalculator, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import questionsData from '../data/questions.json';
import topicsData from '../data/topics.json';
import StickyNote from './StickyNote';
import Calculator from './Calculator';

function ExamInterface({ reviewQuestions = null, reviewTitle = "Review Session" }) {
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

  // State for new tools
  const [showStickyNote, setShowStickyNote] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

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
    setUserAnswers(prev => ({ ...prev, [questionId]: { ...prev[questionId], answer: selectedOption } }));
  };

  const handleConfidenceSelect = (questionId, confidence) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: { ...prev[questionId], confidence } }));
  };

  const handleMarkForReview = (questionId) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: { ...prev[questionId], markedForReview: !prev[questionId]?.markedForReview } }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleShowResults = () => {
    const score = examQuestions.reduce((acc, q) => userAnswers[q.id]?.answer === q.correctAnswer ? acc + 1 : acc, 0);
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
    // ... (Setup and Results JSX remains the same)
    return <div>...</div>
  }

  const currentQuestion = examQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / examQuestions.length) * 100;

  return (
    <div className="container mx-auto max-w-4xl p-6 sm:p-8 mt-10 relative">
      <StickyNote isVisible={showStickyNote} onClose={() => setShowStickyNote(false)} />
      <Calculator isVisible={showCalculator} onClose={() => setShowCalculator(false)} />

      <div className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Question {currentQuestionIndex + 1} of {examQuestions.length}</h2>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowStickyNote(p => !p)} className="tool-btn"><FaStickyNote /></button>
            <button onClick={() => setShowCalculator(p => !p)} className="tool-btn"><FaCalculator /></button>
            <div className="flex items-center text-lg font-semibold text-danger"><FaClock className="mr-2" /><span>{Math.floor(timeLeft / 60)}:{('0' + timeLeft % 60).slice(-2)}</span></div>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6"><motion.div className="bg-accent h-2.5 rounded-full" animate={{ width: `${progress}%` }} /></div>
        
        <AnimatePresence mode="wait">
          <motion.div key={currentQuestion.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
            <p className="text-lg font-semibold my-6">{currentQuestion.question}</p>
            <div className="space-y-3">
              {currentQuestion.options.map(option => (
                <button key={option} onClick={() => handleAnswerSelect(currentQuestion.id, option)} className={`option-btn ${userAnswers[currentQuestion.id]?.answer === option ? 'option-btn-selected' : ''}`}>{option}</button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Confidence:</span>
            {['Low', 'Medium', 'High'].map(level => (
              <button key={level} onClick={() => handleConfidenceSelect(currentQuestion.id, level)} className={`confidence-btn ${userAnswers[currentQuestion.id]?.confidence === level ? 'confidence-btn-selected' : ''}`}>{level}</button>
            ))}
          </div>
          <button onClick={() => handleMarkForReview(currentQuestion.id)} className={`review-btn ${userAnswers[currentQuestion.id]?.markedForReview ? 'review-btn-marked' : ''}`}><FaFlag /><span>Mark for Review</span></button>
        </div>

        <div className="flex justify-between mt-8 border-t dark:border-gray-700 pt-6">
          <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className="nav-btn disabled:opacity-50"><FaArrowLeft className="mr-2" /> Previous</button>
          {currentQuestionIndex < examQuestions.length - 1 ? (
            <button onClick={handleNextQuestion} className="nav-btn bg-primary text-white"><FaArrowRight className="mr-2" /> Next</button>
          ) : (
            <button onClick={handleShowResults} className="nav-btn bg-success text-white">Finish Exam</button>
          )}
        </div>
      </div>
    </div>
  );
}

// Add these utility classes to src/index.css for the new buttons
/*
@layer components {
  .tool-btn { @apply text-text-secondary dark:text-dark-text-secondary hover:text-accent dark:hover:text-dark-accent transition-colors; }
  .option-btn { @apply block w-full text-left p-4 rounded-lg border-2 transition duration-200 bg-background dark:bg-dark-background hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600; }
  .option-btn-selected { @apply bg-teal-100 dark:bg-teal-900 border-accent dark:border-dark-accent font-semibold; }
  .confidence-btn { @apply px-3 py-1 text-xs font-bold rounded-full transition-colors bg-gray-200 dark:bg-gray-700 text-text-secondary dark:text-dark-text-secondary; }
  .confidence-btn-selected { @apply bg-primary text-white; }
  .review-btn { @apply flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-text-secondary dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700; }
  .review-btn-marked { @apply bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200; }
  .nav-btn { @apply flex items-center px-6 py-2 rounded-lg font-bold transition-colors border-2 border-transparent; }
}
*/

export default ExamInterface;
