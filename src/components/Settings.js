import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-2xl p-6 sm:p-8 mt-10"
    >
      <div className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-8 text-center">Settings</h1>
        
        <div className="flex items-center justify-between p-4 bg-background dark:bg-dark-background rounded-lg">
          <div className="flex items-center">
            {theme === 'light' ? <FaSun className="mr-3 text-yellow-500" /> : <FaMoon className="mr-3 text-blue-300" />}
            <span className="font-medium text-text-primary dark:text-dark-text-primary">Appearance</span>
          </div>
          <div className="flex items-center">
            <span className="mr-3 text-sm text-text-secondary dark:text-dark-text-secondary">{theme === 'light' ? 'Light' : 'Dark'}</span>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${theme === 'light' ? 'bg-gray-300' : 'bg-accent'}`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${theme === 'light' ? 'translate-x-1' : 'translate-x-6'}`}
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Settings;
