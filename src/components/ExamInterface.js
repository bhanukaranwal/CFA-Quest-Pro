import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import questionsData from '../data/questions.json';

function ExamInterface() {
  const [level, setLevel] = useState('Level I');
  const [topic, setTopic] = useState('All');
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
    const questions = questionsData.filter(q => 
        (level === 'All' || q.level === level) && 
        (topic === 'All' || q.topic === topic)
    );
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
      <div className="container mx-auto max-w-2xl p-6 sm:p-8 mt-10">
        <div className="bg-surface p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-text-primary mb-2 text-center">Configure Your Practice Exam</h2>
          <p className="text-center text-text-secondary mb-8">Select your level and topic to begin.</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">CFA Level:</label>
              <select onChange={(e) => setLevel(e.target.value)} value={level} className="w-full border-gray-300 p-3 rounded-lg shadow-sm focus:ring-accent focus:border-accent">
                <option>Level I</option>
                <option>Level II</option>
                <option>Level III</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Topic:</label>
              <select onChange={(e) => setTopic(e.target.value)} value={topic} className="w-full border-gray-300 p-3 rounded-lg shadow-sm focus:ring-accent focus:border-accent">
                <option>All</option>
                <option>Ethics</option>
                <option>Quantitative Methods</option>
                <option>Equity Valuation</option>
                <option>Portfolio Management</option>
              </select>
            </div>
          </div>
          <button onClick={startExam} className="w-full mt-8 bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-hover transition duration-300 transform hover:scale-105 shadow-md">
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / filteredQuestions.length * 100).toFixed(2);
    return (
      <div className="container mx-auto max-w-4xl p-6 sm:p-8 mt-10">
        <div className="bg-surface p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-text-primary mb-4 text-center">Exam Results</h2>
          <div className="text-center mb-8 p-6 bg-background rounded-lg">
            <p className="text-xl text-text-secondary">Your Score</p>
            <p className={`text-5xl font-extrabold ${percentage >= 70 ? 'text-success' : 'text-danger'}`}>{percentage}%</p>
            <p className="text-text-secondary mt-2">({score} out of {filteredQuestions.length} correct)</p>
          </div>
          <div className="space-y-6">
            {filteredQuestions.map(q => {
              const userAnswer = userAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={q.id} className={`p-4 rounded-lg border-l-4 ${isCorrect ? 'border-success bg-green-50' : 'border-danger bg-red-50'}`}>
                  <p className="font-semibold text-text-primary">{q.question}</p>
                  <p className={`mt-2 font-medium flex items-center ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
                    Your answer: {userAnswer || "Not Answered"}
                  </p>
                  {!isCorrect && <p className="mt-1 font-medium text-green-800 flex items-center"><FaCheckCircle className="mr-2" />Correct answer: {q.correctAnswer}</p>}
                  <p className="mt-3 text-sm text-text-secondary italic bg-gray-100 p-2 rounded">{q.explanation}</p>
                </div>
              );
            })}
          </div>
          <button onClick={() => { setShowResults(false); setExamStarted(false); }} className="w-full mt-8 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-hover transition duration-300">
            Take Another Exam
          </button>
        </div>
      </div>
    );
  }
  
  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <div className="container mx-auto max-w-4xl p-6 sm:p-8 mt-10">
      <div className="bg-surface p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-bold text-text-primary">Question {currentQuestionIndex + 1} <span className="text-text-secondary font-normal">of {filteredQuestions.length}</span></h2>
          <div className="flex items-center text-lg font-semibold text-danger">
            <FaClock className="mr-2" />
            <span>{Math.floor(timeLeft / 60)}:{('0' + timeLeft % 60).slice(-2)}</span>
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold text-text-primary mb-6 leading-relaxed">{currentQuestion.question}</p>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                className={`block w-full text-left p-4 rounded-lg border-2 transition duration-200 text-text-primary ${userAnswers[currentQuestion.id] === option ? 'bg-teal-100 border-accent font-semibold' : 'bg-background hover:bg-gray-200 border-gray-200'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button onClick={handleNextQuestion} className="bg-primary text-white font-bold py-2 px-10 rounded-lg hover:bg-primary-hover transition duration-300 shadow-md">
            {currentQuestionIndex < filteredQuestions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamInterface;
