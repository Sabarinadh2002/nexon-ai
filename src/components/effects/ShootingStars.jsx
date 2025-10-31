import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { config } from './config';

const MAX_STARS = config.shootingStars.maxCount;

export default function ShootingStars() {
    const pointsRef = useRef();
    const stars = useRef([]);
    const cfg = config.shootingStars;

    // Pre-allocate buffers for maximum performance
    const positions = new Float32Array(MAX_STARS * 3);
    const opacities = new Float32Array(MAX_STARS);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

    // Create a single material
    const material = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color(cfg.color) },
        },
        vertexShader: `
            attribute float opacity;
            varying float vOpacity;
            void main() {
                vOpacity = opacity;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = ${cfg.size.toFixed(1)};
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            varying float vOpacity;
            void main() {
                gl_FragColor = vec4(color, vOpacity);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });

    // Spawn new stars using an interval
    useEffect(() => {
        const spawnStar = () => {
            if (stars.current.length >= MAX_STARS) return;

            const x = THREE.MathUtils.randFloatSpread(400);
            const y = THREE.MathUtils.randFloat(100, 200);
            const z = THREE.MathUtils.randFloat(-200, 0);

            stars.current.push({
                pos: new THREE.Vector3(x, y, z),
                velocity: cfg.velocity.clone(),
                life: cfg.life,
                initialLife: cfg.life,
            });
        };

        const interval = setInterval(spawnStar, cfg.spawnInterval);
        return () => clearInterval(interval);
    }, [cfg]);

    useFrame((_, delta) => {
        if (!pointsRef.current) return;

        const posArray = pointsRef.current.geometry.attributes.position.array;
        const opacityArray = pointsRef.current.geometry.attributes.opacity.array;
        let activeStars = 0;

        // Use a loop that allows safe removal (e.g., iterating backwards)
        for (let i = stars.current.length - 1; i >= 0; i--) {
            const star = stars.current[i];
            star.pos.add(star.velocity);
            star.life -= delta;

            if (star.life <= 0) {
                // Remove star from the array
                stars.current.splice(i, 1);
            } else {
                // Update position in the buffer
                posArray[activeStars * 3] = star.pos.x;
                posArray[activeStars * 3 + 1] = star.pos.y;
                posArray[activeStars * 3 + 2] = star.pos.z;

                // Update opacity based on life
                opacityArray[activeStars] = star.life / star.initialLife;
                activeStars++;
            }
        }

        // Tell Three.js to update the buffers
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.geometry.attributes.opacity.needsUpdate = true;

        // Hide unused points by setting their draw range to 0
        pointsRef.current.geometry.setDrawRange(0, activeStars);
    });

    return <points ref={pointsRef} geometry={geometry} material={material} />;
}
