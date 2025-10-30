import * as THREE from 'three';
import { config } from './config';

// --- Circular Star Texture ---
export function createStarTexture() {
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
    return new THREE.CanvasTexture(canvas);
}

// --- Four-Pointed Star Texture ---
export function createBlinkingStarTexture() {
    const cfg = config.blinkingStars;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = cfg.color;
    ctx.lineWidth = cfg.lineWidth;
    ctx.shadowColor = cfg.glowColor;
    ctx.shadowBlur = cfg.glowBlur;

    ctx.beginPath();
    ctx.moveTo(16, 32);
    ctx.lineTo(48, 32);
    ctx.moveTo(32, 16);
    ctx.lineTo(32, 48);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
}
