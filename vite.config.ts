import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // This should match your deployment base path
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
