const projects = [
  {
    id: 1,
    title: 'AI-Based Smart Attendance System',
    subtitle: 'Face Recognition + Anomaly Detection',
    description:
      'Real-time student identification and automated attendance marking using face recognition. Includes anomaly detection to prevent proxy attendance and an ML model for attendance prediction.',
    features: [
      'Real-time face recognition with OpenCV',
      'Anomaly detection for proxy prevention',
      'ML-based attendance forecasting (scikit-learn)',
      'Database-backed attendance records',
    ],
    tech: ['Python', 'Flask', 'OpenCV', 'scikit-learn'],
    period: "Nov '25 — Jan '26",
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'SmartNutri AI Assistant',
    subtitle: 'Personalized Nutrition, Powered by Watson',
    description:
      'An AI assistant that delivers personalized nutrition insights and diet recommendations through AI-driven analysis, built on IBM Watson and Cloud infrastructure.',
    features: [
      'Personalized diet recommendations',
      'AI-driven nutrition analysis',
      'IBM Watson integration',
      'Cloud-hosted inference',
    ],
    tech: ['IBM Watson', 'Python', 'Cloud'],
    period: "Jun '25 — Aug '25",
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 3,
    title: 'Freelancing Web Application',
    subtitle: 'MERN-Stack Marketplace Platform',
    description:
      'A full-featured freelancing platform with secure authentication, RESTful APIs, and a responsive UI — shipped during the SmartBridge internship and adopted widely enough to lift engagement by 30%.',
    features: [
      'Secure user authentication',
      'RESTful API architecture',
      'Responsive, mobile-first UI',
      '30% lift in user engagement',
    ],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    period: "Jan '25 — Mar '25",
    githubUrl: '#',
    liveUrl: '#',
  },
];

export default projects;
