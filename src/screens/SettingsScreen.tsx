import React from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { useAppData } from '../context/AppDataContext';
import { palette } from '../constants/colors';

export const SettingsScreen: React.FC = () => {
  const { data, updateSettings } = useAppData();

  if (!data) return null;

  const toggle = (key: keyof typeof data.settings) => {
    if (key === 'theme') {
      updateSettings({ ...data.settings, theme: data.settings.theme === 'light' ? 'dark' : 'light' });
      return;
    }
    updateSettings({ ...data.settings, [key]: !data.settings[key] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SettingRow label="إظهار الإنجليزية" value={data.settings.showEnglish} onChange={() => toggle('showEnglish')} />
      <SettingRow label="استخدام النطق الآلي" value={data.settings.useTTS} onChange={() => toggle('useTTS')} />
      <SettingRow label="أزرار كبيرة" value={data.settings.largeButtons} onChange={() => toggle('largeButtons')} />
      <SettingRow label="الوضع الليلي" value={data.settings.theme === 'dark'} onChange={() => toggle('theme')} customValue />
    </SafeAreaView>
  );
};

const SettingRow: React.FC<{ label: string; value: boolean; onChange: () => void }> = ({ label, value, onChange }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Switch value={value} onValueChange={onChange} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: palette.background,
    gap: 12,
  },
  row: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    writingDirection: 'rtl',
  },
});
