import React, { useState, useCallback } from 'react';
import { useSortable, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Edit2 } from 'lucide-react';
import { Character } from '../types/types';
import CharacterCard, { PlainCharacterCard } from './CharacterCard';
import { useTheme } from '../context/ThemeContext';

interface TierProps {
  id: string;
  label: string;
  color: string;
  characters: Character[];
  onRemove: () => void;
  onUpdate: (label: string, color: string) => void;
  activeCharacter?: Character | null;
}

const Tier: React.FC<TierProps> = ({ id, label, color, characters, onRemove, onUpdate, activeCharacter }) => {
  const { themeColors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(label);
  const [newColor, setNewColor] = useState(color);
  
  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
  } = useSortable({ id: `tier-${id}` });
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id });

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      setSortableRef(node);
      setDroppableRef(node);
    },
    [setSortableRef, setDroppableRef]
  );
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const handleEditSave = () => {
    if (isEditing) {
      onUpdate(newLabel, newColor);
    }
    setIsEditing(!isEditing);
  };
  
  return (
    <div
      ref={setRefs}
      style={style}
      className="flex flex-col w-full rounded-lg bg-white shadow-md overflow-hidden dark:bg-gray-800 dark:text-white"
    >
      <div className="flex items-stretch">
        <div
          className="w-24 flex items-center justify-center cursor-move"
          style={{ backgroundColor: color }}
          {...attributes}
          {...listeners}
        >
          {isEditing ? (
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="w-16 h-10 cursor-pointer"
            />
          ) : (
            <span className="text-xl font-bold text-white drop-shadow-sm">
              {label}
            </span>
          )}
        </div>
        
        <div
          className="flex-1 w-full min-h-20 p-2 flex flex-wrap items-center gap-2 bg-gray-50 dark:bg-gray-700"
        >
          {isEditing ? (
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="px-2 py-1 border rounded"
              autoFocus
            />
          ) : (
            <SortableContext items={characters.map((c) => c.id)} strategy={rectSortingStrategy}>
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
              {characters.length === 0 && !isOver && (
                <span className="text-gray-400 italic dark:text-gray-500 block w-full text-center">
                  Drag characters here
                </span>
              )}
              {isOver && activeCharacter && characters.length === 0 && (
                <PlainCharacterCard character={activeCharacter} isDragging />
              )}
            </SortableContext>
          )}
        </div>
        
        <div className="flex flex-col bg-gray-100 border-l border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <button
            onClick={handleEditSave}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors dark:text-gray-300 dark:hover:text-white"
            title={isEditing ? "Save" : "Edit tier"}
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={onRemove}
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-200 transition-colors dark:text-gray-300 dark:hover:text-red-400"
            title="Delete tier"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tier;
