// src/components/projects/visuals/TradeValidatorVisual.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface Props {
  isActive: boolean;
}

// OHLCV bar chart
function OHLCVBars({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  const bars = useMemo(() => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      const h = 0.3 + Math.random() * 1.6;
      const up = Math.random() > 0.5;
      data.push({ x: (i - 9.5) * 0.22, h, up });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (reduced || !groupRef.current) return;
    groupRef.current.children.forEach((bar, i) => {
      bar.scale.y = 1 + Math.sin(state.clock.elapsedTime * 0.8 + i * 0.3) * 0.05;
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.8, 0]}>
      {bars.map((bar, i) => (
        <mesh key={i} position={[bar.x, bar.h / 2, 0]}>
          <boxGeometry args={[0.12, bar.h, 0.08]} />
          <meshBasicMaterial
            color={bar.up ? '#3dffa0' : '#ff4444'}
            transparent
            opacity={isActive ? 0.75 : 0.12}
          />
        </mesh>
      ))}
    </group>
  );
}

// Signal indicator line
function SignalPlane({ isActive }: { isActive: boolean }) {
  const lineRef = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (reduced || !lineRef.current) return;
    lineRef.current.position.y = -0.2 + Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });

  return (
    <mesh ref={lineRef} position={[0, -0.2, 0.1]}>
      <planeGeometry args={[4.5, 0.006]} />
      <meshBasicMaterial
        color="#3dffa0"
        transparent
        opacity={isActive ? 0.7 : 0.1}
      />
    </mesh>
  );
}

// Validation pulse
function ValidationPulse({ isActive }: { isActive: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (reduced || !ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.12;
    ref.current.scale.setScalar(s);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = isActive
      ? 0.25 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1
      : 0.04;
  });

  return (
    <mesh ref={ref} position={[1.6, 0.4, 0]}>
      <torusGeometry args={[0.4, 0.01, 2, 40]} />
      <meshBasicMaterial color="#3dffa0" transparent opacity={isActive ? 0.3 : 0.05} />
    </mesh>
  );
}

export default function TradeValidatorVisual({ isActive }: Props) {
  return (
    <group>
      <OHLCVBars isActive={isActive} />
      <SignalPlane isActive={isActive} />
      <ValidationPulse isActive={isActive} />
      <pointLight
        position={[0, 1, 1.5]}
        color="#3dffa0"
        intensity={isActive ? 1.4 : 0.1}
        distance={5}
        decay={2}
      />
    </group>
  );
}
