import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import ParticleField from "./ParticleField.jsx";
import FloatingCubes from "./FloatingCubes.jsx";

function ParallaxRig({ children }) {
  const groupRef = useRef();

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth - 0.5;
      mouse.current.y = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y +=
      (mouse.current.x * 0.18 - groupRef.current.rotation.y) * 0.025;

    groupRef.current.rotation.x +=
      (-mouse.current.y * 0.08 - groupRef.current.rotation.x) * 0.025;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0.2, 5.5],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        {/* Ambient */}
        <ambientLight intensity={0.45} />

        {/* Main Cyan Light */}
        <pointLight
          position={[3, 3, 3]}
          intensity={1.3}
          color="#22D3EE"
        />

        {/* Purple Fill */}
        <pointLight
          position={[-3, -2, -2]}
          intensity={1.0}
          color="#A855F7"
        />

        {/* Blue Rim */}
        <pointLight
          position={[-1, 2, 2]}
          intensity={0.7}
          color="#3B82F6"
        />

        <Suspense fallback={null}>
          <ParallaxRig>
            <FloatingCubes />
          </ParallaxRig>

          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}