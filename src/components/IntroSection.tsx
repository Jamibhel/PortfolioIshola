import React from 'react';
import { useApp } from '../context/AppContext';
import { siteContent } from '../data/content';

export const IntroSection: React.FC = () => {
  const { language, isZBMode } = useApp();

  return (
    <section className="py-16 md:py-24 px-6 bg-stone-900 text-stone-100 border-y border-stone-800 transition-colors duration-300 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed md:leading-loose text-stone-300 text-left animate-header-text">
          {isZBMode ? (
            <span className="text-orange-200">
              {siteContent.intro.zb[language]}
            </span>
          ) : (
            <span className="text-stone-200">
              {siteContent.intro.corporate[language]}
            </span>
          )}
        </p>
      </div>
    </section>
  );
};
