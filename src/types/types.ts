export interface Character {
  id: string;
  name: string;
  image: string;
  thumbnail?: string;
  universe: string;
  // Add more properties as needed
}

export interface Tier {
  id: string;
  label: string;
  color: string;
}