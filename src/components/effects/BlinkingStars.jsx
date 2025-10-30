import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { config } from './config';
import { createBlinkingStarTexture } from './textures';

const blinkingStarTexture = createBlinkingStarTexture();

export default function BlinkingStars() {
    const pointsRef = useRef();
    const particles = useRef();
    const activeBlink = useRef({ index: -1, progress: 1 });
    const cfg = config.blinkingStars;

    if (!particles.current) {
        const positions = new Float32Array(cfg.count * 3);
        const sizes = new Float32Array(cfg.count).fill(0);

        for (let i = 0; i < cfg.count; i++) {
            const radius = THREE.MathUtils.randFloat(...cfg.radiusRange);
            const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
            const phi = THREE.MathUtils.randFloat(0, Math.PI);
            positions.set([radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi)], i * 3);
        }
        particles.current = { positions, sizes };
    }

    useFrame((_, delta) => {
        if (!pointsRef.current) return;
        if (activeBlink.current.index !== -1) {
            activeBlink.current.progress += delta / cfg.blinkDuration;
            const { index, progress } = activeBlink.current;
            if (progress < 1) {
                const currentSize = cfg.peakSize * Math.sin(progress * Math.PI);
                pointsRef.current.geometry.attributes.size.array[index] = currentSize;
            } else {
                pointsRef.current.geometry.attributes.size.array[index] = 0;
                activeBlink.current.index = -1;
            }
            pointsRef.current.geometry.attributes.size.needsUpdate = true;
        } else if (Math.random() > (1 - cfg.blinkProbability)) {
            activeBlink.current = { index: Math.floor(Math.random() * cfg.count), progress: 0 };
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={particles.current.positions.length / 3} array={particles.current.positions} itemSize={3} />
                <bufferAttribute attach="attributes-size" count={particles.current.sizes.length} array={particles.current.sizes} itemSize={1} />
            </bufferGeometry>
            <pointsMaterial map={blinkingStarTexture} sizeAttenuation transparent depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
    );
}
