import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const links = [
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/experience', label: 'Experience' },
  { to: '/education', label: 'Education' },
  { to: '/projects', label: 'Projects' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between
      px-6 md:px-10 py-5 backdrop-blur-lg bg-bg-1/60 border-b border-white/5">
      <NavLink to="/" className="font-display font-bold text-xl tracking-wide" onClick={() => setOpen(false)}>
        S<span className="text-neon-cyan">.</span>Shukla
      </NavLink>

      {/* Desktop nav */}
      <div className="hidden lg:flex gap-7 text-sm text-white/60">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `relative transition-colors hover:text-white ${isActive ? 'text-neon-cyan' : ''}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden text-white/80 hover:text-white text-xl"
        aria-label="Toggle menu"
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 lg:hidden bg-bg-1/95 backdrop-blur-lg
              border-b border-white/10 flex flex-col px-6 py-4 gap-1"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-2.5 text-sm border-b border-white/5 last:border-0 ${
                    isActive ? 'text-neon-cyan' : 'text-white/70'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
