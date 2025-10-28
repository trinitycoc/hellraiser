import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages
  // If deploying to https://<username>.github.io/hellraiser/
  // Change 'hellraiser' to match your repository name exactly
  base: process.env.NODE_ENV === 'production' ? '/hellraiser/' : '/',
})

