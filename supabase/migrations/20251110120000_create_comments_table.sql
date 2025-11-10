-- Create comments table with RLS allowing public read and authenticated inserts
-- Comments are permanent: no update/delete policies are defined

BEGIN;

-- Enable required extension for UUID generation (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create table (id as UUID, post_id references blog_posts.id which is text)
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id TEXT NOT NULL REFERENCES public.blog_posts (id) ON DELETE CASCADE,
  user_id UUID NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Helpful index for lookups by post
CREATE INDEX IF NOT EXISTS comments_post_id_idx ON public.comments (post_id);

-- Trigger to maintain updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_comments_updated_at ON public.comments;
CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON public.comments
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Row Level Security
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Public can read all comments
DROP POLICY IF EXISTS "Enable read access for all users" ON public.comments;
CREATE POLICY "Enable read access for all users" ON public.comments
FOR SELECT USING (true);

-- Only authenticated users can insert comments; enforce user_id matches auth.uid()
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.comments;
CREATE POLICY "Enable insert for authenticated users only" ON public.comments
FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND user_id = auth.uid());

-- Do NOT allow update/delete (comments are permanent)

-- Ensure Realtime publication includes comments table for live updates, if publication exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.comments';
  END IF;
END $$;

COMMIT;