export type Language = 'fr' | 'en';

export interface ProjectItem {
  id: string;
  title: { fr: string; en: string };
  category: 'mobile' | 'web' | 'fullstack' | 'cloud';
  tagline: { fr: string; en: string };
  description: { fr: string; en: string; zbFr?: string; zbEn?: string };
  technologies: string[];
  metrics: { fr: string; en: string }[];
  githubUrl?: string;
  liveUrl?: string;
  appUrl?: string;
  featured?: boolean;
  architectureHighlights?: { fr: string; en: string }[];
  image?: string;
}

export interface TechnicalConviction {
  id: string;
  icon: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
}

export interface SkillCategory {
  id: string;
  title: { fr: string; en: string };
  tagline: { fr: string; en: string };
  skills: string[];
}

export interface DiagnosticQuestion {
  id: number;
  question: {
    fr: string;
    en: string;
    zbFr?: string;
    zbEn?: string;
  };
  options: {
    id: string;
    text: {
      fr: string;
      en: string;
      zbFr?: string;
      zbEn?: string;
    };
    score: number;
  }[];
}

export interface PostItContent {
  id: number;
  category: 'architecture' | 'mobile' | 'backend' | 'devops';
  title: { fr: string; en: string };
  corpo: { fr: string; en: string };
  zerobs: { fr: string; en: string };
  paragraph: { fr: string; en: string };
}
