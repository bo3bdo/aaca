import React from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useAppData } from '../context/AppDataContext';
import { palette } from '../constants/colors';
import { useLocale } from '../hooks/useLocale';
import { UILang } from '../constants/strings';

export const SettingsScreen: React.FC = () => {
  const { data, updateSettings } = useAppData();
  const { t, isRTL } = useLocale();

  if (!data) return null;

  const toggle = (key: keyof typeof data.settings) => {
    if (key === 'theme') {
      updateSettings({ ...data.settings, theme: data.settings.theme === 'light' ? 'dark' : 'light' });
      return;
    }
    if (key === 'language') {
      return;
    }
    updateSettings({ ...data.settings, [key]: !data.settings[key] });
  };

  const changeLanguage = (lang: UILang) => {
    updateSettings({ ...data.settings, language: lang });
  };

  return (
    <SafeAreaView style={[styles.container, isRTL ? styles.rtl : styles.ltr]}>
      <SettingRow
        label={t('englishLabel')}
        value={data.settings.showEnglish}
        onChange={() => toggle('showEnglish')}
        isRTL={isRTL}
      />
      <SettingRow label={t('ttsLabel')} value={data.settings.useTTS} onChange={() => toggle('useTTS')} isRTL={isRTL} />
      <SettingRow label={t('largeButtonsLabel')} value={data.settings.largeButtons} onChange={() => toggle('largeButtons')} isRTL={isRTL} />
      <SettingRow label={t('darkModeLabel')} value={data.settings.theme === 'dark'} onChange={() => toggle('theme')} isRTL={isRTL} />

      <Text style={[styles.sectionTitle, isRTL ? styles.rtl : styles.ltr]}>{t('languageLabel')}</Text>
      <View style={[styles.languageRow, isRTL ? styles.rowRtl : styles.rowLtr]}>
        <TouchableOpacity
          style={[styles.langBtn, data.settings.language === 'ar' && styles.langBtnActive]}
          onPress={() => changeLanguage('ar')}
          accessibilityRole="button"
        >
          <Text style={styles.langText}>{t('arabic')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langBtn, data.settings.language === 'en' && styles.langBtnActive]}
          onPress={() => changeLanguage('en')}
          accessibilityRole="button"
        >
          <Text style={styles.langText}>{t('english')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const SettingRow: React.FC<{ label: string; value: boolean; onChange: () => void; isRTL: boolean }> = ({
  label,
  value,
  onChange,
  isRTL,
}) => (
  <View style={[styles.row, isRTL ? styles.rowRtl : styles.rowLtr]}>
    <Text style={[styles.label, isRTL ? styles.rtl : styles.ltr]}>{label}</Text>
    <Switch value={value} onValueChange={onChange} accessibilityLabel={label} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: palette.background,
    gap: 12,
  },
  rtl: {
    writingDirection: 'rtl',
  },
  ltr: {
    writingDirection: 'ltr',
  },
  row: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowRtl: { flexDirection: 'row-reverse' },
  rowLtr: { flexDirection: 'row' },
  label: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: palette.muted,
    marginTop: 4,
  },
  languageRow: {
    flexDirection: 'row',
    gap: 12,
  },
  langBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  langBtnActive: {
    borderColor: palette.primary,
    backgroundColor: '#E3F2FD',
  },
  langText: {
    fontSize: 16,
    color: palette.text,
  },
});
