import { useState, useEffect } from 'react';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

interface CacheMetrics {
  totalRequests: number;
  cachedRequests: number;
  cacheHitRate: number;
  totalSize: number;
  cachedSize: number;
  bandwidthSaved: number;
}

export const CachePerformanceMonitor = () => {
  const [cacheMetrics, setCacheMetrics] = useState<CacheMetrics>({
    totalRequests: 0,
    cachedRequests: 0,
    cacheHitRate: 0,
    totalSize: 0,
    cachedSize: 0,
    bandwidthSaved: 0,
  });
  
  const performanceMetrics = usePerformanceMonitoring();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const monitorCachePerformance = () => {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      let totalRequests = 0;
      let cachedRequests = 0;
      let totalSize = 0;
      let cachedSize = 0;

      entries.forEach((entry) => {
        totalRequests++;
        
        // Check if resource was served from cache
        const transferSize = entry.transferSize || 0;
        const encodedBodySize = entry.encodedBodySize || 0;
        
        totalSize += encodedBodySize;
        
        // If transferSize is much smaller than encodedBodySize, it was likely cached
        if (transferSize < encodedBodySize * 0.1) {
          cachedRequests++;
          cachedSize += encodedBodySize - transferSize;
        }
      });

      const cacheHitRate = totalRequests > 0 ? (cachedRequests / totalRequests) * 100 : 0;
      const bandwidthSaved = totalSize > 0 ? (cachedSize / totalSize) * 100 : 0;

      setCacheMetrics({
        totalRequests,
        cachedRequests,
        cacheHitRate,
        totalSize,
        cachedSize,
        bandwidthSaved,
      });
    };

    // Monitor cache performance after page load
    if (document.readyState === 'complete') {
      monitorCachePerformance();
    } else {
      window.addEventListener('load', monitorCachePerformance);
      return () => window.removeEventListener('load', monitorCachePerformance);
    }
  }, []);

  // Format bytes to human readable format
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-slate-900 text-white p-4 rounded-lg shadow-lg text-xs max-w-xs z-50">
      <h3 className="font-bold mb-2">Cache Performance</h3>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Cache Hit Rate:</span>
          <span className={cacheMetrics.cacheHitRate > 70 ? 'text-green-400' : 'text-yellow-400'}>
            {cacheMetrics.cacheHitRate.toFixed(1)}%
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Bandwidth Saved:</span>
          <span className={cacheMetrics.bandwidthSaved > 50 ? 'text-green-400' : 'text-yellow-400'}>
            {cacheMetrics.bandwidthSaved.toFixed(1)}%
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Total Requests:</span>
          <span>{cacheMetrics.totalRequests}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Cached Requests:</span>
          <span>{cacheMetrics.cachedRequests}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Total Size:</span>
          <span>{formatBytes(cacheMetrics.totalSize)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Saved Bandwidth:</span>
          <span className="text-green-400">{formatBytes(cacheMetrics.cachedSize)}</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-slate-700">
        <h4 className="font-bold mb-1">Core Web Vitals</h4>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>FCP:</span>
            <span>{performanceMetrics.fcp ? `${performanceMetrics.fcp.toFixed(0)}ms` : 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>LCP:</span>
            <span>{performanceMetrics.lcp ? `${performanceMetrics.lcp.toFixed(0)}ms` : 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>CLS:</span>
            <span>{performanceMetrics.cls ? performanceMetrics.cls.toFixed(3) : 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>TTFB:</span>
            <span>{performanceMetrics.ttfb ? `${performanceMetrics.ttfb.toFixed(0)}ms` : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
