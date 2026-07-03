import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-7 right-7 w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue
        to-neon-violet flex items-center justify-center text-white shadow-glow z-[150]
        transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
      aria-label="Back to top"
    >
      <FaArrowUp size={16} />
    </button>
  );
}
