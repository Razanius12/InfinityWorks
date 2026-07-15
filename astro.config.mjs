import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
 // Enable SSR
 output: 'static',
 vite: {
  resolve: {
   alias: {
    '@': '/src'
   }
  },
  ssr: {
   external: ['bootstrap']
  }
 }
});
