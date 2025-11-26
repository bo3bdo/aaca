import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PhraseWord } from '../models/types';
import { palette } from '../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useLocale } from '../hooks/useLocale';

interface Props {
  words: PhraseWord[];
  onRemoveLast: () => void;
  onClear: () => void;
  onSpeak: () => void;
  showEnglish: boolean;
}

export const SentenceBar: React.FC<Props> = ({ words, onRemoveLast, onClear, onSpeak, showEnglish }) => {
  const { t, isRTL } = useLocale();
  const directionStyle = isRTL ? styles.textRtl : styles.textLtr;
  return (
    <View style={[styles.container, isRTL ? styles.rowRtl : styles.rowLtr]}>
      <View style={[styles.wordsArea, isRTL ? styles.rowRtl : styles.rowLtr]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wordsContent}>
          {words.map((w) => (
            <View key={w.cardId + w.labelAr} style={[styles.word, directionStyle]}>
              <Text style={[styles.wordText, directionStyle]}>{w.labelAr}</Text>
              {showEnglish && !!w.labelEn && <Text style={styles.wordEn}>{w.labelEn}</Text>}
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={[styles.actions, isRTL ? styles.rowRtl : styles.rowLtr]}>
        <IconButton icon="arrow-undo" label={t('undo')} onPress={onRemoveLast} />
        <IconButton icon="trash" label={t('clear')} onPress={onClear} />
        <IconButton icon="volume-high" label={t('speak')} onPress={onSpeak} primary />
      </View>
    </View>
  );
};

const IconButton: React.FC<{ icon: any; label: string; onPress: () => void; primary?: boolean }> = ({
  icon,
  label,
  onPress,
  primary,
}) => (
  <TouchableOpacity style={[styles.iconButton, primary && styles.primaryBtn]} onPress={onPress} accessibilityRole="button">
    <Ionicons name={icon} size={22} color={primary ? '#fff' : palette.text} />
    <Text style={[styles.iconLabel, primary && { color: '#fff' }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    gap: 8,
  },
  rowRtl: {
    flexDirection: 'row-reverse',
  },
  rowLtr: {
    flexDirection: 'row',
  },
  wordsArea: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 6,
    minHeight: 70,
  },
  wordsContent: {
    alignItems: 'center',
    gap: 10,
  },
  word: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  wordText: {
    fontSize: 20,
    textAlign: 'center',
  },
  wordEn: {
    fontSize: 14,
    color: palette.muted,
    textAlign: 'center',
  },
  textRtl: { writingDirection: 'rtl' },
  textLtr: { writingDirection: 'ltr' },
  actions: {
    alignItems: 'center',
    gap: 6,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  primaryBtn: {
    backgroundColor: palette.primary,
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
