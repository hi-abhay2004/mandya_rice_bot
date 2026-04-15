'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/public/locales/en.json';
import kn from '@/public/locales/kn.json';

type Lang = 'en' | 'kn';
type Translations = Record<string, string>;

const LOCALES: Record<Lang, Translations> = { en, kn };

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => { },
  t: (k) => (en as Translations)[k] ?? k,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>('en');

  // Restore from localStorage on mount (client-only, after hydration)
  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'en' || saved === 'kn') {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  const t = (key: string): string =>
    (LOCALES[lang] as Translations)[key] ?? (en as Translations)[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
