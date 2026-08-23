import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { siteContent } from '../data/content';

export const PostItNote: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { language, incrementGauge } = useApp();
  const content = siteContent.hero.signaturePostIt;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    incrementGauge(0.2); // Fills the rage gauge on interaction
  };

  return (
    <div
      className="relative w-full max-w-[280px] h-[220px] cursor-pointer select-none group perspective-1000"
      onClick={handleFlip}
      role="button"
      aria-label="Post-it note interaction"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleFlip();
        }
      }}
    >
      {/* Translucent Tape on Top */}
      <div className="postit-tape" />

      {/* Flippable Card Container */}
      <div
        className={`w-full h-full duration-500 preserve-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 postit-note backface-hidden p-5 flex flex-col justify-between text-stone-900 rotate-[1.5deg] group-hover:rotate-[0deg] transition-transform">
          <div>
            <h3 className="font-marker text-xl tracking-wide text-stone-950">
              {content.name}
            </h3>
            <p className="font-mono text-[11px] font-semibold tracking-tight text-stone-800 mt-1 uppercase">
              {content.role}
            </p>
            <p className="font-handwriting text-lg text-stone-800 mt-2 leading-tight">
              {content.frontPunchline[language]}
            </p>
          </div>

          <div className="flex justify-end items-center gap-1">
            <span className="text-sm">👆🏽</span>
            <span className="font-mono text-[10px] uppercase font-bold text-stone-700 underline underline-offset-2">
              {content.frontButton[language]}
            </span>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 postit-note backface-hidden rotate-y-180 p-5 flex flex-col justify-between text-stone-900 bg-amber-200">
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-stone-900">
              {content.name}
            </h4>
            <p className="font-sans text-xs text-stone-800 font-normal leading-relaxed mt-2">
              {content.backText[language]}
            </p>
          </div>

          <div className="text-right">
            <span className="font-mono text-[9px] uppercase tracking-wider text-stone-600 font-semibold underline">
              {content.backClose[language]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
