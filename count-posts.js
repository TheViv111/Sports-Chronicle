const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase URL or Anon Key in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function countPosts() {
  try {
    const { count, error } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    
    console.log(`You have ${count} blog post(s) in your database.`);
    return count;
  } catch (error) {
    console.error('Error counting posts:', error.message);
    return null;
  }
}

countPosts();
