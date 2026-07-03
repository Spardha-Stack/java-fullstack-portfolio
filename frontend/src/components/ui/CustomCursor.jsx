import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip on touch devices — a custom cursor makes no sense there.
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;
    setEnabled(true);

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const handleHoverIn = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"]')) {
        ringRef.current?.classList.add('cursor-hover');
      }
    };
    const handleHoverOut = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"]')) {
        ringRef.current?.classList.remove('cursor-hover');
      }
    };

    let raf;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleHoverIn);
    document.addEventListener('mouseout', handleHoverOut);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleHoverIn);
      document.removeEventListener('mouseout', handleHoverOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-neon-cyan pointer-events-none z-[300]
          -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neon-cyan/50 pointer-events-none
          z-[300] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-[width,height,border-color] duration-200
          [&.cursor-hover]:w-12 [&.cursor-hover]:h-12 [&.cursor-hover]:border-neon-violet"
      />
      <style>{`
        @media (min-width: 768px) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
