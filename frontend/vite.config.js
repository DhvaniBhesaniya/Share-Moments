import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: false,
    staticPort: true,
    port: 5173,
    proxy:{
      '/api': {
       target:  'http://localhost:3002',
       changeOrigin:true,
       secure:false,
      }
    },
  },
})