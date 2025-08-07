import React, { useState, useEffect } from 'react';
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
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-xl mt-10 max-w-2xl">
        <h2 className="text-3xl font-bold text-text-dark mb-6">Setup Your Exam</h2>
        <div className="mb-4">
          <label className="block text-text-light font-semibold mb-2">CFA Level:</label>
          <select onChange={(e) => setLevel(e.target.value)} value={level} className="w-full border p-2 rounded-lg">
            <option>Level I</option>
            <option>Level II</option>
            <option>Level III</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-text-light font-semibold mb-2">Topic:</label>
          <select onChange={(e) => setTopic(e.target.value)} value={topic} className="w-full border p-2 rounded-lg">
            <option>All</option>
            <option>Ethics</option>
            <option>Quantitative Methods</option>
            <option>Equity Valuation</option>
            <option>Portfolio Management</option>
          </select>
        </div>
        <button onClick={startExam} className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
          Start Exam
        </button>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-xl mt-10 max-w-4xl">
        <h2 className="text-3xl font-bold text-text-dark mb-4">Exam Results</h2>
        <p className="text-xl text-text-light mb-6">Your Score: {score} / {filteredQuestions.length}</p>
        {filteredQuestions.map(q => (
          <div key={q.id} className={`p-4 mb-4 border-l-4 rounded-r-lg ${userAnswers[q.id] === q.correctAnswer ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
            <p className="font-semibold text-text-dark">{q.question}</p>
            <p className="mt-2">Your answer: <span className="font-medium">{userAnswers[q.id] || "Not Answered"}</span></p>
            <p>Correct answer: <span className="font-medium">{q.correctAnswer}</span></p>
            <p className="mt-2 text-sm text-text-light italic">{q.explanation}</p>
          </div>
        ))}
         <button onClick={() => { setShowResults(false); setExamStarted(false); }} className="mt-6 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
          Take Another Exam
        </button>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-xl mt-10 max-w-4xl">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-text-dark">Question {currentQuestionIndex + 1} of {filteredQuestions.length}</h2>
            <div className="text-lg font-semibold text-primary">
                Time Left: {Math.floor(timeLeft / 60)}:{('0' + timeLeft % 60).slice(-2)}
            </div>
        </div>
        <div className="bg-secondary p-6 rounded-lg">
            <p className="text-lg font-semibold text-text-dark mb-4">{currentQuestion.question}</p>
            <div>
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                        className={`block w-full text-left p-3 my-2 rounded-lg border-2 transition duration-200 ${userAnswers[currentQuestion.id] === option ? 'bg-blue-200 border-primary' : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
        <div className="flex justify-end mt-6">
            <button onClick={handleNextQuestion} className="bg-primary text-white font-bold py-2 px-8 rounded-lg hover:bg-blue-700 transition duration-300">
                {currentQuestionIndex < filteredQuestions.length - 1 ? 'Next' : 'Finish'}
            </button>
        </div>
    </div>
  );
}

export default ExamInterface;
