import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../models/types';
import { palette } from '../constants/colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

interface Props {
  card: Card;
  onPress: () => void;
  onLongPress?: () => void;
  showEnglish: boolean;
  large?: boolean;
  isRTL?: boolean;
}

export const CardTile: React.FC<Props> = ({ card, onPress, onLongPress, showEnglish, large, isRTL }) => {
  const direction = isRTL ? styles.rtl : styles.ltr;
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.card, { backgroundColor: card.color || '#FFF8E1' }, large && styles.largeCard]}
    >
      <View style={styles.imageWrapper}>
        {card.imageUri ? (
          <Image source={{ uri: card.imageUri }} style={styles.image} resizeMode="cover" />
        ) : card.iconName ? (
          <FontAwesome5 name={card.iconName as any} size={36} color={palette.text} />
        ) : (
          <Ionicons name="image" size={36} color={palette.muted} />
        )}
      </View>
      <Text style={[styles.labelAr, direction]}>{card.labelAr}</Text>
      {showEnglish && !!card.labelEn && <Text style={[styles.labelEn, direction]}>{card.labelEn}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 100,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    shadowColor: palette.cardShadow,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  largeCard: {
    minHeight: 130,
  },
  imageWrapper: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  labelAr: {
    fontSize: 20,
    color: palette.text,
    textAlign: 'center',
  },
  labelEn: {
    fontSize: 14,
    color: palette.muted,
    textAlign: 'center',
  },
  rtl: {
    writingDirection: 'rtl',
  },
  ltr: {
    writingDirection: 'ltr',
  },
});
