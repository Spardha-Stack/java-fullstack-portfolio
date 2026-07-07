import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Hero from "../components/sections/Hero.jsx";
import PageMotion from "../components/ui/PageMotion.jsx";
import { useProfile } from "../context/ProfileContext.jsx";
import { projectService, skillService } from "../services/api";

const teaserFade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const profile = useProfile();

  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [skillsRes, projectsRes] = await Promise.all([
          skillService.getAll(),
          projectService.getAll(),
        ]);

        setSkills(skillsRes.data);
        setProjects(projectsRes.data);
      } catch (error) {
        console.error("Failed to load home data", error);
      }
    };

    fetchHomeData();
  }, []);

  const topSkills = skills.slice(0, 8);
  const featuredProjects = projects.slice(0, 2);

  return (
    <PageMotion title="Home">
      <Hero />

      {/* About */}
      <section className="section-container !pt-0">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={teaserFade}
          className="glass p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-8 items-center"
        >
          <div>
            <p className="section-tag mb-3">About</p>

            <p className="text-white/60 leading-relaxed max-w-2xl">
              {profile.summary}
            </p>
          </div>

          <Link
            to="/about"
            className="btn-ghost whitespace-nowrap flex items-center gap-2"
          >
            Read More <FaArrowRight size={12} />
          </Link>
        </motion.div>
      </section>

      {/* Skills */}
      <section className="section-container !pt-0">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={teaserFade}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="section-tag">Skills</p>
              <h2 className="section-title !text-2xl">
                What I Work With
              </h2>
            </div>

            <Link
              to="/skills"
              className="btn-ghost hidden sm:flex items-center gap-2"
            >
              All Skills <FaArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {topSkills.map((skill) => (
              <div
                key={skill.id}
                className="glass p-4 text-center text-sm font-medium hover:border-neon-cyan/60 transition-colors"
              >
                {skill.name}
              </div>
            ))}
          </div>

          <Link
            to="/skills"
            className="btn-ghost sm:hidden mt-6 flex items-center gap-2 w-fit"
          >
            All Skills <FaArrowRight size={12} />
          </Link>
        </motion.div>
      </section>

      {/* Projects */}
      <section className="section-container !pt-0">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={teaserFade}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="section-tag">Featured Work</p>
              <h2 className="section-title !text-2xl">
                Recent Projects
              </h2>
            </div>

            <Link
              to="/projects"
              className="btn-ghost hidden sm:flex items-center gap-2"
            >
              All Projects <FaArrowRight size={12} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to="/projects"
                className="glass p-6 block hover:border-neon-violet/60 hover:shadow-glow-violet transition-colors"
              >
                <p className="font-mono text-xs text-neon-cyan mb-2">
                  {project.subtitle}
                </p>

                <h3 className="font-display font-semibold text-lg mb-2">
                  {project.title}
                </h3>

                <p className="text-white/55 text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>

          <Link
            to="/projects"
            className="btn-ghost sm:hidden mt-6 flex items-center gap-2 w-fit"
          >
            All Projects <FaArrowRight size={12} />
          </Link>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="section-container !pt-0 pb-28 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={teaserFade}
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">
            Let's build something together.
          </h2>

          <p className="text-white/55 max-w-md mx-auto mb-8">
            Open to remote, on-site, and travel-based opportunities.
          </p>

          <Link
            to="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Get In Touch <FaArrowRight size={12} />
          </Link>
        </motion.div>
      </section>
    </PageMotion>
  );
}