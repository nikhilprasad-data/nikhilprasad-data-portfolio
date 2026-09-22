// src/components/projects/visuals/MultiAgentVisual.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface Props {
  isActive: boolean;
}

// Individual agent sphere
function AgentSphere({
  position,
  size,
  color,
  isActive,
  orbitSpeed = 0,
  orbitRadius = 0,
  orbitOffset = 0,
}: {
  position: [number, number, number];
  size: number;
  color: string;
  isActive: boolean;
  orbitSpeed?: number;
  orbitRadius?: number;
  orbitOffset?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (reduced || !ref.current) return;
    if (orbitSpeed > 0) {
      ref.current.position.x =
        position[0] + Math.cos(state.clock.elapsedTime * orbitSpeed + orbitOffset) * orbitRadius;
      ref.current.position.z =
        position[2] + Math.sin(state.clock.elapsedTime * orbitSpeed + orbitOffset) * orbitRadius;
    }
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = isActive
      ? 0.8 + Math.sin(state.clock.elapsedTime * 1.5 + orbitOffset) * 0.15
      : 0.15;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={isActive ? 0.8 : 0.15} />
    </mesh>
  );
}

// Retrieval beam — a cylinder between two points
function Beam({
  from,
  to,
  opacity,
}: {
  from: [number, number, number];
  to: [number, number, number];
  opacity: number;
}) {
  const mid = new THREE.Vector3(
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
    (from[2] + to[2]) / 2
  );
  const dir = new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
  const len = dir.length();
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.normalize()
  );

  return (
    <mesh position={mid.toArray()} quaternion={quat}>
      <cylinderGeometry args={[0.006, 0.006, len, 3]} />
      <meshBasicMaterial color="#3dffa0" transparent opacity={opacity} />
    </mesh>
  );
}

// Knowledge lattice — small cubes arranged in a grid
function KnowledgeLattice({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  const cubes = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        x: ((i % 4) - 1.5) * 0.55,
        y: (Math.floor(i / 4) - 1) * 0.45,
        z: -1.5,
        s: 0.08 + Math.random() * 0.05,
      })),
    []
  );

  useFrame((state) => {
    if (reduced || !groupRef.current) return;
    groupRef.current.children.forEach((c, i) => {
      c.rotation.y = state.clock.elapsedTime * 0.3 + i * 0.2;
      c.scale.setScalar(1 + Math.sin(state.clock.elapsedTime + i * 0.5) * 0.1);
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={[cube.x, cube.y, cube.z]}>
          <boxGeometry args={[cube.s, cube.s, cube.s]} />
          <meshBasicMaterial
            color="#3dffa0"
            transparent
            opacity={isActive ? 0.35 : 0.05}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

export default function MultiAgentVisual({ isActive }: Props) {
  const agentPositions: [number, number, number][] = useMemo(
    () => [
      [0, 0, 0],      // orchestrator
      [-1.4, 0.6, 0],
      [1.4, 0.6, 0],
      [-1.0, -1.0, 0],
      [1.0, -1.0, 0],
    ],
    []
  );

  const beams = useMemo(
    () => [
      [0, 1], [0, 2], [0, 3], [0, 4],
    ] as [number, number][],
    []
  );

  return (
    <group>
      {/* Agents */}
      <AgentSphere
        position={agentPositions[0]}
        size={0.28}
        color="#3dffa0"
        isActive={isActive}
      />
      {agentPositions.slice(1).map((pos, i) => (
        <AgentSphere
          key={i}
          position={pos}
          size={0.15}
          color="#82ffcc"
          isActive={isActive}
          orbitSpeed={0.3 + i * 0.05}
          orbitRadius={0.12}
          orbitOffset={(i * Math.PI) / 2}
        />
      ))}

      {/* Retrieval beams */}
      {beams.map(([a, b], i) => (
        <Beam
          key={i}
          from={agentPositions[a]}
          to={agentPositions[b]}
          opacity={isActive ? 0.35 : 0.04}
        />
      ))}

      {/* Orchestration ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.8, 0.007, 2, 80]} />
        <meshBasicMaterial
          color="#3dffa0"
          transparent
          opacity={isActive ? 0.2 : 0.04}
        />
      </mesh>

      {/* Knowledge lattice */}
      <KnowledgeLattice isActive={isActive} />

      <pointLight
        position={[0, 0, 1.5]}
        color="#3dffa0"
        intensity={isActive ? 1.6 : 0.1}
        distance={6}
        decay={2}
      />
    </group>
  );
}
