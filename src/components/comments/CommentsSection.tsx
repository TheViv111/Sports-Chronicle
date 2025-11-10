import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/contexts/TranslationContext";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

interface CommentsSectionProps {
  postId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const { t } = useTranslation();
  return (
    <section className="py-12 bg-secondary/10">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl">
              {t("comments.title") || "Comments"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <CommentsList postId={postId} />
            <CommentForm postId={postId} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CommentsSection;