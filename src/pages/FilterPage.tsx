import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Filter, ArrowRight } from 'lucide-react';
import { UniverseType, universeConfig } from '../data/universes';
import { useTheme } from '../context/ThemeContext';
import UniverseBackground from '../components/UniverseBackground';
import NightModeToggle from '../components/NightModeToggle';

const FilterPage: React.FC = () => {
  const { universe } = useParams<{ universe: string }>();
  const navigate = useNavigate();
  const { currentUniverse, setCurrentUniverse, themeColors } = useTheme();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [pokemonLanguage, setPokemonLanguage] = useState<'en' | 'fr' | ''>('');
  
  useEffect(() => {
    if (universe && Object.keys(universeConfig).includes(universe as UniverseType)) {
      setCurrentUniverse(universe as UniverseType);
    } else {
      navigate('/');
    }
  }, [universe, setCurrentUniverse, navigate]);
  
  if (!currentUniverse) {
    return <div>Loading...</div>;
  }

  const config = universeConfig[currentUniverse];
  const filterOptions = config.filterOptions;

  const languageSelector = currentUniverse === 'pokemon' && (
    <div className="mb-6">
      <label htmlFor="pokemon-language" className="block mb-2 font-medium">
        Select Pokémon Language
      </label>
      <select
        id="pokemon-language"
        value={pokemonLanguage}
        onChange={e => {
          setPokemonLanguage(e.target.value as 'en' | 'fr');
          setSelectedFilters([]);
        }}
        className="border rounded p-2 w-full"
      >
        <option value="" disabled>
          Choose language
        </option>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
  
  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };
  
  const handleContinue = () => {
    if (filterOptions.length === 0) {
      navigate(`/tierlist/${currentUniverse}?filters=`);
    } else if (selectedFilters.length > 0) {
      if (currentUniverse === 'pokemon' && !pokemonLanguage) {
        alert('Please select a language first');
        return;
      }
      const filterParams = selectedFilters.join(',');
      const langParam =
        currentUniverse === 'pokemon' ? `&lang=${pokemonLanguage}` : '';
      navigate(`/tierlist/${currentUniverse}?filters=${filterParams}${langParam}`);
    } else {
      // Show error or notification that at least one filter should be selected
      alert('Please select at least one option to continue');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-100 dark:bg-gray-900">
      <UniverseBackground universe={currentUniverse} />
      <NightModeToggle />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-white mb-8 bg-black bg-opacity-30 rounded-full px-4 py-2 hover:bg-opacity-40 transition-all"
        >
          <ChevronLeft size={20} />
          <span>Back to Home</span>
        </button>
        
        <div className="max-w-2xl mx-auto bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-8 dark:bg-gray-800 dark:bg-opacity-90 dark:text-white">
          <div className="flex items-center mb-6">
            <Filter className="mr-3" style={{ color: themeColors.primary }} />
            <h2 className="text-2xl font-bold" style={{ color: themeColors.text }}>
              Customize Your {currentUniverse === 'pokemon'
                ? 'Pokémon'
                : currentUniverse === 'demon-slayer'
                ? 'Demon Slayer'
                : currentUniverse === 'league-of-legends'
                ? 'League of Legends'
                : currentUniverse === 'onepiece'
                ? 'One Piece'
                : currentUniverse === 'pvz'
                ? 'Plants vs. Zombies'
                : 'Naruto'} Tier List
            </h2>
          </div>
          
          {languageSelector}

          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Select which {currentUniverse === 'pokemon'
              ? 'generations'
              : currentUniverse === 'naruto'
              ? 'series'
              : currentUniverse === 'league-of-legends'
              ? 'classes'
              : currentUniverse === 'onepiece'
              ? 'characters'
              : currentUniverse === 'pvz'
              ? 'types'
              : 'seasons'} you want to include in your tier list:
          </p>
          
          {filterOptions.length > 0 && (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 ${
                currentUniverse === 'pokemon' && !pokemonLanguage
                  ? 'opacity-50 pointer-events-none'
                  : ''
              }`}
            >
              {filterOptions.map((option) => (
                <div
                  key={option.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedFilters.includes(option.id)
                      ? 'border-2 shadow-md'
                      : 'border border-gray-200 hover:border-gray-300'
                  }`}
                style={{
                  borderColor: selectedFilters.includes(option.id) ? themeColors.primary : '',
                  backgroundColor: selectedFilters.includes(option.id) ? `${themeColors.primary}15` : ''
                }}
                onClick={() => handleFilterToggle(option.id)}
              >
                <div className="flex items-center">
                  <div 
                    className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center border ${
                      selectedFilters.includes(option.id) ? 'border-0' : 'border-gray-300'
                    }`}
                    style={{ 
                      backgroundColor: selectedFilters.includes(option.id) ? themeColors.primary : 'white'
                    }}
                  >
                    {selectedFilters.includes(option.id) && (
                      <svg xmlns="http://www.w3.org/2000/svg\" className="h-3 w-3 text-white\" viewBox="0 0 20 20\" fill="currentColor">
                        <path fillRule="evenodd\" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z\" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">{option.name}</span>
                </div>
              </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              className="flex items-center px-6 py-3 rounded-lg text-white transition-all"
              style={{ 
                backgroundColor: themeColors.primary,
                boxShadow: `0 4px 14px 0 ${themeColors.primary}40`
              }}
              disabled={
                (filterOptions.length > 0 && selectedFilters.length === 0) ||
                (currentUniverse === 'pokemon' && !pokemonLanguage)
              }
            >
              <span className="mr-2">Continue</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;