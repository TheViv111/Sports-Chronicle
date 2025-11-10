import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/contexts/TranslationContext";
import { useSession } from "@/components/auth/SessionContextProvider";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Tables, TablesInsert } from "@/integrations/supabase/types";

interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const { t } = useTranslation();
  const { session } = useSession();
  const queryClient = useQueryClient();
  const [content, setContent] = React.useState("");

  // Fetch current user's profile for display_name
  const userId = session?.user?.id || null;
  const { data: profile } = useQuery<Tables<'profiles'> | null>({
    queryKey: ["profile", userId],
    queryFn: async (): Promise<Tables<'profiles'> | null> => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  const insertMutation = useMutation({
    mutationFn: async () => {
      if (!session?.user) {
        throw new Error("Not authenticated");
      }
      const authorName = profile?.display_name || session.user.email?.split("@")[0] || t("comments.anonymousUser") || "Anonymous";
      const newComment: TablesInsert<'comments'> = {
        post_id: postId,
        content,
        author_name: authorName,
        user_id: session.user.id,
      };
      const { error } = await supabase
        .from("comments")
        .insert(newComment as any);
      if (error) throw error;
    },
    onSuccess: () => {
      setContent("");
      toast.success(t("common.success") || "Success");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (err: any) => {
      console.error("Failed to post comment", err);
      toast.error(t("common.error") || "Error");
    },
  });

  if (!session?.user) {
    return (
      <div className="rounded-lg border p-4">
        <p className="text-muted-foreground mb-3">{t("comments.signInRequired")}</p>
        <Button onClick={() => (window.location.href = "/signin")}>
          {t("auth.signIn") || "Sign In"}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!content.trim()) {
          toast.error(t("comments.writeComment") || "Write a comment...");
          return;
        }
        insertMutation.mutate();
      }}
      className="space-y-3"
    >
      <Textarea
        placeholder={t("comments.writeComment") || "Write a comment..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px]"
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={insertMutation.isPending} className="btn-hover-lift">
          {t("comments.postComment") || "Post Comment"}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;