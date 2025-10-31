import { Tables } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { transformBlogPostForDisplay, BlogPostWithDisplay } from "@/lib/blog-utils";
import { useTranslation } from "@/contexts/TranslationContext";

interface BlogCardProps {
  post: Tables<'blog_posts'> | BlogPostWithDisplay;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { currentLanguage } = useTranslation();

  const displayPost = (post as any).date ? (post as BlogPostWithDisplay) : transformBlogPostForDisplay(post as Tables<'blog_posts'>, currentLanguage);

  const badgeVariant = (displayPost.category || "").toLowerCase() as any;
  const badgeLabel = displayPost.displayCategory || displayPost.category;
  const imageSrc = displayPost.cover_image || (displayPost as any).image || "/placeholder.svg";

  return (
    <Link to={`/blog/${displayPost.slug}`}>
      <Card className="overflow-hidden transition-colors hover:bg-muted/50">
        <div className="aspect-[16/9] mb-4 overflow-hidden">
          <img
            src={imageSrc}
            alt={displayPost.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2">{displayPost.title}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{displayPost.date}</span>
            <span>•</span>
            <span>{displayPost.readTime}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3">{displayPost.excerpt}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Badge variant={badgeVariant}>{badgeLabel}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}