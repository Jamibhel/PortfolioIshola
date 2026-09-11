import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { siteContent } from '../data/content';
import { Avatar3D } from './Avatar3D';
import { HeroWires, BoardPostIt } from './HeroWires';
import { FlipTheaterModal } from './FlipTheaterModal';
import { AnimatedMarkerText } from './AnimatedMarkerText';
import { InteractiveHeroGrid } from './InteractiveHeroGrid';
import postitsData from '../data/postits.json';
import { MousePointerClick, Download } from 'lucide-react';

interface ActivePostIt extends BoardPostIt {
  createdAt: number;
  isFading?: boolean;
}

export const HeroBoard: React.FC = () => {
  const { language, isZBMode, incrementGauge } = useApp();
  const boardRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState({ width: 1200, height: 750 });
  const [postIts, setPostIts] = useState<ActivePostIt[]>([]);
  const [activeTheaterPostIt, setActiveTheaterPostIt] = useState<BoardPostIt | null>(null);
  const [lastLookAtTarget, setLastLookAtTarget] = useState<{ x: number; y: number } | null>(null);
  const [clickCount, setClickCount] = useState(0);

  // Dragging state (mouse + touch)
  const draggingIdRef = useRef<number | null>(null);
  const dragStartPosRef = useRef<{ clientX: number; clientY: number; initialX: number; initialY: number } | null>(null);
  const isDragMovedRef = useRef<boolean>(false);

  // Auto-disappear post-its after 5.5 seconds (4.6s triggers fluttering departure animation, 5.4s removes)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setPostIts((prev) => {
        const updated = prev
          .map((p) => (now - p.createdAt > 4600 ? { ...p, isFading: true } : p))
          .filter((p) => now - p.createdAt <= 5400);
        return updated.length !== prev.length || updated.some((p, i) => p.isFading !== prev[i]?.isFading)
          ? updated
          : prev;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Resize listener
  useEffect(() => {
    const updateSize = () => {
      if (boardRef.current) {
        setBoardSize({
          width: boardRef.current.clientWidth,
          height: boardRef.current.clientHeight
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Global move & up listeners for drag handling (supporting both mouse and touch)
  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!draggingIdRef.current || !dragStartPosRef.current || !boardRef.current) return;

      const deltaX = clientX - dragStartPosRef.current.clientX;
      const deltaY = clientY - dragStartPosRef.current.clientY;

      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        isDragMovedRef.current = true;
      }

      const boardRect = boardRef.current.getBoundingClientRect();
      const deltaXPercent = (deltaX / boardRect.width) * 100;
      const isMobile = boardRect.width < 768;
      const maxClampX = isMobile ? 55 : 85;
      const newX = Math.max(4, Math.min(maxClampX, dragStartPosRef.current.initialX + deltaXPercent));
      const newY = Math.max(10, Math.min(boardRect.height - (isMobile ? 160 : 220), dragStartPosRef.current.initialY + deltaY));

      setPostIts((prev) =>
        prev.map((p) => (p.id === draggingIdRef.current ? { ...p, x: newX, y: newY } : p))
      );
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && draggingIdRef.current) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      draggingIdRef.current = null;
      dragStartPosRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, []);

  // Spawn a new animated post-it on board click/touch (Max 8 cards visible at once)
  const spawnPostIt = (clientX: number, clientY: number) => {
    if (!boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const isMobile = rect.width < 768;

    const clickX = ((clientX - rect.left) / rect.width) * 100;
    const clickY = clientY - rect.top - (isMobile ? 50 : 80);

    // Pick next post-it from pool
    const pool = postitsData.postits;
    const nextIndex = clickCount % pool.length;
    const selected = pool[nextIndex];

    const colors: BoardPostIt['color'][] = ['yellow', 'green', 'pink', 'blue', 'orange'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomRot = (Math.random() - 0.5) * (isMobile ? 4 : 6);

    const cardWidth = isMobile ? 150 : 195;
    const cardHeight = isMobile ? 145 : 180;
    const maxClampX = isMobile ? 52 : 80;

    const targetPos = {
      x: Math.max(5, Math.min(maxClampX, clickX)),
      y: Math.max(30, Math.min(rect.height - cardHeight - 20, clickY))
    };

    const newPostIt: ActivePostIt = {
      id: Date.now(),
      createdAt: Date.now(),
      x: targetPos.x,
      y: targetPos.y,
      width: cardWidth,
      height: cardHeight,
      rotation: randomRot,
      color: randomColor,
      title: selected.title,
      body: isZBMode ? selected.zerobs : selected.corpo,
      paragraph: selected.paragraph
    };

    // Update avatar head gaze reaction
    setLastLookAtTarget(targetPos);

    // Maintain max 8 cards before recycling (FIFO)
    setPostIts((prev) => [...prev.slice(-7), newPostIt]);
    setClickCount((prev) => prev + 1);
    incrementGauge(0.15);
  };

  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.postit-card') || (e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) return;
    spawnPostIt(e.clientX, e.clientY);
  };

  const handlePostItStart = (clientX: number, clientY: number, postIt: ActivePostIt) => {
    isDragMovedRef.current = false;
    draggingIdRef.current = postIt.id;
    dragStartPosRef.current = {
      clientX,
      clientY,
      initialX: postIt.x,
      initialY: postIt.y
    };
  };

  const handlePostItClick = (e: React.MouseEvent, postIt: ActivePostIt) => {
    e.stopPropagation();
    if (!isDragMovedRef.current) {
      setActiveTheaterPostIt(postIt);
    }
  };

  const handlePostItTouchEnd = (e: React.TouchEvent, postIt: ActivePostIt) => {
    e.stopPropagation();
    if (!isDragMovedRef.current) {
      setActiveTheaterPostIt(postIt);
    }
  };

  const getPostItColor = (color: BoardPostIt['color']) => {
    switch (color) {
      case 'green':
        return 'bg-[#dcfce7] border-[#bbf7d0] text-stone-950';
      case 'pink':
        return 'bg-[#fce7f3] border-[#fbcfe8] text-stone-950';
      case 'blue':
        return 'bg-[#e0f2fe] border-[#bae6fd] text-stone-950';
      case 'orange':
        return 'bg-[#ffedd5] border-[#fed7aa] text-stone-950';
      case 'yellow':
      default:
        return 'bg-[#fef9c3] border-[#fde047] text-stone-950';
    }
  };

  const heroContent = siteContent.hero;

  return (
    <header
      id="hero"
      ref={boardRef}
      onClick={handleBoardClick}
      className={`relative min-h-[760px] lg:min-h-[860px] pt-28 pb-20 px-6 md:pt-44 md:pb-28 overflow-hidden transition-colors duration-300 select-none cursor-crosshair ${
        isZBMode ? 'bg-stone-950 text-stone-100' : 'bg-[#fafaf9] text-stone-900'
      }`}
    >
      {/* 1. Interactive Elastic Grid Canvas */}
      <InteractiveHeroGrid />

      {/* 2. SVG Wires Layer connecting dynamically spawned post-its */}
      <HeroWires
        postIts={postIts}
        containerWidth={boardSize.width}
        containerHeight={boardSize.height}
      />

      {/* 3. Left Hero Content */}
      <div className="max-w-6xl mx-auto relative z-20 pointer-events-auto">
        <div className="max-w-2xl flex flex-col gap-5 sm:gap-6">
          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit text-[10px] font-mono uppercase font-medium tracking-wider border shadow-sm transition-all ${
              isZBMode
                ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400'
                : 'border-emerald-200 bg-emerald-50/80 text-emerald-700'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              {isZBMode
                ? heroContent.statusBadge.zb[language]
                : heroContent.statusBadge.corporate[language]}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1]">
            <span className="block animate-header-text">
              {isZBMode
                ? heroContent.title.line1.zb[language]
                : heroContent.title.line1.corporate[language]}
            </span>
            <span className="block animate-header-text" style={{ animationDelay: '120ms' }}>
              {isZBMode
                ? heroContent.title.line2.zb[language]
                : heroContent.title.line2.corporate[language]}
            </span>
            <span
              className={`block italic animate-header-text ${
                isZBMode ? 'text-orange-400' : 'text-stone-400'
              }`}
              style={{ animationDelay: '240ms' }}
            >
              {isZBMode
                ? heroContent.title.line3.zb[language]
                : heroContent.title.line3.corporate[language]}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xs sm:text-base font-light leading-relaxed max-w-xl animate-header-text ${
              isZBMode ? 'text-stone-300' : 'text-stone-600'
            }`}
            style={{ animationDelay: '340ms' }}
            dangerouslySetInnerHTML={{
              __html: isZBMode
                ? heroContent.subtitle.zb[language]
                : heroContent.subtitle.corporate[language]
            }}
          />

          {/* Badges / Competency Tags */}
          <div className="flex flex-wrap gap-2 pt-1 animate-header-text" style={{ animationDelay: '420ms' }}>
            {heroContent.badges.map((badge, index) => (
              <span
                key={index}
                className={`text-[9px] sm:text-[10px] font-mono font-medium uppercase tracking-wider sm:tracking-widest px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-md border shadow-sm transition-colors ${
                  isZBMode
                    ? 'border-stone-800 bg-stone-900/80 text-stone-200'
                    : 'border-stone-200 bg-white text-stone-800'
                }`}
              >
                {badge[language]}
              </span>
            ))}
          </div>

          {/* Action Row: Permanent Signature Post-It Note & Download CV Button */}
          <div className="flex flex-wrap items-center gap-4 mt-4 sm:mt-6 animate-header-text" style={{ animationDelay: '500ms' }}>
            <div
              onClick={() =>
                setActiveTheaterPostIt({
                  id: 999,
                  x: 35,
                  y: 500,
                  width: 210,
                  height: 190,
                  rotation: 2.5,
                  color: 'yellow',
                  title: { fr: 'Carte de visite', en: 'Business Card' },
                  body: {
                    fr: "OUI, J'AI MIS UN POST-IT SUR MON PROPRE PORTFOLIO.",
                    en: 'YES, I PUT A POST-IT ON MY OWN PORTFOLIO.'
                  },
                  paragraph: {
                    fr: "Alliance de Design UI/UX et d'Ingénierie Full-Stack. Spécialiste Flutter, React Native, Next.js, Supabase, Firebase, Android Studio, systèmes de chat temps réel et automatisation réseau.",
                    en: 'Unique blend of UI/UX Design and Full-Stack Engineering. Specialist in Flutter, React Native, Next.js, Supabase, Firebase, Android Studio, real-time chat feeds, and smart network automation.'
                  }
                })
              }
              className="relative w-60 sm:w-64 p-4 sm:p-5 rounded-lg border bg-[#fef08a] border-[#fde047] text-stone-900 shadow-md cursor-pointer hover:scale-105 transition-transform"
              style={{ transform: 'rotate(2.5deg)' }}
            >
              <div className="postit-tape" />
              <h3 className="font-marker text-base sm:text-lg text-stone-950">Bello Jamiu Ishola</h3>
              <p className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-stone-800 mt-1">
                UI/UX Designer & Full-Stack Dev
              </p>
              <p className="font-marker text-[11px] sm:text-xs uppercase text-stone-800 mt-2">
                <AnimatedMarkerText
                  text={
                    language === 'fr'
                      ? "— oui, j'ai mis un post-it sur mon propre portfolio."
                      : '— yes, I put a post-it on my own portfolio.'
                  }
                />
              </p>
              <div className="flex justify-end items-center gap-1 mt-2.5 sm:mt-3">
                <span className="text-xs">👆🏽</span>
                <span className="font-mono text-[9px] uppercase font-bold text-stone-700 underline">
                  {language === 'fr' ? 'en savoir +' : 'read +'}
                </span>
              </div>
            </div>

            {/* Top Download CV (PDF) Button */}
            <a
              href="/Bello_Jamiu_Ishola_CV.pdf"
              download="Bello_Jamiu_Ishola_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/90 dark:bg-stone-900/90 hover:border-orange-500 text-stone-800 dark:text-stone-100 font-mono text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all hover:scale-105"
            >
              <Download className="w-4 h-4 text-orange-500" />
              <span>{language === 'fr' ? 'Télécharger CV (PDF)' : 'Download CV (PDF)'}</span>
            </a>
          </div>

          {/* Interactive Click Prompt Helper if board is empty */}
          {postIts.length === 0 && (
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-stone-500 animate-pulse mt-2">
              <MousePointerClick className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>
                {language === 'fr'
                  ? 'Touchez ou cliquez sur le tableau pour coller un post-it (max 8 cartes • expire après 6s)'
                  : 'Tap or click anywhere on the board to stick a thought (max 8 cards • leaves after 6s)'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Dynamically Click-Spawned Draggable & Animated Post-It Notes (Visible on BOTH Mobile & Desktop) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {postIts.map((postIt) => (
          <div
            key={postIt.id}
            onMouseDown={(e) => {
              e.stopPropagation();
              handlePostItStart(e.clientX, e.clientY, postIt);
            }}
            onTouchStart={(e) => {
              if (e.touches.length > 0) {
                handlePostItStart(e.touches[0].clientX, e.touches[0].clientY, postIt);
              }
            }}
            onClick={(e) => handlePostItClick(e, postIt)}
            onTouchEnd={(e) => handlePostItTouchEnd(e, postIt)}
            className={`postit-card postit-pop-in postit-floating absolute p-3 sm:p-4 rounded-lg border shadow-md cursor-grab active:cursor-grabbing pointer-events-auto hover:scale-105 sm:hover:scale-110 hover:z-40 transition-all duration-200 flex flex-col justify-between ${
              postIt.isFading ? 'postit-falling' : ''
            } ${getPostItColor(postIt.color)}`}
            style={
              {
                left: `${postIt.x}%`,
                top: `${postIt.y}px`,
                width: `${postIt.width}px`,
                minHeight: `${postIt.height}px`,
                '--rot': `${postIt.rotation}deg`
              } as React.CSSProperties
            }
          >
            {/* Top Tape */}
            <div className="postit-tape !w-12 sm:!w-16 !h-4 sm:!h-5 !-top-2" />

            <div>
              <span className="block font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-stone-600 mb-1 opacity-80 truncate">
                {postIt.title[language]}
              </span>
              <p className="font-marker text-[11px] sm:text-xs uppercase leading-snug tracking-tight line-clamp-4 sm:line-clamp-none">
                <AnimatedMarkerText text={postIt.body[language]} />
              </p>
            </div>

            <div className="flex justify-end items-center gap-1 mt-2">
              <span className="text-xs">👆🏽</span>
              <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase underline">
                {language === 'fr' ? 'en savoir +' : 'read +'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. 3D Character Avatar standing proportioned nicely on the right side */}
      <div className="absolute right-0 bottom-0 top-12 w-[280px] sm:w-[380px] lg:w-[480px] z-25 pointer-events-none flex items-end justify-center opacity-85 sm:opacity-100">
        <Avatar3D lookAtTarget={lastLookAtTarget} />
      </div>

      {/* 6. Flip Theater Modal */}
      <FlipTheaterModal
        postIt={activeTheaterPostIt}
        onClose={() => setActiveTheaterPostIt(null)}
      />
    </header>
  );
};
