// src/components/projects/visuals/CommitValidatorVisual.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface Props {
  isActive: boolean;
}

// Falling code/text particles
function CodeStream({ isActive }: { isActive: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();
  const count = isActive ? 250 : 50;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 5;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1;
    }
    return arr;
  }, [count]);

  const speeds = useMemo(
    () => Array.from({ length: count }, () => 0.008 + Math.random() * 0.018),
    [count]
  );

  useFrame(() => {
    if (reduced || !ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < arr.length / 3; i++) {
      arr[i * 3 + 1] -= speeds[i];
      if (arr[i * 3 + 1] < -2) arr[i * 3 + 1] = 2 + Math.random() * 0.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#3dffa0"
        size={0.025}
        transparent
        opacity={isActive ? 0.55 : 0.12}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// NLP classifier nodes
function ClassifierNodes({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  const nodes = useMemo(
    () => [
      { pos: [0, 0, 0] as [number, number, number], label: 'NLP', color: '#3dffa0', size: 0.22 },
      { pos: [-1.4, 0.6, 0] as [number, number, number], label: '✓', color: '#3dffa0', size: 0.14 },
      { pos: [1.4, 0.6, 0] as [number, number, number], label: '✗', color: '#ff4444', size: 0.14 },
      { pos: [0, -1.3, 0] as [number, number, number], label: '?', color: '#ffaa44', size: 0.14 },
    ],
    []
  );

  useFrame((state) => {
    if (reduced || !groupRef.current) return;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={isActive ? (i === 0 ? 0.9 : 0.7) : 0.15}
          />
        </mesh>
      ))}

      {/* Connections */}
      {nodes.slice(1).map((node, i) => {
        const from = new THREE.Vector3(0, 0, 0);
        const to = new THREE.Vector3(...node.pos);
        const mid = from.clone().lerp(to, 0.5);
        const dir = to.clone().sub(from);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.normalize()
        );
        return (
          <mesh key={`line-${i}`} position={mid.toArray()} quaternion={quat}>
            <cylinderGeometry args={[0.004, 0.004, len, 4]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={isActive ? 0.35 : 0.06}
            />
          </mesh>
        );
      })}

      {/* Central glow */}
      <pointLight
        position={[0, 0, 0.5]}
        color="#3dffa0"
        intensity={isActive ? 1.5 : 0.1}
        distance={4}
        decay={2}
      />
    </group>
  );
}

export default function CommitValidatorVisual({ isActive }: Props) {
  return (
    <group>
      <CodeStream isActive={isActive} />
      <ClassifierNodes isActive={isActive} />
    </group>
  );
}
