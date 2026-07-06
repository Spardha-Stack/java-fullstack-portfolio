import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import * as THREE from 'three';

// Text-badge icons rather than official brand marks — Java's coffee-cup logo,
// Spring's leaf, React's atom, MySQL's dolphin, and Python's snake logos are
// all trademarked artwork, so these are original glowing labels instead.
const TECHS = [
  {
    label: "Java",
    color: "#F59E0B",
    radius: 1.15,
    speed: 0.39,
    tilt: 0.35,
    offset: 0,
  },
  {
    label: "Spring Boot",
    color: "#4ADE80",
    radius: 1.20,
    speed: 0.32,
    tilt: 0.55,
    offset: 1.3,
  },
  {
    label: "React",
    color: "#22D3EE",
    radius: 1.10,
    speed: 0.44,
    tilt: 0.70,
    offset: 2.6,
  },
  {
    label: "MySQL",
    color: "#3B82F6",
    radius: 1.18,
    speed: 0.35,
    tilt: 0.22,
    offset: 3.9,
  },
  {
    label: "Python",
    color: "#A855F7",
    radius: 1.15,
    speed: 0.32,
    tilt: 0.60,
    offset: 5.2,
  },
];

function useBadgeTexture(label, color) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // outer glow
    const grad = ctx.createRadialGradient(128, 128, 30, 128, 128, 128);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(128, 128, 128, 0, Math.PI * 2);
    ctx.fill();

    // badge disc
    ctx.beginPath();
    ctx.arc(128, 128, 60, 0, Math.PI * 2);
    ctx.fillStyle = '#0B1120';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.stroke();

    // label
    ctx.fillStyle = '#F1F5F9';
    ctx.font = 'bold 24px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const words = label.split(' ');
    if (words.length > 1) {
      ctx.fillText(words[0], 128, 114);
      ctx.fillText(words[1], 128, 144);
    } else {
      ctx.fillText(label, 128, 128);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [label, color]);
}

function OrbitBadge({ label, color, radius, speed, tilt, offset }) {
  const ref = useRef();
  const texture = useBadgeTexture(label, color);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius * Math.cos(tilt);
    const y = Math.sin(t) * radius * Math.sin(tilt) * 0.5;
    ref.current.position.set(x, y, z);
  });

  return (
    <group ref={ref}>
      <Billboard>
        <mesh>
          <planeGeometry args={[0.40, 0.40]} />
          <meshBasicMaterial map={texture} transparent toneMapped={false} depthWrite={false} />
        </mesh>
      </Billboard>
    </group>
  );
}

export default function OrbitingIcons({ center = [0, 0.15, 0] }) {
  return (
    <group position={center}>
      {TECHS.map((tech) => (
        <OrbitBadge key={tech.label} {...tech} />
      ))}
    </group>
  );
}
