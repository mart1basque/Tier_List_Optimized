export type UniverseType =
  | 'pokemon'
  | 'naruto'
  | 'demon-slayer'
  | 'league-of-legends'
  | 'onepiece'
  | 'temtem';

export interface Universe {
  id: UniverseType;
  nameKey: string;
  descriptionKey: string;
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
    nameKey: 'pokemonName',
    descriptionKey: 'pokemonDescription',
    image: pokemonHome,
  },
  {
    id: 'naruto',
    nameKey: 'narutoName',
    descriptionKey: 'narutoDescription',
    image: narutoHome,
  },
  {
    id: 'demon-slayer',
    nameKey: 'demonSlayerName',
    descriptionKey: 'demonSlayerDescription',
    image: demonSlayerHome,
  },
  {
    id: 'league-of-legends',
    nameKey: 'leagueOfLegendsName',
    descriptionKey: 'leagueOfLegendsDescription',
    image: lolHome,
  },
  {
    id: 'onepiece',
    nameKey: 'onepieceName',
    descriptionKey: 'onepieceDescription',
    image: onePieceHome,
  },
  {
    id: 'temtem',
    nameKey: 'temtemName',
    descriptionKey: 'temtemDescription',
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
  filterOptions: { id: string; nameKey: string }[];
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
      { id: 'gen1', nameKey: 'generation1' },
      { id: 'gen2', nameKey: 'generation2' },
      { id: 'gen3', nameKey: 'generation3' },
      { id: 'gen4', nameKey: 'generation4' },
      { id: 'gen5', nameKey: 'generation5' },
      { id: 'gen6', nameKey: 'generation6' },
      { id: 'gen7', nameKey: 'generation7' },
      { id: 'gen8', nameKey: 'generation8' },
      { id: 'gen9', nameKey: 'generation9' },
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
      { id: 'season1', nameKey: 'season1' },
      { id: 'season2', nameKey: 'season2' },
      { id: 'season3', nameKey: 'season3' },
      { id: 'season4', nameKey: 'season4' },
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
      { id: 'Assassin', nameKey: 'assassin' },
      { id: 'Fighter', nameKey: 'fighter' },
      { id: 'Mage', nameKey: 'mage' },
      { id: 'Marksman', nameKey: 'marksman' },
      { id: 'Support', nameKey: 'support' },
      { id: 'Tank', nameKey: 'tank' },
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
      { id: 'Neutral', nameKey: 'typeNeutral' },
      { id: 'Wind', nameKey: 'typeWind' },
      { id: 'Earth', nameKey: 'typeEarth' },
      { id: 'Water', nameKey: 'typeWater' },
      { id: 'Fire', nameKey: 'typeFire' },
      { id: 'Nature', nameKey: 'typeNature' },
      { id: 'Electric', nameKey: 'typeElectric' },
      { id: 'Digital', nameKey: 'typeDigital' },
      { id: 'Mental', nameKey: 'typeMental' },
      { id: 'Melee', nameKey: 'typeMelee' },
      { id: 'Crystal', nameKey: 'typeCrystal' },
      { id: 'Toxic', nameKey: 'typeToxic' },
    ],
  },
};
