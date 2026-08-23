import React from 'react';

interface AnimatedMarkerTextProps {
  text: string;
  className?: string;
  speedMs?: number;
}

export const AnimatedMarkerText: React.FC<AnimatedMarkerTextProps> = ({
  text,
  className = '',
  speedMs = 22
}) => {
  const characters = Array.from(text);

  return (
    <span className={className}>
      {characters.map((char, index) => (
        <span
          key={index}
          className="stroke-char"
          style={{ animationDelay: `${index * speedMs}ms` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
