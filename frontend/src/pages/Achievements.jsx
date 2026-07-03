import React from 'react';
import AchievementsSection from '../components/sections/Achievements.jsx';
import PageMotion from '../components/ui/PageMotion.jsx';

export default function Achievements() {
  return (
    <PageMotion title="Achievements">
      <AchievementsSection />
    </PageMotion>
  );
}
