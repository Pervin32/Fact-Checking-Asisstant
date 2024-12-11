import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    proxy: {
      '/factcheck': {
      target: 'https://fact-checking-assistant.onrender.com',
      changeOrigin: true,
      secure: false,
      },
    },
    hmr: {
      overlay: false,
    },
  },
});
