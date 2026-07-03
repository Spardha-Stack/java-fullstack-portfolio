import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PageMotion({ title, children }) {
  useEffect(() => {
    if (title) document.title = `${title} · Spardha Shukla`;
  }, [title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
