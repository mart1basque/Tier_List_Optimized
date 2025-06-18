import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { UniverseType } from '../data/universes';
import { Character } from '../types/types';
import { useTheme } from '../context/ThemeContext';
import UniverseBackground from '../components/UniverseBackground';
import NightModeToggle from '../components/NightModeToggle';
import OrderWebsiteButton from '../components/OrderWebsiteButton';
import TierListGrid, { TierListGridHandle } from '../components/TierListGrid';
import ExportPanel from '../components/ExportPanel';
import ImageUploader from '../components/ImageUploader';
import { fetchCharacters } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
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
  const { t } = useLanguage();
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
  const gridRef = useRef<TierListGridHandle>(null);
  const [unknownContainer, setUnknownContainer] = useState<HTMLDivElement | null>(null);
  const setUnknownContainerRef = useCallback((node: HTMLDivElement | null) => {
    setUnknownContainer(node);
  }, []);

  // Parse share data if provided
  const dataParam = searchParams.get('data');
  let parsedData: any | undefined;
  if (dataParam) {
    try {
      parsedData = JSON.parse(decodeURIComponent(dataParam));
    } catch (e) {
      console.error('Invalid data parameter', e);
    }
  }

  const filtersParam =
    searchParams.get('filters') ??
    (parsedData?.filters ? parsedData.filters.join(',') : '');
  const language = (
    searchParams.get('lang') ?? parsedData?.language ?? 'en'
  ) as 'en' | 'fr' | 'es';
  const variant = (
    searchParams.get('variant') ?? parsedData?.variant ?? 'normal'
  ) as 'normal' | 'luma';

  let initialTiers: { id: string; label: string; color: string }[] | undefined;
  let initialCharacterMap: Record<string, string[]> | undefined;
  if (parsedData && parsedData.tiers && parsedData.characterMap) {
    initialTiers = parsedData.tiers;
    initialCharacterMap = parsedData.characterMap;
  }
    
  const filters = useMemo(
    () =>
      filtersParam
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0),
    [filtersParam]
  );

  const filterNames = useMemo(() => {
    if (!currentUniverse) return filters;
    const options = universeConfig[currentUniverse].filterOptions;
    return filters.map(f => {
      const found = options.find(o => o.id === f);
      if (!found) return f;
      if (currentUniverse === 'pokemon') {
        const match = /^gen(\d+)$/.exec(found.id);
        if (match) {
          return `gen ${match[1]}`;
        }
      }
      if ('nameKey' in found && found.nameKey) {
        return t(found.nameKey);
      }
      return found.name ?? f;
    });
  }, [filters, currentUniverse, t]);
  
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
            language,
            variant
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
  }, [universe, filtersParam, language, variant, setCurrentUniverse, navigate]);
  
  const handleAddCustomCharacter = (character: Character) => {
    setCharacters(prev => [...prev, character]);
  };
  
  const getTierListData = useCallback(() => {
    const layout = gridRef.current?.getLayout();
    return {
      universe: currentUniverse,
      filters,
      language,
      variant,
      characters,
      tiers: layout?.tiers ?? [],
      characterMap: layout?.characterMap ?? {},
    };
  }, [currentUniverse, filters, language, variant, characters]);
  
  if (!currentUniverse || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pb-16 bg-gray-100 dark:bg-gray-900">
      <UniverseBackground universe={currentUniverse} />
      <NightModeToggle />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <button
          onClick={() => navigate(`/filter/${currentUniverse}`)}
          className="flex items-center text-white mb-8 bg-black bg-opacity-30 rounded-full px-4 py-2 hover:bg-opacity-40 transition-all"
        >
          <ChevronLeft size={20} />
          <span>{t('backToFilters')}</span>
        </button>
        
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1
              className="text-3xl font-bold drop-shadow-md mb-2 dark:text-white"
              style={{ color: themeColors.text }}
            >
              {currentUniverse === 'pokemon'
                ? 'Pokémon'
                : currentUniverse === 'demon-slayer'
                ? 'Demon Slayer'
                : currentUniverse === 'league-of-legends'
                ? 'League of Legends'
                : currentUniverse === 'onepiece'
                ? 'One Piece'
                : currentUniverse === 'temtem'
                ? 'Temtem'
                : 'Naruto'} {t('tierList')}
            </h1>
            <OrderWebsiteButton />
          </div>
          <div className="flex flex-wrap gap-2">
            {filterNames.map((name, index) => (
              <span
                key={filters[index]}
                className="px-3 py-1 rounded-full text-sm font-medium text-white bg-black bg-opacity-30"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div ref={tierListRef} className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-xl p-6 dark:bg-gray-800 dark:bg-opacity-95 dark:text-white">
              <TierListGrid
                ref={gridRef}
                characters={characters}
                unknownContainer={unknownContainer}
                initialTiers={initialTiers}
                initialCharacterMap={initialCharacterMap}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <ImageUploader onImageUploaded={handleAddCustomCharacter} />
            <ExportPanel tierListRef={tierListRef} getTierListData={getTierListData} />
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