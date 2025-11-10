import fs from 'fs';
import path from 'path';
import { PluginOption } from 'vite';

export default function sitemapPlugin(): PluginOption {
  return {
    name: 'sitemap-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/sitemap.xml') {
          const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
          if (fs.existsSync(sitemapPath)) {
            const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
            res.setHeader('Content-Type', 'application/xml');
            res.end(sitemap);
            return;
          }
        }
        next();
      });
    },
    closeBundle() {
      // This will run after the build is complete
      const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
      const outputPath = path.join(process.cwd(), 'dist', 'sitemap.xml');
      
      if (fs.existsSync(sitemapPath)) {
        // Ensure the dist directory exists
        if (!fs.existsSync(path.dirname(outputPath))) {
          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }
        // Copy the sitemap to the dist directory
        fs.copyFileSync(sitemapPath, outputPath);
      }
    }
  };
}
