const { createClient } = require('@supabase/supabase-js');
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sokjqukircfdyvomiunr.supabase.co';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_7wQW5EiBEWP60KNd8G6Rbw_fgav6Pzh';

const supabase = createClient(url, key);

async function test() {
  const { data, error } = await supabase.from('subscriptions').select('*').limit(1);
  console.log("Subscriptions Test:", error || "Exists! Rows: " + data.length);
}
test();
