import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBook, FaChartBar, FaTrophy, FaCalendarAlt, FaSyncAlt, FaClipboardList } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="bg-background dark:bg-dark-background">
      <div className="relative bg-primary dark:bg-dark-primary text-white text-center py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">Master Your CFA Journey</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 dark:text-dark-text-secondary">An interactive, modern platform built with original content to help you conquer the CFA exams.</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/exam?mode=practice" className="inline-block bg-accent dark:bg-dark-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-accent-hover dark:hover:bg-dark-accent-hover transform hover:scale-105 transition-transform duration-300 shadow-lg">
              Start Practice <FaArrowRight className="inline ml-2" />
            </Link>
            <Link to="/exam?mode=mock" className="inline-block bg-surface dark:bg-dark-surface text-primary dark:text-dark-primary font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:scale-105 transition-transform duration-300 shadow-lg">
              Take Mock Exam
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-text-primary dark:text-dark-text-primary mb-12">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaClipboardList className="h-10 w-10 text-accent dark:text-dark-accent" />}
              title="Mock Exams"
              description="Simulate the real exam experience with full-length, timed mock exams to test your endurance and knowledge."
            />
            <FeatureCard
              icon={<FaChartBar className="h-10 w-10 text-accent dark:text-dark-accent" />}
              title="Detailed Analytics"
              description="Visualize your performance with an interactive dashboard and in-depth, question-by-question reviews."
            />
            <FeatureCard
              icon={<FaSyncAlt className="h-10 w-10 text-accent dark:text-dark-accent" />}
              title="Review Mode"
              description="Launch practice sessions with questions you've previously answered incorrectly or marked for review."
            />
            <FeatureCard
              icon={<FaTrophy className="h-10 w-10 text-accent dark:text-dark-accent" />}
              title="Gamified Learning"
              description="Stay motivated with daily streaks and unlock badges to celebrate your milestones and achievements."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.03 }}
    className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out"
  >
    <div className="flex justify-center items-center mb-6 h-16 w-16 rounded-full bg-accent bg-opacity-10 dark:bg-dark-accent dark:bg-opacity-20 mx-auto">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-center text-text-primary dark:text-dark-text-primary mb-3">{title}</h3>
    <p className="text-text-secondary dark:text-dark-text-secondary text-center">{description}</p>
  </motion.div>
);

export default Home;
