import React from 'react';
import { motion } from 'framer-motion';
import education from '../../data/education.js';
import TimelineItem from '../ui/TimelineItem.jsx';

export default function Education() {
  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="section-tag">04 — Education</p>
        <h2 className="section-title">Academic Background</h2>
      </motion.div>

      <div>
        {education.map((entry, i) => (
          <TimelineItem
            key={`${entry.degree}-${i}`}
            title={entry.degree}
            org={entry.institution}
            period={entry.period}
            location={entry.location}
            description={`Academic record: ${entry.score}.`}
            isLast={i === education.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
