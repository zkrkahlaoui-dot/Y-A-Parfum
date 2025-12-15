export interface Perfume {
  name: string;
  brand: string;
  description: string;
  notes: string[];
  image?: string;
  price?: string;
  intensity?: number; // 1-5
}

export interface RecommendationRequest {
  preference: string;
}

export enum ScentFamily {
  FLORAL = 'Floral',
  WOODY = 'Woody',
  FRESH = 'Fresh',
  ORIENTAL = 'Oriental',
  GOURMAND = 'Gourmand'
}

export interface NoteGuideItem {
  title: string;
  description: string;
  duration: string;
}