import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@core': path.join(__dirname, './src/core'),
      '@renderer': path.join(__dirname, './src/renderer')
    }
  }
})
