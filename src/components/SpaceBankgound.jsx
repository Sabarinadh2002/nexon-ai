import { Canvas } from '@react-three/fiber';

// Import all the separated effect components
import SceneController from './effects/SceneController';
import Stars from './effects/Stars';
import BlinkingStars from './effects/BlinkingStars';
import Nebula from './effects/Nebula';
import ShootingStars from './effects/ShootingStars';

export default function SpaceBackground() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#000005' }}>
            <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
                {/* Each effect is now a clean, self-contained component */}
                <SceneController />
                <Stars />
                <BlinkingStars />
                <Nebula />
                <ShootingStars />
            </Canvas>
        </div>
    );
}
