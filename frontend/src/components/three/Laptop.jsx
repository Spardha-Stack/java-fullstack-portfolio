import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CODE_LINES = [
  { text: 'public class Portfolio {', color: '#22D3EE' },
  { text: '    public static void main(String[] args) {', color: '#F1F5F9' },
  { text: '        Developer dev = new Developer("Spardha");', color: '#F1F5F9' },
  { text: '', color: '#F1F5F9' },
  { text: '        dev.setSkills(List.of(', color: '#F1F5F9' },
  { text: '            "Java", "Spring Boot",', color: '#A855F7' },
  { text: '            "React", "MySQL"', color: '#A855F7' },
  { text: '        ));', color: '#F1F5F9' },
  { text: '', color: '#F1F5F9' },
  { text: '        dev.buildAwesomeThings();', color: '#22D3EE' },
  { text: '        System.out.println(dev.getStatus());', color: '#F1F5F9' },
  { text: '    }', color: '#F1F5F9' },
  { text: '}', color: '#F1F5F9' },
];

const FULL_TEXT_LENGTH = CODE_LINES.reduce((sum, l) => sum + l.text.length + 1, 0);

/**
 * Builds and progressively "types" a code listing onto a canvas, returned
 * as a THREE.CanvasTexture. The canvas is drawn fresh each update rather than
 * appended to, so it can loop cleanly.
 */
function useCodeTexture() {
  const canvas = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 320;
    return c;
  }, []);

  const texture = useMemo(() => {
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [canvas]);

  const progressRef = useRef(0);
  const pauseRef = useRef(0);

  const draw = (charsToShow) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0B1120';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // subtle top bar, like a code editor
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, canvas.width, 28);
    ['#F87171', '#FBBF24', '#34D399'].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(18 + i * 18, 14, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.font = '15px "JetBrains Mono", monospace';
    ctx.textBaseline = 'top';

    let remaining = charsToShow;
    let y = 44;
    for (const line of CODE_LINES) {
      if (remaining <= 0) break;
      const visibleChars = Math.min(line.text.length, remaining);
      const visibleText = line.text.slice(0, visibleChars);
      ctx.fillStyle = line.color;
      ctx.fillText(visibleText, 18, y);

      // blinking cursor at the current typing position
      if (remaining <= line.text.length) {
        const cursorX = 18 + ctx.measureText(visibleText).width + 2;
        if (Math.floor(Date.now() / 400) % 2 === 0) {
          ctx.fillStyle = '#22D3EE';
          ctx.fillRect(cursorX, y, 7, 16);
        }
      }

      remaining -= line.text.length + 1;
      y += 20;
    }

    texture.needsUpdate = true;
  };

  useFrame((_, delta) => {
    if (pauseRef.current > 0) {
      pauseRef.current -= delta;
      return;
    }
    progressRef.current += delta * 38; // characters per second
    if (progressRef.current >= FULL_TEXT_LENGTH) {
      progressRef.current = FULL_TEXT_LENGTH;
      pauseRef.current = 1.8; // hold the finished listing briefly
      draw(Math.floor(progressRef.current));
      // schedule a reset after the pause completes on the next tick
      if (pauseRef.current <= 0.001) progressRef.current = 0;
      return;
    }
    draw(Math.floor(progressRef.current));
  });

  // reset the loop once the pause has elapsed
  useFrame(() => {
    if (pauseRef.current <= 0 && progressRef.current >= FULL_TEXT_LENGTH) {
      progressRef.current = 0;
    }
  });

  return texture;
}

export default function Laptop() {
  const groupRef = useRef();
  const screenTexture = useCodeTexture();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // subtle floating animation
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.12;
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.92}>
      {/* local glow lights for a premium, self-lit screen look */}
      <pointLight position={[0, 0.6, 0.6]} intensity={0.9} color="#3B82F6" distance={3} />
      <pointLight position={[0, -0.4, 0.5]} intensity={0.5} color="#A855F7" distance={2.5} />

      {/* base / keyboard deck */}
      <group position={[0, -0.32, 0.15]}>
        <mesh>
          <boxGeometry args={[1.7, 0.08, 1.15]} />
          <meshStandardMaterial color="#1E293B" metalness={0.6} roughness={0.35} />
        </mesh>
        {/* keyboard inset with a soft cyan backlight glow */}
        <mesh position={[0, 0.041, -0.05]}>
          <boxGeometry args={[1.42, 0.01, 0.78]} />
          <meshStandardMaterial color="#0B1120" emissive="#22D3EE" emissiveIntensity={0.25} metalness={0.2} roughness={0.6} />
        </mesh>
        {/* trackpad */}
        <mesh position={[0, 0.042, 0.42]}>
          <boxGeometry args={[0.42, 0.006, 0.28]} />
          <meshStandardMaterial color="#111827" metalness={0.3} roughness={0.5} />
        </mesh>
      </group>

      {/* screen / lid, hinged at the back of the base */}
      <group position={[0, -0.28, -0.42]} rotation={[-0.22, 0, 0]}>
        {/* bezel */}
        <mesh position={[0, 0.62, 0]}>
          <boxGeometry args={[1.7, 1.08, 0.05]} />
          <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* display panel — the animated code texture */}
        <mesh position={[0, 0.62, 0.027]}>
          <planeGeometry args={[1.54, 0.94]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>
        {/* faint emissive rim around the screen for glow */}
        <mesh position={[0, 0.62, 0.02]}>
          <planeGeometry args={[1.62, 1.02]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.06} />
        </mesh>
      </group>
    </group>
  );
}
