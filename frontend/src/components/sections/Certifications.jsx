import { motion } from "framer-motion";
import certifications from "../../data/certifications";

export default function Certifications() {
  return (
    <section id="certifications" className="section-container">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .6 }}
        className="mb-12"
      >
        <p className="section-tag">
          07 — Certifications
        </p>

        <h2 className="section-title">
          Certifications & Learning
        </h2>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2">

        {certifications.map((cert, index) => (

          <motion.div
            key={index}
            initial={{ opacity:0,y:30 }}
            whileInView={{ opacity:1,y:0 }}
            viewport={{ once:true }}
            transition={{ delay:index*0.05 }}
            whileHover={{ y:-8 }}
            className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400 transition duration-300 group"
          >

            <div className="overflow-hidden h-52">

              <img
                src={cert.image}
                alt={cert.name}
                className="w-full h-full object-contain bg-white p-2"
                // className="w-full h-full object-cover group-hover:scale-105 duration-500"
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