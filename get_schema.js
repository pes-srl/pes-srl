const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    const { data, error } = await supabase.rpc('get_schema_info'); // if exists
    // better way: query information_schema
    const { data: cols, error: err } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
    
    console.log("Cols:", cols ? Object.keys(cols[0]) : null, err);
}

main();
