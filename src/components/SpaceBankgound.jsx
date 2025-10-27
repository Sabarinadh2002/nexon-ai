import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
  const pointsRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  const starTexture = useRef(null);
  
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

  const particles = useRef(null);
  
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
      
      const distanceFromCenter = Math.abs(radius - 175);
      const centerReduction = distanceFromCenter < 50 ? Math.random() > 0.3 : true;
      
      if (!centerReduction) {
        const newRadius = THREE.MathUtils.randFloat(200, 300);
        positions[i * 3] = newRadius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = newRadius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = newRadius * Math.cos(phi);
      } else {
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
      }
      
      const rand = Math.random();
      let size, brightness;
      
      if (rand > 0.95) {
        size = THREE.MathUtils.randFloat(3, 5);
        brightness = THREE.MathUtils.mapLinear(size, 3, 5, 0.95, 1.2);
      } else if (rand > 0.80) {
        size = THREE.MathUtils.randFloat(1.5, 3);
        brightness = THREE.MathUtils.mapLinear(size, 1.5, 3, 0.6, 0.9);
      } else {
        size = THREE.MathUtils.randFloat(0.3, 1.5);
        brightness = THREE.MathUtils.mapLinear(size, 0.3, 1.5, 0.2, 0.5);
      }
      
      sizes[i] = size;
      
      const shouldTwinkle = Math.random() > 0.9;
      
      if (shouldTwinkle) {
        const colorType = Math.random() > 0.5 ? 1 : 2;
        twinkleData[i * 3] = THREE.MathUtils.randFloat(0.5, 2);
        twinkleData[i * 3 + 1] = Math.random() * Math.PI * 2;
        twinkleData[i * 3 + 2] = colorType;
        
        if (colorType === 1) {
          colors[i * 3] = brightness;
          colors[i * 3 + 1] = brightness * 0.2;
          colors[i * 3 + 2] = brightness * 0.2;
        } else {
          colors[i * 3] = brightness * 0.2;
          colors[i * 3 + 1] = brightness;
          colors[i * 3 + 2] = brightness * 0.2;
        }
      } else {
        twinkleData[i * 3] = 0;
        colors[i * 3] = brightness;
        colors[i * 3 + 1] = brightness;
        colors[i * 3 + 2] = brightness;
      }
    }
    
    particles.current = { positions, sizes, colors, twinkleData };
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ camera, clock }) => {
    targetRotation.current.x = -mouse.current.y * 0.3;
    targetRotation.current.y = -mouse.current.x * 0.3;
    
    camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * 0.05;
    camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * 0.05;
    
    if (pointsRef.current) {
      const colors = pointsRef.current.geometry.attributes.color.array;
      const twinkleData = particles.current.twinkleData;
      const time = clock.getElapsedTime();
      
      for (let i = 0; i < twinkleData.length / 3; i++) {
        const speed = twinkleData[i * 3];
        const phase = twinkleData[i * 3 + 1];
        const colorType = twinkleData[i * 3 + 2];
        
        if (speed > 0) {
          const twinkle = (Math.sin(time * speed + phase) + 1) * 0.5;
          const intensity = 0.3 + twinkle * 0.7;
          
          if (colorType === 1) {
            colors[i * 3] = intensity;
            colors[i * 3 + 1] = intensity * 0.2;
            colors[i * 3 + 2] = intensity * 0.2;
          } else {
            colors[i * 3] = intensity * 0.2;
            colors[i * 3 + 1] = intensity;
            colors[i * 3 + 2] = intensity * 0.2;
          }
        }
      }
      
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
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
        <bufferAttribute
          attach="attributes-color"
          count={particles.current.colors.length / 3}
          array={particles.current.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.2}
        sizeAttenuation={true}
        map={starTexture.current}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={true}
      />
    </points>
  );
}

// Completely rewritten Shooting Star Component with proper trail
function ShootingStars() {
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    const spawnShootingStar = () => {
      // Color palettes for shooting stars
      const colorPalettes = [
        new THREE.Color(0x00ffff), // Cyan
        new THREE.Color(0xff00ff), // Magenta
        new THREE.Color(0xffff00), // Yellow
        new THREE.Color(0x00ff88), // Green-Cyan
        new THREE.Color(0xff0088), // Pink
      ];
      
      const color = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      
      // Start from top-left area
      const startX = THREE.MathUtils.randFloat(-200, -50);
      const startY = THREE.MathUtils.randFloat(80, 150);
      const startZ = THREE.MathUtils.randFloat(-180, -100);
      
      const newStar = {
        id: Date.now() + Math.random(),
        position: new THREE.Vector3(startX, startY, startZ),
        velocity: new THREE.Vector3(1.8, -1.2, 0.5), // Diagonal movement
        color: color,
        opacity: 1,
        trail: [] // Store trail positions
      };
      
      setShootingStars(prev => [...prev, newStar]);
    };

    // Spawn shooting star every 4-7 seconds
    const spawnInterval = () => {
      spawnShootingStar();
      const nextDelay = THREE.MathUtils.randFloat(4000, 7000);
      setTimeout(spawnInterval, nextDelay);
    };

    const initialTimeout = setTimeout(spawnInterval, 2000);
    return () => clearTimeout(initialTimeout);
  }, []);

  useFrame((state, delta) => {
    setShootingStars(prevStars => {
      return prevStars.filter(star => {
        // Update position
        star.position.add(star.velocity.clone().multiplyScalar(delta * 60));
        
        // Add current position to trail
        star.trail.push(star.position.clone());
        
        // Keep only last 20 trail points for performance
        if (star.trail.length > 20) {
          star.trail.shift();
        }
        
        // Fade out
        star.opacity -= delta * 0.4;
        
        // Keep if still visible
        return star.opacity > 0;
      });
    });
  });

  return (
    <group>
      {shootingStars.map((star) => (
        <group key={star.id}>
          {/* Head of shooting star - bright sphere */}
          <mesh position={star.position}>
            <sphereGeometry args={[0.8, 8, 8]} />
            <meshBasicMaterial 
              color={star.color} 
              transparent 
              opacity={star.opacity}
              toneMapped={false}
            />
          </mesh>
          
          {/* Glow around head */}
          <mesh position={star.position}>
            <sphereGeometry args={[1.5, 8, 8]} />
            <meshBasicMaterial 
              color={star.color} 
              transparent 
              opacity={star.opacity * 0.3}
              toneMapped={false}
            />
          </mesh>
          
          {/* Trail particles - fade from head backwards */}
          {star.trail.map((trailPos, index) => {
            const trailOpacity = (index / star.trail.length) * star.opacity * 0.6;
            const trailSize = (index / star.trail.length) * 0.6 + 0.2;
            
            return (
              <mesh key={index} position={trailPos}>
                <sphereGeometry args={[trailSize, 6, 6]} />
                <meshBasicMaterial 
                  color={star.color} 
                  transparent 
                  opacity={trailOpacity}
                  toneMapped={false}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

const SpaceBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: '#000000'
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 0],
          fov: 55,
          near: 0.1,
          far: 1000
        }}
      >
        <color attach="background" args={['#000000']} />
        <Stars />
        <ShootingStars />
      </Canvas>
    </div>
  );
};

export default SpaceBackground;
