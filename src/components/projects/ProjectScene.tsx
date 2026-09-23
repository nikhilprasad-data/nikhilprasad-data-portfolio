'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { View } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import styles from './ProjectShowcase.module.css';

function SceneParticles() {
  const ref = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();

  const positions = useMemo(() => {
    const arr = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
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

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
      <planeGeometry args={[20, 20, 20, 16]} />
      <meshBasicMaterial color="#3dffa0" wireframe transparent opacity={0.03} />
    </mesh>
  );
}

function SceneAtmosphere() {
  return (
    <>
      <SceneParticles />
      <GridFloor />
    </>
  );
}

export default function ProjectScene() {
  return (
    <div className={styles.canvasWrapper} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 58 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <View.Port />
      </Canvas>

      <View as="div" className={styles.atmosphereTrack} index={0}>
        <SceneAtmosphere />
      </View>
      <div className={styles.atmosphericGlow} aria-hidden="true" />
    </div>
  );
}
