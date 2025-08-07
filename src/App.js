import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ExamInterface from './components/ExamInterface';
import Dashboard from './components/Dashboard';
import Achievements from './components/Achievements';
import FormulaSheets from './components/FormulaSheets';

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-background font-sans">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exam" element={<ExamInterface />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/formula-sheets" element={<FormulaSheets />} />
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;
