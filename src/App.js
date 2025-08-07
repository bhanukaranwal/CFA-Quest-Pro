import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// These import paths MUST EXACTLY match your filenames in the /src/components/ folder
// Check for correct capitalization (e.g., 'Navbar.js', not 'navbar.js')
import Navbar from './components/Navbar';
import Home from './components/Home';
import ExamInterface from './components/ExamInterface'; // The file must be named 'ExamInterface.js'
import Dashboard from './components/Dashboard';
import Achievements from './components/Achievements';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-secondary font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exam" element={<ExamInterface />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/achievements" element={<Achievements />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
