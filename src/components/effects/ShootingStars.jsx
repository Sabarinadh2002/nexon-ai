import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { config } from './config';

export default function ShootingStars() {
    const meshRef = useRef();
    const stars = useRef([]);
    const geometry = new THREE.BufferGeometry();
    const cfg = config.shootingStars;
    const material = new THREE.PointsMaterial({
        color: cfg.color,
        size: cfg.size,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (stars.current.length < cfg.maxCount) {
                const x = THREE.MathUtils.randFloatSpread(400);
                const y = THREE.MathUtils.randFloat(100, 200);
                const z = THREE.MathUtils.randFloat(-200, 0);
                stars.current.push({
                    pos: new THREE.Vector3(x, y, z),
                    velocity: cfg.velocity.clone(),
                    life: cfg.life,
                });
            }
        }, cfg.spawnInterval);
        return () => clearInterval(interval);
    }, [cfg]);

    useFrame((_, delta) => {
        const positions = [];
        stars.current = stars.current.filter((star) => {
            star.pos.add(star.velocity);
            star.life -= delta;
            if (star.life > 0) {
                positions.push(star.pos.x, star.pos.y, star.pos.z);
                return true;
            }
            return false;
        });
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    });

    return <points ref={meshRef} geometry={geometry} material={material} />;
}
