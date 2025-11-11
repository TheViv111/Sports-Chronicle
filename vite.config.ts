import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import vitePluginTranslations from './vite.translations';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const fs = require('fs');
  const path = require('path');
  const plugins = [
    // Handle sitemap.xml requests in development
    {
      name: 'serve-sitemap',
      configureServer(server: any) {
        server.middlewares.use((req: any, res: any, next: () => void) => {
          if (req.url === '/sitemap.xml') {
            const sitemapPath = path.resolve(__dirname, 'public/sitemap.xml');
            if (fs.existsSync(sitemapPath)) {
              res.setHeader('Content-Type', 'application/xml');
              res.end(fs.readFileSync(sitemapPath, 'utf-8'));
              return;
            }
          }
          next();
        });
      }
    },
    react({
      // Add this to support path aliases in JSX
      jsxImportSource: '@emotion/react',
    }),
    // Copy translation files to build directory
    vitePluginTranslations(),
    // Copy public files to root of the build output
    {
      name: 'copy-public-assets',
      apply: 'build' as const,
      writeBundle() {
        const fs = require('fs');
        const path = require('path');
        
        // Ensure sitemap.xml is copied to the root of the build
        const sitemapPath = path.resolve(__dirname, 'public/sitemap.xml');
        const destPath = path.resolve(__dirname, 'dist/sitemap.xml');
        
        if (fs.existsSync(sitemapPath)) {
          fs.copyFileSync(sitemapPath, destPath);
          console.log('Sitemap copied to build directory');
        }
      }
    },
    // PWA support
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      },
      manifest: {
        name: 'The Sports Chronicle',
        short_name: 'SportsChronicle',
        description: 'Your ultimate sports news and updates',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/The Sports Chronicle Logo-modified.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/The Sports Chronicle Logo-modified.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    // Compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    })
  ];

  // Add visualizer in analyze mode
  if (mode === 'analyze') {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as any
    );
  }

  // Add additional compression in production
  if (mode === 'production') {
    plugins.push(
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
        deleteOriginFile: false,
      })
    );
  }

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    base: '/',
    server: {
      host: '::',
      port: 0, // 0 means any available port
      strictPort: false, // Allow any available port
      open: true,
      proxy: {
        // Proxy API requests to avoid CORS issues
        '/api': {
          target: 'https://whgjiirmcbsiqhjzgldy.supabase.co',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      fs: {
        // Allow serving files from the project root
        allow: ['..']
      }
    },
    plugins,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode !== 'production',
      minify: mode === 'production' ? 'terser' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['lodash', 'axios']
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]'
        }
      },
      // Include all assets in the build
      assetsInclude: ['**/*.json']
    }
  };
});
