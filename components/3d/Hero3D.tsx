/**
 * Hero3D Component
 * Wrapper for the 3D canvas with proper SSR handling
 * Because Next.js and Three.js don't always play nice
 */

'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './HeroScene';

export default function Hero3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
