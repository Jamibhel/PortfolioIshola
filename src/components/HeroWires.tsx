import React, { useMemo } from 'react';

export interface BoardPostIt {
  id: number;
  x: number; // percentage or px
  y: number; // px
  width: number;
  height: number;
  rotation: number;
  color: 'yellow' | 'green' | 'pink' | 'blue' | 'orange';
  title: { fr: string; en: string };
  body: { fr: string; en: string };
  paragraph: { fr: string; en: string };
  isSignature?: boolean;
}

interface HeroWiresProps {
  postIts: BoardPostIt[];
  containerWidth: number;
  containerHeight: number;
}

export const HeroWires: React.FC<HeroWiresProps> = ({ postIts, containerWidth, containerHeight }) => {
  // Generate connection wires between nearest post-it centers
  const connections = useMemo(() => {
    if (postIts.length < 2 || containerWidth === 0) return [];

    const lines: { id: string; d: string; from: { x: number; y: number }; to: { x: number; y: number } }[] = [];

    for (let i = 0; i < postIts.length - 1; i++) {
      const p1 = postIts[i];
      const p2 = postIts[i + 1];

      // Centers
      const x1 = (p1.x / 100) * containerWidth + p1.width / 2;
      const y1 = p1.y + p1.height / 2;

      const x2 = (p2.x / 100) * containerWidth + p2.width / 2;
      const y2 = p2.y + p2.height / 2;

      // Orthogonal step routing
      const midX = (x1 + x2) / 2;
      const d = `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;

      lines.push({
        id: `wire-${p1.id}-${p2.id}`,
        d,
        from: { x: x1, y: y1 },
        to: { x: x2, y: y2 }
      });
    }

    return lines;
  }, [postIts, containerWidth, containerHeight]);

  if (connections.length === 0) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
          <stop offset="100%" stopColor="rgba(249, 115, 22, 0.4)" />
        </linearGradient>
        <filter id="wireGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {connections.map((wire) => (
        <g key={wire.id}>
          {/* Base wire path */}
          <path
            d={wire.d}
            fill="none"
            stroke="rgba(59, 130, 246, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            className="animate-pulse"
          />

          {/* Connection endpoints */}
          <circle
            cx={wire.from.x}
            cy={wire.from.y}
            r="3"
            fill="rgba(59, 130, 246, 0.6)"
          />
          <circle
            cx={wire.to.x}
            cy={wire.to.y}
            r="3"
            fill="rgba(59, 130, 246, 0.6)"
          />
        </g>
      ))}
    </svg>
  );
};
