import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isZBMode: boolean;
  toggleZBMode: () => void;
  setZBMode: (enabled: boolean) => void;
  gaugeProgress: number;
  incrementGauge: (amount?: number) => void;
  resetGauge: () => void;
  isTransitioning: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (playing: boolean) => void;
  toggleAudio: () => void;
  isEasterEggOpen: boolean;
  setIsEasterEggOpen: (open: boolean) => void;
  activeTheaterPostIt: string | null;
  setActiveTheaterPostIt: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize language from URL params, localStorage, or browser default
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang === 'en' || urlLang === 'fr') return urlLang;
      const stored = localStorage.getItem('db_lang');
      if (stored === 'en' || stored === 'fr') return stored;
      const browserLang = navigator.language?.toLowerCase() || '';
      return browserLang.startsWith('fr') ? 'fr' : 'en';
    }
    return 'fr';
  });

  const [isZBMode, setIsZBModeState] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [gaugeProgress, setGaugeProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState<boolean>(false);
  const [activeTheaterPostIt, setActiveTheaterPostIt] = useState<string | null>(null);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('db_lang', lang);
      document.documentElement.lang = lang;
      const newUrl = lang === 'fr' ? window.location.pathname : `${window.location.pathname}?lang=en`;
      window.history.replaceState({}, '', newUrl);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const setZBMode = (enabled: boolean) => {
    if (isTransitioning || enabled === isZBMode) return;
    setIsTransitioning(true);

    // If entering ZB, play or keep audio available
    if (!enabled) {
      setIsAudioPlaying(false);
    }

    setTimeout(() => {
      setIsZBModeState(enabled);
      if (typeof document !== 'undefined') {
        if (enabled) {
          document.body.classList.add('zb-mode');
        } else {
          document.body.classList.remove('zb-mode');
        }
      }
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 450);
  };

  const toggleZBMode = () => {
    setZBMode(!isZBMode);
  };

  const incrementGauge = (amount = 0.25) => {
    if (isZBMode) return;
    setGaugeProgress((prev) => {
      const next = Math.min(prev + amount, 1);
      if (next >= 1) {
        setTimeout(() => {
          setZBMode(true);
          setGaugeProgress(0);
        }, 300);
      }
      return next;
    });
  };

  const resetGauge = () => setGaugeProgress(0);

  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'expertise', 'diagnostic'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isZBMode,
        toggleZBMode,
        setZBMode,
        gaugeProgress,
        incrementGauge,
        resetGauge,
        isTransitioning,
        activeSection,
        setActiveSection,
        isAudioPlaying,
        setIsAudioPlaying,
        toggleAudio,
        isEasterEggOpen,
        setIsEasterEggOpen,
        activeTheaterPostIt,
        setActiveTheaterPostIt
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
