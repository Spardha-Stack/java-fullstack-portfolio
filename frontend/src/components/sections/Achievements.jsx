import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import { achievementService } from "../../services/api";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data } = await achievementService.getAll();
        setAchievements(data);
      } catch (error) {
        console.error("Failed to load achievements", error);
      }
    };

    fetchAchievements();
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
        <p className="section-tag">06 — Achievements</p>
        <h2 className="section-title">Milestones Along the Way</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="glass p-6 hover:border-neon-cyan/60 hover:shadow-glow transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="w-11 h-11 rounded-xl bg-neon-violet/10 border border-neon-violet/25
                flex items-center justify-center text-neon-violet"
              >
                <FaTrophy size={18} />
              </span>

              <span
                className="font-display font-bold text-xl bg-gradient-to-r
                from-neon-cyan to-neon-violet bg-clip-text text-transparent"
              >
                {a.value}
              </span>
            </div>

            <h3 className="font-display font-semibold text-base mb-1.5">
              {a.title}
            </h3>

            <p className="font-mono text-[11px] text-neon-cyan mb-3 uppercase tracking-wide">
              {a.category}
            </p>

            <p className="text-white/55 text-sm leading-relaxed">
              {a.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}