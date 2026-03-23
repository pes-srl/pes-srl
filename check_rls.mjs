import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

function loadEnv() {
  try {
    const envFile = fs.readFileSync('.env', 'utf8');
    envFile.split('\n').forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key, ...values] = line.split('=');
        if (key && values.length > 0) process.env[key.trim()] = values.join('=').trim();
      }
    });
  } catch (err) {}
}
loadEnv();

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
  const { data, error } = await supabaseAdmin.rpc('get_policies', {});
  console.log("RPC Error?", error);
  
  // Alternative: raw query string through supabase-js is not supported, 
  // but we can query 'pg_policies' if it's exposed or just check if it's an RLS issue.
  // Actually, we can just login as them if we know their auth.uid or impersonate them?
  // Let's create an insecure edge function or view? No.
  
  // Let's check if there's any policy enabled:
  const { data: qData, error: qError } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .limit(1);
  console.log("Admin can read profiles?", qData ? "Yes" : "No", qError);
  
  // Can an anon client read it?
  const anonClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const { data: anonData, error: anonError } = await anonClient.from('profiles').select('*').limit(1);
  console.log("Anon can read profiles?", anonData, anonError);
}
run();
