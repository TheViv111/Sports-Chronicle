-- Create a storage bucket for blog assets (cover images, inline uploads)
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-assets', 'blog-assets', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies for blog-assets if they exist
DROP POLICY IF EXISTS "Allow authenticated users to upload blog assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update their own blog assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete their own blog assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to blog assets" ON storage.objects;

-- Allow authenticated users to upload to blog-assets bucket and own their files
CREATE POLICY "Allow authenticated users to upload blog assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog-assets' AND auth.uid() = owner);

-- Allow owners to update their files in blog-assets
CREATE POLICY "Allow authenticated users to update their own blog assets"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'blog-assets' AND auth.uid() = owner);

-- Allow owners to delete their files in blog-assets
CREATE POLICY "Allow authenticated users to delete their own blog assets"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'blog-assets' AND auth.uid() = owner);

-- Allow public read access to blog-assets
CREATE POLICY "Allow public read access to blog assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-assets');