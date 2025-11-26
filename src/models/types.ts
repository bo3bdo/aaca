// Core data models for categories, cards, and settings used across the app.
export interface Category {
  id: string;
  nameAr: string;
  nameEn?: string;
  order: number;
}

export interface Card {
  id: string;
  labelAr: string;
  labelEn?: string;
  categoryId: string;
  imageUri?: string; // local file path if user selects a photo
  iconName?: string; // built-in icon name
  color?: string;
  isCore?: boolean;
  audioUri?: string;
  createdAt: number;
  updatedAt: number;
}

export interface PhraseWord {
  cardId: string;
  labelAr: string;
  labelEn?: string;
}

export interface SettingsState {
  showEnglish: boolean;
  useTTS: boolean;
  largeButtons: boolean;
  theme: 'light' | 'dark';
}

export interface AppData {
  categories: Category[];
  cards: Card[];
  settings: SettingsState;
}
