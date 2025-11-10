import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "@/contexts/TranslationContext";
import { Link } from "react-router-dom";

interface CommentsListProps {
  postId: string;
}

type CommentRow = {
  id: string;
  post_id: string;
  user_id: string | null;
  author_name: string;
  content: string;
  created_at: string;
};

type ProfileRow = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
};

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
  const { t } = useTranslation();

  const { data: comments, isLoading } = useQuery<CommentRow[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("id, post_id, user_id, author_name, content, created_at")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 2,
  });

  const userIds = React.useMemo(() => {
    const ids = (comments || [])
      .map((c) => c.user_id)
      .filter((id): id is string => !!id);
    return Array.from(new Set(ids));
  }, [comments]);

  const { data: profiles } = useQuery<ProfileRow[]>({
    queryKey: ["profilesForComments", postId, userIds.join(",")],
    queryFn: async () => {
      if (userIds.length === 0) return [];
      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .in("id", userIds);
      if (error) throw error;
      return data || [];
    },
    enabled: userIds.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  const profileMap = React.useMemo(() => {
    const map = new Map<string, ProfileRow>();
    (profiles || []).forEach((p) => map.set(p.id, p));
    return map;
  }, [profiles]);

  if (isLoading) {
    return <p className="text-muted-foreground">{t("common.loading") || "Loading..."}</p>;
  }

  if (!comments || comments.length === 0) {
    return <p className="text-muted-foreground">{t("comments.noComments") || "No comments yet."}</p>;
  }

  return (
    <ul className="space-y-6">
      {comments.map((comment) => {
        const profile = comment.user_id ? profileMap.get(comment.user_id) || null : null;
        const displayName = profile?.display_name || comment.author_name;
        const avatarUrl = profile?.avatar_url || undefined;
        const profileLink = comment.user_id ? `/users/${comment.user_id}` : undefined;

        return (
          <li key={comment.id} className="flex gap-4">
            {profileLink ? (
              <Link to={profileLink} className="btn-hover-lift">
                <Avatar>
                  <AvatarImage src={avatarUrl} alt={displayName || "User"} />
                  <AvatarFallback>{displayName ? displayName.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Avatar>
                <AvatarImage src={avatarUrl} alt={displayName || "User"} />
                <AvatarFallback>{displayName ? displayName.charAt(0).toUpperCase() : "U"}</AvatarFallback>
              </Avatar>
            )}

            <div className="flex-1">
              <div className="flex items-center gap-2">
                {profileLink ? (
                  <Link to={profileLink} className="font-medium hover:underline">
                    {displayName}
                  </Link>
                ) : (
                  <span className="font-medium">{displayName}</span>
                )}
                <span className="text-xs text-muted-foreground">
                  {new Date(comment.created_at).toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed">{comment.content}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentsList;