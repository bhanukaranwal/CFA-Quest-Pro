import React, { useContext, useMemo } from 'react';
import { AppContext } from '../contexts/AppContext';
import { motion } from 'framer-motion';
import { FaUserCircle, FaBook, FaCheck, FaPercentage } from 'react-icons/fa';

function Profile() {
  const { examHistory, achievements } = useContext(AppContext);

  const stats = useMemo(() => {
    if (examHistory.length === 0) {
      return {
        totalExams: 0,
        totalQuestions: 0,
        overallAccuracy: 0,
        unlockedAchievements: 0,
      };
    }
    const totalQuestions = examHistory.reduce((acc, exam) => acc + exam.total, 0);
    const correctQuestions = examHistory.reduce((acc, exam) => acc + exam.score, 0);
    const unlockedAchievements = achievements.filter(a => a.unlocked).length;

    return {
      totalExams: examHistory.length,
      totalQuestions,
      overallAccuracy: totalQuestions > 0 ? (correctQuestions / totalQuestions) * 100 : 0,
      unlockedAchievements,
    };
  }, [examHistory, achievements]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto max-w-4xl p-6 sm:p-8 mt-10"
    >
      <div className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg flex flex-col items-center">
        <FaUserCircle className="text-8xl text-accent dark:text-dark-accent mb-4" />
        <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary">Your Profile</h1>
        <p className="text-text-secondary dark:text-dark-text-secondary mt-1">Summary of your progress.</p>

        <div className="w-full mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <StatBox icon={<FaBook />} value={stats.totalExams} label="Exams Taken" />
          <StatBox icon={<FaCheck />} value={stats.totalQuestions} label="Questions Answered" />
          <StatBox icon={<FaPercentage />} value={`${stats.overallAccuracy.toFixed(1)}%`} label="Overall Accuracy" />
          <StatBox icon={<FaTrophy />} value={`${stats.unlockedAchievements} / ${achievements.length}`} label="Achievements" />
        </div>
      </div>
    </motion.div>
  );
}

const StatBox = ({ icon, value, label }) => (
  <div className="bg-background dark:bg-dark-background p-6 rounded-lg">
    <div className="text-4xl text-accent dark:text-dark-accent mx-auto mb-3">{icon}</div>
    <p className="text-3xl font-extrabold text-text-primary dark:text-dark-text-primary">{value}</p>
    <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">{label}</p>
  </div>
);

// Note: You might need to import FaTrophy if it's not already in scope
// import { FaTrophy } from 'react-icons/fa';

export default Profile;
