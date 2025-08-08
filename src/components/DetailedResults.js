import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaFlag } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DetailedResults() {
  const { examId } = useParams();
  const { examHistory } = useContext(AppContext);

  const examResult = examHistory.find(exam => exam.id === parseInt(examId));

  if (!examResult) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold">Exam not found.</h2>
        <Link to="/dashboard" className="text-accent dark:text-dark-accent hover:underline mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const { score, total, percentage, answeredQuestions, topic } = examResult;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto max-w-5xl p-6 sm:p-8 mt-10"
    >
      <div className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2 text-center">{topic} Results</h1>
        <p className="text-center text-text-secondary dark:text-dark-text-secondary mb-8">
          Completed on {new Date(examResult.date).toLocaleDateString()}
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1 flex justify-center items-center">
            <div className="w-48 h-48">
              <CircularProgressbar
                value={percentage}
                text={`${percentage.toFixed(1)}%`}
                styles={buildStyles({
                  textColor: percentage >= 70 ? '#2ecc71' : '#e74c3c',
                  pathColor: percentage >= 70 ? '#2ecc71' : '#e74c3c',
                  trailColor: '#d6d6d6',
                })}
              />
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4 content-center">
            <StatCard title="Correct Answers" value={score} />
            <StatCard title="Incorrect Answers" value={total - score} />
            <StatCard title="Total Questions" value={total} />
            <StatCard title="Questions Marked for Review" value={answeredQuestions.filter(q => q.markedForReview).length} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-6">Question-by-Question Review</h2>
        <div className="space-y-6">
          {answeredQuestions.map((q, index) => (
            <div key={q.id} className={`p-4 rounded-lg border-l-4 ${q.isCorrect ? 'border-success' : 'border-danger'} bg-background dark:bg-dark-background`}>
              <div className="flex justify-between items-start">
                <p className="font-semibold text-text-primary dark:text-dark-text-primary">Q{index + 1}: {q.question}</p>
                {q.markedForReview && <FaFlag className="text-warning flex-shrink-0 ml-4" title="Marked for Review" />}
              </div>
              <div className="mt-3 space-y-2">
                <p className={`font-medium flex items-center ${q.isCorrect ? 'text-success' : 'text-danger'}`}>
                  {q.isCorrect ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
                  Your answer: {q.userAnswer}
                </p>
                {!q.isCorrect && (
                  <p className="font-medium flex items-center text-success">
                    <FaCheckCircle className="mr-2" />
                    Correct answer: {q.correctAnswer}
                  </p>
                )}
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary italic bg-gray-100 dark:bg-dark-surface p-2 rounded mt-2">{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const StatCard = ({ title, value }) => (
  <div className="bg-background dark:bg-dark-background p-4 rounded-lg text-center">
    <p className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">{title}</p>
    <p className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mt-1">{value}</p>
  </div>
);

export default DetailedResults;
