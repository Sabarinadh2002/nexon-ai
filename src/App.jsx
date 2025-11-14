// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import the pages
import HomePage from './pages/HomePage/HomePage.jsx';
import FeaturesPage from './pages/FeaturesPages/FeaturesPage.jsx';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />
    </Routes>
  );
}

export default App;
