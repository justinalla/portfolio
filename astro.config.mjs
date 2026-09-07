import { defineConfig } from 'astro/config';
export default defineConfig({ site: process.env.SITE_URL || 'https://justinalla.github.io', base: process.env.BASE_PATH || '/portfolio/', output: 'static', trailingSlash: 'always' });
