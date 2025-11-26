import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { Card } from '../models/types';

// Speak Arabic text using Expo Speech configured for Saudi Arabic voice when available.
export const speakArabic = (text: string) => {
  Speech.speak(text, {
    language: 'ar-SA',
    pitch: 1.0,
    rate: 0.9,
  });
};

// Plays a card using recorded audio when available, otherwise falls back to TTS.
export const playCardSound = async (card: Card, useTTS: boolean) => {
  if (!useTTS && card.audioUri) {
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri: card.audioUri });
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded || status.isPlaying) return;
      sound.unloadAsync();
    });
    return;
  }
  speakArabic(card.labelAr);
};
