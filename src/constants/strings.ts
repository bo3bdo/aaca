// Simple bilingual string dictionary for Arabic (rtl) and English (ltr) UI labels.
// Add more keys as needed when new screens or buttons are introduced.
export type UILang = 'ar' | 'en';

type TranslationKey =
  | 'tabHome'
  | 'tabCards'
  | 'tabCategories'
  | 'tabSettings'
  | 'cardFormTitle'
  | 'addCard'
  | 'delete'
  | 'undo'
  | 'clear'
  | 'speak'
  | 'englishLabel'
  | 'ttsLabel'
  | 'largeButtonsLabel'
  | 'darkModeLabel'
  | 'languageLabel'
  | 'arabic'
  | 'english'
  | 'categoryName'
  | 'categoryEnglish'
  | 'add'
  | 'coreWord'
  | 'color'
  | 'image'
  | 'pickFromGallery'
  | 'takePhoto'
  | 'recordAudio'
  | 'startRecording'
  | 'stop'
  | 'customRecordingSaved'
  | 'save'
  | 'requiredArLabel'
  | 'arName'
  | 'enName'
  | 'settingsLanguageToggle'
  | 'useRecordedIfAvailable';

const translations: Record<TranslationKey, { ar: string; en: string }> = {
  tabHome: { ar: 'الرئيسية', en: 'Home' },
  tabCards: { ar: 'البطاقات', en: 'Cards' },
  tabCategories: { ar: 'التصنيفات', en: 'Categories' },
  tabSettings: { ar: 'الإعدادات', en: 'Settings' },
  cardFormTitle: { ar: 'إضافة / تعديل بطاقة', en: 'Add / Edit Card' },
  addCard: { ar: '+ إضافة بطاقة', en: '+ Add Card' },
  delete: { ar: 'حذف', en: 'Delete' },
  undo: { ar: 'تراجع', en: 'Undo' },
  clear: { ar: 'حذف الكل', en: 'Clear' },
  speak: { ar: 'نطق', en: 'Speak' },
  englishLabel: { ar: 'إظهار الإنجليزية', en: 'Show English labels' },
  ttsLabel: { ar: 'استخدام النطق الآلي', en: 'Use TTS' },
  largeButtonsLabel: { ar: 'أزرار كبيرة', en: 'Big buttons' },
  darkModeLabel: { ar: 'الوضع الليلي', en: 'Dark mode' },
  languageLabel: { ar: 'لغة الواجهة', en: 'Interface language' },
  arabic: { ar: 'العربية', en: 'Arabic' },
  english: { ar: 'الإنجليزية', en: 'English' },
  categoryName: { ar: 'اسم التصنيف', en: 'Category name' },
  categoryEnglish: { ar: 'English', en: 'English' },
  add: { ar: 'إضافة', en: 'Add' },
  coreWord: { ar: 'كلمة أساسية', en: 'Core word' },
  color: { ar: 'اللون', en: 'Color' },
  image: { ar: 'الصورة', en: 'Image' },
  pickFromGallery: { ar: 'من المعرض', en: 'From gallery' },
  takePhoto: { ar: 'التقاط صورة', en: 'Take photo' },
  recordAudio: { ar: 'تسجيل صوت مخصص', en: 'Record custom audio' },
  startRecording: { ar: 'بدء التسجيل', en: 'Start recording' },
  stop: { ar: 'إيقاف', en: 'Stop' },
  customRecordingSaved: { ar: 'تم حفظ التسجيل', en: 'Recording saved' },
  save: { ar: 'حفظ', en: 'Save' },
  requiredArLabel: { ar: 'يجب إدخال الاسم بالعربية', en: 'Arabic label is required' },
  arName: { ar: 'الاسم بالعربية *', en: 'Arabic label *' },
  enName: { ar: 'الاسم بالإنجليزية', en: 'English label' },
  settingsLanguageToggle: { ar: 'اختر لغة الواجهة', en: 'Choose interface language' },
  useRecordedIfAvailable: { ar: 'استخدام التسجيل عند توفره', en: 'Use recorded audio if available' },
};

export const translate = (key: TranslationKey, language: UILang) => translations[key][language];

export const isRTL = (language: UILang) => language === 'ar';
*** End of File
