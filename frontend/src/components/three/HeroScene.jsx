import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import ParticleField from './ParticleField.jsx';
import FloatingCubes from './FloatingCubes.jsx';
import TechCore from './TechCore.jsx';

function ParallaxRig({ children }) {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.current.x * 0.4 - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (-mouse.current.y * 0.25 - groupRef.current.rotation.x) * 0.03;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#22D3EE" />
        <pointLight position={[-3, -2, -2]} intensity={0.8} color="#A855F7" />

        <Suspense fallback={null}>
          <ParallaxRig>
            <TechCore />
            <FloatingCubes />
          </ParallaxRig>
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
