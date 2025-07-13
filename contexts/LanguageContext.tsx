
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { WasteItem, KnowledgeBaseContent } from '../types';

export type LanguageCode = 'en' | 'de' | 'it' | 'pl' | 'ro' | 'tr' | 'ar';

export const languages: Record<LanguageCode, { name: string; path: string }> = {
    en: { name: 'English', path: './locales/en.json' },
    de: { name: 'Deutsch', path: './locales/de.json' },
    it: { name: 'Italiano', path: './locales/it.json' },
    pl: { name: 'Polski', path: './locales/pl.json' },
    ro: { name: 'Română', path: './locales/ro.json' },
    tr: { name: 'Türkçe', path: './locales/tr.json' },
    ar: { name: 'العربية', path: './locales/ar.json' },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string, replacements?: Record<string, string>) => any;
  getLocalizedWasteItems: () => Record<string, WasteItem[]>;
  getLocalizedKnowledgeBase: () => KnowledgeBaseContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
        const savedLang = localStorage.getItem('app-lang') as LanguageCode;
        return savedLang && languages[savedLang] ? savedLang : 'en';
    } catch (e) {
        return 'en';
    }
  });

  const [translations, setTranslations] = useState<any | null>(null);

  useEffect(() => {
    // Set document direction for RTL support
    const isRtl = (lang: LanguageCode) => lang === 'ar';
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl(language) ? 'rtl' : 'ltr';

    let isCancelled = false;

    const fetchTranslations = async () => {
        try {
            const response = await fetch(languages[language].path);
            if (!response.ok) {
                throw new Error(`Failed to fetch translations for ${language}`);
            }
            const data = await response.json();
            if (!isCancelled) {
                setTranslations(data);
            }
        } catch (error) {
            console.error(error);
            // If the desired language fails, fallback to English
            if (language !== 'en' && !isCancelled) {
                try {
                    const fallbackResponse = await fetch(languages['en'].path);
                    const fallbackData = await fallbackResponse.json();
                    if (!isCancelled) {
                        setTranslations(fallbackData);
                    }
                } catch (fallbackError) {
                    console.error('Failed to load fallback language', fallbackError);
                }
            }
        }
    };

    fetchTranslations();

    return () => {
        isCancelled = true;
    };
  }, [language]);


  const setLanguage = (lang: LanguageCode) => {
    if (lang === language) return;
    try {
        localStorage.setItem('app-lang', lang);
    } catch(e) {
        console.error("Could not save language to local storage");
    }
    setLanguageState(lang);
  };
  
  const t = useCallback((key: string, replacements: Record<string, string> = {}): any => {
    if (!translations) {
        return key; // Should be covered by the loading screen, but acts as a fallback.
    }
    const keys = key.split('.');
    let result = translations;

    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k];
        } else {
            return key; // Key not found
        }
    }

    if (typeof result === 'string') {
        let strResult = result;
        Object.keys(replacements).forEach(rKey => {
            strResult = strResult.replace(`{{${rKey}}}`, replacements[rKey]);
        });
        return strResult;
    }

    // If result is not a string (i.e., an object or array), return it as is.
    if (result !== undefined) {
      return result;
    }

    return key;
  }, [translations]);

  const getLocalizedWasteItems = useCallback((): Record<string, WasteItem[]> => {
    const items = t('waste_items');
    return typeof items === 'object' && items !== null ? items : {};
  }, [t]);

  const getLocalizedKnowledgeBase = useCallback((): KnowledgeBaseContent => {
    const base = t('knowledge_base');
    return Array.isArray(base) ? base : [];
  }, [t]);


  if (!translations) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--primary-color)]"></div>
      </div>
    );
  }


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLocalizedWasteItems, getLocalizedKnowledgeBase }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
