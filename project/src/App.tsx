import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import PracticeMode from './components/practice/PracticeMode';
import ProgressTracker from './components/progress/ProgressTracker';
import { AuthProvider } from './context/AuthContext';
import { GraphProvider } from './context/GraphContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <GraphProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/practice" element={<PracticeMode />} />
              <Route path="/progress" element={<ProgressTracker />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </GraphProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;