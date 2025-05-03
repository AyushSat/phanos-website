import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // This should match your deployment base path
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
