import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Character } from '../types/types';

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose }) => {
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-4 relative max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-auto rounded-md mb-4"
          draggable={false}
        />
        <h2 className="text-lg font-medium text-center">{character.name}</h2>
      </div>
    </div>,
    document.body
  );
};

export default CharacterModal;
