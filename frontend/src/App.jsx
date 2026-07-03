import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ProfileProvider } from './context/ProfileContext.jsx';
import Layout from './components/layout/Layout.jsx';
import LoadingScreen from './components/layout/LoadingScreen.jsx';

// Route-based code splitting — each page is its own chunk.
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Skills = lazy(() => import('./pages/Skills.jsx'));
const Experience = lazy(() => import('./pages/Experience.jsx'));
const Education = lazy(() => import('./pages/Education.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));
const Achievements = lazy(() => import('./pages/Achievements.jsx'));
const Certificates = lazy(() => import('./pages/Certificates.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // Minimum splash duration so it doesn't just flash on fast connections.
    const timer = setTimeout(() => setBooting(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ProfileProvider>
      <LoadingScreen visible={booting} />
      <Suspense fallback={<LoadingScreen visible />}>
        <AnimatedRoutes />
      </Suspense>
    </ProfileProvider>
  );
}
