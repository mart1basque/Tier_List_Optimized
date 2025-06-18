import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FilterPage from './pages/FilterPage';
import TierListPage from './pages/TierListPage';
import CustomTierListPage from './pages/CustomTierListPage';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/filter/:universe" element={<FilterPage />} />
            <Route path="/tierlist/:universe" element={<TierListPage />} />
            <Route path="/custom" element={<CustomTierListPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
