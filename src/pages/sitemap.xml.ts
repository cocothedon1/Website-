import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://laromate.ca');
  const fr = new URL('/', base).href;
  const en = new URL('/en/', base).href;
  const alt = `<xhtml:link rel="alternate" hreflang="fr-CA" href="${fr}"/><xhtml:link rel="alternate" hreflang="en-CA" href="${en}"/>`;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>${fr}</loc>${alt}</url>
  <url><loc>${en}</loc>${alt}</url>
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
