import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Character } from '../types/types';
import { createPlaceholderImage } from '../utils/image';
import { useTheme } from '../context/ThemeContext';

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose }) => {
  const { themeColors } = useTheme();
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg p-4 relative w-full dark:bg-gray-800 dark:text-white ${
          character.universe === 'league-of-legends' ? 'max-w-3xl' : 'max-w-sm'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <img
          src={character.image}
          alt={character.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = createPlaceholderImage(character.name, themeColors.primary);
          }}
          className={`w-full h-auto rounded-md mb-4 ${
            character.universe === 'league-of-legends' ? 'max-h-[700px]' : ''
          }`}
        />
        <h2 className="text-lg font-medium text-center">{character.name}</h2>
      </div>
    </div>,
    document.body
  );
};

export default CharacterModal;
