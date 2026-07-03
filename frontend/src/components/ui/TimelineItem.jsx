import React from 'react';
import { motion } from 'framer-motion';

export default function TimelineItem({ title, org, period, location, description, isLast }) {
  return (
    <div className="relative pl-9">
      <span className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-bg-1 border-2
        border-neon-cyan shadow-glow" />
      {!isLast && (
        <span className="absolute left-[6px] top-6 bottom-0 w-px bg-gradient-to-b from-neon-cyan to-neon-violet" />
      )}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="pb-11"
      >
        <h3 className="font-display font-semibold text-lg">{title}</h3>
        <p className="text-neon-cyan text-sm mt-0.5">{org}</p>
        <p className="font-mono text-xs text-white/40 my-1.5">{period} · {location}</p>
        <p className="text-white/60 text-sm leading-relaxed max-w-xl">{description}</p>
      </motion.div>
    </div>
  );
}
