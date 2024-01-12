import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  esbuild: {
    // Add this configuration to handle commonjs-style packages
    loader: {
      '.js': 'jsx',
    },
  },
})
