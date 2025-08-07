import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBook, FaChartBar, FaTrophy, FaCalendarAlt } from 'react-icons/fa';
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
          <Link to="/exam" className="mt-8 inline-block bg-accent dark:bg-dark-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-accent-hover dark:hover:bg-dark-accent-hover transform hover:scale-105 transition-transform duration-300 shadow-lg">
            Start Practicing Now <FaArrowRight className="inline ml-2" />
          </Link>
        </motion.div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-text-primary dark:text-dark-text-primary mb-12">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaBook className="h-10 w-10 text-accent dark:text-dark-accent" />}
              title="Custom Exams"
              description="Tailor your practice sessions by level and topic to target your weak areas."
            />
            <FeatureCard
              icon={<FaChartBar className="h-10 w-10 text-accent dark:text-dark-accent" />}
              title="Track Progress"
              description="Visualize your performance with an interactive dashboard and monitor topic mastery."
            />
            <FeatureCard
              icon={<FaCalendarAlt className="h-10 w-10 text-accent dark:text-dark-accent" />}
              title="Study Planner"
              description="Organize your study schedule with a personalized planner to stay on track."
            />
            <FeatureCard
              icon={<FaTrophy className="h-10 w-10 text-accent dark:text-dark-accent" />}
              title="Earn Achievements"
              description="Stay motivated with daily streaks and unlock badges to celebrate your milestones."
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
