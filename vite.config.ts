import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Supports GitHub Pages (/vinoththiru_portfolio/) by default,
// and allows overriding via VITE_BASE_PATH="/" for Vercel or Netlify deployments.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const base = env.VITE_BASE_PATH || '/vinoththiru_portfolio/';

  return {
    base,
    plugins: [react()],
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
            icons: ['lucide-react'],
          },
        },
      },
    },
  };
});
