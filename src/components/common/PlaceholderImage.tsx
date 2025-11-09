import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  category?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function PlaceholderImage({ 
  category = 'general',
  className = '',
  width = 400,
  height = 225
}: PlaceholderImageProps) {
  // Map categories to different placeholder colors
  const categoryColors: Record<string, string> = {
    basketball: 'bg-orange-500/20',
    soccer: 'bg-green-500/20',
    swimming: 'bg-blue-500/20',
    tennis: 'bg-yellow-500/20',
    baseball: 'bg-red-500/20',
    athletics: 'bg-purple-500/20',
    football: 'bg-indigo-500/20',
    default: 'bg-gray-200/80 dark:bg-gray-800/80'
  };

  const bgColor = categoryColors[category.toLowerCase()] || categoryColors.default;
  
  return (
    <div 
      className={cn(
        'flex items-center justify-center rounded-md overflow-hidden',
        bgColor,
        className
      )}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <span className="text-4xl font-bold text-gray-400 dark:text-gray-600">
        {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
      </span>
    </div>
  );
}
