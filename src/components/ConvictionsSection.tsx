import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { siteContent, convictions, technicalSkills } from '../data/content';
import {
  WifiOff,
  Database,
  Zap,
  FileCode,
  Layers,
  Boxes,
  Smartphone,
  Globe,
  ShieldCheck,
  Cpu,
  Sparkles
} from 'lucide-react';

export const ConvictionsSection: React.FC = () => {
  const { language, isZBMode } = useApp();
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('all');

  const getConvictionIcon = (id: string) => {
    switch (id) {
      case 'offline-first':
        return <WifiOff className="w-5 h-5" />;
      case 'database-integrity':
        return <Database className="w-5 h-5" />;
      case '60fps-performance':
        return <Zap className="w-5 h-5" />;
      case 'end-to-end-types':
        return <FileCode className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const getSkillCategoryIcon = (id: string) => {
    switch (id) {
      case '3d-graphics':
        return <Boxes className="w-4 h-4 text-orange-400" />;
      case 'mobile-dev':
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'web-fullstack':
        return <Globe className="w-4 h-4 text-sky-400" />;
      case 'cloud-data':
        return <Database className="w-4 h-4 text-purple-400" />;
      case 'devops-security':
      default:
        return <ShieldCheck className="w-4 h-4 text-amber-400" />;
    }
  };

  const filteredSkillCategories =
    activeSkillCategory === 'all'
      ? technicalSkills
      : technicalSkills.filter((cat) => cat.id === activeSkillCategory);

  return (
    <section
      id="architecture"
      className="py-24 px-6 bg-stone-900 text-stone-100 border-t border-stone-800 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        {/* Part 1: Core Architectural Convictions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Column: Title & Main Statement */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h2 className="text-[10px] font-mono font-medium text-stone-500 uppercase tracking-[0.4em]">
              {siteContent.convictions.sectionTitle[language]}
            </h2>
            <p className="text-3xl font-medium tracking-tight text-stone-50 leading-tight">
              {siteContent.convictions.headline[language]}
            </p>
          </div>

          {/* Right Column: 4 Conviction Cards */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {convictions.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 group">
                <div
                  className={`p-3 rounded-xl w-fit transition-colors ${
                    isZBMode
                      ? 'bg-orange-500/15 text-orange-400'
                      : 'bg-stone-800 text-orange-400 group-hover:bg-stone-700'
                  }`}
                >
                  {getConvictionIcon(item.id)}
                </div>

                <h3 className="text-base font-semibold tracking-wide uppercase text-stone-100 mt-1 font-mono">
                  {item.title[language]}
                </h3>

                <p className="text-xs sm:text-sm font-light leading-relaxed text-stone-400">
                  {item.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Technical Skills Matrix & Specializations */}
        <div className="pt-16 border-t border-stone-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 font-mono text-[10px] uppercase font-bold tracking-widest mb-3">
                <Cpu className="w-3.5 h-3.5" />
                {language === 'fr' ? 'Stack & Spécialisations' : 'Engineering Stack & Specializations'}
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-100">
                {language === 'fr' ? 'Compétences & Maîtrise Technique' : 'Full-Spectrum Technical Capabilities'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1.5 max-w-xl">
                {language === 'fr'
                  ? 'Du rendu 3D temps réel aux moteurs offline-first et bases de données chiffrées.'
                  : 'From real-time 3D rendering to offline-first sync engines and resilient cloud backends.'}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveSkillCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all ${
                  activeSkillCategory === 'all'
                    ? 'bg-orange-500 text-stone-950 font-bold'
                    : 'bg-stone-800/80 text-stone-400 hover:text-stone-200'
                }`}
              >
                {language === 'fr' ? 'Tout' : 'All'}
              </button>
              {technicalSkills.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveSkillCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all ${
                    activeSkillCategory === cat.id
                      ? 'bg-stone-100 text-stone-900 font-bold shadow'
                      : 'bg-stone-800/80 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {getSkillCategoryIcon(cat.id)}
                  <span>{cat.title[language].split('&')[0].trim()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Skill Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkillCategories.map((category) => (
              <div
                key={category.id}
                className="p-6 rounded-2xl bg-stone-950/60 border border-stone-800/80 hover:border-stone-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                        {getSkillCategoryIcon(category.id)}
                      </div>
                      <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-200 group-hover:text-orange-400 transition-colors">
                        {category.title[language]}
                      </h4>
                    </div>
                    {category.id === '3d-graphics' && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        <Sparkles className="w-2.5 h-2.5" />
                        3D
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] font-mono text-stone-400 mb-4">
                    {category.tagline[language]}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-stone-800/60">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300 group-hover:border-stone-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
