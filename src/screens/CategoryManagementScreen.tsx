import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAppData } from '../context/AppDataContext';
import { palette } from '../constants/colors';
import { Category } from '../models/types';
import { useLocale } from '../hooks/useLocale';

export const CategoryManagementScreen: React.FC = () => {
  const { data, upsertCategory, removeCategory, createId } = useAppData();
  const { t, isRTL } = useLocale();
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');

  if (!data) return null;

  const addCategory = async () => {
    if (!nameAr.trim()) return;
    const newCat: Category = {
      id: createId(),
      nameAr: nameAr.trim(),
      nameEn: nameEn.trim() || undefined,
      order: data.categories.length,
    };
    await upsertCategory(newCat);
    setNameAr('');
    setNameEn('');
  };

  const changeOrder = async (category: Category, delta: number) => {
    const updated = { ...category, order: Math.max(0, category.order + delta) };
    await upsertCategory(updated);
  };

  return (
    <SafeAreaView style={[styles.container, isRTL ? styles.rtl : styles.ltr]}>
      <View style={[styles.formRow, isRTL ? styles.formRowRtl : null, isRTL ? styles.rtl : styles.ltr]}>
        <TextInput
          style={[styles.input, isRTL ? styles.inputRtl : styles.inputLtr]}
          placeholder={t('categoryName')}
          value={nameAr}
          onChangeText={setNameAr}
          textAlign={isRTL ? 'right' : 'left'}
        />
        <TextInput
          style={[styles.input, isRTL ? styles.inputRtl : styles.inputLtr]}
          placeholder={t('categoryEnglish')}
          value={nameEn}
          onChangeText={setNameEn}
          textAlign={isRTL ? 'right' : 'left'}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addCategory} accessibilityRole="button">
          <Text style={{ color: '#fff' }}>{t('add')}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[...data.categories].sort((a, b) => a.order - b.order)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.row, isRTL ? styles.rowRtl : null, isRTL ? styles.rtl : styles.ltr]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, isRTL ? styles.inputRtl : styles.inputLtr]}>{item.nameAr}</Text>
              {item.nameEn && <Text style={styles.sub}>{item.nameEn}</Text>}
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.smallBtn} onPress={() => changeOrder(item, -1)}>
                <Text>▲</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.smallBtn} onPress={() => changeOrder(item, 1)}>
                <Text>▼</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.smallBtn, { backgroundColor: '#FFCDD2' }]} onPress={() => removeCategory(item.id)}>
                <Text style={{ color: '#B71C1C' }}>{t('delete')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{ paddingVertical: 10 }}
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
  rtl: {
    writingDirection: 'rtl',
  },
  ltr: {
    writingDirection: 'ltr',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  formRowRtl: {
    flexDirection: 'row-reverse',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addBtn: {
    backgroundColor: palette.primary,
    padding: 12,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
  },
  rowRtl: {
    flexDirection: 'row-reverse',
  },
  name: {
    fontSize: 16,
    writingDirection: 'rtl',
  },
  sub: {
    color: palette.muted,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  smallBtn: {
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  inputRtl: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  inputLtr: {
    textAlign: 'left',
    writingDirection: 'ltr',
  },
});
