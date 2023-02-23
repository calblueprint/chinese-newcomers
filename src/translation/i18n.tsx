import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { getLocales } from 'react-native-localize';
import commonEn from "./english/common.json";
import commonChinese from "./chinese/common.json";

i18n.use(initReactI18next).init({
  // TODO: look into getLocales()[0].languageCode
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: commonEn,
    chinese: commonChinese
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
