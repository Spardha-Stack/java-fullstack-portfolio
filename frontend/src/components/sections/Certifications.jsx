import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { certificateService } from "../../services/api";
import certificateImages from "../../utils/certificateImages";

export default function Certifications() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data } = await certificateService.getAll();
        setCertificates(data);
      } catch (error) {
        console.error("Failed to load certificates", error);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section id="certifications" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="section-tag">07 — Certifications</p>

        <h2 className="section-title">
          Certifications & Learning
        </h2>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400 transition duration-300 group"
          >
            <div className="overflow-hidden h-52">
              <img
                src={certificateImages[cert.image]}
                alt={cert.name}
                className="w-full h-full object-contain bg-white p-2"
              />
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-lg mb-1">
                {cert.name}
              </h3>

              <p className="text-cyan-400 text-sm">
                {cert.org}
              </p>

              <p className="text-white/50 text-sm mt-1">
                {cert.date}
              </p>

              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-medium transition"
              >
                View Certificate ↗
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}