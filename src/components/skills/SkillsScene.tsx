// src/components/skills/SkillsScene.tsx
'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Skill } from '@/data/skills';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

// Orbital ring containing skill labels
function OrbitalRingSkills({
  skills,
  radius,
  rotationSpeed,
  tilt,
}: {
  skills: Skill[];
  radius: number;
  rotationSpeed: number;
  tilt: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((_, delta) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <group ref={ref} rotation={[tilt, 0, 0]}>
      {/* Ring line */}
      <mesh>
        <torusGeometry args={[radius, 0.006, 2, 100]} />
        <meshBasicMaterial color="#3dffa0" transparent opacity={0.12} />
      </mesh>

      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <Html
            key={skill.name}
            position={[x, 0, z]}
            center
            distanceFactor={8}
            style={{
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                color: '#3dffa0',
                opacity: 0.7,
                textTransform: 'uppercase',
                padding: '2px 6px',
                border: '1px solid rgba(61,255,160,0.2)',
                background: 'rgba(8,8,8,0.7)',
                backdropFilter: 'blur(4px)',
              }}
            >
              {skill.name}
            </span>
          </Html>
        );
      })}
    </group>
  );
}

// Central glowing core
function Core() {
  const ref = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
  });

  return (
    <>
      <mesh ref={ref}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#0a1a12"
          emissive="#3dffa0"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} color="#3dffa0" intensity={2} distance={6} decay={2} />
    </>
  );
}

// Scene particle field
function BackgroundParticles() {
  const ref = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();
  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#3dffa0"
        size={0.012}
        transparent
        opacity={0.18}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

interface Props {
  rings: Skill[][];
}

export default function SkillsScene({ rings }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 55 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.04} />
      <BackgroundParticles />
      <Core />
      {rings.map((ring, i) => (
        <OrbitalRingSkills
          key={i}
          skills={ring}
          radius={2.0 + i * 1.2}
          rotationSpeed={[0.14, -0.09, 0.07][i]}
          tilt={[0.2, -0.15, 0.3][i]}
        />
      ))}
    </Canvas>
  );
}
