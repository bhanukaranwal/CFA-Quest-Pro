import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBook, FaChartBar, FaTrophy } from 'react-icons/fa';

function Home() {
  return (
    <div className="bg-background">
      <div className="relative bg-primary text-white text-center py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">Master Your CFA Journey</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">An interactive, modern platform built with original content to help you conquer the CFA exams.</p>
          <Link to="/exam" className="mt-8 inline-block bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-accent-hover transform hover:scale-105 transition-transform duration-300 shadow-lg">
            Start Practicing Now <FaArrowRight className="inline ml-2" />
          </Link>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-text-primary mb-12">Core Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaBook className="h-10 w-10 text-accent" />}
              title="Custom Exams"
              description="Tailor your practice sessions. Filter thousands of original questions by level and topic to target your weak areas."
            />
            <FeatureCard
              icon={<FaChartBar className="h-10 w-10 text-accent" />}
              title="Track Progress"
              description="Visualize your performance with an interactive dashboard. Monitor your topic mastery and exam readiness."
            />
            <FeatureCard
              icon={<FaTrophy className="h-10 w-10 text-accent" />}
              title="Earn Achievements"
              description="Stay motivated with daily streaks and unlock badges. Gamify your learning and celebrate your milestones."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-surface p-8 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out">
    <div className="flex justify-center items-center mb-6 h-16 w-16 rounded-full bg-accent bg-opacity-10 mx-auto">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-center text-text-primary mb-3">{title}</h3>
    <p className="text-text-secondary text-center">{description}</p>
  </div>
);

export default Home;
