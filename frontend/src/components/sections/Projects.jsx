import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { projectService } from '../../services/api';
import ProjectCard from '../ui/ProjectCard.jsx';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState('');
  const [activeTech, setActiveTech] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await projectService.getAll();
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects', error);
      }
    };

    fetchProjects();
  }, []);

  const allTech = useMemo(
    () => ['All', ...new Set(projects.flatMap((p) => p.tech))],
    [projects]
  );

  const filtered = projects.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesTech = activeTech === 'All' || p.tech.includes(activeTech);
    return matchesQuery && matchesTech;
  });

  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="section-tag">05 — Projects</p>
        <h2 className="section-title">Things I've Built</h2>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm
            focus:outline-none focus:border-neon-cyan transition-colors"
        />

        <div className="flex flex-wrap gap-2">
          {allTech.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTech(t)}
              className={`px-3.5 py-2 rounded-full text-xs font-mono transition-colors border ${
                activeTech === t
                  ? 'bg-neon-cyan/15 border-neon-cyan text-neon-cyan'
                  : 'bg-white/5 border-white/15 text-white/50 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {filtered.length === 0 && (
          <p className="text-white/40 text-sm col-span-full text-center py-10">
            No projects match that search.
          </p>
        )}
      </div>
    </section>
  );
}