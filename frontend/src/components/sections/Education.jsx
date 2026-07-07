import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { educationService } from '../../services/api';
import TimelineItem from '../ui/TimelineItem.jsx';

export default function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { data } = await educationService.getAll();
        setEducation(data);
      } catch (error) {
        console.error('Failed to load education', error);
      }
    };

    fetchEducation();
  }, []);

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
            key={entry.id}
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