import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import ExamInterface from './ExamInterface';
import { motion } from 'framer-motion';
import { FaRedo, FaFlag } from 'react-icons/fa';

function ReviewMode() {
  const { examHistory } = useContext(AppContext);
  const [reviewType, setReviewType] = useState(null); // 'incorrect' or 'marked'
  const [sessionQuestions, setSessionQuestions] = useState([]);

  // Memoize the calculation of reviewable questions to avoid re-calculating on every render.
  const reviewableQuestions = useMemo(() => {
    const incorrect = new Map();
    const marked = new Map();

    // Loop through all past exams to find incorrect or marked questions.
    examHistory.forEach(exam => {
      exam.answeredQuestions.forEach(q => {
        if (!q.isCorrect) {
          // Use a Map to ensure each unique question appears only once.
          incorrect.set(q.id, q);
        }
        if (q.markedForReview) {
          marked.set(q.id, q);
        }
      });
    });

    return {
      incorrect: Array.from(incorrect.values()),
      marked: Array.from(marked.values()),
    };
  }, [examHistory]);

  // Function to start a review session with the selected question type.
  const startReviewSession = (type) => {
    setReviewType(type);
    setSessionQuestions(reviewableQuestions[type]);
  };

  // If a review session has started, render the ExamInterface with the review questions.
  if (reviewType) {
    return <ExamInterface reviewQuestions={sessionQuestions} reviewTitle={`Review: ${reviewType === 'incorrect' ? 'Incorrect Answers' : 'Marked Questions'}`} />;
  }

  // Otherwise, render the selection screen for the review mode.
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-3xl p-6 sm:p-8 mt-10"
    >
      <div className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">Review Mode</h1>
        <p className="text-text-secondary dark:text-dark-text-secondary mb-8">Strengthen your weak points by focusing on what matters.</p>
        
        <div className="grid sm:grid-cols-2 gap-8">
          <ReviewOption
            icon={<FaRedo />}
            title="Review Incorrect"
            count={reviewableQuestions.incorrect.length}
            onClick={() => startReviewSession('incorrect')}
            disabled={reviewableQuestions.incorrect.length === 0}
          />
          <ReviewOption
            icon={<FaFlag />}
            title="Review Marked"
            count={reviewableQuestions.marked.length}
            onClick={() => startReviewSession('marked')}
            disabled={reviewableQuestions.marked.length === 0}
          />
        </div>
      </div>
    </motion.div>
  );
}

// A reusable component for the review option buttons.
const ReviewOption = ({ icon, title, count, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="p-6 border-2 dark:border-gray-700 rounded-xl hover:border-accent dark:hover:border-dark-accent hover:bg-accent/5 dark:hover:bg-dark-accent/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <div className="text-4xl text-accent dark:text-dark-accent mx-auto mb-3">{icon}</div>
    <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">{title}</h3>
    <p className="text-text-secondary dark:text-dark-text-secondary mt-1">{count} questions available</p>
  </button>
);

export default ReviewMode;
