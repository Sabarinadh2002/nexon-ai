import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { config } from './config';
import { createStarTexture } from './textures';


const starTexture = createStarTexture();


export default function Stars() {
    const pointsRef = useRef();
    const particles = useRef();
    const cfg = config.stars;


    if (!particles.current) {
        const positions = new Float32Array(cfg.count * 3);
        const sizes = new Float32Array(cfg.count);
        const colors = new Float32Array(cfg.count * 3);
        const twinkleData = new Float32Array(cfg.count * 3);
        const baseColors = new Float32Array(cfg.count * 3);


        for (let i = 0; i < cfg.count; i++) {
            const radius = THREE.MathUtils.randFloat(...cfg.radiusRange);
            const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
            const phi = THREE.MathUtils.randFloat(0, Math.PI);
           
            const isNearCenter = Math.abs(radius - (cfg.radiusRange[0] + cfg.radiusRange[1]) / 2) < cfg.centerExclusionZone;
            const shouldReduce = isNearCenter && Math.random() > cfg.centerReductionProbability;


            let r = shouldReduce ? THREE.MathUtils.randFloat(cfg.radiusRange[1] - cfg.centerExclusionZone, cfg.radiusRange[1]) : radius;
            positions.set([r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)], i * 3);


            const rand = Math.random();
            let size, brightness;
           
            if (rand > 0.95) {
                size = THREE.MathUtils.randFloat(cfg.size.bright.min, cfg.size.bright.max);
                brightness = THREE.MathUtils.mapLinear(size, cfg.size.bright.min, cfg.size.bright.max, 0.95, 1.2);
            } else if (rand > 0.8) {
                size = THREE.MathUtils.randFloat(cfg.size.medium.min, cfg.size.medium.max);
                brightness = THREE.MathUtils.mapLinear(size, cfg.size.medium.min, cfg.size.medium.max, 0.6, 0.9);
            } else {
                size = THREE.MathUtils.randFloat(cfg.size.faint.min, cfg.size.faint.max);
                brightness = THREE.MathUtils.mapLinear(size, cfg.size.faint.min, cfg.size.faint.max, 0.2, 0.5);
            }
            sizes[i] = size;


            const colorChance = Math.random();
            let baseColor;
            if (colorChance < 0.5) { // 50% White
                baseColor = new THREE.Color('#FFFFFF');
            } else if (colorChance < 0.8) { // 30% Yellowish
                baseColor = new THREE.Color('#FFDDB4');
            } else if (colorChance < 0.95) { // 15% Bluish
                baseColor = new THREE.Color('#AABFFF');
            } else { // 5% Orange/Reddish
                baseColor = new THREE.Color('#FF8C6F');
            }
           
            baseColors.set([baseColor.r, baseColor.g, baseColor.b], i * 3);
            colors.set([baseColor.r * brightness, baseColor.g * brightness, baseColor.b * brightness], i * 3);


            if (Math.random() < cfg.twinkle.probability) {
                twinkleData[i * 3] = THREE.MathUtils.randFloat(...cfg.twinkle.speedRange);
                twinkleData[i * 3 + 1] = Math.random() * Math.PI * 2;
            } else {
                twinkleData[i * 3] = 0;
            }
        }
        particles.current = { positions, sizes, colors, twinkleData, baseColors };
    }


    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const time = clock.getElapsedTime();
        const colors = pointsRef.current.geometry.attributes.color.array;
        const { twinkleData, baseColors } = particles.current;


        for (let i = 0; i < cfg.count; i++) {
            const speed = twinkleData[i * 3];
            if (speed > 0) {
                const phase = twinkleData[i * 3 + 1];
                const twinkle = (Math.sin(time * speed + phase) + 1) * 0.5;
                const intensity = 0.3 + twinkle * 0.7;
               
                const baseR = baseColors[i * 3];
                const baseG = baseColors[i * 3 + 1];
                const baseB = baseColors[i * 3 + 2];
               
                colors.set([baseR * intensity, baseG * intensity, baseB * intensity], i * 3);
            }
        }
        pointsRef.current.geometry.attributes.color.needsUpdate = true;
    });


    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={particles.current.positions.length / 3} array={particles.current.positions} itemSize={3} />
                <bufferAttribute attach="attributes-size" count={particles.current.sizes.length} array={particles.current.sizes} itemSize={1} />
                <bufferAttribute attach="attributes-color" count={particles.current.colors.length / 3} array={particles.current.colors} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial map={starTexture} sizeAttenuation vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
    );
}
