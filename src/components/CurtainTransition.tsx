import React from 'react';
import { useApp } from '../context/AppContext';

export const CurtainTransition: React.FC = () => {
  const { isTransitioning, isZBMode } = useApp();

  if (!isTransitioning) return null;

  return (
    <div
      className={`mode-curtain slide-in ${!isZBMode ? 'to-light' : ''}`}
      aria-hidden="true"
    />
  );
};
