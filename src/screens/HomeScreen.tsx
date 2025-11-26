import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList, I18nManager, SafeAreaView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppData } from '../context/AppDataContext';
import { SentenceBar } from '../components/SentenceBar';
import { CategoryBar } from '../components/CategoryBar';
import { CardTile } from '../components/CardTile';
import { palette } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLocale } from '../hooks/useLocale';

I18nManager.allowRTL(true);

export const HomeScreen: React.FC = () => {
  const { data, isLoading, sentence, appendWord, removeLastWord, clearSentence, speakSentence, selectedCategoryId, setSelectedCategoryId } =
    useAppData();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isRTL } = useLocale();

  const cards = useMemo(() => {
    if (!data) return [];
    return data.cards.filter((card) => card.isCore || card.categoryId === selectedCategoryId);
  }, [data, selectedCategoryId]);

  if (isLoading || !data) {
    return (
      <View style={styles.centered}>\n        <ActivityIndicator size="large" color={palette.primary} />\n      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isRTL ? styles.rtl : styles.ltr]}>
      <SentenceBar
        words={sentence}
        onRemoveLast={removeLastWord}
        onClear={clearSentence}
        onSpeak={speakSentence}
        showEnglish={data.settings.showEnglish}
      />
      <View style={styles.gridWrapper}>
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardTile
              card={item}
              onPress={() => appendWord(item)}
              onLongPress={() => navigation.navigate('CardForm', { cardId: item.id })}
              showEnglish={data.settings.showEnglish}
              large={data.settings.largeButtons}
              isRTL={isRTL}
            />
          )}
          numColumns={data.settings.largeButtons ? 2 : 3}
          columnWrapperStyle={[styles.row, isRTL ? styles.rowRtl : styles.rowLtr]}
          contentContainerStyle={[styles.listContent, isRTL ? styles.rtl : styles.ltr]}
        />
      </View>
      <CategoryBar
        categories={data.categories}
        selectedId={selectedCategoryId}
        onSelect={setSelectedCategoryId}
        showEnglish={data.settings.showEnglish}
        isRTL={isRTL}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    padding: 12,
    gap: 12,
    flexDirection: 'column',
  },
  rtl: { writingDirection: 'rtl' },
  ltr: { writingDirection: 'ltr' },
  gridWrapper: {
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rowRtl: { flexDirection: 'row-reverse' },
  rowLtr: { flexDirection: 'row' },
  listContent: {
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
