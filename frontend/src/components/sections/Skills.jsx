import React from 'react';
import { motion } from 'framer-motion';
import skills from '../../data/skills.js';
import SkillCard from '../ui/SkillCard.jsx';

export default function Skills() {
  return (
    <section id="skills" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="section-tag">02 — Skills</p>
        <h2 className="section-title">What I Work With</h2>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills.map((skill) => (
          <SkillCard key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    </section>
  );
}
