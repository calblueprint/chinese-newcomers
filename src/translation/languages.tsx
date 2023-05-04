import { Dictionary } from '../types/types';
import CN from './chinese.json';
import EN from './english.json';

export const dictionaryList: Dictionary = { EN, CN };

export const languageOptions = {
  EN: 'English',
  CN: 'Chinese',
};

export const langToDictMap: Map<string, Dictionary> = new Map([
  ['english', dictionaryList.EN],
  ['chinese', dictionaryList.CN],
]);

export const checkAndGetLang = (language: string): Dictionary =>
  langToDictMap.has(language) ? langToDictMap.get(language) : dictionaryList.EN;

export const dictToLang = (langMap: Dictionary | null): string =>
  langMap === CN ? 'chinese' : 'english';
