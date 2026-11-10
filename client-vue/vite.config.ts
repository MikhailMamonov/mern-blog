import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Все запросы, начинающиеся с /api, будут перенаправлены на Node.js
      '/api': {
        target: 'http://localhost:5000', // <-- Укажи порт твоего сервера (посмотри в server/index.js или app.js)
        changeOrigin: true,
        // Если на сервере роуты без /api (например, app.use('/posts')), раскомментируй rewrite:
        // rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})
