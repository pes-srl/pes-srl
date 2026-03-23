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
  const { data: users } = await supabaseAdmin.auth.admin.listUsers();
  const authUser = users.users.find(u => u.email === 'c.dellorto@pes-srl.it');
  
  if (!authUser) return console.log("User not found in Auth");
  
  console.log("Auth User ID:", authUser.id);
  
  const { data: profile, error } = await supabaseAdmin.from('profiles').select('*').eq('id', authUser.id);
  
  console.log("Profiles in DB for this user:", profile);
}
run();
