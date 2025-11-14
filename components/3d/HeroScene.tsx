/**
 * 3D Hero Scene
 * A floating geometric shape because every cool portfolio needs one
 * Optimized for performance because loading times are already depressing enough
 */

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Smooth floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial
        color="#06b6d4"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

export function Scene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      
      {/* Directional lights for that cyberpunk glow */}
      <directionalLight position={[10, 10, 5]} intensity={1} color="#06b6d4" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#9333ea" />
      
      {/* Point light for extra drama */}
      <pointLight position={[0, 0, 5]} intensity={1} color="#06b6d4" />

      {/* The main attraction */}
      <FloatingShape />
    </>
  );
}
