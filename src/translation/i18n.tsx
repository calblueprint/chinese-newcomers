import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { getLocales } from 'react-native-localize';
import common_en from '../translation/english/common.json';
import common_chinese from '../translation/chinese/common.json';

i18n.use(initReactI18next).init({
  lng: 'en', // getLocales()[0].languageCode isn't working
  fallbackLng: 'en',
  resources: {
    en: common_en,
    chinese: common_chinese
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
