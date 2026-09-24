// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://laromate.ca',
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },
  build: { inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
});
