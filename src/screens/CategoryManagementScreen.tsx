import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAppData } from '../context/AppDataContext';
import { palette } from '../constants/colors';
import { Category } from '../models/types';

export const CategoryManagementScreen: React.FC = () => {
  const { data, upsertCategory, removeCategory, createId } = useAppData();
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
    <SafeAreaView style={styles.container}>
      <View style={styles.formRow}>
        <TextInput style={styles.input} placeholder="اسم التصنيف" value={nameAr} onChangeText={setNameAr} textAlign="right" />
        <TextInput style={styles.input} placeholder="English" value={nameEn} onChangeText={setNameEn} />
        <TouchableOpacity style={styles.addBtn} onPress={addCategory} accessibilityRole="button">
          <Text style={{ color: '#fff' }}>إضافة</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[...data.categories].sort((a, b) => a.order - b.order)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.nameAr}</Text>
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
                <Text style={{ color: '#B71C1C' }}>حذف</Text>
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
  formRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
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
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
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
});
