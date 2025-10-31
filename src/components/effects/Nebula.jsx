import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { config } from './config';
import { nebulaVertexShader, nebulaFragmentShader } from './shaders';

export default function Nebula() {
    const meshRef = useRef();
    const cfg = config.nebula;

    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }, // <-- ADD THIS
            u_noiseScale: { value: cfg.noiseScale },
            u_color1: { value: cfg.color1 },
            u_color2: { value: cfg.color2 },
            u_falloffStart: { value: cfg.falloffStart },
            u_falloffEnd: { value: cfg.falloffEnd },
        },
        vertexShader: nebulaVertexShader,
        fragmentShader: nebulaFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime() * cfg.timeScale;
        }
    });

    return (
        <mesh ref={meshRef} position={cfg.position}>
            <planeGeometry args={cfg.size} />
            <primitive object={shaderMaterial} attach="material" />
        </mesh>
    );
}
