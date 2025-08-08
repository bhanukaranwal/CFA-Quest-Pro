import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaClock, FaFlag, FaStickyNote, FaCalculator, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import questionsData from '../data/questions.json';
import topicsData from '../data/topics.json';
import StickyNote from './StickyNote';
import Calculator from './Calculator';

function ExamInterface({ reviewQuestions = null, reviewTitle = "Review Session" }) {
  const { addExamResult, examHistory } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode') || 'practice'; // Default to practice mode

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

  // Automatically start mock exam if the mode is set
  useEffect(() => {
    if (mode === 'mock') {
      startMockExam();
    }
  }, [mode]);

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

  const startPracticeExam = () => {
    let questions = questionsData
      .filter(q => 
        (level === 'All' || q.level === level) && 
        (topic === 'All' || q.topic === topic) &&
        (subtopic === 'All' || q.subtopic === subtopic)
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, numQuestions);
    
    setupAndStartExam(questions, "Practice Session");
  };

  const startMockExam = () => {
    // A real mock exam would have a fixed set of questions (e.g., 90 for Level I AM session)
    let questions = questionsData
      .filter(q => q.level === level)
      .sort(() => 0.5 - Math.random())
      .slice(0, 45); // Using 45 as a shorter mock for demo
    
    setupAndStartExam(questions, `Level ${level} Mock Exam`);
  };

  const setupAndStartExam = (questions, examTitle) => {
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
      percentage: examQuestions.length > 0 ? (score / examQuestions.length) * 100 : 0,
      topic: mode === 'mock' ? `Level ${level} Mock Exam` : topic,
      level: level,
      answeredQuestions: examQuestions.map(q => ({
        ...q,
        userAnswer: userAnswers[q.id]?.answer || "Not Answered",
        isCorrect: userAnswers[q.id]?.answer === q.correctAnswer,
        confidence: userAnswers[q.id]?.confidence || 'Not Set',
        markedForReview: userAnswers[q.id]?.markedForReview || false,
      }))
    };
    const newExamId = addExamResult(result);
    setShowResults(true);
    setExamStarted(false);
    navigate(`/results/${newExamId}`); // Navigate to the new detailed results page
  };

  // ... The rest of the component remains the same, handling the active exam UI ...
  
  if (examStarted) {
    // ... Active Exam UI ...
    return <div>...</div>
  }

  // Render setup screen for practice mode
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto max-w-2xl p-6 sm:p-8 mt-10">
      <div className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2 text-center">
          {mode === 'mock' ? 'Mock Exam' : 'Practice Session'}
        </h2>
        <p className="text-center text-text-secondary dark:text-dark-text-secondary mb-8">
          {mode === 'mock' ? `This is a timed, full-length mock exam for Level ${level}.` : 'Customize your session to focus on what matters most.'}
        </p>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">CFA Level:</label>
            <select onChange={(e) => setLevel(e.target.value)} value={level} className="w-full border-gray-300 dark:border-gray-600 bg-background dark:bg-dark-background p-3 rounded-lg shadow-sm focus:ring-accent focus:border-accent">
              <option>Level I</option>
              <option>Level II</option>
              <option>Level III</option>
            </select>
          </div>
          {mode === 'practice' && (
            <>
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
            </>
          )}
        </div>
        <button onClick={mode === 'mock' ? startMockExam : startPracticeExam} className="w-full mt-8 bg-accent dark:bg-dark-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-hover dark:hover:bg-dark-accent-hover transition duration-300 transform hover:scale-105 shadow-md">
          {mode === 'mock' ? 'Start Mock Exam' : 'Start Practice Exam'}
        </button>
      </div>
    </motion.div>
  );
}

export default ExamInterface;
