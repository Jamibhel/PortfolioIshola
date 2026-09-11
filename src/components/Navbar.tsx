import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { siteContent } from '../data/content';
import { Menu, X, Flame, Zap, Download } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    toggleLanguage,
    isZBMode,
    toggleZBMode,
    gaugeProgress,
    activeSection,
    setActiveSection
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 glass-panel border-b transition-colors duration-300 ${
          isZBMode
            ? 'border-stone-800 bg-stone-950/90 text-stone-100'
            : 'border-stone-200/60 bg-[#fafaf9]/85 text-stone-900'
        }`}
        aria-label="Navigation principale"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* BJ. Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('hero');
              }}
              className="text-base font-bold tracking-tighter uppercase text-stone-900 dark:text-stone-100 hover:text-orange-500 transition-colors"
            >
              BJ.
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-6 ml-8">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('hero');
                }}
                className={`text-[10px] font-mono font-medium uppercase tracking-[0.2em] transition-colors ${
                  activeSection === 'hero'
                    ? isZBMode
                      ? 'text-orange-400 font-semibold'
                      : 'text-stone-900 font-semibold'
                    : isZBMode
                    ? 'text-stone-400 hover:text-stone-100'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {siteContent.nav.home[language]}
              </a>

              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('projects');
                }}
                className={`text-[10px] font-mono font-medium uppercase tracking-[0.2em] transition-colors ${
                  activeSection === 'projects'
                    ? isZBMode
                      ? 'text-orange-400 font-semibold'
                      : 'text-stone-900 font-semibold'
                    : isZBMode
                    ? 'text-stone-400 hover:text-stone-100'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {siteContent.nav.projects[language]}
              </a>

              <a
                href="#architecture"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('architecture');
                }}
                className={`text-[10px] font-mono font-medium uppercase tracking-[0.2em] transition-colors ${
                  activeSection === 'architecture'
                    ? isZBMode
                      ? 'text-orange-400 font-semibold'
                      : 'text-stone-900 font-semibold'
                    : isZBMode
                    ? 'text-stone-400 hover:text-stone-100'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {siteContent.nav.architecture[language]}
              </a>

              <a
                href="#diagnostic"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('diagnostic');
                }}
                className={`text-[10px] font-mono font-medium uppercase tracking-[0.2em] transition-colors ${
                  activeSection === 'diagnostic'
                    ? isZBMode
                      ? 'text-orange-400 font-semibold'
                      : 'text-stone-900 font-semibold'
                    : isZBMode
                    ? 'text-stone-400 hover:text-stone-100'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {siteContent.nav.diagnostic[language]}
              </a>

              <a
                href="#diagnostic"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('diagnostic');
                }}
                className={`text-[10px] font-mono font-medium uppercase tracking-[0.2em] transition-colors ${
                  activeSection === 'contact'
                    ? isZBMode
                      ? 'text-orange-400 font-semibold'
                      : 'text-stone-900 font-semibold'
                    : isZBMode
                    ? 'text-stone-400 hover:text-stone-100'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {siteContent.nav.contact[language]}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Zero Bullshit Mode Toggle */}
            <button
              onClick={toggleZBMode}
              className={`relative overflow-hidden flex items-center gap-1.5 text-[10px] font-mono font-medium uppercase tracking-widest border rounded-full px-3 py-1.5 transition-all duration-300 ${
                isZBMode
                  ? 'border-orange-500 bg-orange-950/40 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.35)]'
                  : 'border-stone-300 hover:border-orange-400 text-stone-800'
              }`}
              title={isZBMode ? 'Production Mode' : 'Zero Bullshit Mode'}
              aria-label="Toggle Zero Bullshit Mode"
            >
              {!isZBMode && gaugeProgress > 0 && (
                <span
                  className="absolute inset-0 bg-orange-400/20 transition-all duration-300 pointer-events-none"
                  style={{ width: `${gaugeProgress * 100}%` }}
                />
              )}

              {isZBMode ? (
                <>
                  <Zap className="w-3.5 h-3.5 text-orange-400" />
                  <span className="hidden sm:inline">
                    {siteContent.nav.zbMode.active[language]}
                  </span>
                </>
              ) : (
                <>
                  <Flame
                    className={`w-3.5 h-3.5 ${
                      gaugeProgress > 0.5 ? 'text-orange-500 animate-bounce' : 'text-stone-700'
                    }`}
                  />
                  <span className="hidden sm:inline">
                    {siteContent.nav.zbMode.standard[language]}
                  </span>
                </>
              )}
            </button>

            {/* Download CV Button */}
            <a
              href="/Bello_Jamiu_Ishola_CV.pdf"
              download="Bello_Jamiu_Ishola_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                isZBMode
                  ? 'border-orange-500/60 bg-stone-900 text-orange-400 hover:bg-orange-500 hover:text-stone-950'
                  : 'border-stone-300 hover:border-orange-500 bg-white text-stone-800 hover:text-orange-600'
              }`}
              title="Download CV (PDF)"
            >
              <Download className="w-3 h-3 text-orange-400" />
              <span>CV</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1 text-[10px] font-mono font-medium uppercase tracking-widest border rounded-full px-3 py-1.5 transition-colors ${
                isZBMode
                  ? 'border-stone-700 hover:border-stone-500'
                  : 'border-stone-300 hover:border-stone-400'
              }`}
              aria-label="Toggle Language"
            >
              <span className={language === 'fr' ? 'font-bold text-stone-900 dark:text-stone-100' : 'text-stone-400'}>
                FR
              </span>
              <span className="text-stone-400" aria-hidden="true">/</span>
              <span className={language === 'en' ? 'font-bold text-stone-900 dark:text-stone-100' : 'text-stone-400'}>
                EN
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-stone-700 dark:text-stone-200"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-stone-950/90 backdrop-blur-md flex flex-col pt-24 px-8 pb-12 animate-fade-in text-stone-100 font-mono">
          <div className="flex flex-col gap-6 text-base tracking-wider uppercase">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left py-2 border-b border-stone-800 hover:text-orange-400"
            >
              {siteContent.nav.home[language]}
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="text-left py-2 border-b border-stone-800 hover:text-orange-400"
            >
              {siteContent.nav.projects[language]}
            </button>
            <button
              onClick={() => scrollTo('architecture')}
              className="text-left py-2 border-b border-stone-800 hover:text-orange-400"
            >
              {siteContent.nav.architecture[language]}
            </button>
            <button
              onClick={() => scrollTo('diagnostic')}
              className="text-left py-2 border-b border-stone-800 hover:text-orange-400"
            >
              {siteContent.nav.diagnostic[language]}
            </button>
            <a
              href="/Bello_Jamiu_Ishola_CV.pdf"
              download="Bello_Jamiu_Ishola_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 border-b border-stone-800 text-orange-400 font-bold"
            >
              <Download className="w-4 h-4" />
              {language === 'fr' ? 'Télécharger CV (PDF)' : 'Download CV (PDF)'}
            </a>
          </div>

          <div className="mt-auto pt-8 flex justify-between items-center">
            <button
              onClick={() => {
                toggleZBMode();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-orange-500/50 text-orange-400"
            >
              <Flame className="w-4 h-4" />
              {isZBMode ? 'Production Mode' : 'Zero Bullshit Mode'}
            </button>

            <button
              onClick={toggleLanguage}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded-full border border-stone-700"
            >
              {language.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
