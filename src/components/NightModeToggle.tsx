import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NightModeToggle: React.FC = () => {
  const { isNightMode, toggleNightMode } = useTheme();
  return (
    <button
      onClick={toggleNightMode}
      className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white shadow-md dark:bg-gray-700"
      title="Toggle night mode"
    >
      {isNightMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-800" />}
    </button>
  );
};

export default NightModeToggle;

