import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import vitePluginTranslations from './vite.translations';

// https://vitejs.dev/config/
import type { ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import type { NextFunction } from 'connect';

export default defineConfig(({ mode }) => {
  const plugins = [
    react({
      // Add this to support path aliases in JSX
      jsxImportSource: '@emotion/react',
    }),
    // Copy translation files to build directory
    vitePluginTranslations(),
    // PWA support
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,webp,avif}'],
        // Advanced caching strategies for optimal performance
        runtimeCaching: [
          {
            // Critical resources - CacheFirst with network fallback
            urlPattern: /\.(?:js|css)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year for better performance
              },
              cacheableResponse: {
                statuses: [0, 200],
                headers: {
                  'Cache-Control': 'public, max-age=31536000, immutable'
                }
              },
              // Background sync for updates
              backgroundSync: {
                name: 'static-sync',
                options: {
                  maxRetentionTime: 24 * 60 // 24 hours
                }
              }
            }
          },
          {
            // Images with advanced caching and optimization
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
                headers: {
                  'Cache-Control': 'public, max-age=31536000, immutable'
                }
              }
            }
          },
          {
            // Fonts with aggressive caching
            urlPattern: /\.(?:woff|woff2|ttf|eot|otf)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
                headers: {
                  'Cache-Control': 'public, max-age=31536000, immutable'
                }
              },
              // Fonts are critical, always cache first
              fetchOptions: {
                mode: 'cors',
                credentials: 'omit'
              }
            }
          },
          {
            // API with intelligent caching
            urlPattern: /^https:\/\/whgjiirmcbsiqhjzgldy\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 12 // 12 hours for fresher content
              },
              cacheableResponse: {
                statuses: [0, 200, 404], // Cache 404s to prevent repeated failed requests
                headers: {
                  'Cache-Control': 'public, max-age=43200, must-revalidate'
                }
              },
              // Network timeout for faster fallback to cache
              networkTimeoutSeconds: 3
            }
          },
          {
            // External CDN resources
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // HTML pages - StaleWhileRevalidate for fresh content
            urlPattern: /\.(?:html|htm)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'html-pages',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days for HTML
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        // Skip waiting for immediate updates
        skipWaiting: true,
        clientsClaim: true
      },
      manifest: {
        name: 'The Sports Chronicle',
        short_name: 'SportsChronicle',
        description: 'Your ultimate sports news and updates',
        theme_color: '#1e293b',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
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
      dedupe: ['react', 'react-dom']
    },
    base: '/',
    optimizeDeps: {
      include: ['react', 'react-dom']
    },
    server: {
      host: '::',
      port: 0,
      strictPort: false,
      open: true,
      headers: {
        // Advanced Chrome Performance Insights: Use efficient cache lifetimes (30 days minimum)
        'Cache-Control': 'public, max-age=31536000, immutable',
        // Enable compression for better performance
        'Content-Encoding': 'gzip, br',
        // HTTP/2 Server Push hints and preconnect hints combined
        'Link': [
          '</assets/main.js>; rel=preload; as=script', 
          '</assets/main.css>; rel=preload; as=style',
          '<https://whgjiirmcbsiqhjzgldy.supabase.co>; rel=preconnect',
          '<https://fonts.googleapis.com>; rel=preconnect', 
          '<https://fonts.gstatic.com>; rel=preconnect'
        ].join(', '),
        // Security headers
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block'
      },
      proxy: {
        // Proxy API requests to avoid CORS issues
        '/api': {
          target: 'https://whgjiirmcbsiqhjzgldy.supabase.co',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          // Don't cache API responses
          headers: {
            'Cache-Control': 'no-cache, must-revalidate',
            'Vary': 'Accept-Encoding'
          }
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
            ui: ['@radix-ui/react-avatar', '@radix-ui/react-dropdown-menu', '@radix-ui/react-dialog', '@radix-ui/react-label', '@radix-ui/react-scroll-area', '@radix-ui/react-select', '@radix-ui/react-separator', '@radix-ui/react-slot', '@radix-ui/react-tabs', '@radix-ui/react-tooltip'],
            vendor: ['lodash', 'axios', 'clsx', 'tailwind-merge'],
            carousel: ['embla-carousel-react', 'embla-carousel-autoplay'],
            icons: ['lucide-react'],
            supabase: ['@supabase/supabase-js', '@supabase/auth-ui-react', '@supabase/auth-ui-shared']
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
