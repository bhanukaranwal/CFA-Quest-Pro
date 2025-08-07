import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBook, FaChartBar, FaTrophy } from 'react-icons/fa';

function Home() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold text-text-dark mb-2">Welcome to CFA Quest Pro</h2>
        <p className="text-lg text-text-light mb-8">Your personalized journey to mastering the CFA exams. Built with original content.</p>
        <Link to="/exam" className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 inline-flex items-center space-x-2">
          <span>Start a Practice Exam</span>
          <FaArrowRight />
        </Link>
      </div>

      <div className="container mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaBook className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-dark mb-2">Custom Exams</h3>
            <p className="text-text-light">Filter questions by level and topic to focus your study sessions.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaChartBar className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-dark mb-2">Track Progress</h3>
            <p className="text-text-light">Visualize your performance with an interactive dashboard.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaTrophy className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-dark mb-2">Earn Achievements</h3>
            <p className="text-text-light">Stay motivated with streaks and badges for your hard work.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
