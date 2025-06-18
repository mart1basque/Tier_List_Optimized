import React, { useState, useRef, useCallback, useEffect } from 'react';
import NightModeToggle from '../components/NightModeToggle';
import OrderWebsiteButton from '../components/OrderWebsiteButton';
import TierListGrid, { TierListGridHandle } from '../components/TierListGrid';
import ImageUploader from '../components/ImageUploader';
import ExportPanel from '../components/ExportPanel';
import { Character } from '../types/types';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const CustomTierListPage: React.FC = () => {
  const { setCurrentUniverse, themeColors } = useTheme();
  const { t } = useLanguage();
  const [characters, setCharacters] = useState<Character[]>([]);
  const tierListRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<TierListGridHandle>(null);
  const [unknownContainer, setUnknownContainer] = useState<HTMLDivElement | null>(null);
  const setUnknownContainerRef = useCallback((node: HTMLDivElement | null) => {
    setUnknownContainer(node);
  }, []);

  useEffect(() => {
    setCurrentUniverse(null as any);
  }, [setCurrentUniverse]);

  const handleAddCustomCharacter = (character: Character) => {
    setCharacters(prev => [...prev, character]);
  };

  const getTierListData = useCallback(() => {
    const layout = gridRef.current?.getLayout();
    return {
      universe: 'custom',
      characters,
      tiers: layout?.tiers ?? [],
      characterMap: layout?.characterMap ?? {},
    };
  }, [characters]);

  return (
    <div className="min-h-screen relative pb-16 bg-gray-100 dark:bg-gray-900">
      <NightModeToggle />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ color: themeColors.text }}>
            {t('customTierList')}
          </h1>
          <OrderWebsiteButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div
              ref={tierListRef}
              className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-xl p-6 dark:bg-gray-800 dark:bg-opacity-95 dark:text-white"
            >
              <TierListGrid ref={gridRef} characters={characters} unknownContainer={unknownContainer} />
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

export default CustomTierListPage;
