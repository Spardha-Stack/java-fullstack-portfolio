import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const CUBES = [
  { position: [3.9, 1.8,0.8], scale: 0.55, speed: 0.4, color: '#3B82F6' },
  { position: [3.4, -1.2, -1.5], scale: 0.4, speed: 0.6, color: '#22D3EE' },
  { position: [2.6, 2.0, -3], scale: 0.3, speed: 0.5, color: '#A855F7' },
  { position: [-2.8, -1.8, -2.5], scale: 0.35, speed: 0.35, color: '#22D3EE' },
  { position: [0.2, 2.6, -4], scale: 0.25, speed: 0.7, color: '#3B82F6' },
];

function Cube({ position, scale, speed, color }) {
  const ref = useRef();
  const basePos = useRef(position);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * speed * 0.4;
    ref.current.rotation.y = t * speed * 0.6;
    ref.current.position.y = basePos.current[1] + Math.sin(t * speed) * 0.3;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
    </mesh>
  );
}

export default function FloatingCubes() {
  return (
    <>
      {CUBES.map((cube, i) => (
        <Cube key={i} {...cube} />
      ))}
    </>
  );
}
