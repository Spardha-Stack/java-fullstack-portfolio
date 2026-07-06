import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';
import { useProfile } from '../../context/ProfileContext.jsx';
import HeroScene from '../three/HeroScene.jsx';
import CodeSnippets from '../three/CodeSnippets.jsx';

function useTypingEffect(words, speed = 65, pause = 1400) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)));
      }, deleting ? 35 : speed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero() {
  const profile = useProfile();
  const typed = useTypingEffect(profile.roles);

  return (
    <section id="home" className="min-h-screen flex items-center px-6 md:px-10 pt-32 pb-16 relative overflow-hidden">
      {/* R3F scene: floating laptop with animated Java code, orbiting tech badges, particles, mouse parallax */}
      <HeroScene />
      <CodeSnippets />

      {/* ambient glow blobs sit under the 3D scene for extra warmth */}
      <div className="absolute -top-24 -left-32 w-[420px] h-[420px] bg-neon-blue/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-neon-violet/20 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-15 items-center w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* <p className="section-tag flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-neon-cyan inline-block" />
            {profile.location} · Open to Remote / On-site
          </p> */}
          <p className="section-tag flex items-center gap-3 mb-4 text-cyan-300 tracking-[0.22em] font-medium">
            <span className="w-8 h-px bg-cyan-400 inline-block" />
            {profile.location} • OPEN TO REMOTE / ON-SITE
          </p>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight bg-gradient-to-r
            from-white via-neon-cyan to-neon-violet bg-clip-text text-transparent mb-4">
            {profile.name}
          </h1>
          <div className="font-mono text-lg md:text-xl text-white/60 h-8 mb-6">
            {typed}<span className="text-neon-cyan animate-blink">|</span>
          </div>
          <p className="text-white/80 leading-relaxed max-w-md mb-10">{profile.summary}</p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Link to="/contact" className="btn-primary">Hire Me →</Link>
            <Link to="/projects" className="btn-ghost">View Projects</Link>
            {/* <a href={`mailto:${profile.email}`} className="btn-ghost">Download Resume</a> */}
            <a href="/SpardhaShukla_Resume.pdf" download className="btn-ghost">Download Resume</a>
          </div>

          <div className="flex gap-4">
            {[
              { icon: <FaGithub />, href: profile.socials.github },
              { icon: <FaLinkedin />, href: profile.socials.linkedin },
              { icon: <FaEnvelope />, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}` },
              { icon: <FaCode />, href: profile.socials.leetcode },
            ].map((s, i) => (
              <a key={i} href={s.href} className="w-11 h-11 rounded-full flex items-center justify-center
                bg-white/5 border border-white/10 hover:border-neon-cyan hover:text-neon-cyan
                hover:-translate-y-1 transition-all duration-300">
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          
          // className="relative flex justify-end md:translate-x-48 lg:translate-x-56"
          // className="relative flex justify-end md:translate-x-4"
          className="relative flex justify-center md:ml-10"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-blue via-neon-cyan
            to-neon-violet blur-2xl opacity-30 animate-spin-slow" />
          <div className="relative w-80 h-80 md:w-[455px] md:h-[455px] rounded-full p-1.5 bg-gradient-to-tr
            from-neon-cyan to-neon-violet">
        
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover rounded-full border-4 border-bg-1"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
