import React, { useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Character } from '../types/types';
import CharacterCard from './CharacterCard';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface CharacterPoolProps {
  id: string;
  characters: Character[];
}

const CharacterPool: React.FC<CharacterPoolProps> = ({ id, characters }) => {
  const { themeColors } = useTheme();
  const { t } = useLanguage();
  const { setNodeRef } = useDroppable({ id });
  const [localCharacters, setLocalCharacters] = useState<Character[]>(characters);

  useEffect(() => {
    setLocalCharacters(characters);
  }, [characters]);
  
  return (
    <div className="rounded-lg bg-white shadow-md overflow-hidden dark:bg-gray-800 dark:text-white">
      <div
        className="p-3 font-medium"
        style={{ backgroundColor: themeColors.secondary, color: 'white' }}
      >
        {t('charactersPool')} ({localCharacters.length})
      </div>
      
      <div
        ref={setNodeRef}
        className="p-4 min-h-40 bg-gray-50 dark:bg-gray-700"
      >
        <SortableContext items={localCharacters.map(c => c.id)} strategy={rectSortingStrategy}>
          <div className="flex flex-wrap gap-3">
            {localCharacters.length > 0 ? (
              localCharacters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))
            ) : (
              <span className="text-gray-400 italic dark:text-gray-500">
                All characters have been assigned to tiers
              </span>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default CharacterPool;