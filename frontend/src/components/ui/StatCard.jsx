import React from 'react';
import useCountUp from '../../hooks/useCountUp.js';

export default function StatCard({ target, suffix = '', decimals = 0, label }) {
  const { ref, value } = useCountUp(target, { decimals });

  return (
    <div ref={ref} className="glass text-center py-7 px-4">
      <div className="font-display font-bold text-3xl bg-gradient-to-r from-neon-cyan to-neon-violet
        bg-clip-text text-transparent">
        {value}{suffix}
      </div>
      <div className="text-white/50 text-xs mt-2 tracking-wide">{label}</div>
    </div>
  );
}
