-- Add a JSONB column to store per-language translations directly on blog_posts
-- The column stores an object like:
-- {
--   "title": { "es": "Título", "fr": "Titre" },
--   "content": { "es": "...", "fr": "..." },
--   "excerpt": { "es": "...", "fr": "..." },
--   "category": { "es": "Fútbol", "fr": "Football" }
-- }

ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS translations JSONB NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.blog_posts.translations IS 'Per-language translations for title, content, excerpt, and category.';