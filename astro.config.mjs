// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ncngmodelrailroad.org',
  integrations: [
    tailwind(),
    react(),
    sitemap(),
  ],
  output: 'static',
  // Performance optimizations
  build: {
    inlineStylesheets: 'auto',
  },
  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
