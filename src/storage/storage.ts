import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppData, Card, Category, SettingsState } from '../models/types';
import seedData from '../../assets/seedData.json';

const STORAGE_KEY = 'aac-app-data';

// Default caregiver preferences applied on first launch.
const defaultSettings: SettingsState = {
  showEnglish: true,
  useTTS: true,
  largeButtons: false,
  theme: 'light',
};

const withTimestamps = (card: Omit<Card, 'createdAt' | 'updatedAt'>): Card => {
  const now = Date.now();
  return { ...card, createdAt: now, updatedAt: now };
};

// Builds the initial dataset using the bundled seed JSON. Timestamps are injected here so
// you can safely edit `assets/seedData.json` to add more default categories or cards.
export const seedAppData = (): AppData => {
  const seededCards: Card[] = (seedData.cards as Omit<Card, 'createdAt' | 'updatedAt'>[]).map(withTimestamps);
  const seededCategories: Category[] = (seedData.categories as Category[]).map((cat) => ({ ...cat }));
  return {
    categories: seededCategories,
    cards: seededCards,
    settings: defaultSettings,
  };
};

export const loadAppData = async (): Promise<AppData> => {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored) as AppData;
  }
  const seeded = seedAppData();
  await saveAppData(seeded);
  return seeded;
};

export const saveAppData = async (data: AppData) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const clearAppData = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};

export const addOrUpdateCard = async (data: AppData, card: Card): Promise<AppData> => {
  const existingIndex = data.cards.findIndex((c) => c.id === card.id);
  const updatedCard = { ...card, updatedAt: Date.now(), createdAt: card.createdAt || Date.now() };
  if (existingIndex >= 0) {
    const copy = [...data.cards];
    copy[existingIndex] = updatedCard;
    const next = { ...data, cards: copy };
    await saveAppData(next);
    return next;
  }
  const next = { ...data, cards: [...data.cards, updatedCard] };
  await saveAppData(next);
  return next;
};

export const deleteCard = async (data: AppData, id: string): Promise<AppData> => {
  const next = { ...data, cards: data.cards.filter((card) => card.id !== id) };
  await saveAppData(next);
  return next;
};

export const addOrUpdateCategory = async (data: AppData, category: Category): Promise<AppData> => {
  const existingIndex = data.categories.findIndex((c) => c.id === category.id);
  if (existingIndex >= 0) {
    const copy = [...data.categories];
    copy[existingIndex] = category;
    const next = { ...data, categories: copy };
    await saveAppData(next);
    return next;
  }
  const next = { ...data, categories: [...data.categories, category] };
  await saveAppData(next);
  return next;
};

export const deleteCategory = async (data: AppData, id: string): Promise<AppData> => {
  const next = {
    ...data,
    categories: data.categories.filter((cat) => cat.id !== id),
    cards: data.cards.filter((card) => card.categoryId !== id),
  };
  await saveAppData(next);
  return next;
};

export const saveSettings = async (data: AppData, settings: SettingsState): Promise<AppData> => {
  const next = { ...data, settings };
  await saveAppData(next);
  return next;
};
