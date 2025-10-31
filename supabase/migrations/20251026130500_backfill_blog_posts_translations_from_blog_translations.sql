-- Backfill blog_posts.translations JSONB from blog_translations rows
-- Structure produced:
-- {
--   "title":    { "<lang>": "..." },
--   "content":  { "<lang>": "..." },
--   "excerpt":  { "<lang>": "..." },
--   "category": { "<lang>": "..." }
-- }

BEGIN;

-- Ensure the translations column exists (safe-guard if running standalone)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'blog_posts'
      AND column_name = 'translations'
  ) THEN
    EXECUTE 'ALTER TABLE public.blog_posts ADD COLUMN translations JSONB DEFAULT ''{}''::jsonb';
  END IF;
END $$;

-- Backfill from blog_translations
UPDATE public.blog_posts p
SET translations = COALESCE(p.translations, '{}'::jsonb) || COALESCE(
  (
    SELECT jsonb_build_object(
      'title',    COALESCE(jsonb_object_agg(bt.language, bt.title),    '{}'::jsonb),
      'content',  COALESCE(jsonb_object_agg(bt.language, bt.content),  '{}'::jsonb),
      'excerpt',  COALESCE(jsonb_object_agg(bt.language, bt.excerpt),  '{}'::jsonb),
      'category', COALESCE(jsonb_object_agg(bt.language, bt.category), '{}'::jsonb)
    )
    FROM public.blog_translations bt
    WHERE bt.post_id = p.id
  ), '{}'::jsonb)
WHERE EXISTS (
  SELECT 1 FROM public.blog_translations bt WHERE bt.post_id = p.id
);

COMMIT;