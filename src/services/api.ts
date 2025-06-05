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
  filters: string[],
  language: 'en' | 'fr' = 'en'
): Promise<Character[]> => {
  if (universe === 'pokemon') {
    try {
      return await fetchPokemonCharacters(filters, language);
    } catch (error) {
      console.error('Error fetching Pokemon characters:', error);
      return generatePokemonCharacters(filters, language);
    }
  }

  if (universe === 'dragon-ball') {
    try {
      return await fetchDragonBallCharacters(filters);
    } catch (error) {
      console.error('Error fetching Dragon Ball characters:', error);
      // Fallback to local dataset to keep the categories consistent
      return generateDragonBallCharacters(filters);
    }
  }

  if (universe === 'naruto') {
    try {
      return await fetchNarutoCharacters(filters);
    } catch (error) {
      console.error('Error fetching Naruto characters:', error);
      return generateNarutoCharacters(filters);
    }
  }

  if (universe === 'olive-et-tom') {
    try {
      return await fetchOliveEtTomCharacters(filters);
    } catch (error) {
      console.error('Error fetching Olive et Tom characters:', error);
      return generateOliveEtTomCharacters(filters);
    }
  }

  if (universe === 'demon-slayer') {
    try {
      return await fetchDemonSlayerCharacters(filters);
    } catch (error) {
      console.error('Error fetching Demon Slayer characters:', error);
      return generateDemonSlayerCharacters(filters);
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
    case 'olive-et-tom':
      characters = generateOliveEtTomCharacters(filters);
      break;
  }
  
  return characters;
}

function generatePokemonCharacters(
  filters: string[],
  language: 'en' | 'fr' = 'en'
): Character[] {
  const data: Record<string, { id: number; en: string; fr: string }[]> = {
    gen1: [
      { id: 1, en: 'Bulbasaur', fr: 'Bulbizarre' },
      { id: 4, en: 'Charmander', fr: 'Salamèche' },
      { id: 7, en: 'Squirtle', fr: 'Carapuce' },
      { id: 25, en: 'Pikachu', fr: 'Pikachu' },
      { id: 39, en: 'Jigglypuff', fr: 'Rondoudou' },
    ],
    gen2: [
      { id: 152, en: 'Chikorita', fr: 'Germignon' },
      { id: 155, en: 'Cyndaquil', fr: 'Héricendre' },
      { id: 158, en: 'Totodile', fr: 'Kaiminus' },
      { id: 175, en: 'Togepi', fr: 'Togepi' },
      { id: 196, en: 'Espeon', fr: 'Mentali' },
    ],
    gen3: [
      { id: 252, en: 'Treecko', fr: 'Arcko' },
      { id: 255, en: 'Torchic', fr: 'Poussifeu' },
      { id: 258, en: 'Mudkip', fr: 'Gobou' },
      { id: 280, en: 'Ralts', fr: 'Tarsal' },
      { id: 300, en: 'Skitty', fr: 'Skitty' },
    ],
    gen4: [
      { id: 387, en: 'Turtwig', fr: 'Tortipouss' },
      { id: 390, en: 'Chimchar', fr: 'Ouisticram' },
      { id: 393, en: 'Piplup', fr: 'Tiplouf' },
      { id: 404, en: 'Luxio', fr: 'Luxio' },
      { id: 417, en: 'Pachirisu', fr: 'Pachirisu' },
    ],
    gen5: [
      { id: 495, en: 'Snivy', fr: 'Vipélierre' },
      { id: 498, en: 'Tepig', fr: 'Gruikui' },
      { id: 501, en: 'Oshawott', fr: 'Moustillon' },
      { id: 509, en: 'Purrloin', fr: 'Chacripan' },
      { id: 519, en: 'Pidove', fr: 'Poichigeon' },
    ],
    gen6: [
      { id: 650, en: 'Chespin', fr: 'Marisson' },
      { id: 653, en: 'Fennekin', fr: 'Feunnec' },
      { id: 656, en: 'Froakie', fr: 'Grenousse' },
      { id: 669, en: 'Flabébé', fr: 'Flabébé' },
      { id: 700, en: 'Sylveon', fr: 'Nymphali' },
    ],
    gen7: [
      { id: 722, en: 'Rowlet', fr: 'Brindibou' },
      { id: 725, en: 'Litten', fr: 'Flamiaou' },
      { id: 728, en: 'Popplio', fr: 'Otaquin' },
      { id: 734, en: 'Yungoos', fr: 'Manglouton' },
      { id: 743, en: 'Ribombee', fr: 'Rubombelle' },
    ],
    gen8: [
      { id: 810, en: 'Grookey', fr: 'Ouistempo' },
      { id: 813, en: 'Scorbunny', fr: 'Flambino' },
      { id: 816, en: 'Sobble', fr: 'Larméléon' },
      { id: 831, en: 'Wooloo', fr: 'Moumouton' },
      { id: 845, en: 'Cramorant', fr: 'Nigosier' },
    ],
    gen9: [
      { id: 906, en: 'Sprigatito', fr: 'Poussacha' },
      { id: 909, en: 'Fuecoco', fr: 'Chochodile' },
      { id: 912, en: 'Quaxly', fr: 'Coiffeton' },
      { id: 915, en: 'Lechonk', fr: 'Gourmelet' },
      { id: 937, en: 'Armarouge', fr: 'Carmadura' },
    ],
  };

  const characters: Character[] = [];
  (filters.length ? filters : Object.keys(data)).forEach((filter) => {
    const gen = data[filter];
    if (gen) {
      gen.forEach((p) => {
        const name = language === 'fr' ? p.fr : p.en;
        characters.push({
          id: `pokemon-${p.id}`,
          name,
          image: createPlaceholderImage(name, '#3B4CCA'),
          universe: 'pokemon',
        });
      });
    }
  });

  return characters;
}

async function fetchPokemonCharacters(
  filters: string[],
  language: 'en' | 'fr' = 'en'
): Promise<Character[]> {
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

  const selectedFilters = filters.length
    ? filters
    : (Object.keys(generationIds) as string[]);

  await Promise.all(
    selectedFilters.map(async (filter) => {
      const genId = generationIds[filter];
      if (!genId) return;

      const { data } = await axios.get(`https://pokeapi.co/api/v2/generation/${genId}`);

      await Promise.all(
        data.pokemon_species.map(async (species: { name: string; url: string }) => {
          const id = parseInt(
            species.url.split('/').filter(Boolean).pop() ?? '0',
            10
          );

          let name = formatPokemonName(species.name);

          if (language === 'fr') {
            try {
              const { data: speciesData } = await axios.get(species.url);
              const frName = speciesData.names.find((n: any) => n.language.name === 'fr')?.name;
              if (frName) {
                name = frName;
              }
            } catch (e) {
              // fallback to english name
            }
          }

          result.push({
            id: `pokemon-${id}`,
            name,
            image:
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            universe: 'pokemon',
          });
        })
      );
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
  const url = 'https://web.dragonball-api.com/api/characters?limit=1000';
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

// Fetch Demon Slayer characters using MyAnimeList/Jikan API
async function fetchDemonSlayerCharacters(filters: string[]): Promise<Character[]> {
  const seasonIds: Record<string, number> = {
    season1: 38000, // Kimetsu no Yaiba
    season2: 47778, // Entertainment District Arc
    season3: 50857, // Swordsmith Village Arc
    season4: 56240, // Hashira Training Arc
  };

  const results: Character[] = [];
  const seen = new Set<number>();

  try {
    await Promise.all(
      (filters.length ? filters : Object.keys(seasonIds)).map(async (filter) => {
        const id = seasonIds[filter];
        if (!id) return;
        const { data } = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/characters`
        );
        const characters = Array.isArray(data?.data)
          ? data.data
          : data.results || [];

        characters.forEach((item: any) => {
          const charId = item.character?.mal_id ?? item.mal_id;
          if (seen.has(charId)) return;
          seen.add(charId);
          results.push({
            id: `demonslayer-${charId}`,
            name: item.character?.name ?? item.name,
            image:
              item.character?.images?.jpg?.image_url ||
              item.character?.images?.webp?.image_url ||
              createPlaceholderImage(
                item.character?.name ?? item.name,
                '#28593C'
              ),
            universe: 'demon-slayer',
          });
        });
      })
    );
  } catch (error) {
    console.error('Error fetching Demon Slayer characters:', error);
  }

  if (results.length === 0) {
    return generateDemonSlayerCharacters(filters);
  }

  return results;
}

// Fetch Naruto characters using MyAnimeList/Jikan API
async function fetchNarutoCharacters(filters: string[]): Promise<Character[]> {
  const seriesIds: Record<string, number> = {
    original: 20, // Naruto
    shippuden: 1735, // Naruto Shippuden
    boruto: 34566, // Boruto: Naruto Next Generations
  };

  const results: Character[] = [];
  const seen = new Set<number>();

  await Promise.all(
    (filters.length ? filters : Object.keys(seriesIds)).map(async (filter) => {
      const id = seriesIds[filter];
      if (!id) return;
      const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`);
      const characters = Array.isArray(data?.data) ? data.data : data.results || [];

      characters.forEach((item: any) => {
        const charId = item.character?.mal_id ?? item.mal_id;
        if (seen.has(charId)) return;
        seen.add(charId);
        results.push({
          id: `naruto-${charId}`,
          name: item.character?.name ?? item.name,
          image:
            item.character?.images?.jpg?.image_url ||
            item.character?.images?.webp?.image_url ||
            createPlaceholderImage(item.character?.name ?? item.name, '#FF7800'),
          universe: 'naruto',
        });
      });
    })
  );

  return results;
}

// Fetch Olive et Tom characters using MyAnimeList/Jikan API
async function fetchOliveEtTomCharacters(filters: string[]): Promise<Character[]> {
  const seriesIds: Record<string, number> = {
    original: 1867, // Captain Tsubasa (1983)
    'road-to-2002': 3289, // Road to 2002
    '2018': 36934, // Captain Tsubasa (2018)
  };

  const results: Character[] = [];
  const seen = new Set<number>();

  await Promise.all(
    (filters.length ? filters : Object.keys(seriesIds)).map(async (filter) => {
      const id = seriesIds[filter];
      if (!id) return;
      const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`);
      const characters = Array.isArray(data?.data) ? data.data : data.results || [];

      characters.forEach((item: any) => {
        const charId = item.character?.mal_id ?? item.mal_id;
        if (seen.has(charId)) return;
        seen.add(charId);
        results.push({
          id: `olive-${charId}`,
          name: item.character?.name ?? item.name,
          image:
            item.character?.images?.jpg?.image_url ||
            item.character?.images?.webp?.image_url ||
            createPlaceholderImage(item.character?.name ?? item.name, '#1E90FF'),
          universe: 'olive-et-tom',
        });
      });
    })
  );

  return results;
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

function generateOliveEtTomCharacters(filters: string[]): Character[] {
  const characters: Character[] = [
    { id: 'olive-1', name: 'Tsubasa Ozora', image: createPlaceholderImage('Tsubasa Ozora', '#1E90FF'), universe: 'olive-et-tom' },
    { id: 'olive-2', name: 'Kojiro Hyuga', image: createPlaceholderImage('Kojiro Hyuga', '#1E90FF'), universe: 'olive-et-tom' },
    { id: 'olive-3', name: 'Genzo Wakabayashi', image: createPlaceholderImage('Genzo Wakabayashi', '#1E90FF'), universe: 'olive-et-tom' },
    { id: 'olive-4', name: 'Taro Misaki', image: createPlaceholderImage('Taro Misaki', '#1E90FF'), universe: 'olive-et-tom' },
    { id: 'olive-5', name: 'Hikaru Matsuyama', image: createPlaceholderImage('Hikaru Matsuyama', '#1E90FF'), universe: 'olive-et-tom' },
  ];

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
  const bySeries: Record<string, Character[]> = {
    'dragon-ball': [
      {
        id: 'db-kid-goku',
        name: 'Kid Goku',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/1/17/KidGoku.png',
        universe: 'dragon-ball',
      },
      {
        id: 'db-bulma',
        name: 'Bulma',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/5/50/Bulma_DB.png',
        universe: 'dragon-ball',
      },
      {
        id: 'db-krillin',
        name: 'Krillin',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/f/f6/Krillin_Infobox_Arc1.png',
        universe: 'dragon-ball',
      },
      {
        id: 'db-roshi',
        name: 'Master Roshi',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/0/0d/MasterRoshi.png',
        universe: 'dragon-ball',
      },
      {
        id: 'db-yamcha',
        name: 'Yamcha',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/a/a1/Yamcha.png',
        universe: 'dragon-ball',
      },
    ],
    'dragon-ball-z': [
      {
        id: 'dbz-goku',
        name: 'Goku',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/c/c7/GokuDBZ.png',
        universe: 'dragon-ball',
      },
      {
        id: 'dbz-vegeta',
        name: 'Vegeta',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/2/28/VegetaDBZ.png',
        universe: 'dragon-ball',
      },
      {
        id: 'dbz-gohan',
        name: 'Gohan',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/a/ab/GohanDBZ.png',
        universe: 'dragon-ball',
      },
      {
        id: 'dbz-piccolo',
        name: 'Piccolo',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/7/72/PiccoloDBZ.png',
        universe: 'dragon-ball',
      },
      {
        id: 'dbz-frieza',
        name: 'Frieza',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/2/28/Frieza_1st_Form.png',
        universe: 'dragon-ball',
      },
    ],
    'dragon-ball-gt': [
      {
        id: 'dbgt-goku',
        name: 'Goku (GT)',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/2/2e/GokuGT.png',
        universe: 'dragon-ball',
      },
      {
        id: 'dbgt-pan',
        name: 'Pan',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/9/99/PanGT.png',
        universe: 'dragon-ball',
      },
      {
        id: 'dbgt-trunks',
        name: 'Trunks (GT)',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/8/80/TrunksGT.png',
        universe: 'dragon-ball',
      },
      {
        id: 'dbgt-baby',
        name: 'Baby Vegeta',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/9/93/BabyVegeta.png',
        universe: 'dragon-ball',
      },
      {
        id: 'dbgt-super17',
        name: 'Super 17',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/7/70/Super17.png',
        universe: 'dragon-ball',
      },
    ],
    'dragon-ball-super': [
      {
        id: 'dbs-goku',
        name: 'Goku (Super)',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/8/82/GokuSuper.png',
        universe: 'dragon-ball',
      },
      {
        id: 'dbs-vegeta',
        name: 'Vegeta (Super)',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/1/16/VegetaSuper.png',
        universe: 'dragon-ball',
      },
      {
        id: 'dbs-beerus',
        name: 'Beerus',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/a/ae/Beerus_Infobox.png',
        universe: 'dragon-ball',
      },
      {
        id: 'dbs-whis',
        name: 'Whis',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/9/93/Whis.png',
        universe: 'dragon-ball',
      },
      {
        id: 'dbs-jiren',
        name: 'Jiren',
        image:
          'https://static.wikia.nocookie.net/dragonball/images/3/30/Jiren_Infobox.png',
        universe: 'dragon-ball',
      },
    ],
  };

  const characters: Character[] = [];
  (filters.length ? filters : Object.keys(bySeries)).forEach((filter) => {
    const seriesChars = bySeries[filter];
    if (seriesChars) {
      characters.push(...seriesChars);
    }
  });

  return characters;
}

function generateDemonSlayerCharacters(filters: string[]): Character[] {
  const bySeason: Record<string, Character[]> = {
    season1: [
      { id: 'demonslayer-s1-tanjiro', name: 'Tanjiro Kamado', image: createPlaceholderImage('Tanjiro Kamado', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s1-nezuko', name: 'Nezuko Kamado', image: createPlaceholderImage('Nezuko Kamado', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s1-zenitsu', name: 'Zenitsu Agatsuma', image: createPlaceholderImage('Zenitsu Agatsuma', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s1-inosuke', name: 'Inosuke Hashibira', image: createPlaceholderImage('Inosuke Hashibira', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s1-giyu', name: 'Giyu Tomioka', image: createPlaceholderImage('Giyu Tomioka', '#28593C'), universe: 'demon-slayer' },
    ],
    season2: [
      { id: 'demonslayer-s2-tanjiro', name: 'Tanjiro Kamado', image: createPlaceholderImage('Tanjiro Kamado', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s2-nezuko', name: 'Nezuko Kamado', image: createPlaceholderImage('Nezuko Kamado', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s2-zenitsu', name: 'Zenitsu Agatsuma', image: createPlaceholderImage('Zenitsu Agatsuma', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s2-inosuke', name: 'Inosuke Hashibira', image: createPlaceholderImage('Inosuke Hashibira', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s2-tengen', name: 'Tengen Uzui', image: createPlaceholderImage('Tengen Uzui', '#28593C'), universe: 'demon-slayer' },
    ],
    season3: [
      { id: 'demonslayer-s3-tanjiro', name: 'Tanjiro Kamado', image: createPlaceholderImage('Tanjiro Kamado', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s3-nezuko', name: 'Nezuko Kamado', image: createPlaceholderImage('Nezuko Kamado', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s3-muichiro', name: 'Muichiro Tokito', image: createPlaceholderImage('Muichiro Tokito', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s3-mitsuri', name: 'Mitsuri Kanroji', image: createPlaceholderImage('Mitsuri Kanroji', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s3-genya', name: 'Genya Shinazugawa', image: createPlaceholderImage('Genya Shinazugawa', '#28593C'), universe: 'demon-slayer' },
    ],
    season4: [
      { id: 'demonslayer-s4-tanjiro', name: 'Tanjiro Kamado', image: createPlaceholderImage('Tanjiro Kamado', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s4-nezuko', name: 'Nezuko Kamado', image: createPlaceholderImage('Nezuko Kamado', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s4-gyomei', name: 'Gyomei Himejima', image: createPlaceholderImage('Gyomei Himejima', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s4-sanemi', name: 'Sanemi Shinazugawa', image: createPlaceholderImage('Sanemi Shinazugawa', '#28593C'), universe: 'demon-slayer' },
      { id: 'demonslayer-s4-obanai', name: 'Obanai Iguro', image: createPlaceholderImage('Obanai Iguro', '#28593C'), universe: 'demon-slayer' },
    ],
  };

  const characters: Character[] = [];
  (filters.length ? filters : Object.keys(bySeason)).forEach((filter) => {
    const seasonChars = bySeason[filter];
    if (seasonChars) {
      characters.push(...seasonChars);
    }
  });

  return characters;
}
