import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BoardPostIt } from './HeroWires';
import { X, RotateCw } from 'lucide-react';

interface FlipTheaterModalProps {
  postIt: BoardPostIt | null;
  onClose: () => void;
}

export const FlipTheaterModal: React.FC<FlipTheaterModalProps> = ({ postIt, onClose }) => {
  const { language, isZBMode } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [postIt, onClose]);

  if (!postIt) return null;

  const getColorClasses = (color: BoardPostIt['color']) => {
    switch (color) {
      case 'green':
        return 'bg-[#dcfce7] border-[#86efac] text-emerald-950';
      case 'pink':
        return 'bg-[#fce7f3] border-[#f472b6] text-pink-950';
      case 'blue':
        return 'bg-[#e0f2fe] border-[#7dd3fc] text-sky-950';
      case 'orange':
        return 'bg-[#ffedd5] border-[#fdba74] text-orange-950';
      case 'yellow':
      default:
        return 'bg-[#fef9c3] border-[#fde047] text-stone-950';
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 3D Card Container */}
      <div className="relative z-10 w-full max-w-lg perspective-1000">
        {/* Tape on Top */}
        <div className="postit-tape !w-24 !h-7 !-top-3.5" />

        {/* Flippable Card */}
        <div
          className={`relative w-full min-h-[380px] duration-500 preserve-3d transition-transform cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* FRONT */}
          <div
            className={`absolute inset-0 backface-hidden p-8 sm:p-10 rounded-xl shadow-2xl border flex flex-col justify-between ${getColorClasses(
              postIt.color
            )}`}
          >
            <div>
              <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-6">
                <span className="font-mono text-xs uppercase font-bold tracking-widest opacity-70">
                  {postIt.title[language]}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider bg-black/10 px-2 py-0.5 rounded">
                  {isZBMode ? 'ZERO BS' : 'STORY'}
                </span>
              </div>

              <h3 className="font-marker text-2xl sm:text-3xl leading-snug tracking-tight uppercase">
                {postIt.body[language]}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-black/10 mt-6">
              <span className="font-mono text-xs opacity-60 flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5" />
                {language === 'fr' ? 'Cliquer pour retourner' : 'Click to flip'}
              </span>
              <span className="font-mono text-xs uppercase font-bold underline underline-offset-4">
                👆🏽 {language === 'fr' ? 'lire l’histoire' : 'read story'}
              </span>
            </div>
          </div>

          {/* BACK */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 p-8 sm:p-10 rounded-xl shadow-2xl border flex flex-col justify-between ${getColorClasses(
              postIt.color
            )}`}
          >
            <div>
              <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-4">
                <span className="font-mono text-xs uppercase font-bold tracking-widest opacity-70">
                  {postIt.title[language]} • {language === 'fr' ? 'Contexte' : 'Context'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="p-1 rounded-full hover:bg-black/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="font-sans text-sm sm:text-base leading-relaxed font-normal opacity-90">
                {postIt.paragraph[language]}
              </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-black/10 mt-4">
              <span className="font-mono text-[11px] opacity-60">
                {language === 'fr' ? 'Échap pour fermer' : 'ESC to close'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="font-mono text-xs uppercase font-bold underline"
              >
                {language === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
