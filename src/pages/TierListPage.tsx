import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { UniverseType } from '../data/universes';
import { Character } from '../types/types';
import { useTheme } from '../context/ThemeContext';
import UniverseBackground from '../components/UniverseBackground';
import TierListGrid from '../components/TierListGrid';
import ExportPanel from '../components/ExportPanel';
import ImageUploader from '../components/ImageUploader';
import { fetchCharacters } from '../services/api';
import {
  DndContext,
  DragOverlay,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { snapCenterToCursor } from '@dnd-kit/modifiers';


const TierListPage: React.FC = () => {
  const { universe } = useParams<{ universe: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUniverse, setCurrentUniverse, themeColors } = useTheme();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

function handleDragStart(event: any) {
  setActiveId(event.active.id);
}

function handleDragEnd() {
  setActiveId(null);
}

function handleDragCancel() {
  setActiveId(null);
}

function getImageFromId(id: string) {
  const item = characters.find(i => i.id === id);
  return item?.image ?? '';
}
  const tierListRef = useRef<HTMLDivElement>(null);
  const [unknownContainer, setUnknownContainer] = useState<HTMLDivElement | null>(null);
  const setUnknownContainerRef = useCallback((node: HTMLDivElement | null) => {
    setUnknownContainer(node);
  }, []);

  // Get selected filters from URL
  const filtersParam = searchParams.get('filters') ?? '';
  const language = (searchParams.get('lang') ?? 'en') as 'en' | 'fr';
  const filters = useMemo(
    () =>
      filtersParam
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0),
    [filtersParam]
  );
  
  useEffect(() => {
    if (universe && Object.keys(universeConfig).includes(universe as UniverseType)) {
      setCurrentUniverse(universe as UniverseType);
      
      // Fetch characters based on universe and filters
      const loadCharacters = async () => {
        setLoading(true);
        try {
          const data = await fetchCharacters(
            universe as UniverseType,
            filters,
            language
          );
          setCharacters(data);
        } catch (error) {
          console.error('Error fetching characters:', error);
          // Fallback to mock data if API fails
          setCharacters(getMockCharacters(universe as UniverseType, filters));
        } finally {
          setLoading(false);
        }
      };
      
      loadCharacters();
    } else {
      navigate('/');
    }
  }, [universe, filtersParam, language, setCurrentUniverse, navigate]);
  
  const handleAddCustomCharacter = (character: Character) => {
    setCharacters(prev => [...prev, character]);
  };
  
  // Mock tier list data for export
  const tierListData = {
    universe: currentUniverse,
    filters,
    language,
    characters,
    // In a real app, you'd include the tier assignments here
  };
  
  if (!currentUniverse || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pb-16">
      <UniverseBackground universe={currentUniverse} />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <button
          onClick={() => navigate(`/filter/${currentUniverse}`)}
          className="flex items-center text-white mb-8 bg-black bg-opacity-30 rounded-full px-4 py-2 hover:bg-opacity-40 transition-all"
        >
          <ChevronLeft size={20} />
          <span>Back to Filters</span>
        </button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white drop-shadow-md mb-2">
            {currentUniverse === 'pokemon' ? 'Pokémon' :
             currentUniverse === 'one-piece' ? 'One Piece' :
             currentUniverse === 'dragon-ball' ? 'Dragon Ball' :
             currentUniverse === 'demon-slayer' ? 'Demon Slayer' :
             currentUniverse === 'olive-et-tom' ? 'Olive et Tom' :
             currentUniverse === 'dokkan-battle' ? 'Dokkan Battle' :
             'Naruto'} Tier List
          </h1>
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <span 
                key={filter}
                className="px-3 py-1 rounded-full text-sm font-medium text-white bg-black bg-opacity-30"
              >
                {filter}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div ref={tierListRef} className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-xl p-6">
              <TierListGrid characters={characters} unknownContainer={unknownContainer} />
            </div>
          </div>
          
          <div className="space-y-6">
            <ImageUploader onImageUploaded={handleAddCustomCharacter} />
            <ExportPanel tierListRef={tierListRef} tierListData={tierListData} />
            <div ref={setUnknownContainerRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock characters for demonstration
function getMockCharacters(universe: UniverseType, filters: string[]): Character[] {
  // In a real app, you'd fetch from API
  const baseUrl = 'https://via.placeholder.com/150';
  
  // Generate some mock characters based on universe
  const characterCount = Math.floor(Math.random() * 20) + 10;
  
  return Array.from({ length: characterCount }).map((_, index) => ({
    id: `${universe}-${index}`,
    name: `Character ${index + 1}`,
    image: `${baseUrl}?text=${universe}+${index + 1}`,
    universe: universe,
  }));
}

// Import from universes.ts to avoid importing the whole file
import { universeConfig } from '../data/universes';

export default TierListPage;