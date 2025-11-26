import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppData } from '../context/AppDataContext';
import { palette } from '../constants/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { CardTile } from '../components/CardTile';
import { useLocale } from '../hooks/useLocale';

export const CardListScreen: React.FC = () => {
  const { data, removeCard, appendWord } = useAppData();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t, isRTL } = useLocale();

  if (!data) return null;

  return (
    <SafeAreaView style={[styles.container, isRTL ? styles.rtl : styles.ltr]}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CardForm')}>
        <Text style={styles.addButtonText}>{t('addCard')}</Text>
      </TouchableOpacity>
      <FlatList
        data={data.cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.cardRow, isRTL ? styles.rowRtl : styles.rowLtr]}>
            <CardTile
              card={item}
              onPress={() => appendWord(item)}
              onLongPress={() => navigation.navigate('CardForm', { cardId: item.id })}
              showEnglish={data.settings.showEnglish}
              isRTL={isRTL}
            />
            <TouchableOpacity onPress={() => removeCard(item.id)} style={styles.deleteBtn} accessibilityRole="button">
              <Text style={styles.deleteText}>{t('delete')}</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: palette.background,
  },
  rtl: { writingDirection: 'rtl' },
  ltr: { writingDirection: 'ltr' },
  addButton: {
    backgroundColor: palette.primary,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  cardRow: {
    alignItems: 'center',
  },
  rowRtl: { flexDirection: 'row-reverse' },
  rowLtr: { flexDirection: 'row' },
  deleteBtn: {
    marginStart: 8,
    backgroundColor: '#FFCDD2',
    padding: 10,
    borderRadius: 10,
  },
  deleteText: {
    color: '#B71C1C',
  },
  listContent: {
    paddingBottom: 20,
  },
});
