import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import { useTranslation } from "@/contexts/TranslationContext";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  created_at: string;
  read_time: string;
  cover_image: string;
  slug: string;
  author: string;
}

const Home = () => {
  const [translateX, setTranslateX] = useState(0);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { t } = useTranslation();

  // Load posts from Supabase
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  // Continuous carousel movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((prev) => prev - 1);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Create multiple copies for seamless infinite scroll
  const extendedPosts = posts.length > 0 ? Array(10).fill(posts).flat() : [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground uppercase text-sm tracking-wide mb-4 reveal-on-scroll">
            {t("hero.welcome")}
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight reveal-on-scroll">
            {t("hero.title")}
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto reveal-on-scroll">
            {t("hero.subtitle")}
          </p>
          <div className="reveal-on-scroll">
            <Link to="/blog">
              <Button size="lg" className="group btn-hover-lift">
                {t("hero.readLatest")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Carousel Section */}
      {posts.length > 0 && (
        <section className="py-16 overflow-hidden reveal-on-scroll">
        <div className="relative">
          <div 
            className="flex gap-6"
            style={{
              transform: `translateX(${translateX}px)`,
              width: `${extendedPosts.length * 424}px`
            }}
          >
            {extendedPosts.map((blogPost, index) => (
              <div key={`${blogPost.id}-${Math.floor(index / posts.length)}-${index}`} className="flex-shrink-0 w-[400px]">
                <BlogCard 
                  post={{
                    ...blogPost,
                    date: new Date(blogPost.created_at).toLocaleDateString("en-US", { 
                      year: "numeric", 
                      month: "short", 
                      day: "numeric" 
                    }),
                    readTime: blogPost.read_time || "5 min read",
                    image: blogPost.cover_image || "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg"
                  }} 
                />
              </div>
            ))}
          </div>
        </div>
        </section>
      )}

    </div>
  );
};

export default Home;