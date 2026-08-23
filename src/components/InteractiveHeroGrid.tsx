import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const InteractiveHeroGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isZBMode } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const cellSize = 28;
    const radius = 140;
    const maxMove = 10;
    const elasticPower = 2.2;

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.15;
      mouseY += (targetMouseY - mouseY) * 0.15;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;

      // Compute deformed grid points
      const points: { x: number; y: number }[][] = [];

      for (let r = 0; r <= rows; r++) {
        points[r] = [];
        for (let c = 0; c <= cols; c++) {
          const originX = c * cellSize;
          const originY = r * cellSize;

          const dx = originX - mouseX;
          const dy = originY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let px = originX;
          let py = originY;

          if (dist < radius && dist > 0) {
            const force = Math.pow(1 - dist / radius, elasticPower) * maxMove;
            px += (dx / dist) * force;
            py += (dy / dist) * force;
          }

          points[r][c] = { x: px, y: py };
        }
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = isZBMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.065)';

      // Draw horizontal lines
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const p = points[r][c];
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const p = points[r][c];
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isZBMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
