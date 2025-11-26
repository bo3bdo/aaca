import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PhraseWord } from '../models/types';
import { palette } from '../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  words: PhraseWord[];
  onRemoveLast: () => void;
  onClear: () => void;
  onSpeak: () => void;
}

export const SentenceBar: React.FC<Props> = ({ words, onRemoveLast, onClear, onSpeak }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wordsArea}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wordsContent}>
          {words.map((w) => (
            <Text key={w.cardId + w.labelAr} style={styles.word}>
              {w.labelAr}
            </Text>
          ))}
        </ScrollView>
      </View>
      <View style={styles.actions}>
        <IconButton icon="arrow-undo" label="تراجع" onPress={onRemoveLast} />
        <IconButton icon="trash" label="حذف" onPress={onClear} />
        <IconButton icon="volume-high" label="نطق" onPress={onSpeak} primary />
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    fontSize: 20,
    writingDirection: 'rtl',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
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
