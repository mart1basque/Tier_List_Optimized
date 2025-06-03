import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Character } from '../types/types';
import { useTheme } from '../context/ThemeContext';
import { PlainCharacterCard } from './CharacterCard';

interface UnknownCharactersPanelProps {
  characters: Character[];
}

const UnknownCharactersPanel: React.FC<UnknownCharactersPanelProps> = ({ characters }) => {
  const { themeColors } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between"
        style={{ color: themeColors.text }}
      >
        <span className="font-medium">Unknown Characters ({characters.length})</span>
        <Trash2 size={18} />
      </button>
      {open && (
        <div className="mt-3 flex flex-wrap gap-3">
          {characters.length > 0 ? (
            characters.map((char) => (
              <PlainCharacterCard key={char.id} character={char} />
            ))
          ) : (
            <span className="text-gray-400 italic">No unknown characters</span>
          )}
        </div>
      )}
    </div>
  );
};

export default UnknownCharactersPanel;
