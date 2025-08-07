import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ExamInterface from './components/ExamInterface';
import Dashboard from './components/Dashboard';
import Achievements from './components/Achievements';
import FormulaSheets from './components/FormulaSheets';
import StudyPlanner from './components/StudyPlanner';
import Settings from './components/Settings';

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-background text-text-primary dark:bg-dark-background dark:text-dark-text-primary">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exam" element={<ExamInterface />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/formula-sheets" element={<FormulaSheets />} />
              <Route path="/study-planner" element={<StudyPlanner />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;
