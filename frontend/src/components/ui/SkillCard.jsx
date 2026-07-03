import React from 'react';
import { motion } from 'framer-motion';

export default function SkillCard({ name, level }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ y: -6, rotateX: 4 }}
      transition={{ duration: 0.4 }}
      className="glass p-5 text-center hover:border-neon-cyan/60 hover:shadow-glow transition-colors duration-300"
    >
      <div className="font-semibold text-sm mb-3">{name}</div>
      <div className="h-1 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet"
        />
      </div>
    </motion.div>
  );
}
