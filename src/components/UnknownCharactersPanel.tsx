import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Character } from '../types/types';
import { useTheme } from '../context/ThemeContext';
import CharacterCard from './CharacterCard';

interface UnknownCharactersPanelProps {
  id: string;
  characters: Character[];
}

const UnknownCharactersPanel: React.FC<UnknownCharactersPanelProps> = ({ id, characters }) => {
  const { themeColors } = useTheme();
  const [open, setOpen] = useState(false);
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between"
        style={{ color: themeColors.text }}
      >
        <span className="font-medium">Unknown Characters ({characters.length})</span>
        <Trash2 size={18} />
      </button>
      {open && (
        <SortableContext items={characters.map(c => c.id)} strategy={rectSortingStrategy}>
          <div className="mt-3 flex flex-wrap gap-3">
            {characters.length > 0 ? (
              characters.map((char) => (
                <CharacterCard key={char.id} character={char} />
              ))
            ) : (
              <span className="text-gray-400 italic dark:text-gray-500">No unknown characters</span>
            )}
          </div>
        </SortableContext>
      )}
    </div>
  );
};

export default UnknownCharactersPanel;
