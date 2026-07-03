import React from 'react';
import ProjectsSection from '../components/sections/Projects.jsx';
import PageMotion from '../components/ui/PageMotion.jsx';

export default function Projects() {
  return (
    <PageMotion title="Projects">
      <ProjectsSection />
    </PageMotion>
  );
}
