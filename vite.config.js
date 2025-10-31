import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // No base path needed when using HashRouter
  base: '/',
  server: {
    host: '0.0.0.0', // Allow access from local network
    port: 5173, // Default Vite port
  },
})

