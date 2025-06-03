export type UniverseType = 'pokemon' | 'naruto' | 'one-piece' | 'dragon-ball' | 'demon-slayer';

export interface Universe {
  id: UniverseType;
  name: string;
  description: string;
  image: string;
}

export const universes: Universe[] = [
  {
    id: 'pokemon',
    name: 'Pokémon',
    description: 'Create tier lists of your favorite Pokémon by generation',
    image: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'naruto',
    name: 'Naruto',
    description: 'Rank ninjas from the Naruto universe by arc or series',
    image: 'https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'one-piece',
    name: 'One Piece',
    description: 'Create tier lists of characters from different sagas and islands',
    image: 'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'dragon-ball',
    name: 'Dragon Ball',
    description: 'Rank fighters from Dragon Ball Z, Super, GT, and more',
    image: 'https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'demon-slayer',
    name: 'Demon Slayer',
    description: 'Create tier lists of characters from each season of Demon Slayer',
    image: 'https://images.pexels.com/photos/6538889/pexels-photo-6538889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const universeConfig: Record<UniverseType, {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  backgroundStyle: React.CSSProperties;
  filterOptions: { id: string; name: string }[];
}> = {
  'pokemon': {
    colors: {
      primary: '#3B4CCA', // Pokemon blue
      secondary: '#FFDE00', // Pokemon yellow
      accent: '#FF0000', // Pokemon red
      background: '#F5F5F5',
      text: '#1F2937',
    },
    backgroundStyle: {
      background: 'linear-gradient(to bottom, #041E42, #1A1A40)',
      backgroundSize: 'cover',
      position: 'relative',
      overflow: 'hidden',
    },
    filterOptions: [
      { id: 'gen1', name: 'Generation 1' },
      { id: 'gen2', name: 'Generation 2' },
      { id: 'gen3', name: 'Generation 3' },
      { id: 'gen4', name: 'Generation 4' },
      { id: 'gen5', name: 'Generation 5' },
      { id: 'gen6', name: 'Generation 6' },
      { id: 'gen7', name: 'Generation 7' },
      { id: 'gen8', name: 'Generation 8' },
      { id: 'gen9', name: 'Generation 9' },
    ],
  },
  'naruto': {
    colors: {
      primary: '#FF7800', // Naruto orange
      secondary: '#00458B', // Naruto blue
      accent: '#D0312D', // Naruto red
      background: '#F8F8F8',
      text: '#2B2B2B',
    },
    backgroundStyle: {
      background: 'linear-gradient(to bottom, #FF7800, #FFA500)',
      backgroundSize: 'cover',
      position: 'relative',
      overflow: 'hidden',
    },
    filterOptions: [
      { id: 'original', name: 'Naruto' },
      { id: 'shippuden', name: 'Shippuden' },
      { id: 'boruto', name: 'Boruto' },
    ],
  },
  'one-piece': {
    colors: {
      primary: '#00A3E0', // One Piece blue
      secondary: '#FFF200', // One Piece yellow
      accent: '#E60012', // One Piece red
      background: '#F8F8F8',
      text: '#2B2B2B',
    },
    backgroundStyle: {
      background: 'linear-gradient(to bottom, #0077BE, #001F3F)',
      backgroundSize: 'cover',
      position: 'relative',
      overflow: 'hidden',
    },
    filterOptions: [
      { id: 'east-blue', name: 'East Blue Saga' },
      { id: 'alabasta', name: 'Alabasta Saga' },
      { id: 'sky-island', name: 'Sky Island Saga' },
      { id: 'water-7', name: 'Water 7 Saga' },
      { id: 'thriller-bark', name: 'Thriller Bark Saga' },
      { id: 'summit-war', name: 'Summit War Saga' },
      { id: 'fishman-island', name: 'Fishman Island Saga' },
      { id: 'dressrosa', name: 'Dressrosa Saga' },
      { id: 'whole-cake', name: 'Whole Cake Island Saga' },
      { id: 'wano', name: 'Wano Country Saga' },
    ],
  },
  'dragon-ball': {
    colors: {
      primary: '#FF9232', // Dragon Ball orange
      secondary: '#0066CC', // Dragon Ball blue
      accent: '#00983A', // Dragon Ball green
      background: '#F8F8F8',
      text: '#2B2B2B',
    },
    backgroundStyle: {
      background: 'linear-gradient(to bottom, #FF9232, #FFC837)',
      backgroundSize: 'cover',
      position: 'relative',
      overflow: 'hidden',
    },
    filterOptions: [
      { id: 'dragon-ball', name: 'Dragon Ball' },
      { id: 'dragon-ball-z', name: 'Dragon Ball Z' },
      { id: 'dragon-ball-gt', name: 'Dragon Ball GT' },
      { id: 'dragon-ball-super', name: 'Dragon Ball Super' },
    ],
  },
  'demon-slayer': {
    colors: {
      primary: '#28593C', // Demon Slayer green
      secondary: '#FFC4C0', // Demon Slayer pink
      accent: '#891731', // Demon Slayer red
      background: '#F8F8F8',
      text: '#2B2B2B',
    },
    backgroundStyle: {
      background: 'linear-gradient(to bottom, #1A1A2E, #16213E)',
      backgroundSize: 'cover',
      position: 'relative',
      overflow: 'hidden',
    },
    filterOptions: [
      { id: 'season1', name: 'Season 1' },
      { id: 'season2', name: 'Season 2 (Entertainment District Arc)' },
      { id: 'season3', name: 'Season 3 (Swordsmith Village Arc)' },
      { id: 'season4', name: 'Season 4 (Hashira Training Arc)' },
    ],
  },
};