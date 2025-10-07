import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/BlogCard";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/integrations/supabase/types";
import LoadingScreen from "@/components/LoadingScreen";
import CommentsSection from "@/components/CommentsSection";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "@/contexts/TranslationContext"; // Import useTranslation

type BlogPostType = Tables<'blog_posts'>;

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation(); // Use useTranslation hook
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  // Fetch main blog post
  const { data: post, isLoading: isPostLoading, error: postError } = useQuery<BlogPostType | null, Error>({
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // Define related posts query options conditionally
  const relatedPostsQueryOptions = post ? {
    queryKey: ['relatedPosts', post.category, post.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', post.category)
        .neq('id', post.id)
        .limit(3);
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  } : undefined;

  // Fetch related posts
  const { data: relatedPosts, isLoading: isRelatedPostsLoading, error: relatedPostsError } = useQuery<BlogPostType[], Error>({
    ...relatedPostsQueryOptions,
    enabled: !!post && !!relatedPostsQueryOptions,
  });

  if (isPostLoading) {
    return <LoadingScreen message={t("latestPosts.loading")} />;
  }

  if (postError) {
    console.error('Error loading post:', postError);
    return <Navigate to="/blog" replace />;
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/blog">
          <Button variant="ghost" className="group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t("blog.backToBlog")}
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Category Badge */}
          <Badge variant="outline" className="uppercase text-xs mb-6">
            {post.category}
          </Badge>

          {/* Hero Image */}
          <div className="aspect-[21/9] mb-8 overflow-hidden rounded-lg">
            <img
              src={post.cover_image || "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg"} // Fallback image
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              {formatDate(post.created_at)}
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <Clock className="mr-2 h-4 w-4" />
              {post.read_time || "5 min read"}
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <User className="mr-2 h-4 w-4" />
              {post.author}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{post.content || ''}</ReactMarkdown>
          </div>

          {/* Comments Section */}
          <CommentsSection postId={post.id} />
        </div>
      </article>

      {/* Related Posts */}
      {isRelatedPostsLoading ? (
        <div className="py-16 bg-secondary/20 text-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground mt-2">{t("blog.loadingRelatedPosts")}</p>
        </div>
      ) : relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl font-bold mb-8 text-center">
              {t("blog.relatedArticles")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <BlogCard 
                  key={relatedPost.id} 
                  post={{
                    ...relatedPost,
                    date: formatDate(relatedPost.created_at),
                    readTime: relatedPost.read_time || "5 min read",
                    image: relatedPost.cover_image || "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg"
                  }} 
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;