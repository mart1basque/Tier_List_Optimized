import axios from 'axios';
import { Character } from '../types/types';
import { UniverseType } from '../data/universes';

const LOL_VERSION = '13.24.1';

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



  if (universe === 'naruto') {
    try {
      return await fetchNarutoCharacters(filters);
    } catch (error) {
      console.error('Error fetching Naruto characters:', error);
      return generateNarutoCharacters(filters);
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

  if (universe === 'league-of-legends') {
    try {
      return await fetchLeagueCharacters(filters);
    } catch (error) {
      console.error('Error fetching League of Legends characters:', error);
      return generateLeagueCharacters(filters);
    }
  }

  if (universe === 'onepiece') {
    try {
      return await fetchOnePieceCharacters();
    } catch (error) {
      console.error('Error fetching One Piece characters:', error);
      return generateOnePieceCharacters();
    }
  }

  if (universe === 'pvz') {
    try {
      return await fetchPVZCharacters(filters);
    } catch (error) {
      console.error('Error fetching PVZ characters:', error);
      return generatePVZCharacters(filters);
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
    case 'demon-slayer':
      characters = generateDemonSlayerCharacters(filters);
      break;
    case 'league-of-legends':
      characters = generateLeagueCharacters(filters);
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

// Fetch Demon Slayer characters using MyAnimeList/Jikan API
async function fetchDemonSlayerCharacters(filters: string[]): Promise<Character[]> {
  // Map each season to the corresponding MyAnimeList ID used by the Jikan API
  // These IDs were corrected to ensure the characters fetched belong to the
  // right arc of the series.
  const seasonIds: Record<string, number> = {
    season1: 38000, // Kimetsu no Yaiba (Season 1)
    season2: 47778, // Entertainment District Arc (Season 2)
    season3: 51019, // Swordsmith Village Arc (Season 3)
    season4: 55701, // Hashira Training Arc (Season 4)
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

// Fetch League of Legends champions using Riot's Data Dragon API
async function fetchLeagueCharacters(filters: string[]): Promise<Character[]> {
  const url = `https://ddragon.leagueoflegends.com/cdn/${LOL_VERSION}/data/en_US/champion.json`;
  const { data } = await axios.get(url);
  const champs: any[] = Object.values(data.data);
  return champs
    .filter(ch => filters.length === 0 || filters.some(f => ch.tags.includes(f)))
    .map(ch => ({
      id: `lol-${ch.id}`,
      name: ch.name,
      image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${ch.id}_0.jpg`,
      thumbnail: `https://ddragon.leagueoflegends.com/cdn/${LOL_VERSION}/img/champion/${ch.id}.png`,
      universe: 'league-of-legends',
    }));
}

function generateLeagueCharacters(filters: string[]): Character[] {
  const sample = [
    { id: 'Aatrox', tags: ['Fighter', 'Tank'] },
    { id: 'Ahri', tags: ['Mage', 'Assassin'] },
    { id: 'Garen', tags: ['Fighter', 'Tank'] },
    { id: 'Lux', tags: ['Mage', 'Support'] },
    { id: 'Vayne', tags: ['Marksman', 'Assassin'] },
  ];

  return sample
    .filter(ch => filters.length === 0 || filters.some(f => ch.tags.includes(f)))
    .map(ch => ({
      id: `lol-${ch.id}`,
      name: ch.id,
      image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${ch.id}_0.jpg`,
      thumbnail: `https://ddragon.leagueoflegends.com/cdn/${LOL_VERSION}/img/champion/${ch.id}.png`,
    universe: 'league-of-legends',
  }));
}

// Fetch One Piece characters using Jikan API
async function fetchOnePieceCharacters(): Promise<Character[]> {
  const results: Character[] = [];
  try {
    const { data } = await axios.get('https://api.jikan.moe/v4/anime/21/characters');
    const characters = Array.isArray(data?.data) ? data.data : data.results || [];
    characters.forEach((item: any) => {
      results.push({
        id: `onepiece-${item.character?.mal_id ?? item.mal_id}`,
        name: item.character?.name ?? item.name,
        image:
          item.character?.images?.jpg?.image_url ||
          item.character?.images?.webp?.image_url ||
          createPlaceholderImage(item.character?.name ?? item.name, '#2E51A2'),
        universe: 'onepiece',
      });
    });
  } catch (error) {
    console.error('Error fetching One Piece characters:', error);
  }

  return results.length > 0 ? results : generateOnePieceCharacters();
}

function generateOnePieceCharacters(): Character[] {
  const names = ['Luffy', 'Zoro', 'Nami', 'Usopp', 'Sanji', 'Chopper', 'Robin', 'Franky', 'Brook', 'Jinbe'];
  return names.map((name, index) => ({
    id: `onepiece-${index}`,
    name,
    image: createPlaceholderImage(name, '#2E51A2'),
    universe: 'onepiece',
  }));
}

const PVZ_API = 'https://pvz-2-api.vercel.app/api';

async function fetchPVZCharacters(filters: string[]): Promise<Character[]> {
  const categories = filters.length > 0 ? filters : ['plants', 'zombies'];
  const results: Character[] = [];

  await Promise.all(
    categories.map(async (category) => {
      try {
        const { data } = await axios.get(`${PVZ_API}/${category}`);
        const items = Array.isArray(data) ? data : data.data || [];
        items.forEach((item: any, index: number) => {
          let url =
            item.image ||
            item.imageUrl ||
            item.image_url ||
            item.icon ||
            item.iconUrl ||
            item.icon_url;

          if (url && typeof url === 'string' && !/^https?:\/\//i.test(url)) {
            url = `${PVZ_API}${url.startsWith('/') ? '' : '/'}${url}`;
          }

          results.push({
            id: `pvz-${category}-${index}`,
            name: item.name || item.nom || `Unknown`,
            image: url || createPlaceholderImage(item.name || 'PVZ', '#6AAA1E'),
            universe: 'pvz',
            type: category,
          });
        });
      } catch (err) {
        console.error(`Error fetching PVZ ${category}:`, err);
      }
    })
  );

  return results.length > 0 ? results : generatePVZCharacters(filters);
}

function generatePVZCharacters(filters: string[]): Character[] {
  const cats = filters.length > 0 ? filters : ['plants', 'zombies'];
  const characters: Character[] = [];
  if (cats.includes('plants')) {
    const plants = ['Peashooter', 'Sunflower', 'Wall-nut', 'Snow Pea', 'Potato Mine'];
    plants.forEach((name, index) => {
      characters.push({
        id: `pvz-plant-${index}`,
        name,
        image: createPlaceholderImage(name, '#6AAA1E'),
        universe: 'pvz',
        type: 'plant',
      });
    });
  }
  if (cats.includes('zombies')) {
    const zombies = ['Zombie', 'Conehead Zombie', 'Buckethead Zombie', 'Imp', 'Gargantuar'];
    zombies.forEach((name, index) => {
      characters.push({
        id: `pvz-zombie-${index}`,
        name,
        image: createPlaceholderImage(name, '#6AAA1E'),
        universe: 'pvz',
        type: 'zombie',
      });
    });
  }
  return characters;
}

