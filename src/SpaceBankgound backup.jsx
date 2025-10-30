import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- NEW Component: Manages camera rotation based on mouse movement ---
function SceneController() {
    const mouse = useRef({ x: 0, y: 0 });
    const targetRotation = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame(({ camera }) => {
        // Apply smooth camera rotation based on mouse position
        targetRotation.current.x = -mouse.current.y * 0.2; // Reduced factor for subtlety
        targetRotation.current.y = -mouse.current.x * 0.2;
        camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * 0.02;
        camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * 0.02;
    });

    return null; // This component does not render anything itself
}

// --- NEW Component: Renders the blinking four-pointed stars ---
function BlinkingStars() {
    const pointsRef = useRef();
    const blinkingStarTexture = useRef();
    const particles = useRef();
    const activeBlink = useRef({ index: -1, progress: 1 });

    // Generate the four-pointed star texture using a canvas
    if (!blinkingStarTexture.current) {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        ctx.strokeStyle = 'rgba(255, 255, 220, 1)';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 12;

        // Draw a cross to form the four points
        ctx.beginPath();
        ctx.moveTo(16, 32);
        ctx.lineTo(48, 32);
        ctx.moveTo(32, 16);
        ctx.lineTo(32, 48);
        ctx.stroke();

        blinkingStarTexture.current = new THREE.CanvasTexture(canvas);
    }

    // Generate particle data for the blinking stars
    if (!particles.current) {
        const count = 100;
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count).fill(0); // All stars start invisible

        for (let i = 0; i < count; i++) {
            const radius = THREE.MathUtils.randFloat(150, 350); // Place them in the distance
            const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
            const phi = THREE.MathUtils.randFloat(0, Math.PI);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }
        particles.current = { positions, sizes };
    }

    useFrame((_, delta) => {
        if (!pointsRef.current) return;

        // Animate the currently active blink
        if (activeBlink.current.index !== -1) {
            const blinkDuration = 0.5; // seconds
            activeBlink.current.progress += delta / blinkDuration;
            const { index, progress } = activeBlink.current;

            if (progress < 1) {
                const peakSize = 40.0;
                // Use a sine curve to smoothly animate size from 0 -> peak -> 0
                const currentSize = peakSize * Math.sin(progress * Math.PI);
                pointsRef.current.geometry.attributes.size.array[index] = currentSize;
            } else {
                // Animation finished, reset the star's size and mark as inactive
                pointsRef.current.geometry.attributes.size.array[index] = 0;
                activeBlink.current.index = -1;
            }
            pointsRef.current.geometry.attributes.size.needsUpdate = true;
        } else {
            // No active blink, randomly decide to trigger a new one
            if (Math.random() > 0.992) { // Adjust probability for desired frequency
                const blinkIndex = Math.floor(Math.random() * particles.current.sizes.length);
                activeBlink.current = { index: blinkIndex, progress: 0 };
            }
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.current.positions.length / 3}
                    array={particles.current.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particles.current.sizes.length}
                    array={particles.current.sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                map={blinkingStarTexture.current}
                sizeAttenuation
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// --- MODIFIED Component: Stars component (camera controls removed) ---
function Stars() {
    const pointsRef = useRef();
    const starTexture = useRef(null);
    const particles = useRef(null);

    // Generate circular star texture
    if (!starTexture.current) {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
        starTexture.current = new THREE.CanvasTexture(canvas);
    }

    // Generate particle data for the main starfield
    if (!particles.current) {
        const count = 6000;
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const colors = new Float32Array(count * 3);
        const twinkleData = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const radius = THREE.MathUtils.randFloat(50, 300);
            const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
            const phi = THREE.MathUtils.randFloat(0, Math.PI);
            
            const isNearCenter = Math.abs(radius - 175) < 50;
            const shouldReduce = isNearCenter && Math.random() > 0.3;

            let r = shouldReduce ? THREE.MathUtils.randFloat(200, 300) : radius;
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            const rand = Math.random();
            let size, brightness;
            if (rand > 0.95) {
                size = THREE.MathUtils.randFloat(3, 5);
                brightness = THREE.MathUtils.mapLinear(size, 3, 5, 0.95, 1.2);
            } else if (rand > 0.8) {
                size = THREE.MathUtils.randFloat(1.5, 3);
                brightness = THREE.MathUtils.mapLinear(size, 1.5, 3, 0.6, 0.9);
            } else {
                size = THREE.MathUtils.randFloat(0.3, 1.5);
                brightness = THREE.MathUtils.mapLinear(size, 0.3, 1.5, 0.2, 0.5);
            }
            sizes[i] = size;

            const shouldTwinkle = Math.random() > 0.9;
            if (shouldTwinkle) {
                twinkleData[i * 3] = THREE.MathUtils.randFloat(0.5, 2); // speed
                twinkleData[i * 3 + 1] = Math.random() * Math.PI * 2; // phase
                const colorType = Math.random() > 0.5 ? 1 : 2; // color
                twinkleData[i * 3 + 2] = colorType;
                colors[i * 3] = colorType === 1 ? brightness : brightness * 0.2;
                colors[i * 3 + 1] = colorType === 2 ? brightness : brightness * 0.2;
                colors[i * 3 + 2] = brightness * 0.2;
            } else {
                twinkleData[i * 3] = 0;
                colors.set([brightness, brightness, brightness], i * 3);
            }
        }
        particles.current = { positions, sizes, colors, twinkleData };
    }

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const time = clock.getElapsedTime();
        const colors = pointsRef.current.geometry.attributes.color.array;
        const { twinkleData } = particles.current;

        for (let i = 0; i < twinkleData.length / 3; i++) {
            const speed = twinkleData[i * 3];
            if (speed > 0) {
                const phase = twinkleData[i * 3 + 1];
                const colorType = twinkleData[i * 3 + 2];
                const twinkle = (Math.sin(time * speed + phase) + 1) * 0.5;
                const intensity = 0.3 + twinkle * 0.7;

                colors[i * 3] = colorType === 1 ? intensity : intensity * 0.2;
                colors[i * 3 + 1] = colorType === 2 ? intensity : intensity * 0.2;
                colors[i * 3 + 2] = intensity * 0.2;
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
            <pointsMaterial
                map={starTexture.current}
                sizeAttenuation
                vertexColors
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// --- UNCHANGED Components: Nebula and ShootingStars ---
function Nebula() {
    const meshRef = useRef();
    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();
        }
    });

    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec2 u_resolution;
            uniform float u_time;
            varying vec2 vUv;
            
            // Perlin noise function
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
            float snoise(vec3 v) {
                const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
                vec3 i = floor(v + dot(v, C.yyy));
                vec3 x0 = v - i + dot(i, C.xxx);
                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min(g.xyz, l.zxy);
                vec3 i2 = max(g.xyz, l.zxy);
                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy;
                vec3 x3 = x0 - D.yyy;
                i = mod289(i);
                vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                float n_ = 0.142857142857;
                vec3 ns = n_ * D.wyz - D.xzx;
                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_);
                vec4 x = x_ * ns.x + ns.yyyy;
                vec4 y = y_ * ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);
                vec4 b0 = vec4(x.xy, y.xy);
                vec4 b1 = vec4(x.zw, y.zw);
                vec4 s0 = floor(b0) * 2.0 + 1.0;
                vec4 s1 = floor(b1) * 2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));
                vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
                vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
                vec3 p0 = vec3(a0.xy, h.x);
                vec3 p1 = vec3(a0.zw, h.y);
                vec3 p2 = vec3(a1.xy, h.z);
                vec3 p3 = vec3(a1.zw, h.w);
                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;
                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
            }

            void main() {
                vec2 centeredUv = (vUv - 0.5) * 2.0;
                float dist = length(centeredUv);

                vec3 noiseCoord = vec3(vUv * 3.0, u_time * 0.1);
                float noise = snoise(noiseCoord);
                noise = smoothstep(0.4, 0.6, noise);

                vec3 color1 = vec3(0.1, 0.05, 0.2);
                vec3 color2 = vec3(0.05, 0.0, 0.1);

                vec3 finalColor = mix(color1, color2, noise);
                
                float falloff = smoothstep(1.0, 0.2, dist);
                
                gl_FragColor = vec4(finalColor, falloff * 0.4);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -200]}>
            <planeGeometry args={[800, 800]} />
            <primitive object={shaderMaterial} attach="material" />
        </mesh>
    );
}

function ShootingStars() {
    const meshRef = useRef();
    const stars = useRef([]);
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (stars.current.length < 5) {
                const x = THREE.MathUtils.randFloatSpread(400);
                const y = THREE.MathUtils.randFloat(100, 200);
                const z = THREE.MathUtils.randFloat(-200, 0);
                stars.current.push({
                    pos: new THREE.Vector3(x, y, z),
                    velocity: new THREE.Vector3(-3, -1, 0),
                    life: 1.0
                });
            }
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useFrame((_, delta) => {
        const positions = [];
        stars.current.forEach((star, i) => {
            star.pos.add(star.velocity);
            star.life -= delta * 0.5;
            if (star.life > 0) {
                positions.push(star.pos.x, star.pos.y, star.pos.z);
            } else {
                stars.current.splice(i, 1);
            }
        });
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    });

    return <points ref={meshRef} geometry={geometry} material={material} />;
}

// --- Main Component ---
export default function SpaceBackground() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#000005' }}>
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

