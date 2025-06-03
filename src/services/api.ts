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

  if (universe === 'dragon-ball') {
    try {
      return await fetchDragonBallCharacters(filters);
    } catch (error) {
      console.error('Error fetching Dragon Ball characters:', error);
      // Fall back to mock data if the API call fails
      return generateDragonBallCharacters(filters);
    }
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

// Fetch Dragon Ball characters from a public API
async function fetchDragonBallCharacters(filters: string[]): Promise<Character[]> {
  const url = 'https://dragonball-api.com/api/characters?limit=1000';
  const { data } = await axios.get(url);

  const results = Array.isArray(data)
    ? data
    : data.items || data.results || [];

  return results.map((item: any) => ({
    id: `dragonball-${item.id ?? item._id ?? item.name}`,
    name: item.name,
    image: item.image || item.avatar || createPlaceholderImage(item.name, '#FF9232'),
    universe: 'dragon-ball',
  }));
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
  const bySaga: Record<string, Character[]> = {
    'east-blue': [
      { id: 'onepiece-eastblue-1', name: 'Monkey D. Luffy', image: createPlaceholderImage('Monkey D. Luffy', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-eastblue-2', name: 'Roronoa Zoro', image: createPlaceholderImage('Roronoa Zoro', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-eastblue-3', name: 'Nami', image: createPlaceholderImage('Nami', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-eastblue-4', name: 'Usopp', image: createPlaceholderImage('Usopp', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-eastblue-5', name: 'Sanji', image: createPlaceholderImage('Sanji', '#00A3E0'), universe: 'one-piece' },
    ],
    'alabasta': [
      { id: 'onepiece-alabasta-1', name: 'Vivi', image: createPlaceholderImage('Vivi', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-alabasta-2', name: 'Crocodile', image: createPlaceholderImage('Crocodile', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-alabasta-3', name: 'Ace', image: createPlaceholderImage('Ace', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-alabasta-4', name: 'Smoker', image: createPlaceholderImage('Smoker', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-alabasta-5', name: 'Tashigi', image: createPlaceholderImage('Tashigi', '#00A3E0'), universe: 'one-piece' },
    ],
    'sky-island': [
      { id: 'onepiece-sky-1', name: 'Enel', image: createPlaceholderImage('Enel', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-sky-2', name: 'Gan Fall', image: createPlaceholderImage('Gan Fall', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-sky-3', name: 'Conis', image: createPlaceholderImage('Conis', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-sky-4', name: 'Pagaya', image: createPlaceholderImage('Pagaya', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-sky-5', name: 'Wyper', image: createPlaceholderImage('Wyper', '#00A3E0'), universe: 'one-piece' },
    ],
    'water-7': [
      { id: 'onepiece-water7-1', name: 'Iceburg', image: createPlaceholderImage('Iceburg', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-water7-2', name: 'Paulie', image: createPlaceholderImage('Paulie', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-water7-3', name: 'Rob Lucci', image: createPlaceholderImage('Rob Lucci', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-water7-4', name: 'Kaku', image: createPlaceholderImage('Kaku', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-water7-5', name: 'Kalifa', image: createPlaceholderImage('Kalifa', '#00A3E0'), universe: 'one-piece' },
    ],
    'thriller-bark': [
      { id: 'onepiece-thriller-1', name: 'Gecko Moria', image: createPlaceholderImage('Gecko Moria', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-thriller-2', name: 'Perona', image: createPlaceholderImage('Perona', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-thriller-3', name: 'Brook', image: createPlaceholderImage('Brook', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-thriller-4', name: 'Oars', image: createPlaceholderImage('Oars', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-thriller-5', name: 'Hogback', image: createPlaceholderImage('Hogback', '#00A3E0'), universe: 'one-piece' },
    ],
    'summit-war': [
      { id: 'onepiece-summit-1', name: 'Whitebeard', image: createPlaceholderImage('Whitebeard', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-summit-2', name: 'Marco', image: createPlaceholderImage('Marco', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-summit-3', name: 'Boa Hancock', image: createPlaceholderImage('Boa Hancock', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-summit-4', name: 'Garp', image: createPlaceholderImage('Garp', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-summit-5', name: 'Sengoku', image: createPlaceholderImage('Sengoku', '#00A3E0'), universe: 'one-piece' },
    ],
    'fishman-island': [
      { id: 'onepiece-fishman-1', name: 'Hody Jones', image: createPlaceholderImage('Hody Jones', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-fishman-2', name: 'Shirahoshi', image: createPlaceholderImage('Shirahoshi', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-fishman-3', name: 'Fisher Tiger', image: createPlaceholderImage('Fisher Tiger', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-fishman-4', name: 'Jinbe', image: createPlaceholderImage('Jinbe', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-fishman-5', name: 'Arlong', image: createPlaceholderImage('Arlong', '#00A3E0'), universe: 'one-piece' },
    ],
    'dressrosa': [
      { id: 'onepiece-dressrosa-1', name: 'Doflamingo', image: createPlaceholderImage('Doflamingo', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-dressrosa-2', name: 'Law', image: createPlaceholderImage('Law', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-dressrosa-3', name: 'Rebecca', image: createPlaceholderImage('Rebecca', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-dressrosa-4', name: 'Sabo', image: createPlaceholderImage('Sabo', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-dressrosa-5', name: 'Kyros', image: createPlaceholderImage('Kyros', '#00A3E0'), universe: 'one-piece' },
    ],
    'whole-cake': [
      { id: 'onepiece-wholecake-1', name: 'Big Mom', image: createPlaceholderImage('Big Mom', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-wholecake-2', name: 'Katakuri', image: createPlaceholderImage('Katakuri', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-wholecake-3', name: 'Pudding', image: createPlaceholderImage('Pudding', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-wholecake-4', name: 'Pedro', image: createPlaceholderImage('Pedro', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-wholecake-5', name: 'Carrot', image: createPlaceholderImage('Carrot', '#00A3E0'), universe: 'one-piece' },
    ],
    'wano': [
      { id: 'onepiece-wano-1', name: 'Kaido', image: createPlaceholderImage('Kaido', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-wano-2', name: 'Kozuki Oden', image: createPlaceholderImage('Kozuki Oden', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-wano-3', name: 'Yamato', image: createPlaceholderImage('Yamato', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-wano-4', name: 'Kidd', image: createPlaceholderImage('Kidd', '#00A3E0'), universe: 'one-piece' },
      { id: 'onepiece-wano-5', name: 'Killer', image: createPlaceholderImage('Killer', '#00A3E0'), universe: 'one-piece' },
    ],
  };

  const characters: Character[] = [];
  filters.forEach((filter) => {
    const sagaChars = bySaga[filter];
    if (sagaChars) {
      characters.push(...sagaChars);
    }
  });

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
