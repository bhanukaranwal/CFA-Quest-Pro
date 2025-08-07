import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBook, FaChartBar, FaTrophy, FaHome } from 'react-icons/fa';

function Navbar() {
  const activeLinkStyle = {
    color: '#FFAB00',
    borderBottom: '2px solid #FFAB00'
  };

  return (
    <nav className="bg-primary shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">CFA Quest Pro</h1>
        <div className="flex items-center space-x-6">
          <NavLink to="/" className="text-white hover:text-accent transition duration-300 flex items-center space-x-2" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
            <FaHome />
            <span>Home</span>
          </NavLink>
          <NavLink to="/exam" className="text-white hover:text-accent transition duration-300 flex items-center space-x-2" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
            <FaBook />
            <span>Exam</span>
          </NavLink>
          <NavLink to="/dashboard" className="text-white hover:text-accent transition duration-300 flex items-center space-x-2" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
            <FaChartBar />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/achievements" className="text-white hover:text-accent transition duration-300 flex items-center space-x-2" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
            <FaTrophy />
            <span>Achievements</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
