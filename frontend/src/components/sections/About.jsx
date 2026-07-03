import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../../context/ProfileContext.jsx';
import education from '../../data/education.js';
import certifications from '../../data/certifications.js';
import experience from '../../data/experience.js';
import projects from '../../data/projects.js';
import StatCard from '../ui/StatCard.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const profile = useProfile();
  const latestEducation = education[0];

  return (
    <section id="about" className="section-container">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mb-14"
      >
        <p className="section-tag">01 — About</p>
        <h2 className="section-title">Who I Am</h2>
      </motion.div>

      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <p className="text-white/60 leading-relaxed mb-5">{profile.summary}</p>
          <p className="text-white/60 leading-relaxed mb-8">
            I care about solving genuinely hard problems, optimizing performance, and shipping
            software that feels effortless to use — from a face-recognition attendance system to
            an AI-driven nutrition assistant.
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-white/40 font-mono text-xs uppercase tracking-wide mb-1">Degree</span>
              {latestEducation.degree} · {latestEducation.score}
            </div>
            <div>
              <span className="block text-white/40 font-mono text-xs uppercase tracking-wide mb-1">College</span>
              {latestEducation.institution}
            </div>
            <div>
              <span className="block text-white/40 font-mono text-xs uppercase tracking-wide mb-1">Based in</span>
              {profile.location}
            </div>
            <div>
              <span className="block text-white/40 font-mono text-xs uppercase tracking-wide mb-1">Focus</span>
              Full-Stack + AI / Cloud
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="grid grid-cols-2 gap-4"
        >
          <StatCard target={projects.length} label="Projects Shipped" />
          <StatCard target={certifications.length} suffix="+" label="Certifications" />
          <StatCard target={8.4} decimals={2} label="CGPA" />
          <StatCard target={experience.length - 1} label="Internships" />
        </motion.div>
      </div>
    </section>
  );
}
