import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import type { Modifier } from '@dnd-kit/core';
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
  const initialScroll = useRef({ x: 0, y: 0 });
  const scrollListener = useRef<() => void>();
  const [scrollOffset, setScrollOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (onUnknownChange) {
      const unknownChars = characterMap.unknown.map(id => characters.find(c => c.id === id)!).filter(Boolean);
      onUnknownChange(unknownChars);
    }
  }, [characterMap.unknown, characters, onUnknownChange]);

  // Update character map when character or tier lists change
  useEffect(() => {
    setCharacterMap(prev => {
      const charIds = new Set(characters.map(c => c.id));

      const updated: Record<string, string[]> = {
        pool: prev.pool.filter(id => charIds.has(id)),
        unknown: prev.unknown.filter(id => charIds.has(id)),
      };

      tiers.forEach(t => {
        updated[t.id] = (prev[t.id] || []).filter(id => charIds.has(id));
      });

      const assigned = new Set<string>(Object.values(updated).flat());
      characters.forEach(c => {
        if (!assigned.has(c.id)) {
          updated.pool.push(c.id);
        }
      });

      return updated;
    });
  }, [characters, tiers]);
  
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

  const snapCenterWithScroll = useCallback<Modifier>(
    (args) => {
      const transform = snapCenterToCursor(args);
      return {
        ...transform,
        x: transform.x + scrollOffset.x,
        y: transform.y + scrollOffset.y,
      };
    },
    [scrollOffset]
  );
  
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    initialScroll.current = { x: window.scrollX, y: window.scrollY };
    const onScroll = () => {
      setScrollOffset({
        x: window.scrollX - initialScroll.current.x,
        y: window.scrollY - initialScroll.current.y,
      });
    };
    scrollListener.current = onScroll;
    window.addEventListener('scroll', onScroll);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    let activeId = active.id as string;
    let overId = over.id as string;

    // Handle tier reordering
    if (activeId.startsWith('tier-') && overId.startsWith('tier-')) {
      const activeIndex = tiers.findIndex(t => `tier-${t.id}` === activeId);
      const overIndex = tiers.findIndex(t => `tier-${t.id}` === overId);
      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
        setTiers(prev => arrayMove(prev, activeIndex, overIndex));
      }
      setActiveId(null);
      if (scrollListener.current) {
        window.removeEventListener('scroll', scrollListener.current);
        scrollListener.current = undefined;
      }
      setScrollOffset({ x: 0, y: 0 });
      return;
    }

    if (overId.startsWith('tier-')) {
      overId = overId.slice(5);
    }
    if (activeId.startsWith('tier-')) {
      activeId = activeId.slice(5);
    }

    if (activeId !== overId) {
      let activeContainer: string | null = null;
      let overContainer: string | null = null;
      Object.entries(characterMap).forEach(([containerId, items]) => {
        if (items.includes(activeId)) {
          activeContainer = containerId;
        }
        if (containerId === overId) {
          overContainer = overId;
        } else if (items.includes(overId)) {
          overContainer = containerId;
        }
      });

      if (activeContainer && overContainer) {
        if (activeContainer !== overContainer) {
          setCharacterMap(prev => {
            const result = { ...prev };
            result[activeContainer!] = prev[activeContainer!].filter(id => id !== activeId);
            if (overContainer === overId) {
              result[overContainer] = [...prev[overContainer], activeId];
            } else {
              const overIndex = prev[overContainer].indexOf(overId);
              const newItems = [...prev[overContainer]];
              newItems.splice(overIndex, 0, activeId);
              result[overContainer] = newItems;
            }
            return result;
          });
        } else {
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
    if (scrollListener.current) {
      window.removeEventListener('scroll', scrollListener.current);
      scrollListener.current = undefined;
    }
    setScrollOffset({ x: 0, y: 0 });
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
  modifiers={[snapCenterWithScroll]}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
>
      <div className="flex flex-col space-y-4 mb-8">
        <SortableContext items={tiers.map(t => `tier-${t.id}`)} strategy={verticalListSortingStrategy}>
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