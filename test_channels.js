const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log("--- TEST RADIO_CHANNELS ---");
  console.log("1. Testing with Service Role Key (Bypasses RLS):");
  const { data: adminData, error: adminError } = await supabaseAdmin.from('radio_channels').select('id, name');
  if (adminError) {
    console.error("Admin error:", adminError);
  } else {
    console.log(`-> Found ${adminData.length} channels as Admin.`);
    if (adminData.length > 0) {
        console.log("Sample:", adminData.slice(0, 2));
    }
  }

  console.log("\n2. Testing with Anon Key (Subject to RLS, No User Logged in):");
  const { data: anonData, error: anonError } = await supabaseAnon.from('radio_channels').select('id, name');
  if (anonError) {
    console.error("Anon error:", anonError);
  } else {
    console.log(`-> Found ${anonData.length} channels as Anon.`);
  }
}

test();
