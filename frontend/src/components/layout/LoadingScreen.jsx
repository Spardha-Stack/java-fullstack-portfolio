import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[500] bg-bg-1 flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-2xl tracking-wide mb-6"
          >
            S<span className="text-neon-cyan">.</span>Shukla
          </motion.div>
          <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
