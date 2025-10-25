import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CVPage from './pages/CVPage';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CVPage />} />
        <Route path="/makecv" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
