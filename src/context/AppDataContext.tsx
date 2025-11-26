import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import uuid from 'react-native-uuid';
import { AppData, Card, Category, PhraseWord, SettingsState } from '../models/types';
import {
  addOrUpdateCard,
  addOrUpdateCategory,
  deleteCard,
  deleteCategory,
  loadAppData,
  saveSettings,
} from '../storage/storage';
import { playCardSound, speakArabic } from '../utils/speech';

interface AppContextValue {
  data: AppData | null;
  isLoading: boolean;
  sentence: PhraseWord[];
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
  appendWord: (card: Card) => Promise<void>;
  removeLastWord: () => void;
  clearSentence: () => void;
  speakSentence: () => void;
  upsertCard: (card: Card) => Promise<void>;
  removeCard: (id: string) => Promise<void>;
  upsertCategory: (category: Category) => Promise<void>;
  removeCategory: (id: string) => Promise<void>;
  updateSettings: (settings: SettingsState) => Promise<void>;
  createId: () => string;
}

const AppDataContext = createContext<AppContextValue | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData | null>(null);
  const [sentence, setSentence] = useState<PhraseWord[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('core');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const stored = await loadAppData();
      setData(stored);
      setIsLoading(false);
    };
    load();
  }, []);

  const appendWord = async (card: Card) => {
    setSentence((prev) => [...prev, { cardId: card.id, labelAr: card.labelAr, labelEn: card.labelEn }]);
    if (data) {
      await playCardSound(card, data.settings.useTTS);
    }
  };

  const removeLastWord = () => {
    setSentence((prev) => prev.slice(0, -1));
  };

  const clearSentence = () => setSentence([]);

  const speakSentence = () => {
    const text = sentence.map((w) => w.labelAr).join(' ');
    if (text) speakArabic(text);
  };

  const upsertCard = async (card: Card) => {
    if (!data) return;
    const next = await addOrUpdateCard(data, card);
    setData(next);
  };

  const removeCard = async (id: string) => {
    if (!data) return;
    const next = await deleteCard(data, id);
    setData(next);
  };

  const upsertCategory = async (category: Category) => {
    if (!data) return;
    const next = await addOrUpdateCategory(data, category);
    setData(next);
  };

  const removeCategory = async (id: string) => {
    if (!data) return;
    const next = await deleteCategory(data, id);
    setData(next);
    if (selectedCategoryId === id) setSelectedCategoryId('core');
  };

  const updateSettings = async (settings: SettingsState) => {
    if (!data) return;
    const next = await saveSettings(data, settings);
    setData(next);
  };

  const value = useMemo(
    () => ({
      data,
      isLoading,
      sentence,
      selectedCategoryId,
      setSelectedCategoryId,
      appendWord,
      removeLastWord,
      clearSentence,
      speakSentence,
      upsertCard,
      removeCard,
      upsertCategory,
      removeCategory,
      updateSettings,
      createId: () => uuid.v4().toString(),
    }),
    [data, isLoading, sentence, selectedCategoryId]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
};
