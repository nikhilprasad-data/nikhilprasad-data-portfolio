// src/components/hero/HeroScene.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

// ── Floating particles field ─────────────────────────────────
function ParticleField({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    let seed = 2026;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (random() - 0.5) * 20;
      arr[i * 3 + 1] = (random() - 0.5) * 14;
      arr[i * 3 + 2] = (random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y += delta * 0.012;
    ref.current.rotation.x += delta * 0.006;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3dffa0"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.38}
      />
    </Points>
  );
}

// ── Central glowing orb ──────────────────────────────────────
function CentralOrb() {
  const reduced = useReducedMotion();

  return (
    <Float
      speed={reduced ? 0 : 1.2}
      rotationIntensity={reduced ? 0 : 0.4}
      floatIntensity={reduced ? 0 : 0.6}
    >
      <Sphere args={[1.4, 64, 64]} position={[3.2, 0.4, -2]}>
        <MeshDistortMaterial
          color="#0a1a12"
          roughness={0.1}
          metalness={0.8}
          distort={reduced ? 0 : 0.28}
          speed={reduced ? 0 : 1.5}
          emissive="#3dffa0"
        emissiveIntensity={0.15}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

// ── Orbital rings ────────────────────────────────────────────
function OrbitalRing({
  radius,
  thickness,
  speed,
  color,
  axis,
}: {
  radius: number;
  thickness: number;
  speed: number;
  color: string;
  axis: 'x' | 'y' | 'z';
}) {
  const ref = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  useFrame((state, delta) => {
    if (reduced || !ref.current) return;
    const phase = axis === 'x' ? 2.1 : axis === 'z' ? 4.2 : 0;
    const pace = 1 + Math.sin(state.clock.elapsedTime * 0.22 + phase) * 0.035;
    if (axis === 'x') ref.current.rotation.x += delta * speed * pace;
    if (axis === 'y') ref.current.rotation.y += delta * speed * pace;
    if (axis === 'z') ref.current.rotation.z += delta * speed * pace;
  });

  return (
    <mesh ref={ref} position={[3.2, 0.4, -2]}>
      <torusGeometry args={[radius, thickness, 3, 120]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={radius < 2.2 ? 0.17 : radius < 3 ? 0.115 : 0.075}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── Tech grid planes ─────────────────────────────────────────
function TechGridPlane() {
  const reduced = useReducedMotion();
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reduced || !ref.current) return;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.027 + Math.sin(state.clock.elapsedTime * 0.3) * 0.008;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, -1]}>
      <planeGeometry args={[28, 20, 24, 16]} />
      <meshBasicMaterial
        color="#3dffa0"
        wireframe
        transparent
        opacity={0.027}
      />
    </mesh>
  );
}

// ── Atmospheric light cluster ────────────────────────────────
function Lights() {
  const ref = useRef<THREE.PointLight>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (reduced || !ref.current) return;
    ref.current.intensity = 1.2 + Math.sin(state.clock.elapsedTime * 0.55) * 0.2;
    ref.current.position.x = 3.2 + Math.sin(state.clock.elapsedTime * 0.34) * 0.45;
    ref.current.position.y = 0.4 + Math.cos(state.clock.elapsedTime * 0.27) * 0.32;
  });

  return (
    <>
      <ambientLight intensity={0.06} />
      <pointLight
        ref={ref}
        position={[3.2, 0.4, 1]}
        color="#3dffa0"
        intensity={1.4}
        distance={8}
        decay={2}
      />
      <pointLight
        position={[-4, 2, -1]}
        color="#1a5535"
        intensity={0.5}
        distance={12}
        decay={2}
      />
    </>
  );
}

// ── Scene canvas ─────────────────────────────────────────────
export default function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { rootMargin: '80px 0px', threshold: 0.01 });

    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sceneRef} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? 'demand' : isVisible ? 'always' : 'never'}
      >
        <Lights />
        <ParticleField count={500} />
        <CentralOrb />
        <OrbitalRing radius={2.0} thickness={0.008} speed={0.18} color="#3dffa0" axis="y" />
        <OrbitalRing radius={2.7} thickness={0.006} speed={-0.12} color="#3dffa0" axis="x" />
        <OrbitalRing radius={3.3} thickness={0.004} speed={0.08} color="#82ffcc" axis="z" />
        <TechGridPlane />
      </Canvas>
    </div>
  );
}
