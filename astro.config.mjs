// @ts-check
import { defineConfig } from 'astro/config';
import vercelAdapter from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  output: 'static',
  adapter: vercelAdapter(),
  integrations: [
    sanity({
      projectId: "67gi8gp6",
      dataset: "production",
      useCdn: false, // for static builds
    })
  ]
});