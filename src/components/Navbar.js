import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBookOpen, FaChartPie, FaTrophy, FaHome, FaGraduationCap, FaFilePdf, FaCalendarAlt, FaCog, FaSun, FaMoon, FaSyncAlt, FaUser } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const activeLinkClass = "bg-primary-hover text-white dark:bg-dark-primary-hover";
  const defaultLinkClass = "text-gray-300 hover:bg-primary-hover hover:text-white dark:text-dark-text-secondary dark:hover:bg-dark-primary-hover";

  return (
    <nav className="bg-primary dark:bg-dark-surface shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 text-white dark:text-dark-text-primary flex items-center">
              <FaGraduationCap className="h-8 w-8 text-accent dark:text-dark-accent" />
              <span className="ml-3 text-2xl font-bold tracking-wider">CFA Quest Pro</span>
            </NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium`}>Home</NavLink>
            <NavLink to="/exam" className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium`}>Practice</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium`}>Dashboard</NavLink>
            <NavLink to="/review" className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium`}>Review</NavLink>
            <NavLink to="/study-planner" className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium`}>Planner</NavLink>
            <NavLink to="/achievements" className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium`}>Achievements</NavLink>
          </div>
          <div className="flex items-center">
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-300 hover:bg-primary-hover hover:text-white dark:text-dark-text-secondary dark:hover:bg-dark-primary-hover">
              {theme === 'light' ? <FaMoon className="h-5 w-5" /> : <FaSun className="h-5 w-5" />}
            </button>
            <NavLink to="/profile" className={`${defaultLinkClass} ml-4 p-2 rounded-full`}>
              <FaUser className="h-5 w-5" />
            </NavLink>
            <NavLink to="/settings" className={`${defaultLinkClass} ml-2 p-2 rounded-full`}>
              <FaCog className="h-5 w-5" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
