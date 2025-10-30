import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { config } from './config';

export default function SceneController() {
    const mouse = useRef({ x: 0, y: 0 });
    const targetRotation = useRef({ x: 0, y: 0 });
    const cfg = config.sceneController;

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame(({ camera }) => {
        targetRotation.current.x = -mouse.current.y * cfg.mouseMoveFactor;
        targetRotation.current.y = -mouse.current.x * cfg.mouseMoveFactor;
        camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * cfg.smoothingFactor;
        camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * cfg.smoothingFactor;
    });

    return null;
}
