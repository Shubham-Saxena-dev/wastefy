import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: './',
    plugins: [react()],
    define: {
      __API_KEY__: JSON.stringify(env.VITE_API_KEY),
      __CONTACT_EMAIL__: JSON.stringify(env.VITE_CONTACT_EMAIL),
    }
  };
});
