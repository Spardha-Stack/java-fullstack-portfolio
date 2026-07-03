import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCertificate } from 'react-icons/fa';
import certifications from '../../data/certifications.js';

export default function Certifications() {
  const [active, setActive] = useState(null);

  return (
    <section id="certifications" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="section-tag">07 — Certifications</p>
        <h2 className="section-title">Continuous Learning</h2>
      </motion.div>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0">
        {certifications.map((cert, i) => (
          <motion.button
            key={`${cert.name}-${i}`}
            onClick={() => setActive(cert)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            whileHover={{ y: -5 }}
            className="glass min-w-[240px] snap-start text-left p-5 hover:border-neon-cyan/60 transition-colors"
          >
            <FaCertificate className="text-neon-cyan mb-3" size={18} />
            <div className="font-semibold text-sm mb-1">{cert.name}</div>
            <div className="text-neon-cyan text-xs mb-2">{cert.org}</div>
            <div className="font-mono text-[11px] text-white/40">{cert.date}</div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-w-sm w-full p-8 relative"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <FaTimes />
              </button>
              <FaCertificate className="text-neon-cyan mb-4" size={28} />
              <h3 className="font-display font-semibold text-xl mb-2">{active.name}</h3>
              <p className="text-neon-cyan text-sm mb-1">{active.org}</p>
              <p className="font-mono text-xs text-white/40">{active.date}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
