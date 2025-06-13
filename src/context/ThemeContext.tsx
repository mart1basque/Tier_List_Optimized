import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { universes, universeConfig, UniverseType } from '../data/universes';

interface ThemeContextType {
  currentUniverse: UniverseType | null;
  setCurrentUniverse: (universe: UniverseType) => void;
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  backgroundStyle: React.CSSProperties;
  isNightMode: boolean;
  toggleNightMode: () => void;
}

const defaultTheme = {
  primary: '#3B82F6', // blue-500
  secondary: '#10B981', // emerald-500
  accent: '#F97316', // orange-500
  background: '#F3F4F6', // gray-100
  text: '#1F2937', // gray-800
};

const ThemeContext = createContext<ThemeContextType>({
  currentUniverse: null,
  setCurrentUniverse: () => {},
  themeColors: defaultTheme,
  backgroundStyle: {},
  isNightMode: false,
  toggleNightMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUniverse, setCurrentUniverse] = useState<UniverseType | null>(null);
  const [themeColors, setThemeColors] = useState(defaultTheme);
  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>({});
  const [isNightMode, setIsNightMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isNightMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (currentUniverse && universeConfig[currentUniverse]) {
      const config = universeConfig[currentUniverse];
      setThemeColors(config.colors);
      setBackgroundStyle(config.backgroundStyle);
    } else {
      setThemeColors(defaultTheme);
      setBackgroundStyle({});
    }
  }, [currentUniverse]);

  // Toggle dark class on html element
  useEffect(() => {
    const root = document.documentElement;
    if (isNightMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isNightMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isNightMode', isNightMode.toString());
    }
  }, [isNightMode]);

  return (
    <ThemeContext.Provider
      value={{ currentUniverse, setCurrentUniverse, themeColors, backgroundStyle, isNightMode, toggleNightMode: () => setIsNightMode(prev => !prev) }}
    >
      {children}
    </ThemeContext.Provider>
  );
};