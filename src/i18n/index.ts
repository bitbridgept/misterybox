import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en.json';
import translationPTBR from './locales/pt-BR.json';
import translationES from './locales/es.json';
import translationIT from './locales/it.json';
import translationRU from './locales/ru.json';
import translationZH from './locales/zh.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      'pt-BR': {
        translation: translationPTBR
      },
      es: {
        translation: translationES
      },
      it: {
        translation: translationIT
      },
      ru: {
        translation: translationRU
      },
      zh: {
        translation: translationZH
      }
    },
    lng: 'pt-BR', // Set Portuguese as default
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;