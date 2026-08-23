import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBoard } from './components/HeroBoard';
import { IntroSection } from './components/IntroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ConvictionsSection } from './components/ConvictionsSection';
import { ContactSection } from './components/ContactSection';
import { AudioPlayer } from './components/AudioPlayer';
import { CurtainTransition } from './components/CurtainTransition';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { toggleZBMode, setIsEasterEggOpen } = useApp();

  // Keyboard shortcut listener for easter egg & quick ZB toggle
  useEffect(() => {
    let typedKeys: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in form inputs
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      typedKeys.push(e.key.toLowerCase());
      if (typedKeys.length > 10) typedKeys.shift();

      const sequence = typedKeys.join('');
      if (sequence.endsWith('tetris') || sequence.endsWith('mine')) {
        setIsEasterEggOpen(true);
        typedKeys = [];
      }

      // Quick toggle with Ctrl+Shift+Z
      if (e.ctrlKey && e.shiftKey && (e.key === 'Z' || e.key === 'z')) {
        e.preventDefault();
        toggleZBMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleZBMode, setIsEasterEggOpen]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange-500/20 selection:text-orange-950 dark:selection:text-orange-200">
      <CurtainTransition />
      <Navbar />
      <main className="flex-1">
        <HeroBoard />
        <IntroSection />
        <ProjectsSection />
        <ConvictionsSection />
        <ContactSection />
      </main>
      <AudioPlayer />
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
