import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FilterPage from './pages/FilterPage';
import TierListPage from './pages/TierListPage';
import GuidePage from './pages/GuidePage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/filter/:universe" element={<FilterPage />} />
          <Route path="/tierlist/:universe" element={<TierListPage />} />
          <Route path="/guide" element={<GuidePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
