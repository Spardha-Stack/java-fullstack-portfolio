import React from 'react';
import AboutSection from '../components/sections/About.jsx';
import PageMotion from '../components/ui/PageMotion.jsx';

export default function About() {
  return (
    <PageMotion title="About">
      <AboutSection />
    </PageMotion>
  );
}
