import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  DndContext, 
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTheme } from '../context/ThemeContext';
import Tier from './Tier';
import CharacterCard, { PlainCharacterCard } from './CharacterCard';
import CharacterPool from './CharacterPool';
import UnknownCharactersPanel from './UnknownCharactersPanel';
import { Character } from '../types/types';

interface TierListGridProps {
  characters: Character[];
  onUnknownChange?: (chars: Character[]) => void;
  unknownContainer?: HTMLElement | null;
}

// Default tier ranks
const defaultTiers = [
  { id: 'S', label: 'S', color: '#FF7675' },
  { id: 'A', label: 'A', color: '#FDCB6E' },
  { id: 'B', label: 'B', color: '#74B9FF' },
  { id: 'C', label: 'C', color: '#55EFC4' },
  { id: 'D', label: 'D', color: '#A29BFE' },
  { id: 'F', label: 'F', color: '#636E72' }
];

const TierListGrid: React.FC<TierListGridProps> = ({ characters, onUnknownChange, unknownContainer }) => {
  const { themeColors } = useTheme();
  const [tiers, setTiers] = useState(defaultTiers);
  const [characterMap, setCharacterMap] = useState<Record<string, string[]>>(() => {
    // Initialize with all characters in the pool
    return {
      pool: characters.map(char => char.id),
      unknown: [],
      ...Object.fromEntries(tiers.map(tier => [tier.id, []]))
    };
  });
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (onUnknownChange) {
      const unknownChars = characterMap.unknown.map(id => characters.find(c => c.id === id)!).filter(Boolean);
      onUnknownChange(unknownChars);
    }
  }, [characterMap.unknown, characters, onUnknownChange]);
  
  // Find the active character
  const activeCharacter = activeId ? characters.find(char => char.id === activeId) : null;
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // Extract IDs
      const activeId = active.id as string;
      const overId = over.id as string;
      
      // Find which container (tier or pool) the items are in
      let activeContainer: string | null = null;
      let overContainer: string | null = null;
      
      // Find containers
      Object.entries(characterMap).forEach(([containerId, items]) => {
        if (items.includes(activeId)) {
          activeContainer = containerId;
        }
        
        // Check if over ID is a container
        if (containerId === overId) {
          overContainer = overId;
        } else if (items.includes(overId)) {
          overContainer = containerId;
        }
      });
      
      if (activeContainer && overContainer) {
        // If moving between containers
        if (activeContainer !== overContainer) {
          setCharacterMap(prev => {
            const result = { ...prev };
            
            // Remove from old container
            result[activeContainer!] = prev[activeContainer!].filter(id => id !== activeId);
            
            // Add to new container
            if (overContainer === overId) {
              // If dropping directly on a container
              result[overContainer] = [...prev[overContainer], activeId];
            } else {
              // If dropping on an item in a container
              const overIndex = prev[overContainer].indexOf(overId);
              const newItems = [...prev[overContainer]];
              newItems.splice(overIndex, 0, activeId);
              result[overContainer] = newItems;
            }
            
            return result;
          });
        } else {
          // If reordering within the same container
          const items = characterMap[activeContainer];
          const activeIndex = items.indexOf(activeId);
          const overIndex = items.indexOf(overId);
          
          if (activeIndex !== -1 && overIndex !== -1) {
            setCharacterMap(prev => {
              const result = { ...prev };
              result[activeContainer!] = arrayMove(items, activeIndex, overIndex);
              return result;
            });
          }
        }
      }
    }
    
    setActiveId(null);
  };
  
  const addTier = () => {
    const newTierId = `Tier ${tiers.length + 1}`;
    setTiers([...tiers, { 
      id: newTierId, 
      label: newTierId, 
      color: `#${Math.floor(Math.random()*16777215).toString(16)}` 
    }]);
    setCharacterMap(prev => ({
      ...prev,
      [newTierId]: []
    }));
  };
  
  const removeTier = (tierId: string) => {
    // Move characters from this tier back to the pool
    setCharacterMap(prev => {
      const result = { ...prev };
      const tierCharacters = result[tierId] || [];
      
      // Remove the tier
      delete result[tierId];
      
      // Add its characters back to the pool
      result.pool = [...result.pool, ...tierCharacters];
      
      return result;
    });
    
    // Remove the tier from the tiers list
    setTiers(tiers.filter(tier => tier.id !== tierId));
  };
  
  const updateTier = (tierId: string, newLabel: string, newColor: string) => {
    setTiers(tiers.map(tier =>
      tier.id === tierId ? { ...tier, label: newLabel, color: newColor } : tier
    ));
  };


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col space-y-4 mb-8">
        <SortableContext items={tiers.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tiers.map(tier => (
            <Tier
              key={tier.id}
              id={tier.id}
              label={tier.label}
              color={tier.color}
              characters={characterMap[tier.id].map(id => characters.find(c => c.id === id)!)}
              onRemove={() => removeTier(tier.id)}
              onUpdate={(label, color) => updateTier(tier.id, label, color)}
            />
          ))}
        </SortableContext>
        
        <button
          onClick={addTier}
          className="py-2 px-4 rounded-md text-white self-start transition-all hover:opacity-90"
          style={{ backgroundColor: themeColors.primary }}
        >
          + Add Tier
        </button>
      </div>
      
      <div className="mb-16">
        <CharacterPool
          id="pool"
          characters={characterMap.pool.map(id => characters.find(c => c.id === id)!)}
        />
      </div>
      
      <DragOverlay>
        {activeId && activeCharacter ? (
          <PlainCharacterCard character={activeCharacter} isDragging={true} />
        ) : null}
      </DragOverlay>
      {unknownContainer &&
        createPortal(
          <UnknownCharactersPanel
            id="unknown"
            characters={characterMap.unknown.map(
              id => characters.find(c => c.id === id)!
            )}
          />,
          unknownContainer
        )}
    </DndContext>
  );
};

export default TierListGrid;