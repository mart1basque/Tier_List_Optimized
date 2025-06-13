import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FilterPage from './pages/FilterPage';
import TierListPage from './pages/TierListPage';
import { ThemeProvider } from './context/ThemeContext';
import NightModeToggle from './components/NightModeToggle';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <NightModeToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/filter/:universe" element={<FilterPage />} />
          <Route path="/tierlist/:universe" element={<TierListPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
