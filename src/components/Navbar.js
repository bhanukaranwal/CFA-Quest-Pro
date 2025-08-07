import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBookOpen, FaChartPie, FaTrophy, FaHome, FaGraduationCap, FaFilePdf } from 'react-icons/fa';

function Navbar() {
  const activeLinkClass = "bg-primary-hover text-white";
  const defaultLinkClass = "text-gray-300 hover:bg-primary-hover hover:text-white";

  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white flex items-center">
              <FaGraduationCap className="h-8 w-8 text-accent" />
              <span className="ml-3 text-2xl font-bold tracking-wider">CFA Quest Pro</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2`}>
                <FaHome />
                <span>Home</span>
              </NavLink>
              <NavLink to="/exam" className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2`}>
                <FaBookOpen />
                <span>Exam</span>
              </NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2`}>
                <FaChartPie />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/achievements" className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2`}>
                <FaTrophy />
                <span>Achievements</span>
              </NavLink>
              <NavLink to="/formula-sheets" className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2`}>
                <FaFilePdf />
                <span>Formula Sheets</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
