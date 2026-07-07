import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { experienceService } from '../../services/api';
import TimelineItem from '../ui/TimelineItem.jsx';

export default function Experience() {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const { data } = await experienceService.getAll();
        setExperience(data);
      } catch (error) {
        console.error('Failed to load experience', error);
      }
    };

    fetchExperience();
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
        <p className="section-tag">03 — Experience</p>
        <h2 className="section-title">Where I've Worked</h2>
      </motion.div>

      <div>
        {experience.map((entry, i) => (
          <TimelineItem
            key={entry.id}
            title={entry.role}
            org={entry.org}
            period={entry.period}
            location={entry.location}
            description={entry.description}
            isLast={i === experience.length - 1}
          />
        ))}
      </div>
    </section>
  );
}