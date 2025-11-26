import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../models/types';
import { palette } from '../constants/colors';

interface Props {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const CategoryBar: React.FC<Props> = ({ categories, selectedId, onSelect }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {categories
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((cat) => {
            const active = selectedId === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryBtn, active && styles.activeBtn]}
                onPress={() => onSelect(cat.id)}
                accessibilityRole="button"
              >
                <Text style={[styles.label, active && styles.activeLabel]}>{cat.nameAr}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 6,
    gap: 8,
  },
  categoryBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeBtn: {
    backgroundColor: palette.accent,
    borderColor: palette.accent,
  },
  label: {
    fontSize: 16,
    writingDirection: 'rtl',
  },
  activeLabel: {
    color: '#000',
    fontWeight: '700',
  },
});
