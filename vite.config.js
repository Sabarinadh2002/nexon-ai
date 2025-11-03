// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/nexon-ai/',
  resolve: {
    // vite.config.js
// ...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Point to the nested folder
      '@components': path.resolve(__dirname, './src/components/components'), 
      '@effects': path.resolve(__dirname, './src/components/effects'),
    },
  },
// ...

    },
  },
);
