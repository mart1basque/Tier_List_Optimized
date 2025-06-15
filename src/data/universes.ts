export type UniverseType =
  | 'pokemon'
  | 'naruto'
  | 'demon-slayer'
  | 'league-of-legends'
  | 'onepiece'
  | 'temtem';

export interface Universe {
  id: UniverseType;
  name: string;
  description: string;
  image: string;
}

import pokemonHome from '../assets/pokemon-home.webp';
import narutoHome from '../assets/naruto-home.png';
import demonSlayerHome from '../assets/demon-slayer-home.png';
import lolHome from '../assets/lol-home.png';
import onePieceHome from '../assets/onepiece-home.png';
import temtemHome from '../assets/temtem-home.png';

export const universes: Universe[] = [
  {
    id: 'pokemon',
    name: 'Pokémon',
    description: 'Create tier lists of your favorite Pokémon by generation',
    image: pokemonHome,
  },
  {
    id: 'naruto',
    name: 'Naruto',
    description: 'Rank ninjas from the Naruto universe by arc or series',
    image: narutoHome,
  },
  {
    id: 'demon-slayer',
    name: 'Demon Slayer',
    description: 'Create tier lists of characters from each season of Demon Slayer',
    image: demonSlayerHome,
  },
  {
    id: 'league-of-legends',
    name: 'League of Legends',
    description: 'Rank your favorite champions by class using Data Dragon',
    image: lolHome,
  },
  {
    id: 'onepiece',
    name: 'One Piece',
    description: 'Create tier lists of characters from One Piece using Jikan',
    image: onePieceHome,
  },
  {
    id: 'temtem',
    name: 'Temtem',
    description: 'Rank Temtem creatures by type or check their Luma form',
    image: temtemHome,
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
  'league-of-legends': {
    colors: {
      primary: '#5383E8', // League blue
      secondary: '#F0E6D2', // parchment
      accent: '#C89B3C', // gold
      background: '#000',
      text: '#1F2937',
    },
    backgroundStyle: {
      background: 'linear-gradient(to bottom, #0A1428, #000000)',
      backgroundSize: 'cover',
      position: 'relative',
      overflow: 'hidden',
    },
    filterOptions: [
      { id: 'Assassin', name: 'Assassin' },
      { id: 'Fighter', name: 'Fighter' },
      { id: 'Mage', name: 'Mage' },
      { id: 'Marksman', name: 'Marksman' },
      { id: 'Support', name: 'Support' },
      { id: 'Tank', name: 'Tank' },
    ],
  },
  'onepiece': {
    colors: {
      primary: '#2E51A2', // blue
      secondary: '#FFD700', // yellow
      accent: '#EB2727', // red
      background: '#F0F8FF',
      text: '#1F2937',
    },
    backgroundStyle: {
      background: 'linear-gradient(to bottom, #09203f, #537895)',
      backgroundSize: 'cover',
      position: 'relative',
      overflow: 'hidden',
    },
    filterOptions: [],
  },
  'temtem': {
    colors: {
      primary: '#ff6d00',
      secondary: '#ffd180',
      accent: '#00bfa5',
      background: '#fff3e0',
      text: '#1F2937',
    },
    backgroundStyle: {
      background: 'linear-gradient(to bottom, #ffe0b2, #ffcc80)',
      backgroundSize: 'cover',
      position: 'relative',
      overflow: 'hidden',
    },
    filterOptions: [
      { id: 'Neutral', name: 'Neutral' },
      { id: 'Wind', name: 'Wind' },
      { id: 'Earth', name: 'Earth' },
      { id: 'Water', name: 'Water' },
      { id: 'Fire', name: 'Fire' },
      { id: 'Nature', name: 'Nature' },
      { id: 'Electric', name: 'Electric' },
      { id: 'Digital', name: 'Digital' },
      { id: 'Mental', name: 'Mental' },
      { id: 'Melee', name: 'Melee' },
      { id: 'Crystal', name: 'Crystal' },
      { id: 'Toxic', name: 'Toxic' },
    ],
  },
};
