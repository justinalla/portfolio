import type { APIRoute } from 'astro';
import { projects, url } from '../data/projects';
export const GET: APIRoute = ({ site }) => {
  const paths = ['', 'approche/', 'travail/', 'outils/', 'formation/', 'contact/', ...projects.map(p => `projets/${p.slug}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${new URL(url(path), site).href}</loc></url>`).join('')}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
