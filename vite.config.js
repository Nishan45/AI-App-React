import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Ensure Vite treats the public folder explicitly as static copies
  publicDir: 'public', 
})
