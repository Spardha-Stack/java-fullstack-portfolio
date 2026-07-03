import React from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext.jsx';

const siteLinks = [
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/experience', label: 'Experience' },
  { to: '/education', label: 'Education' },
  { to: '/projects', label: 'Projects' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  const profile = useProfile();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-10 px-6 text-center">
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/40 mb-6 max-w-2xl mx-auto">
        {siteLinks.map((l) => (
          <Link key={l.to} to={l.to} className="hover:text-white transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
      <div className="flex justify-center gap-6 text-sm text-white/50 mb-4">
        <a href={profile.socials.github} className="hover:text-white transition-colors">GitHub</a>
        <a href={profile.socials.linkedin} className="hover:text-white transition-colors">LinkedIn</a>
        <a href={profile.socials.hackerrank} className="hover:text-white transition-colors">HackerRank</a>
        <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">Email</a>
      </div>
      <p className="text-white/30 text-xs">© {year} {profile.name}. Built with React, Spring Boot, and a lot of coffee.</p>
    </footer>
  );
}
