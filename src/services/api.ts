import axios from 'axios';
import { Character } from '../types/types';
import { UniverseType } from '../data/universes';

function createPlaceholderImage(name: string, color: string): string {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'>` +
    `<rect width='100%' height='100%' fill='${color}'/>` +
    `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' ` +
    `fill='#fff' font-size='60' font-family='Arial, sans-serif'>${initials}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

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
    { id: 'naruto-1', name: 'Naruto Uzumaki', image: createPlaceholderImage('Naruto Uzumaki', '#FF7800'), universe: 'naruto' },
    { id: 'naruto-2', name: 'Sasuke Uchiha', image: createPlaceholderImage('Sasuke Uchiha', '#FF7800'), universe: 'naruto' },
    { id: 'naruto-3', name: 'Sakura Haruno', image: createPlaceholderImage('Sakura Haruno', '#FF7800'), universe: 'naruto' },
    { id: 'naruto-4', name: 'Kakashi Hatake', image: createPlaceholderImage('Kakashi Hatake', '#FF7800'), universe: 'naruto' },
    { id: 'naruto-5', name: 'Itachi Uchiha', image: createPlaceholderImage('Itachi Uchiha', '#FF7800'), universe: 'naruto' },
    { id: 'naruto-6', name: 'Jiraiya', image: createPlaceholderImage('Jiraiya', '#FF7800'), universe: 'naruto' },
    { id: 'naruto-7', name: 'Tsunade', image: createPlaceholderImage('Tsunade', '#FF7800'), universe: 'naruto' },
    { id: 'naruto-8', name: 'Orochimaru', image: createPlaceholderImage('Orochimaru', '#FF7800'), universe: 'naruto' },
    { id: 'naruto-9', name: 'Rock Lee', image: createPlaceholderImage('Rock Lee', '#FF7800'), universe: 'naruto' },
    { id: 'naruto-10', name: 'Gaara', image: createPlaceholderImage('Gaara', '#FF7800'), universe: 'naruto' },
  ];
  
  // In a real app, filter based on selected filters
  return characters;
}

function generateOnePieceCharacters(filters: string[]): Character[] {
  const characters: Character[] = [
    { id: 'onepiece-1', name: 'Monkey D. Luffy', image: createPlaceholderImage('Monkey D. Luffy', '#00A3E0'), universe: 'one-piece' },
    { id: 'onepiece-2', name: 'Roronoa Zoro', image: createPlaceholderImage('Roronoa Zoro', '#00A3E0'), universe: 'one-piece' },
    { id: 'onepiece-3', name: 'Nami', image: createPlaceholderImage('Nami', '#00A3E0'), universe: 'one-piece' },
    { id: 'onepiece-4', name: 'Usopp', image: createPlaceholderImage('Usopp', '#00A3E0'), universe: 'one-piece' },
    { id: 'onepiece-5', name: 'Sanji', image: createPlaceholderImage('Sanji', '#00A3E0'), universe: 'one-piece' },
    { id: 'onepiece-6', name: 'Tony Tony Chopper', image: createPlaceholderImage('Tony Tony Chopper', '#00A3E0'), universe: 'one-piece' },
    { id: 'onepiece-7', name: 'Nico Robin', image: createPlaceholderImage('Nico Robin', '#00A3E0'), universe: 'one-piece' },
    { id: 'onepiece-8', name: 'Franky', image: createPlaceholderImage('Franky', '#00A3E0'), universe: 'one-piece' },
    { id: 'onepiece-9', name: 'Brook', image: createPlaceholderImage('Brook', '#00A3E0'), universe: 'one-piece' },
    { id: 'onepiece-10', name: 'Jinbe', image: createPlaceholderImage('Jinbe', '#00A3E0'), universe: 'one-piece' },
  ];
  
  return characters;
}

function generateDragonBallCharacters(filters: string[]): Character[] {
  const characters: Character[] = [
    { id: 'dragonball-1', name: 'Goku', image: createPlaceholderImage('Goku', '#FF9232'), universe: 'dragon-ball' },
    { id: 'dragonball-2', name: 'Vegeta', image: createPlaceholderImage('Vegeta', '#FF9232'), universe: 'dragon-ball' },
    { id: 'dragonball-3', name: 'Gohan', image: createPlaceholderImage('Gohan', '#FF9232'), universe: 'dragon-ball' },
    { id: 'dragonball-4', name: 'Piccolo', image: createPlaceholderImage('Piccolo', '#FF9232'), universe: 'dragon-ball' },
    { id: 'dragonball-5', name: 'Frieza', image: createPlaceholderImage('Frieza', '#FF9232'), universe: 'dragon-ball' },
    { id: 'dragonball-6', name: 'Cell', image: createPlaceholderImage('Cell', '#FF9232'), universe: 'dragon-ball' },
    { id: 'dragonball-7', name: 'Majin Buu', image: createPlaceholderImage('Majin Buu', '#FF9232'), universe: 'dragon-ball' },
    { id: 'dragonball-8', name: 'Trunks', image: createPlaceholderImage('Trunks', '#FF9232'), universe: 'dragon-ball' },
    { id: 'dragonball-9', name: 'Krillin', image: createPlaceholderImage('Krillin', '#FF9232'), universe: 'dragon-ball' },
    { id: 'dragonball-10', name: 'Bulma', image: createPlaceholderImage('Bulma', '#FF9232'), universe: 'dragon-ball' },
  ];
  
  return characters;
}

function generateDemonSlayerCharacters(filters: string[]): Character[] {
  const characters: Character[] = [
    { id: 'demonslayer-1', name: 'Tanjiro Kamado', image: createPlaceholderImage('Tanjiro Kamado', '#28593C'), universe: 'demon-slayer' },
    { id: 'demonslayer-2', name: 'Nezuko Kamado', image: createPlaceholderImage('Nezuko Kamado', '#28593C'), universe: 'demon-slayer' },
    { id: 'demonslayer-3', name: 'Zenitsu Agatsuma', image: createPlaceholderImage('Zenitsu Agatsuma', '#28593C'), universe: 'demon-slayer' },
    { id: 'demonslayer-4', name: 'Inosuke Hashibira', image: createPlaceholderImage('Inosuke Hashibira', '#28593C'), universe: 'demon-slayer' },
    { id: 'demonslayer-5', name: 'Giyu Tomioka', image: createPlaceholderImage('Giyu Tomioka', '#28593C'), universe: 'demon-slayer' },
    { id: 'demonslayer-6', name: 'Shinobu Kocho', image: createPlaceholderImage('Shinobu Kocho', '#28593C'), universe: 'demon-slayer' },
    { id: 'demonslayer-7', name: 'Kyojuro Rengoku', image: createPlaceholderImage('Kyojuro Rengoku', '#28593C'), universe: 'demon-slayer' },
    { id: 'demonslayer-8', name: 'Tengen Uzui', image: createPlaceholderImage('Tengen Uzui', '#28593C'), universe: 'demon-slayer' },
    { id: 'demonslayer-9', name: 'Muzan Kibutsuji', image: createPlaceholderImage('Muzan Kibutsuji', '#28593C'), universe: 'demon-slayer' },
    { id: 'demonslayer-10', name: 'Akaza', image: createPlaceholderImage('Akaza', '#28593C'), universe: 'demon-slayer' },
  ];
  
  return characters;
}
