import React, { useEffect, useMemo, useState } from "react";
import { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation, supportedLanguages, LanguageCode } from "@/contexts/TranslationContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TranslationsEditorProps {
  posts: Tables<'blog_posts'>[];
  onRefresh?: () => Promise<void> | void;
}

const TranslationsEditor: React.FC<TranslationsEditorProps> = ({ posts, onRefresh }) => {
  const { t } = useTranslation();
  const [selectedPostId, setSelectedPostId] = useState<string>(posts[0]?.id || "");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("hi");

  const selectedPost = useMemo(() => posts.find(p => p.id === selectedPostId), [posts, selectedPostId]);

  const existingTranslations: any = useMemo(() => {
    const base = selectedPost?.translations || {};
    return {
      title: base.title || {},
      content: base.content || {},
      excerpt: base.excerpt || {},
      category: base.category || {},
    };
  }, [selectedPost]);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    // Initialize form with existing language translation if present
    setTitle(existingTranslations.title?.[selectedLanguage] || "");
    setContent(existingTranslations.content?.[selectedLanguage] || "");
    setExcerpt(existingTranslations.excerpt?.[selectedLanguage] || "");
    setCategory(existingTranslations.category?.[selectedLanguage] || "");
  }, [existingTranslations, selectedLanguage]);

  const handleSave = async () => {
    if (!selectedPost) return;
    setSaving(true);
    try {
      const mergedTranslations = {
        title: { ...existingTranslations.title, [selectedLanguage]: title },
        content: { ...existingTranslations.content, [selectedLanguage]: content },
        excerpt: { ...existingTranslations.excerpt, [selectedLanguage]: excerpt },
        category: { ...existingTranslations.category, [selectedLanguage]: category },
      };

      const { error } = await supabase
        .from('blog_posts')
        .update({ translations: mergedTranslations })
        .eq('id', selectedPost.id);

      if (error) throw error;

      toast.success(t("admin.translationSaved") || "Translation saved", {
        description: t("admin.translationSavedSuccess") || "Your translation was saved successfully.",
      });

      if (onRefresh) await onRefresh();
    } catch (err) {
      console.error('Error saving translation:', err);
      toast.error(t("admin.errorSavingTranslation") || "Error saving translation", {
        description: t("admin.failedToSaveTranslation") || "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin.translationsTitle") || "Post Translations"}</CardTitle>
        <CardDescription>
          {t("admin.translationsDescription") || "Edit per-language title, excerpt, content and category for a post."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>{t("admin.selectPost") || "Select Post"}</Label>
            <select
              className="mt-2 w-full border rounded-md px-3 py-2 bg-background"
              value={selectedPostId}
              onChange={(e) => setSelectedPostId(e.target.value)}
            >
              {posts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>{t("admin.selectLanguage") || "Select Language"}</Label>
            <select
              className="mt-2 w-full border rounded-md px-3 py-2 bg-background"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as LanguageCode)}
            >
              {Object.keys(supportedLanguages).map((code) => (
                <option key={code} value={code}>
                  {supportedLanguages[code as LanguageCode].nativeName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>{t("admin.fieldTitle") || "Title"}</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2" />
          </div>
          <div>
            <Label>{t("admin.fieldExcerpt") || "Excerpt"}</Label>
            <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="mt-2" rows={3} />
          </div>
          <div>
            <Label>{t("admin.fieldContent") || "Content"}</Label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="mt-2" rows={10} />
          </div>
          <div>
            <Label>{t("admin.fieldCategory") || "Category"}</Label>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2" />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="default" onClick={handleSave} disabled={saving || !selectedPostId} className="btn-hover-lift">
            {saving ? t("admin.saving") || "Saving..." : t("admin.saveTranslation") || "Save Translation"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationsEditor;