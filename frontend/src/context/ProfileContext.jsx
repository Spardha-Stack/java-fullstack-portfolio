import React, { createContext, useContext } from 'react';
import profileImage from '../assets/images/profile.jpg';

// Static fallback so the UI is fully populated even before the
// Spring Boot API (Phase 4) is live. Once the backend is running,
// pages can switch to the services in src/services/api.js instead.
const PROFILE = {
  name: 'Spardha Shukla',
  title: 'Software Developer Engineer',
  roles: [
    'Java Full Stack Developer',
    'AI Engineer',
    'Problem Solver',
    'Open Source Learner',
  ],
  photo: profileImage,
  email: 'spardha964864shukla@gmail.com',
  phone: '+91 82998 27036',
  location: 'Kanpur, Uttar Pradesh, India',
  summary:
    'Ambitious and results-driven Software Engineer skilled in Java, Python, and the MERN stack, with strong proficiency in Data Structures & Algorithms, AI, and cloud technologies. Experienced in building scalable full-stack applications, integrating RESTful APIs, and deploying intelligent solutions on IBM Cloud.',
  socials: {
    github: 'https://github.com/Spardha-Stack',
    linkedin: 'https://www.linkedin.com/in/spardha-shukla-1bb9a9279/',
    leetcode: 'https://leetcode.com/u/SPARDHA829982/',
    hackerrank: 'https://www.hackerrank.com/profile/spardha964864sh1',
  },
};

const ProfileContext = createContext(PROFILE);

export const ProfileProvider = ({ children }) => (
  <ProfileContext.Provider value={PROFILE}>{children}</ProfileContext.Provider>
);

export const useProfile = () => useContext(ProfileContext);
