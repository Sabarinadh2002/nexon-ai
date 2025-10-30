import * as THREE from 'three';

export const config = {
    // --- Camera Controller Settings ---
    sceneController: {
        mouseMoveFactor: 0.2, // How much the camera rotates with mouse movement
        smoothingFactor: 0.02, // How smoothly the camera follows the mouse
    },

    // --- Main Starfield Settings ---
    stars: {
        count: 6000,
        radiusRange: [60, 300], // Min and max distance of stars from the center
        centerExclusionZone: 50, // Radius of the central area with fewer stars
        centerReductionProbability: 0.3, // Chance to push stars out of the center zone
        size: {
            // Star sizes based on random distribution
            bright: { min: 3, max: 5 },       // 5% of stars
            medium: { min: 1.5, max: 3 },     // 15% of stars
            faint: { min: 0.3, max: 1.5 },    // 80% of stars
        },
        twinkle: {
            probability: 0.1, // 10% of stars will twinkle
            speedRange: [0.5, 2], // Min and max speed of twinkle effect
            color1: new THREE.Color('#FFDDDD'), // Reddish tint
            color2: new THREE.Color('#DDDDFF'), // Bluish tint
        },
    },

    // --- Four-Pointed Blinking Stars Settings ---
    blinkingStars: {
        count: 2000,
        radiusRange: [40, 200], // Placed further away than the main starfield
        blinkProbability: 0.008, // Lower value = less frequent blinks
        blinkDuration: 0.2, // seconds
        peakSize: 40.0, // Max size of the star during the blink animation
        color: 'rgba(255, 255, 220, 1)',
        glowColor: 'white',
        glowBlur: 12,
        lineWidth: 0.5,
    },

    // --- Shooting Stars Settings ---
    shootingStars: {
        maxCount: 20, // Maximum number of shooting stars on screen at once
        spawnInterval: 500, // milliseconds
        velocity: new THREE.Vector3(-3, -1, 0),
        life: 2.0, // seconds
        size: 0.5,
        color: 0xffffff,
    },

    // --- Nebula Settings ---
    nebula: {
        size: [800, 800],
        position: [0, 0, -200],
        noiseScale: 3.0,
        timeScale: 0.1,
        color1: new THREE.Color(0.1, 0.05, 0.2), // Dark purple
        color2: new THREE.Color(0.05, 0.0, 0.1), // Very dark purple
        color3: new THREE.Color(3, 82, 0.1),
        falloffStart: 1.0, // Start of the edge fade
        falloffEnd: 0.2, // End of the edge fade
        opacity: 0.4,
    },
};
