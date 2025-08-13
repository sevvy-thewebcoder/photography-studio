// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel'

import netlify from '@astrojs/netlify';



// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://netlify.com/',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],
  adapter: vercel(),
});