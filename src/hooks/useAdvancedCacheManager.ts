import { useState, useEffect, useCallback } from 'react';

interface CacheEntry {
  url: string;
  timestamp: number;
  size: number;
  type: string;
  status: 'cached' | 'network' | 'error';
}

interface CacheStats {
  totalEntries: number;
  totalSize: number;
  hitRate: number;
  bandwidthSaved: number;
  averageLoadTime: number;
}

export const useAdvancedCacheManager = () => {
  const [cacheStats, setCacheStats] = useState<CacheStats>({
    totalEntries: 0,
    totalSize: 0,
    hitRate: 0,
    bandwidthSaved: 0,
    averageLoadTime: 0,
  });
  
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);
  const [isPreloading, setIsPreloading] = useState(false);

  // Intelligent preloading for critical resources
  const preloadCriticalResources = useCallback(async () => {
    if (isPreloading) return;
    setIsPreloading(true);

    const criticalResources = [
      '/src/assets/logo.png',
      '/src/components/blog/BlogCard.tsx',
      '/src/pages/Home.tsx',
    ];

    const preloadPromises = criticalResources.map(async (resource) => {
      try {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        
        // Set appropriate as attribute based on file type
        if (resource.includes('.png') || resource.includes('.jpg') || resource.includes('.webp')) {
          link.as = 'image';
        } else if (resource.includes('.css')) {
          link.as = 'style';
        } else if (resource.includes('.js') || resource.includes('.tsx')) {
          link.as = 'script';
        }
        
        document.head.appendChild(link);
        
        // Remove after a short delay to prevent memory leaks
        setTimeout(() => {
          if (link.parentNode) {
            link.parentNode.removeChild(link);
          }
        }, 1000);
        
        return { success: true, resource };
      } catch (error) {
        console.warn(`Failed to preload ${resource}:`, error);
        return { success: false, resource, error };
      }
    });

    const results = await Promise.allSettled(preloadPromises);
    setIsPreloading(false);
    
    const successful = results.filter(r => r.status === 'fulfilled').length;
    console.log(`Preloaded ${successful}/${criticalResources.length} critical resources`);
    
    return results;
  }, [isPreloading]);

  // Cache warming for predictable user behavior
  const warmCache = useCallback(async () => {
    const predictableResources = [
      // Blog-related resources
      '/api/blog/posts',
      '/api/blog/categories',
      // Common images
      '/src/assets/basketball-1.jpg',
      '/src/assets/soccer-1.jpg',
      '/src/assets/swimming-1.jpg',
    ];

    const warmPromises = predictableResources.map(async (resource) => {
      try {
        const response = await fetch(resource, { 
          method: 'GET',
          cache: 'force-cache',
          headers: {
            'Cache-Control': 'public, max-age=31536000',
          }
        });
        
        if (response.ok) {
          const size = parseInt(response.headers.get('content-length') || '0');
          return { success: true, resource, size };
        }
        
        return { success: false, resource, status: response.status };
      } catch (error) {
        return { success: false, resource, error };
      }
    });

    return await Promise.allSettled(warmPromises);
  }, []);

  // Analyze cache performance
  const analyzeCachePerformance = useCallback(() => {
    const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    let totalRequests = 0;
    let cachedRequests = 0;
    let totalSize = 0;
    let cachedSize = 0;
    let totalLoadTime = 0;
    
    const cacheEntries: CacheEntry[] = [];

    entries.forEach((entry) => {
      totalRequests++;
      totalLoadTime += entry.responseEnd - entry.requestStart;
      
      const transferSize = entry.transferSize || 0;
      const encodedBodySize = entry.encodedBodySize || 0;
      const isCached = transferSize < encodedBodySize * 0.1;
      
      totalSize += encodedBodySize;
      
      if (isCached) {
        cachedRequests++;
        cachedSize += encodedBodySize - transferSize;
      }
      
      cacheEntries.push({
        url: entry.name,
        timestamp: entry.startTime,
        size: encodedBodySize,
        type: entry.initiatorType,
        status: isCached ? 'cached' : 'network',
      });
    });

    const hitRate = totalRequests > 0 ? (cachedRequests / totalRequests) * 100 : 0;
    const bandwidthSaved = totalSize > 0 ? (cachedSize / totalSize) * 100 : 0;
    const averageLoadTime = totalRequests > 0 ? totalLoadTime / totalRequests : 0;

    setCacheStats({
      totalEntries: totalRequests,
      totalSize,
      hitRate,
      bandwidthSaved,
      averageLoadTime,
    });
    
    setCacheEntries(cacheEntries.sort((a, b) => b.timestamp - a.timestamp).slice(0, 50));
  }, []);

  // Clear cache for specific resource types
  const clearCacheByType = useCallback(async (type: string) => {
    try {
      const cacheNames = await caches.keys();
      const targetCaches = cacheNames.filter(name => name.includes(type));
      
      await Promise.all(targetCaches.map(cacheName => caches.delete(cacheName)));
      
      // Re-analyze after clearing
      setTimeout(analyzeCachePerformance, 100);
      
      return { success: true, cleared: targetCaches.length };
    } catch (error) {
      console.error(`Failed to clear ${type} cache:`, error);
      return { success: false, error };
    }
  }, [analyzeCachePerformance]);

  // Optimize cache by removing old entries
  const optimizeCache = useCallback(async () => {
    try {
      const cacheNames = await caches.keys();
      let totalOptimized = 0;
      
      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        // Remove entries older than 30 days
        const cutoffTime = Date.now() - (30 * 24 * 60 * 60 * 1000);
        const oldRequests = requests.filter(async (request) => {
          const response = await cache.match(request);
          if (response) {
            const dateHeader = response.headers.get('date');
            if (dateHeader) {
              const responseTime = new Date(dateHeader).getTime();
              return responseTime < cutoffTime;
            }
          }
          return false;
        });
        
        await Promise.all(oldRequests.map(request => cache.delete(request)));
        totalOptimized += oldRequests.length;
      }
      
      console.log(`Optimized cache: removed ${totalOptimized} old entries`);
      return { success: true, optimized: totalOptimized };
    } catch (error) {
      console.error('Cache optimization failed:', error);
      return { success: false, error };
    }
  }, []);

  // Initialize cache management
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Analyze initial cache state
    analyzeCachePerformance();
    
    // Set up periodic cache analysis
    const analysisInterval = setInterval(analyzeCachePerformance, 30000); // Every 30 seconds
    
    // Preload critical resources after initial load
    const preloadTimer = setTimeout(() => {
      preloadCriticalResources();
    }, 2000);
    
    // Warm cache after user interaction
    const warmCacheTimer = setTimeout(() => {
      warmCache();
    }, 5000);

    return () => {
      clearInterval(analysisInterval);
      clearTimeout(preloadTimer);
      clearTimeout(warmCacheTimer);
    };
  }, [analyzeCachePerformance, preloadCriticalResources, warmCache]);

  return {
    cacheStats,
    cacheEntries,
    isPreloading,
    preloadCriticalResources,
    warmCache,
    analyzeCachePerformance,
    clearCacheByType,
    optimizeCache,
  };
};
