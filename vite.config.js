import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    // Only include vueDevTools in development mode
    process.env.NODE_ENV === 'development' ? vueDevTools() : null,
    VitePWA({
      registerType: 'autoUpdate',
      // Include all static assets needed offline
      includeAssets: [
        'favicon.ico',
        'logo.png',
        'assets/*.png',
        'assets/*.svg',
        'assets/*.jpg',
      ],
      // Web manifest configuration
      manifest: {
        name: 'Enegix Login',
        short_name: 'Enegix',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#42b883',
        icons: [
          {
            src: '/logo.png', // Use absolute path
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      // Workbox configuration for caching
      workbox: {
        // Cache all build output (JS, CSS, HTML, images, etc.)
        globPatterns: ['**/*.{js,css,html,png,svg,jpg,ico}'],
        // Optional: Fallback for navigation requests
        navigateFallback: '/index.html',
        // Increase cache size if needed
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
      },
    }),
  ].filter(Boolean), // Remove null plugins (e.g., vueDevTools in production)
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    assetsDir: 'assets',
  },
});