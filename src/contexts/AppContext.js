import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Initialize state from localStorage to persist data
  const [examHistory, setExamHistory] = useState(() => {
    const savedHistory = localStorage.getItem('examHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [achievements, setAchievements] = useState(() => {
    const savedAchievements = localStorage.getItem('achievements');
    return savedAchievements ? JSON.parse(savedAchievements) : [
      { id: 1, title: "First Step", description: "Complete your first exam.", unlocked: false },
      { id: 2, title: "Ethics Virtuoso", description: "Score over 90% in an Ethics exam.", unlocked: false },
      { id: 3, title: "Quant Master", description: "Answer 50 Quants questions correctly.", unlocked: false },
      { id: 4, title: "Perfect Score", description: "Score 100% on any practice exam.", unlocked: false },
      { id: 5, title: "Dedicated Learner", description: "Complete 10 practice exams.", unlocked: false },
    ];
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('examHistory', JSON.stringify(examHistory));
  }, [examHistory]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  // Function to add a completed exam to the history
  const addExamResult = (result) => {
    setExamHistory(prevHistory => [...prevHistory, { ...result, date: new Date().toISOString() }]);
    checkAchievements(result, [...examHistory, result]);
  };

  // Function to check and unlock achievements
  const checkAchievements = (newResult, allHistory) => {
    let updatedAchievements = [...achievements];

    // Achievement 1: First Step
    if (!updatedAchievements.find(a => a.id === 1).unlocked) {
      updatedAchievements = updatedAchievements.map(a => a.id === 1 ? { ...a, unlocked: true } : a);
    }
    
    // Achievement 2: Ethics Virtuoso
    if (newResult.topic === 'Ethics' && newResult.percentage >= 90) {
      updatedAchievements = updatedAchievements.map(a => a.id === 2 ? { ...a, unlocked: true } : a);
    }

    // Achievement 4: Perfect Score
    if (newResult.percentage === 100) {
        updatedAchievements = updatedAchievements.map(a => a.id === 4 ? { ...a, unlocked: true } : a);
    }

    // Achievement 5: Dedicated Learner
    if (allHistory.length >= 10) {
        updatedAchievements = updatedAchievements.map(a => a.id === 5 ? { ...a, unlocked: true } : a);
    }

    // You could add more complex checks here, like for Quant Master
    // by summing up all correct quant questions across all exams.

    setAchievements(updatedAchievements);
  };
  
  // Provide state and functions to children components
  const value = {
    examHistory,
    addExamResult,
    achievements,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
