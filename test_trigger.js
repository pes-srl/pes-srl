// test_trigger.js
const { createClient } = require('@supabase/supabase-js');
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sokjqukircfdyvomiunr.supabase.co';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNva2pxdWtpcmNmZHl2b21pdW5yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTQ2NDM3OCwiZXhwIjoyMDU1MDQwMzc4fQ.Sg8_d7bJ8eOQxP0h6mYkqE2D_7HwFqK1V_8r4_GZQ94';

const supabaseAdmin = createClient(url, key);

async function run() {
    console.log("Testing insert into profiles to see if 'Free' is a valid role...");
    
    // We already have criss.dellorto@gmail.it in auth.users but not in profiles. Let's try to insert them directly.
    const { data: users, error: usersErr } = await supabaseAdmin.auth.admin.listUsers();
    if (usersErr) {
        console.error("Error fetching users:", usersErr);
        return;
    }
    
    const criss = users.users.find(u => u.email === 'criss.dellorto@gmail.it');
    if (!criss) {
        console.error("Could not find criss.dellorto in Auth!");
        return;
    }

    console.log("Found Criss ID:", criss.id);
    
    console.log("Attempting manual insert into profiles with role: 'Free'...");
    const { data: insertProfile1, error: err1 } = await supabaseAdmin
        .from('profiles')
        .insert({
            id: criss.id,
            email: criss.email,
            role: 'Free',
            plan_type: 'free_trial',
            salon_name: criss.user_metadata?.salon_name
        })
        .select();
        
    if (err1) {
        console.error("Insert failed:", err1);
    } else {
        console.log("Insert succeeded!", insertProfile1);
    }
}

run();
