// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Make sure to import the 'path' module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nexon-ai/',
  
  // --- NEW: Add path aliases here ---
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@effects': path.resolve(__dirname, './src/components/effects'),
      '@assets': path.resolve(__dirname, './src/assets'), // Good to have for images, etc.
    },
  },
});
