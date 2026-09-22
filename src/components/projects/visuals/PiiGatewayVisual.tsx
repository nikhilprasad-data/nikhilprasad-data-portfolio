// src/components/projects/visuals/PiiGatewayVisual.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface Props {
  isActive: boolean;
}

// Data stream particles flowing into a shield
function DataStream({ isActive }: { isActive: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();

  const [positions, velocities] = useMemo(() => {
    const count = isActive ? 300 : 60;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Stream from left side
      pos[i * 3]     = -3.5 + Math.random() * 0.6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      vel[i] = 0.01 + Math.random() * 0.02;
    }
    return [pos, vel];
  }, [isActive]);

  useFrame(() => {
    if (reduced || !ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < arr.length / 3; i++) {
      arr[i * 3] += velocities[i];
      // Detect / funnel toward center shield
      if (arr[i * 3] > 0.5) {
        arr[i * 3 + 1] *= 0.985; // converge vertically
        arr[i * 3 + 2] *= 0.985;
      }
      // Reset when particle reaches shield
      if (arr[i * 3] > 1.4) {
        arr[i * 3]     = -3.5 + Math.random() * 0.4;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 3;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#3dffa0"
        size={0.025}
        transparent
        opacity={isActive ? 0.7 : 0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Redacted blocks appearing after shield
function RedactedOutput({ isActive }: { isActive: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (reduced || !ref.current) return;
    ref.current.children.forEach((child, i) => {
      child.position.x = 2.4 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.04;
    });
  });

  const blocks = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        y: (i - 2.5) * 0.38,
        w: 0.5 + Math.random() * 0.8,
        redacted: Math.random() > 0.45,
      })),
    []
  );

  return (
    <group ref={ref}>
      {blocks.map((b, i) => (
        <mesh key={i} position={[2.4, b.y, 0]}>
          <boxGeometry args={[b.w, 0.1, 0.04]} />
          <meshBasicMaterial
            color={b.redacted ? '#1a1a1a' : '#3dffa0'}
            transparent
            opacity={isActive ? (b.redacted ? 0.9 : 0.4) : 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function PiiGatewayVisual({ isActive }: Props) {
  const reduced = useReducedMotion();
  const shieldRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reduced || !shieldRef.current) return;
    shieldRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
    const mat = shieldRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity =
      isActive ? 0.18 + Math.sin(state.clock.elapsedTime * 1.2) * 0.06 : 0.04;
  });

  return (
    <group>
      <DataStream isActive={isActive} />

      {/* Central shield orb */}
      <Sphere ref={shieldRef} args={[0.8, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#0a180f"
          emissive="#3dffa0"
          emissiveIntensity={isActive ? 0.2 : 0.04}
          distort={isActive ? 0.25 : 0.05}
          speed={1.2}
          roughness={0.2}
          metalness={0.6}
          transparent
          opacity={isActive ? 0.92 : 0.4}
        />
      </Sphere>

      {/* Shield ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.1, 0.008, 3, 80]} />
        <meshBasicMaterial
          color="#3dffa0"
          transparent
          opacity={isActive ? 0.5 : 0.1}
        />
      </mesh>

      {/* Scan line */}
      <mesh position={[0, 0, 0.1]}>
        <torusGeometry args={[1.05, 0.003, 2, 60, Math.PI * 0.6]} />
        <meshBasicMaterial color="#3dffa0" transparent opacity={isActive ? 0.8 : 0.1} />
      </mesh>

      <RedactedOutput isActive={isActive} />

      {/* Point light */}
      <pointLight
        position={[0, 0, 1.5]}
        color="#3dffa0"
        intensity={isActive ? 1.8 : 0.2}
        distance={5}
        decay={2}
      />
    </group>
  );
}
