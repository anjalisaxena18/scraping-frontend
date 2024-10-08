import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // This is mostly for local testing
    port: process.env.PORT || 3000  // Use the correct port for Render
  },
  build: {
    outDir: 'dist'  // This is where Vite places production files
  }
})
