// src/components/projects/ProjectScene.tsx
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import ProjectVisual from './ProjectVisual';
import { PROJECTS } from '@/data/projects';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { lerp } from '@/lib/animation/easing';

// Compute 5 orbital positions around center
function getOrbitalPosition(index: number, total: number, activeIndex: number): [number, number, number] {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const isActive = index === activeIndex;
  const radius = isActive ? 0 : 2.8;
  const depth = isActive ? 0 : -2.2;
  return [
    Math.cos(angle) * radius,
    Math.sin(angle) * radius * 0.55, // flatten vertically
    depth,
  ];
}

// Camera rig that lerps toward the active project
function CameraRig({ activeIndex }: { activeIndex: number }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 6));
  const reduced = useReducedMotion();

  useFrame((_, delta) => {
    if (reduced) return;
    const t = 1 - Math.pow(0.04, delta); // smooth damp factor
    camera.position.x = lerp(camera.position.x, 0, t * 0.5);
    camera.position.y = lerp(camera.position.y, 0, t * 0.5);
    camera.position.z = lerp(camera.position.z, 6, t);
    camera.lookAt(target.current);
  });

  return null;
}

// Ambient particle field for the scene
function SceneParticles() {
  const ref = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();

  const positions = useMemo(() => {
    const arr = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y += delta * 0.01;
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
        opacity={0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Grid floor plane
function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
      <planeGeometry args={[20, 20, 20, 16]} />
      <meshBasicMaterial color="#3dffa0" wireframe transparent opacity={0.03} />
    </mesh>
  );
}

// Inactive node placeholder — low cost geometry
function InactiveNode({
  position,
  index,
}: {
  position: [number, number, number];
  index: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15 + index;
  });

  return (
    <Float
      speed={0.6}
      floatIntensity={0.2}
      rotationIntensity={0.1}
    >
      <group ref={ref} position={position}>
        {/* Cheap placeholder icosahedron */}
        <mesh>
          <icosahedronGeometry args={[0.35, 0]} />
          <meshBasicMaterial
            color="#3dffa0"
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
        {/* Small glow sphere */}
        <mesh>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshBasicMaterial color="#3dffa0" transparent opacity={0.08} />
        </mesh>
        <pointLight position={[0, 0, 0]} color="#3dffa0" intensity={0.2} distance={2} decay={2} />
      </group>
    </Float>
  );
}

// Orbital connection lines
function OrbitalLines({ activeIndex }: { activeIndex: number }) {
  const total = PROJECTS.length;
  const segments = useMemo(() => {
    const lines: [number, number, number, number, number, number][] = [];
    for (let i = 0; i < total; i++) {
      if (i === activeIndex) continue;
      const [x, y, z] = getOrbitalPosition(i, total, activeIndex);
      lines.push([0, 0, 0, x, y, z]);
    }
    return lines;
  }, [activeIndex, total]);

  return (
    <>
      {segments.map(([x1, y1, z1, x2, y2, z2], i) => {
        const from = new THREE.Vector3(x1, y1, z1);
        const to = new THREE.Vector3(x2, y2, z2);
        const mid = from.clone().lerp(to, 0.5);
        const dir = to.clone().sub(from);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.normalize()
        );
        return (
          <mesh key={i} position={mid.toArray()} quaternion={quat}>
            <cylinderGeometry args={[0.003, 0.003, len, 3]} />
            <meshBasicMaterial color="#3dffa0" transparent opacity={0.08} />
          </mesh>
        );
      })}
    </>
  );
}

// Main scene
function Scene({ activeIndex }: { activeIndex: number }) {
  const total = PROJECTS.length;

  return (
    <>
      <CameraRig activeIndex={activeIndex} />
      <SceneParticles />
      <GridFloor />
      <OrbitalLines activeIndex={activeIndex} />

      {/* Global ambient */}
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 4, 4]} color="#3dffa0" intensity={0.3} distance={12} decay={2} />

      {/* Render each project */}
      {PROJECTS.map((project, i) => {
        const isActive = i === activeIndex;
        const pos = getOrbitalPosition(i, total, activeIndex);

        if (isActive) {
          return (
            <Float key={project.id} speed={0.5} floatIntensity={0.15} rotationIntensity={0.05}>
              <group position={pos}>
                <ProjectVisual project={project} isActive />
              </group>
            </Float>
          );
        }

        return (
          <InactiveNode key={project.id} position={pos} index={i} />
        );
      })}
    </>
  );
}

interface Props {
  activeIndex: number;
}

export default function ProjectScene({ activeIndex }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 58 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Scene activeIndex={activeIndex} />
    </Canvas>
  );
}
