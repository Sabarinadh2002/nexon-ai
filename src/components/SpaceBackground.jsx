// src/components/SpaceBackground.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';

// --- Using Path Aliases ---
import SceneController from '@effects/SceneController';
import Stars from '@effects/Stars';
import BlinkingStars from '@effects/BlinkingStars';
import Nebula from '@effects/Nebula';
import ShootingStars from '@effects/ShootingStars';

// ... rest of your component


// ... rest of your component

// This is your complete, self-contained background component
export default function SpaceBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <SceneController />
        <Stars />
        <BlinkingStars />
        <Nebula />
        <ShootingStars />
      </Canvas>
    </div>
  );
}
