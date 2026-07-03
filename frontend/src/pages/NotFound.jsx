import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import PageMotion from '../components/ui/PageMotion.jsx';

export default function NotFound() {
  return (
    <PageMotion title="Page Not Found">
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display font-bold text-8xl md:text-9xl bg-gradient-to-r from-neon-cyan to-neon-violet
            bg-clip-text text-transparent mb-4">
            404
          </p>
          <h1 className="font-display font-semibold text-xl md:text-2xl mb-3">This page doesn't exist</h1>
          <p className="text-white/50 max-w-sm mx-auto mb-8">
            The page you're looking for was moved, renamed, or never existed in the first place.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <FaHome size={13} /> Back to Home
          </Link>
        </motion.div>
      </section>
    </PageMotion>
  );
}
