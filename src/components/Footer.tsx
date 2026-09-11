import React from 'react';
import { useApp } from '../context/AppContext';
import { siteContent } from '../data/content';

export const Footer: React.FC = () => {
  const { isZBMode } = useApp();

  return (
    <footer
      className={`py-10 px-6 border-t transition-colors duration-300 ${
        isZBMode
          ? 'bg-stone-950 text-stone-400 border-stone-800'
          : 'bg-stone-50 text-stone-500 border-stone-200'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8">
          <a
            href={`mailto:${siteContent.contact.email}`}
            className="text-[10px] font-mono font-bold uppercase tracking-widest hover:text-orange-500 transition-colors"
          >
            Email: {siteContent.contact.email}
          </a>
        </div>

        <div className="text-center md:text-right">
          <p className="text-[10px] font-mono font-light uppercase tracking-widest leading-loose text-stone-400">
            Bello Jamiu Ishola — 2026 — {siteContent.footer.role}
          </p>
          <p className="text-[9px] font-mono text-stone-500 font-light uppercase tracking-widest mt-1">
            {siteContent.footer.copy}
          </p>
        </div>
      </div>
    </footer>
  );
};
