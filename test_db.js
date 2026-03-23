const { createClient } = require('@supabase/supabase-js');
const url1 = 'https://sokjqukircfdyvomiunr.supabase.co';
const key1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNva2pxdWtpcmNmZHl2b21pdW5yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTQ2NDM3OCwiZXhwIjoyMDU1MDQwMzc4fQ.Sg8_d7bJ8eOQxP0h6mYkqE2D_7HwFqK1V_8r4_GZQ94';

const url2 = 'https://eufahlzjxhimyiaiviq.supabase.co';
const key2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1ZmFobHpqeGJpbXlpd2l2b2lxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTg4NTQyMSwiZXhwIjoyMDg3NDYxNDIxfQ.N1gOS_NQOXUvpfsafu2KQsciZhId1DpcFXpxYvkKOOY';

async function test(name, u, k) {
  try {
    const supabase = createClient(u, k);
    const { data, error } = await supabase.auth.admin.listUsers();
    console.log(name, error ? error.message : "SUCCESS!");
  } catch (e) {
    console.log(name, e.message);
  }
}

test('Project1(sok...):', url1, key1).then(() => test('Project2(euf...):', url2, key2));
