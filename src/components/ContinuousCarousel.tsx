import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import BlogCard from '@/components/BlogCard';
import { Tables } from '@/integrations/supabase/types';
import { cn } from '@/lib/utils';

type BlogPostType = Tables<'blog_posts'> & {
  date: string;
  readTime: string;
  image: string;
};

interface ContinuousCarouselProps {
  posts: BlogPostType[];
  className?: string;
}

const ContinuousCarousel: React.FC<ContinuousCarouselProps> = ({ posts, className }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: true, // Allows for continuous dragging
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  if (!posts || posts.length === 0) {
    return null; // Or a placeholder if no posts
  }

  // Duplicate posts to create a more seamless continuous effect, especially for fewer posts
  const carouselPosts = [...posts, ...posts, ...posts];

  return (
    <div className={cn("embla overflow-hidden", className)}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex">
          {carouselPosts.map((post, index) => (
            <div
              className="embla__slide flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-4" // Responsive widths
              key={`${post.id}-${index}`} // Unique key for duplicated items
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinuousCarousel;