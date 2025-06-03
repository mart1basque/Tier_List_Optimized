import axios from 'axios';
import { Character } from '../types/types';
import { UniverseType } from '../data/universes';

// For demo purposes, this returns mock data
// In a real app, you'd connect to actual APIs
export const fetchCharacters = async (
  universe: UniverseType,
  filters: string[]
): Promise<Character[]> => {
  if (universe === 'pokemon') {
    return fetchPokemonCharacters(filters);
  }

  // For demonstration, simulate an API request with a timeout for other universes
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockCharacters(universe, filters));
    }, 1000);
  });
};

// Generate mock characters for demonstration
function getMockCharacters(universe: UniverseType, filters: string[]): Character[] {
  let characters: Character[] = [];
  
  switch (universe) {
    case 'naruto':
      characters = generateNarutoCharacters(filters);
      break;
    case 'one-piece':
      characters = generateOnePieceCharacters(filters);
      break;
    case 'dragon-ball':
      characters = generateDragonBallCharacters(filters);
      break;
    case 'demon-slayer':
      characters = generateDemonSlayerCharacters(filters);
      break;
  }
  
  return characters;
}

async function fetchPokemonCharacters(filters: string[]): Promise<Character[]> {
  const generationIds: Record<string, number> = {
    gen1: 1,
    gen2: 2,
    gen3: 3,
    gen4: 4,
    gen5: 5,
    gen6: 6,
    gen7: 7,
    gen8: 8,
    gen9: 9,
  };

  const result: Character[] = [];

  await Promise.all(
    filters.map(async (filter) => {
      const genId = generationIds[filter];
      if (!genId) return;

      const { data } = await axios.get(`https://pokeapi.co/api/v2/generation/${genId}`);

      data.pokemon_species.forEach((species: { name: string; url: string }) => {
        const id = parseInt(
          species.url.split('/').filter(Boolean).pop() ?? '0',
          10
        );
        result.push({
          id: `pokemon-${id}`,
          name: formatPokemonName(species.name),
          image:
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          universe: 'pokemon',
        });
      });
    })
  );

  return result.sort((a, b) => {
    const idA = parseInt(a.id.split('-')[1], 10);
    const idB = parseInt(b.id.split('-')[1], 10);
    return idA - idB;
  });
}

function formatPokemonName(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function generateNarutoCharacters(filters: string[]): Character[] {
  const characters: Character[] = [
    { id: 'naruto-1', name: 'Naruto Uzumaki', image: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'naruto' },
    { id: 'naruto-2', name: 'Sasuke Uchiha', image: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'naruto' },
    { id: 'naruto-3', name: 'Sakura Haruno', image: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'naruto' },
    { id: 'naruto-4', name: 'Kakashi Hatake', image: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'naruto' },
    { id: 'naruto-5', name: 'Itachi Uchiha', image: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'naruto' },
    { id: 'naruto-6', name: 'Jiraiya', image: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'naruto' },
    { id: 'naruto-7', name: 'Tsunade', image: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'naruto' },
    { id: 'naruto-8', name: 'Orochimaru', image: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'naruto' },
    { id: 'naruto-9', name: 'Rock Lee', image: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'naruto' },
    { id: 'naruto-10', name: 'Gaara', image: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'naruto' },
  ];
  
  // In a real app, filter based on selected filters
  return characters;
}

function generateOnePieceCharacters(filters: string[]): Character[] {
  const characters: Character[] = [
    { id: 'onepiece-1', name: 'Monkey D. Luffy', image: 'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'one-piece' },
    { id: 'onepiece-2', name: 'Roronoa Zoro', image: 'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'one-piece' },
    { id: 'onepiece-3', name: 'Nami', image: 'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'one-piece' },
    { id: 'onepiece-4', name: 'Usopp', image: 'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'one-piece' },
    { id: 'onepiece-5', name: 'Sanji', image: 'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'one-piece' },
    { id: 'onepiece-6', name: 'Tony Tony Chopper', image: 'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'one-piece' },
    { id: 'onepiece-7', name: 'Nico Robin', image: 'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'one-piece' },
    { id: 'onepiece-8', name: 'Franky', image: 'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'one-piece' },
    { id: 'onepiece-9', name: 'Brook', image: 'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'one-piece' },
    { id: 'onepiece-10', name: 'Jinbe', image: 'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'one-piece' },
  ];
  
  return characters;
}

function generateDragonBallCharacters(filters: string[]): Character[] {
  const characters: Character[] = [
    { id: 'dragonball-1', name: 'Goku', image: 'https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'dragon-ball' },
    { id: 'dragonball-2', name: 'Vegeta', image: 'https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'dragon-ball' },
    { id: 'dragonball-3', name: 'Gohan', image: 'https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'dragon-ball' },
    { id: 'dragonball-4', name: 'Piccolo', image: 'https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'dragon-ball' },
    { id: 'dragonball-5', name: 'Frieza', image: 'https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'dragon-ball' },
    { id: 'dragonball-6', name: 'Cell', image: 'https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'dragon-ball' },
    { id: 'dragonball-7', name: 'Majin Buu', image: 'https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'dragon-ball' },
    { id: 'dragonball-8', name: 'Trunks', image: 'https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'dragon-ball' },
    { id: 'dragonball-9', name: 'Krillin', image: 'https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'dragon-ball' },
    { id: 'dragonball-10', name: 'Bulma', image: 'https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'dragon-ball' },
  ];
  
  return characters;
}

function generateDemonSlayerCharacters(filters: string[]): Character[] {
  const characters: Character[] = [
    { id: 'demonslayer-1', name: 'Tanjiro Kamado', image: 'https://images.pexels.com/photos/6538889/pexels-photo-6538889.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'demon-slayer' },
    { id: 'demonslayer-2', name: 'Nezuko Kamado', image: 'https://images.pexels.com/photos/6538889/pexels-photo-6538889.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'demon-slayer' },
    { id: 'demonslayer-3', name: 'Zenitsu Agatsuma', image: 'https://images.pexels.com/photos/6538889/pexels-photo-6538889.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'demon-slayer' },
    { id: 'demonslayer-4', name: 'Inosuke Hashibira', image: 'https://images.pexels.com/photos/6538889/pexels-photo-6538889.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'demon-slayer' },
    { id: 'demonslayer-5', name: 'Giyu Tomioka', image: 'https://images.pexels.com/photos/6538889/pexels-photo-6538889.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'demon-slayer' },
    { id: 'demonslayer-6', name: 'Shinobu Kocho', image: 'https://images.pexels.com/photos/6538889/pexels-photo-6538889.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'demon-slayer' },
    { id: 'demonslayer-7', name: 'Kyojuro Rengoku', image: 'https://images.pexels.com/photos/6538889/pexels-photo-6538889.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'demon-slayer' },
    { id: 'demonslayer-8', name: 'Tengen Uzui', image: 'https://images.pexels.com/photos/6538889/pexels-photo-6538889.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'demon-slayer' },
    { id: 'demonslayer-9', name: 'Muzan Kibutsuji', image: 'https://images.pexels.com/photos/6538889/pexels-photo-6538889.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'demon-slayer' },
    { id: 'demonslayer-10', name: 'Akaza', image: 'https://images.pexels.com/photos/6538889/pexels-photo-6538889.jpeg?auto=compress&cs=tinysrgb&w=150', universe: 'demon-slayer' },
  ];
  
  return characters;
}
