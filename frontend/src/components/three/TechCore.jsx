import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// An original, abstract coffee-cup silhouette (cylinder body + torus handle)
// built from primitives — not a reproduction of Oracle's Java logo artwork,
// just a nod to the "Java = coffee" theme using generic shapes.
function CoffeeCup() {
  const groupRef = useRef();
  const steamRefs = [useRef(), useRef(), useRef()];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.35;
    }
    steamRefs.forEach((ref, i) => {
      if (!ref.current) return;
      const offset = i * 0.7;
      ref.current.position.y = 0.9 + ((t * 0.4 + offset) % 1.4);
      ref.current.material.opacity = 0.5 * (1 - ((t * 0.4 + offset) % 1.4) / 1.4);
    });
  });

  return (
    <group ref={groupRef}>
      {/* cup body */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.55, 0.42, 0.9, 24, 1, true]} />
        <meshStandardMaterial
          color="#1E293B"
          emissive="#22D3EE"
          emissiveIntensity={0.25}
          metalness={0.4}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* rim */}
      <mesh position={[0, 0.35, 0]}>
        <torusGeometry args={[0.55, 0.04, 12, 32]} />
        <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.6} />
      </mesh>
      {/* base */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.06, 24]} />
        <meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={0.4} />
      </mesh>
      {/* handle */}
      <mesh position={[0.62, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.05, 12, 32, Math.PI * 1.3]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.5} />
      </mesh>
      {/* steam wisps */}
      {steamRefs.map((ref, i) => (
        <mesh key={i} ref={ref} position={[i * 0.12 - 0.12, 0.9, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#F1F5F9" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function GlowRing() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.15;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.6, 0.012, 8, 100]} />
      <meshBasicMaterial color="#A855F7" transparent opacity={0.35} />
    </mesh>
  );
}

export default function TechCore() {
  return (
    <group>
      <CoffeeCup />
      <GlowRing />
    </group>
  );
}
