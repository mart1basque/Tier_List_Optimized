import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Character } from '../types/types';
import CharacterModal from './CharacterModal';

interface CharacterCardProps {
  character: Character;
  isDragging?: boolean;
}

/**
 * Simple presentation component used for both the sortable item and the drag
 * overlay. This component itself does not register with dnd-kit.
 */
export const PlainCharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isDragging = false,
}) => (
  <div
  className="relative w-16 h-16 cursor-grab group active:cursor-grabbing rounded-md overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow dark:border-gray-500"
    style={{ opacity: isDragging ? 0.8 : 1 }}
  >
    <img
      src={character.thumbnail ?? character.image}
      alt={character.name}
      className={`w-full h-full ${
        character.universe === 'temtem'
          ? 'object-contain p-1'
          : 'object-cover'
      } ${character.universe === 'league-of-legends' ? 'scale-[1.15]' : ''}`}
    />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-end justify-center">
      <span className="text-white text-xs font-medium px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity truncate max-w-full">
        {character.name}
      </span>
    </div>
  </div>
);

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isDragging = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isActive,
  } = useSortable({ id: character.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isActive ? 0.5 : 1,
  };
  
  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative w-16 h-16 cursor-grab group active:cursor-grabbing rounded-md overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow dark:border-gray-500"
        onClick={() => setModalOpen(true)}
      >
        <img
          src={character.thumbnail ?? character.image}
          alt={character.name}
          className={`w-full h-full ${
            character.universe === 'temtem'
              ? 'object-contain p-1'
              : 'object-cover'
          } ${character.universe === 'league-of-legends' ? 'scale-[1.15]' : ''}`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-end justify-center">
          <span className="text-white text-xs font-medium px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity truncate max-w-full">
            {character.name}
          </span>
        </div>
      </div>
      {modalOpen && (
        <CharacterModal character={character} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};

export default CharacterCard;