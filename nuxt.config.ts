import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [fileURLToPath(new URL('./assets/css/main.css', import.meta.url))]
})
