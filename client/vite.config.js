import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },  
})
