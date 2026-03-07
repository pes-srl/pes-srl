const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const envContent = fs.readFileSync('.env.local', 'utf-8');
const matchUrl = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const matchKey = envContent.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/);

const supabaseUrl = matchUrl[1].trim();
const supabaseKey = matchKey[1].trim();

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    console.log("Fetching channels with Service Role Key...");
    const { data, error } = await supabase.from('radio_channels').select('name, stream_url_hls, stream_url_mp3');
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("CHANNELS:", JSON.stringify(data, null, 2));
    }
}

run();
