import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sokjqukircfdyvomiunr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNva2pxdWtpcmNmZHl2b21pdW5yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTQ2NDM3OCwiZXhwIjoyMDU1MDQwMzc4fQ.Sg8_d7bJ8eOQxP0h6mYkqE2D_7HwFqK1V_8r4_GZQ94';

// Actually, wait, the key in check_user.mjs was:
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1ZmFobHpqeGJpbXlpd2l2b2lxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTg4NTQyMSwiZXhwIjoyMDg3NDYxNDIxfQ.N1gOS_NQOXUvpfsafu2KQsciZhId1DpcFXpxYvkKOOY';
// But the URL is 'https://sokjqukircfdyvomiunr.supabase.co'. Wait, the ref in the key says "eufahlzjxhimyiaiviq"... 
// Let's use the identical values from check_user.mjs
const keyFromCheckUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1ZmFobHpqeGJpbXlpd2l2b2lxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTg4NTQyMSwiZXhwIjoyMDg3NDYxNDIxfQ.N1gOS_NQOXUvpfsafu2KQsciZhId1DpcFXpxYvkKOOY';

const supabase = createClient(supabaseUrl, keyFromCheckUser);

async function makeAdmin() {
    const email = 'c.dellorto@pes-srl.it';
    
    // First, find the user in auth.users
    const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (usersError) {
        console.error("Error fetching users:", usersError);
        return;
    }
    
    const user = usersData.users.find(u => u.email === email);
    
    if (!user) {
        console.error(`User with email ${email} not found.`);
        return;
    }
    
    console.log(`Found user: ${user.id} (${user.email})`);
    
    // Now update the profiles table
    const { data, error } = await supabase
        .from('profiles')
        .update({ role: 'Admin' })
        .eq('id', user.id)
        .select();
        
    if (error) {
        console.error("Error updating profile:", error);
    } else {
        console.log("Profile updated successfully:", data);
        if (data.length === 0) {
            console.log("No profile found to update. Creating one...");
            const { data: insertData, error: insertError } = await supabase
                .from('profiles')
                .insert([{ id: user.id, email: email, role: 'Admin' }])
                .select();
            if (insertError) console.error("Error inserting profile:", insertError);
            else console.log("Profile inserted successfully:", insertData);
        }
    }
}

makeAdmin();
