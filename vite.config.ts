import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://jhicbe-7544501e.b4a.run',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
})
