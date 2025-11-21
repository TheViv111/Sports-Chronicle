import React from 'react';
import { Loader2 } from 'lucide-react';
const logoSrc = '/android-chrome-192x192.png';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <img
        src={logoSrc}
        alt="The Sports Chronicle Logo"
        className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-4 border-primary/20 mb-6 animate-pulse"
        width={96}
        height={96}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className="flex items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-3 text-lg font-medium text-muted-foreground">{message}</span>
      </div>
    </div>
  );
};

export default LoadingScreen;