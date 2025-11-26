import { useMemo } from 'react';
import { useAppData } from '../context/AppDataContext';
import { UILang, translate, isRTL as rtlHelper } from '../constants/strings';

export const useLocale = () => {
  const { data } = useAppData();
  const language = (data?.settings.language ?? 'ar') as UILang;

  const t = useMemo(() => {
    return (key: Parameters<typeof translate>[0]) => translate(key, language);
  }, [language]);

  return { language, isRTL: rtlHelper(language), t };
};
