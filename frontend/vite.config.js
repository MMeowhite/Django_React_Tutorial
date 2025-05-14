import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (e.g., development or production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: '/',
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL, // 使用加载的环境变量
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});