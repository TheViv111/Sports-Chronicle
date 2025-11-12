// Generates sitemap.xml into public/ using the app’s static routes
// Run via: npm run gen:sitemap

import { writeFileSync } from 'fs';
import { resolve } from 'path';

const DOMAIN = 'https://the-sports-chronicle.vercel.app';
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// Static routes only; dynamic routes like /blog/:slug and /users/:id are excluded
const routes = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/blog', changefreq: 'daily', priority: 0.9 },
  { path: '/about', changefreq: 'monthly', priority: 0.8 },
  { path: '/contact', changefreq: 'monthly', priority: 0.7 },
];

const urlset = routes
  .map(({ path, changefreq, priority }) => `
  <url>
    <loc>${DOMAIN}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`)
  .join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlset}
</urlset>`;

const outPath = resolve(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');
console.log('Sitemap generated:', outPath);