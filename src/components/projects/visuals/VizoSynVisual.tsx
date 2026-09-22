// src/components/projects/visuals/VizoSynVisual.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface Props {
  isActive: boolean;
}

// Person/skill node
function Node({
  position,
  size,
  color,
  opacity,
  pulseOffset = 0,
}: {
  position: [number, number, number];
  size: number;
  color: string;
  opacity: number;
  pulseOffset?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (reduced || !ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.2 + pulseOffset) * 0.08;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

// Edge between nodes
function Edge({
  from,
  to,
  opacity,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  opacity: number;
}) {
  const mid = from.clone().lerp(to, 0.5);
  const dir = to.clone().sub(from);
  const len = dir.length();
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.normalize()
  );

  return (
    <mesh position={mid.toArray()} quaternion={quat}>
      <cylinderGeometry args={[0.005, 0.005, len, 3]} />
      <meshBasicMaterial color="#3dffa0" transparent opacity={opacity} />
    </mesh>
  );
}

export default function VizoSynVisual({ isActive }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  const nodePositions = useMemo<[number, number, number][]>(
    () => [
      [0, 0, 0],        // central hub
      [-1.6, 0.8, 0.3],
      [1.6, 0.8, -0.3],
      [-1.2, -1.1, 0.2],
      [1.2, -1.1, -0.2],
      [0, 1.8, 0],
      [-2.2, -0.2, 0],
      [2.2, -0.2, 0],
    ],
    []
  );

  const edges = useMemo(
    () => [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 5], [1, 6], [2, 7], [3, 6], [4, 7],
    ],
    []
  );

  useFrame((state) => {
    if (reduced || !groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodePositions.map((pos, i) => (
        <Node
          key={i}
          position={pos}
          size={i === 0 ? 0.22 : 0.12}
          color={i === 0 ? '#3dffa0' : '#82ffcc'}
          opacity={isActive ? (i === 0 ? 0.95 : 0.7) : 0.15}
          pulseOffset={i * 0.8}
        />
      ))}

      {/* Edges */}
      {edges.map(([a, b], i) => (
        <Edge
          key={i}
          from={new THREE.Vector3(...nodePositions[a])}
          to={new THREE.Vector3(...nodePositions[b])}
          opacity={isActive ? 0.3 : 0.05}
        />
      ))}

      {/* Matching burst */}
      {isActive && (
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.5, 0.006, 2, 64]} />
          <meshBasicMaterial color="#3dffa0" transparent opacity={0.6} />
        </mesh>
      )}

      <pointLight
        position={[0, 0, 1]}
        color="#3dffa0"
        intensity={isActive ? 1.2 : 0.1}
        distance={5}
        decay={2}
      />
    </group>
  );
}
