import { createClient } from '@supabase/supabase-js';
import readline from 'readline';
import fs from 'fs';

// Funzione semplice per parsare il .env senza librerie esterne
function loadEnv() {
  try {
    const envFile = fs.readFileSync('.env', 'utf8');
    envFile.split('\n').forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key, ...values] = line.split('=');
        if (key && values.length > 0) {
          process.env[key.trim()] = values.join('=').trim();
        }
      }
    });
  } catch (err) {
    console.log("Nessun file .env trovato.");
  }
}
loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ ERRORE: Chiavi Supabase non trovate. Assicurati che SUPABASE_SERVICE_ROLE_KEY sia nel tuo .env");
  process.exit(1);
}

// Usiamo la chiave di servizio per bypassare tutte le regole di sicurezza (RLS)
const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('📧 Inserisci l\'email del tuo account che vuoi far diventare Admin: ', async (email) => {
  try {
    const cleanEmail = email.trim();
    console.log(`\n🔍 Cerco l'utente ${cleanEmail} in Supabase Auth...`);
    
    // Trova l'utente nell'Auth (dove ci sono le password)
    const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers();
    if (authError) throw authError;

    const authUser = users.find(u => u.email === cleanEmail);
    if (!authUser) {
      console.log(`❌ Nessun utente registrato trovato con l'email: ${cleanEmail}`);
      console.log("👉 Per favore, registrati prima sul sito web alla pagina /register o /provagratis");
      process.exit(0);
    }

    console.log(`✅ Utente trovato! ID: ${authUser.id}`);
    
    // Ora forziamo il ruolo nella tabella profiles
    console.log(`\n⚙️ Aggiorno la tabella 'profiles' forzando ruolo 'Admin'...`);
    const { data: updatedProfile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ role: 'Admin' })
      .eq('id', authUser.id)
      .select()
      .single();

    if (profileError) {
      console.error("❌ Errore durante l'aggiornamento della tabella profiles:", profileError.message);
      // Se non esiste la riga, proviamo a crearla
      console.log("🔄 Provo a generare un record nel profilo...");
      await supabaseAdmin.from('profiles').insert({
          id: authUser.id,
          role: 'Admin',
          plan_type: 'premium',
          salon_name: 'Admin Salon'
      });
      console.log("✅ Profilo creato come Admin!");
    } else {
      console.log(`✅ Profilo aggiornato con successo come: ${updatedProfile.role}`);
    }

    console.log(`\n🎉 COMPLETATO!`);
    console.log(`👉 Ora fai il LOGOUT dal sito (se eri già dentro) e ri-fai il LOGIN.`);
    console.log(`👉 Potrai accedere al pannello: http://localhost:3000/admin`);

  } catch (err) {
    console.error("❌ Si è verificato un errore generale:", err);
  } finally {
    rl.close();
  }
});
