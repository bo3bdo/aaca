import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../models/types';
import { palette } from '../constants/colors';

interface Props {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
  showEnglish: boolean;
  isRTL: boolean;
}

export const CategoryBar: React.FC<Props> = ({ categories, selectedId, onSelect, showEnglish, isRTL }) => {
  return (
    <View style={[styles.container, isRTL ? styles.rtl : styles.ltr]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, isRTL ? styles.rowRtl : styles.rowLtr]}
        style={isRTL ? styles.rtl : styles.ltr}
      >
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
                <Text style={[styles.label, isRTL ? styles.rtl : styles.ltr, active && styles.activeLabel]}>{cat.nameAr}</Text>
                {showEnglish && !!cat.nameEn && <Text style={styles.sub}>{cat.nameEn}</Text>}
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
  rtl: { writingDirection: 'rtl' },
  ltr: { writingDirection: 'ltr' },
  scrollContent: {
    paddingHorizontal: 6,
    gap: 8,
  },
  rowRtl: { flexDirection: 'row-reverse' },
  rowLtr: { flexDirection: 'row' },
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
    textAlign: 'center',
  },
  activeLabel: {
    color: '#000',
    fontWeight: '700',
  },
  sub: {
    fontSize: 12,
    color: palette.muted,
    textAlign: 'center',
  },
});
