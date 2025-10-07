CREATE POLICY "profiles_public_read_policy" ON public.profiles 
FOR SELECT USING (true);