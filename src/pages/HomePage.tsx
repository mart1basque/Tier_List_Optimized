import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { universes } from '../data/universes';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';
import NightModeToggle from '../components/NightModeToggle';
import OrderWebsiteButton from '../components/OrderWebsiteButton';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUniverse, isNightMode } = useTheme();
  const { t } = useLanguage();
  
  // Reset universe on home page
  useEffect(() => {
    setCurrentUniverse(null);
  }, [setCurrentUniverse]);

  const handleUniverseSelect = (universeId: string) => {
    setCurrentUniverse(universeId as any);
    navigate(`/filter/${universeId}`);
  };

  return (
    <div
      className={`min-h-screen relative text-gray-800 dark:text-white ${
        isNightMode
          ? 'bg-gray-900'
          : 'bg-gradient-to-b from-indigo-100 to-purple-200'
      }`}
    >
      {isNightMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 80 }).map((_, index) => (
            <div
              key={index}
              className="absolute rounded-full bg-white/80"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out ${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="fixed top-4 left-4 z-50">
        <OrderWebsiteButton />
      </div>
      <NightModeToggle />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="flex items-center mb-4">
            <Sparkles className="text-yellow-400 mr-2" size={28} />
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-yellow-400">
              Mankind Tier List
            </h1>
            <Sparkles className="text-yellow-400 ml-2" size={28} />
          </div>
          <p className="text-lg md:text-xl max-w-2xl text-blue-900 dark:text-blue-100">
            {t('createBeautiful')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {universes.map((universe) => (
            <div
              key={universe.id}
              className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => handleUniverseSelect(universe.id)}
            >
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity duration-300 z-10"></div>
              <img
                src={universe.image}
                alt={t(universe.nameKey)}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                  {t(universe.nameKey)}
                </h3>
                <p className="text-white text-sm opacity-90 drop-shadow-md">
                  {t(universe.descriptionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LanguageSelector />

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;