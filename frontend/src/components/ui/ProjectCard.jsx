import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa';

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="glass overflow-hidden hover:border-neon-violet/60 hover:shadow-glow-violet transition-colors"
    >
      <div className="h-28 flex items-center justify-center font-mono text-xs text-neon-cyan
        tracking-wide bg-gradient-to-br from-neon-blue/15 to-neon-violet/15 border-b border-white/10">
        {project.subtitle}
      </div>

      <div className="p-6">
        <h3 className="font-display font-semibold text-lg mb-2">{project.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-full
              bg-neon-cyan/10 border border-neon-cyan/25 text-neon-cyan">
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white mb-2 transition-colors"
        >
          {expanded ? 'Hide details' : 'Show features'}
          <FaChevronDown className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} size={10} />
        </button>

        <motion.ul
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          className="overflow-hidden text-sm text-white/60 space-y-1.5 mb-2"
        >
          {project.features.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-neon-violet">▹</span>{f}
            </li>
          ))}
        </motion.ul>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <span className="font-mono text-[11px] text-white/40">{project.period}</span>
          <div className="flex gap-3">
            <a href={project.githubUrl} className="text-white/60 hover:text-neon-cyan transition-colors">
              <FaGithub size={16} />
            </a>
            <a href={project.liveUrl} className="text-white/60 hover:text-neon-cyan transition-colors">
              <FaExternalLinkAlt size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
